package parkup.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.entities.ParkingZone;
import parkup.services.ParkingZoneServiceImpl;

import java.util.HashMap;
import java.util.List;

@RestController
public class ParkingZoneController {

    private ParkingZoneServiceImpl parkingZoneService;
    
}
