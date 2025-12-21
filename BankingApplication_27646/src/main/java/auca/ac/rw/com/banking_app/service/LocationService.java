package auca.ac.rw.com.banking_app.service;

import auca.ac.rw.com.banking_app.model.ELocation;
import auca.ac.rw.com.banking_app.model.Location;
import auca.ac.rw.com.banking_app.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;
    public void createRwandaStructure() {
        if (locationRepository.existsByName("Kigali City")) {
            return;
        }

        Location province = new Location();
        province.setName("Kigali City");
        province.setCode("KGL");
        province.setType(ELocation.PROVINCE);
        locationRepository.save(province);

        Location district = new Location();
        district.setName("Gasabo");
        district.setCode("GAS");
        district.setType(ELocation.DISTRICT);
        district.setParent(province);
        locationRepository.save(district);

        Location sector = new Location();
        sector.setName("Kacyiru");
        sector.setCode("KAC");
        sector.setType(ELocation.SECTOR);
        sector.setParent(district);
        locationRepository.save(sector);

        Location cell = new Location();
        cell.setName("Kamatamu");
        cell.setCode("KAM");
        cell.setType(ELocation.CELL);
        cell.setParent(sector);
        locationRepository.save(cell);

        Location village = new Location();
        village.setName("Amahoro Village");
        village.setCode("AMA");
        village.setType(ELocation.VILLAGE);
        village.setParent(cell);
        locationRepository.save(village);

        System.out.println("--- RWANDA LOCATION HIERARCHY CREATED SUCCESSFULLY ---");
    }

    public Location findById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }
}