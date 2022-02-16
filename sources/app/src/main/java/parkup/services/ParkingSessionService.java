package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import parkup.ParkUpApplication;
import parkup.data.Plate;
import parkup.data.enumarations.SessionStatus;
import parkup.entities.*;
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
    private final RegisteredUserRepository registeredUserRepository;
    private final PlateRepository plateRepository;
    private final GuestRepository guestRepository;

    @Autowired
    public ParkingSessionService(ParkingSessionRepository parkingSessionRepository, ParkingZoneRepository parkingZoneRepository, ParkingSpaceRepository parkingSpaceRepository, RegisteredUserRepository registeredUserRepository, PlateRepository plateRepository, GuestRepository guestRepository) {
        this.parkingSessionRepository = parkingSessionRepository;
        this.parkingZoneRepository = parkingZoneRepository;
        this.parkingSpaceRepository = parkingSpaceRepository;
        this.registeredUserRepository = registeredUserRepository;
        this.plateRepository = plateRepository;
        this.guestRepository = guestRepository;
    }

    //TODO add getMethod for paid sessions or all sessions

    public List<ParkingSession> getAllParkingSessions() {
        //Get all sessions that arent paid
        return parkingSessionRepository.findAll().stream()
                .filter(s->!s.getStatus().equals(SessionStatus.ENDED_PAID))
                .collect(Collectors.toList());
    }

    public List<ParkingSession> getAllParkingSessionsFromZone(Integer pzId) {
        //Get all sessions that arent paid

        return parkingSessionRepository.findAll().stream()
                .filter(s->!s.getStatus().equals(SessionStatus.ENDED_PAID) && s.getParkingZone()!=null && s.getParkingZone().getId()==pzId)
                .collect(Collectors.toList());
    }

    public ParkingSession findById(int parkingSessionId) {
        Optional<ParkingSession> parkingSessionOpt = Optional.ofNullable(parkingSessionRepository.findByPssId(parkingSessionId));
        return parkingSessionOpt.orElse(null);
    }

    @Transactional
    public Optional<ParkingSession> deleteParkingSession(int parkingSessionId) {
        Optional<ParkingSession> parkingSessionOpt = Optional.ofNullable(parkingSessionRepository.findByPssId(parkingSessionId));
        if (parkingSessionOpt.isPresent()) {
            if(parkingSessionOpt.get().getStatus()!=SessionStatus.STARTED_UNVERIFIED)
            parkingSessionOpt.get().getParkingSpace().setTaken(false);
            parkingSessionOpt.get().setPlate(null);
            registeredUserRepository.findAll().stream().filter(u->u.getSession().equals(parkingSessionOpt.get())).forEach(u->u.setSession(null));
            guestRepository.findAll().stream().filter(u->u.getSession().equals(parkingSessionOpt.get())).forEach(u->u.setSession(null));
            parkingSessionRepository.deleteByPssId(parkingSessionId);
            return parkingSessionOpt;
        } else {
            throw new IllegalStateException("ParkingSpace doesn't exist, therefore can't be deleted");
        }
    }

    @Transactional
    public Optional<ParkingSession> startParkingSession(String tablica, String parkingZoneName) {
        ParkingZone parkingZone = parkingZoneRepository.findByPzName(parkingZoneName);
        Authentication token = ParkUpApplication.getToken();
        Plate plate = plateRepository.findByPlate(tablica);
        ParkingSession sessionToAdd = new ParkingSession(plate);
        sessionToAdd.setParkingZone(parkingZone);
        parkingSessionRepository.save(sessionToAdd);
        String role =token.getAuthorities().stream().findFirst().get().getAuthority();
        String email =token.getName();
        if(role.equals("ROLE_REG_USER")){
            RegisteredUser user = registeredUserRepository.findRegisteredUserByEmail(email).get();
            user.setSession(sessionToAdd);
        }
        else{
            Guest user = guestRepository.findGuestByEmail(email).get();
            user.setSession(sessionToAdd);
        }
        return Optional.of(sessionToAdd);

    }
    public int calculatePayment(){
        ParkingSession session = getParkingSession();
        if(session==null){
            throw new IllegalStateException("No such session exists");
        }
        else if(session.getStatus()!= SessionStatus.ENDED_UNPAID){
            throw new IllegalStateException("Cannot calculate payment on a session that is not ended");
        }
        int price = session.getParkingZone().getPrice();
        return (int) (Math.ceil((Duration.between(session.getTimeStart(),session.getTimeEnd()).toMinutes()+1)/60.0)*price);
    }
    @Transactional
    public ParkingSession verifyParkingSession(int id,String parkingSpaceName){
        ParkingSession parkingSession = parkingSessionRepository.findByPssId(id);
        if(parkingSession==null){
            throw new IllegalStateException("No such session exists");
        }
        else if(parkingSession.getStatus()==SessionStatus.STARTED_VERIFIED){
            throw new IllegalStateException("The session you are trying to verify has already been verified");
        }
        ParkingZone parkingZone = parkingSession.getParkingZone();
//        else if(parkingSession.getStatus()!=SessionStatus.STARTED_)
        if(!parkingZone.getParkingSpaces().contains(parkingSpaceRepository.findByPsName(parkingSpaceName))){
            throw new IllegalStateException("Ivalid parking space inserted. Type in a new parking space or let the admin know that they should add the parking space to this zone");
        }
        if(parkingSpaceRepository.findByPsName(parkingSpaceName).isTaken()){
            throw new IllegalStateException("Ivalid parking space inserted. Type in a new parking space, this space is already in a session");
        }
        parkingSession.setStatus(SessionStatus.STARTED_VERIFIED);
        ParkingSpace parkingSpace = parkingZoneRepository.findByPzId(parkingZone.getId()).getParkingSpaces().stream().filter(ps->ps.getPsName().equals(parkingSpaceName)).findFirst().get();
        parkingSpace.setTaken(true);
        parkingSession.setParkingSpace(parkingSpace);
        return parkingSession;
    }
    @Transactional
    public ParkingSession endParkingSession(){
        ParkingSession parkingSession=getParkingSession();
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
    @Transactional
    public boolean payParkingSession(String date){
        if(!date.isEmpty()){
        String expMonthString=date.split("/")[0];
        String expYearString=date.split("/")[1];
        if(expMonthString.startsWith("0"))
            expMonthString=expMonthString.substring(1);
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
        }
        ParkingSession parkingSession=getParkingSession();
        if(parkingSession==null){
            throw new IllegalStateException("No such session exists");
        }
        else if(parkingSession.getStatus()==SessionStatus.ENDED_PAID){
            throw new IllegalStateException("The session has already been paid for");
        }
        parkingSession.setStatus(SessionStatus.ENDED_PAID);
        if(parkingSession.getParkingSpace()!=null)
        parkingSession.getParkingSpace().setTaken(false);
        parkingSession.setPlate(null);
        registeredUserRepository.findAll().stream().filter(rp->rp.getSession()!=null&&rp.getSession().getStatus().equals(SessionStatus.ENDED_PAID)).forEach(rp->rp.setSession(null));
        guestRepository.findAll().stream().filter(g->g.getSession()!=null&&g.getSession().getStatus().equals(SessionStatus.ENDED_PAID)).forEach(g->g.setSession(null));
        guestRepository.deleteAll(guestRepository.findAll().stream().filter(g-> g.getSession() == null).collect(Collectors.toList()));
        parkingSessionRepository.deleteByPssId(parkingSession.getPssId());
        return true;
    }

    public SessionStatus getStatusOfParkirac(){
        ParkingSession session=getParkingSession();
        return session == null ? null : session.getStatus();
    }

    public ParkingSession getParkingSession() {
        Authentication token = ParkUpApplication.getToken();
        String role =token.getAuthorities().stream().findFirst().get().getAuthority();
        String email =token.getName();
        ParkingSession parkingSession;
        if(role.equals("ROLE_REG_USER")){
            RegisteredUser user = registeredUserRepository.findRegisteredUserByEmail(email).get();
            parkingSession=user.getSession();
        }
        else{
            Guest user = guestRepository.findGuestByEmail(email).get();
            parkingSession=user.getSession();
        }
        return parkingSession;
    }
}
