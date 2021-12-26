package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.data.PriceAndTime;
import parkup.data.Tablicka;
import parkup.data.enumerations.SessionStatus;
import parkup.entities.ParkingSession;
import parkup.entities.ParkingSpace;
import parkup.entities.ParkingZone;
import parkup.entities.RegistriranParkirac;
import parkup.repositories.*;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingSessionService {
    private final ParkingSessionRepository parkingSessionRepository;
    private final ParkingZoneRepository parkingZoneRepository;
    private final ParkingSpaceRepository parkingSpaceRepository;
    private final TablickaRepository tablickaRepository;
    private final RegistriranParkiracRepository registriranParkiracRepository;

    @Autowired
    public ParkingSessionService(ParkingSessionRepository parkingSessionRepository, ParkingZoneRepository parkingZoneRepository,
                                 ParkingSpaceRepository parkingSpaceRepository, TablickaRepository tablickaRepository,
                                 RegistriranParkiracRepository registriranParkiracRepository) {
        this.parkingSessionRepository = parkingSessionRepository;
        this.parkingZoneRepository = parkingZoneRepository;
        this.parkingSpaceRepository = parkingSpaceRepository;
        this.tablickaRepository = tablickaRepository;
        this.registriranParkiracRepository = registriranParkiracRepository;
    }

    //TODO add getMethod for paid sessions or all sessions for statistics

    public List<ParkingSession> getAllParkingSessions() {
        //Get all sessions that arent paid
        return parkingSessionRepository.findAll().stream()
                .filter(s->!s.getStatus().equals(SessionStatus.ENDED_PAID))
                .collect(Collectors.toList());
    }

    public ParkingSession findById(int parkingSessionId) {
        Optional<ParkingSession> parkingSessionOpt = Optional.ofNullable(parkingSessionRepository.findByPssId(parkingSessionId));
        return parkingSessionOpt.orElse(null);
    }

   /* @Transactional
    public void updateParkingSession(int parkingSessionId, String timeStart, String timeEnd, Tablicka tablicka) {
        Optional<ParkingSession> parkingSessionOpt = Optional.ofNullable(parkingSessionRepository.findByPssId(parkingSessionId));
        if (parkingSessionOpt.isPresent()) {
            ParkingSession parkingSessionNov = parkingSessionRepository.findByPssId(parkingSessionId);

            if(!parkingSessionNov.getTimeStart().equals(timeStart) && !parkingSessionNov.getTimeStart().equals(timeEnd))
                parkingSessionNov.setTimeStart(timeStart);

            if(!parkingSessionNov.getTimeEnd().equals(timeEnd) && !parkingSessionNov.getTimeEnd().equals(timeStart))
                parkingSessionNov.setTimeEnd(timeEnd);

            if(tablicka!=null && !Objects.equals(parkingSessionNov.getTablica(),tablicka)){
                parkingSessionNov.setTablica(tablicka);
            }
        }else{
            throw new IllegalStateException("The ParkingSession does not exist");
        }
    }*/
    @Transactional
    public Optional<ParkingSession> deleteParkingSession(int parkingSessionId) {
        Optional<ParkingSession> parkingSessionOpt = Optional.ofNullable(parkingSessionRepository.findByPssId(parkingSessionId));
        if (parkingSessionOpt.isPresent()) {
            parkingSessionOpt.get().getParkingSpace().setTaken(false);
            parkingSessionRepository.deleteByPssId(parkingSessionId);
            return parkingSessionOpt;
        } else {
            throw new IllegalStateException("ParkingSpace doesn't exist, therefore can't be deleted");
        }
    }

    @Transactional
    public Optional<ParkingSession> startParkingSession(String tablica, int parkingZoneId) {
        ParkingZone parkingZone = parkingZoneRepository.findByPzId(parkingZoneId);
        Tablicka tablicka = tablickaRepository.findByTablica(tablica);
        if(tablicka==null) {
            tablickaRepository.save(new Tablicka(tablica));
        }
        tablicka=tablickaRepository.findByTablica(tablica);
        ParkingSession sessionToAdd = new ParkingSession(tablicka);
        sessionToAdd.setParkingZone(parkingZone);
        parkingSessionRepository.save(sessionToAdd);
        return Optional.of(sessionToAdd);

    }

//    public void executePayment(int id){
//        ParkingSession session = parkingSessionRepository.findByPssId(id);
//        if(session==null){
//            throw new IllegalStateException("No such session exists");
//        }
//        else if(session.getStatus()== SessionStatus.ENDED_UNPAID){
//            throw new IllegalStateException("Cannot execute payment on an ended session");
//        }
//        session.setStatus(SessionStatus.ENDED_PAID);
//    }

    //TODO: napravi funkcijata pokraj cena za plakjanje da go vrakja i vkupnoto vreme za sesijata - sredeno proveri so andrej
    //TODO: namesto da se prakja id na parking sesija, da se prati id na registriranParkirac i preku nego da se najde negovata sesija, probaj vaka napravi - sredeno proveri so andrej
//    public int calculatePayment(int id){    //ako id e
//
//        ParkingSession session = parkingSessionRepository.findByPssId(id);
//        if(session==null){
//            throw new IllegalStateException("No such session exists");
//        }
//        else if(session.getStatus()== SessionStatus.ENDED_PAID){    //tuka stoese ENDED_UNPAID a treba da stoi ENDED_PAID, smeneto e proveri so andrej
//            throw new IllegalStateException("Cannot calculate payment on an ended session");
//        }
//        int price = session.getParkingZone().getPrice();
//        return (int) (Math.ceil(Duration.between(session.getTimeEnd(),session.getTimeStart()).toMinutes()/60.0)*price);
//    }

    public PriceAndTime calculatePayment(int regParkId){    //ova id se odnesuva na id na registriraniot parkirac koj plakja sesija
        RegistriranParkirac parkirac = registriranParkiracRepository.findByRegParkId(regParkId);
        if(parkirac==null){
            throw new IllegalStateException("There is no registriranParkirac with that id");
        }
        ParkingSession parkingSession = parkirac.getSession();

        if(parkingSession==null){
            throw new IllegalStateException("No such session exists");
        }
        else if(parkingSession.getStatus()== SessionStatus.ENDED_PAID){    //tuka stoese ENDED_UNPAID a treba da stoi ENDED_PAID, smeneto e proveri so andrej
            throw new IllegalStateException("Cannot calculate payment on an ended session");
        }
        int price = parkingSession.getParkingZone().getPrice();
        int priceToPay = (int) (Math.ceil(Duration.between(parkingSession.getTimeEnd(),parkingSession.getTimeStart()).toMinutes()/60.0)*price);
        int totalMinutes = (int) Math.ceil(Duration.between(parkingSession.getTimeEnd(),parkingSession.getTimeStart()).toMinutes());
        return new PriceAndTime(priceToPay,totalMinutes);
    }

    @Transactional
    public ParkingSession verifyParkingSession(int id,String parkingSpaceName,int parkingZoneId){
        ParkingSession parkingSession = parkingSessionRepository.findByPssId(id);
        ParkingZone parkingZone = parkingZoneRepository.findByPzId(parkingZoneId);
        if(parkingSession==null){
            throw new IllegalStateException("No such session exists");
        }
        else if(parkingSession.getStatus()==SessionStatus.STARTED_VERIFIED){
            throw new IllegalStateException("The session you are trying to verify has already been verified");
        }
//        else if(parkingSession.getStatus()!=SessionStatus.STARTED_)
        if(!parkingZone.getParkingSpaces().contains(parkingSpaceRepository.findByPsName(parkingSpaceName))){
            throw new IllegalStateException("Ivalid parking space inserted. Type in a new parking space or let the admin know that they should add the parking space to this zone");
        }

        parkingSession.setStatus(SessionStatus.STARTED_VERIFIED);
        ParkingSpace parkingSpace = parkingZoneRepository.findByPzId(parkingZoneId).getParkingSpaces().stream().filter(ps->ps.getPsName().equals(parkingSpaceName)).findFirst().get();
        parkingSpace.setTaken(true);
        parkingSession.setParkingSpace(parkingSpace);
        return parkingSession;
    }

    //TODO: ista situacija kako calculatePayment da se prati id na korisnik pa preku negovo id da se najde parking sesija i taka da se endne - sredeno proveri so andrej
    @Transactional
    public ParkingSession endParkingSession(int regParkId){
        //ParkingSession parkingSession = parkingSessionRepository.findByPssId(id); //smeneto kako pogore vo calculatePayment funkcija
        RegistriranParkirac parkirac = registriranParkiracRepository.findByRegParkId(regParkId);
        if(parkirac==null){
            throw new IllegalStateException("There is no registriranParkirac with that id");
        }
        ParkingSession parkingSession = parkirac.getSession();

        if(parkingSession==null){
            throw new IllegalStateException("No such session exists");
        }
        else if(parkingSession.getStatus()==SessionStatus.ENDED_UNPAID){
            throw new IllegalStateException("The session you are trying to end has already been ended");
        }
        parkingSession.setStatus(SessionStatus.ENDED_UNPAID);
        parkingSession.setTimeEnd(LocalDateTime.now());
        return parkingSession;
    }

    //TODO: ista situacija kako calculatePayment i endParkingSession - sredeno proveri so andrej
    @Transactional
    public boolean payParkingSession(int regParkId,String date){ //smeneto kako pogore vo calculatePayment i endParkingSession funkcija
        //ParkingSession parkingSession = parkingSessionRepository.findByPssId(id);
        RegistriranParkirac parkirac = registriranParkiracRepository.findByRegParkId(regParkId);
        if(parkirac==null){
            throw new IllegalStateException("There is no registriranParkirac with that id");
        }
        ParkingSession parkingSession = parkirac.getSession();
        String expMonthString=date.split("/")[0];
        String expYearString=date.split("/")[1];

        if(expMonthString.startsWith("0"))
            expMonthString=expYearString.substring(1);
        if(expYearString.startsWith("0"))
            expYearString=expYearString.substring(1);

        int expMonth=Integer.parseInt(expMonthString);
        int expYear=Integer.parseInt(expYearString);
        int month = LocalDateTime.now().getMonth().getValue();
        int year = LocalDateTime.now().getYear()%100;

        if(year>expYear){
            throw new IllegalStateException("Your card has expired or the date that you have entered is incorrect");
        }
        else if(year==expYear){
            if(month>=expMonth)
                throw new IllegalStateException("Your card has expired or the date that you have entered is incorrect");
        }
        if(parkingSession==null){
            throw new IllegalStateException("No such session exists");
        }
        else if(parkingSession.getStatus()==SessionStatus.ENDED_PAID){
            throw new IllegalStateException("The session has already been paid for");
        }

        //SE PLAKJA//

        parkingSession.setStatus(SessionStatus.ENDED_PAID);
        parkingSession.getParkingSpace().setTaken(false);
        return true;
    }
}
