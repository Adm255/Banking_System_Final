package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateRwandaStructure() {
        locationService.createRwandaStructure();
        return ResponseEntity.ok("Rwanda Location Structure (Kigali -> Village) Created Successfully!");
    }
}