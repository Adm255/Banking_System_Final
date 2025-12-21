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

    // This method builds the tree: Province -> District -> Sector -> Cell -> Village
    public void createRwandaStructure() {
        if (locationRepository.existsByName("Kigali City")) {
            return; // Data already exists, don't create it again
        }

        // 1. Create Province
        Location province = new Location();
        province.setName("Kigali City");
        province.setCode("KGL");
        province.setType(ELocation.PROVINCE);
        locationRepository.save(province);

        // 2. Create District (Parent = Province)
        Location district = new Location();
        district.setName("Gasabo");
        district.setCode("GAS");
        district.setType(ELocation.DISTRICT);
        district.setParent(province);
        locationRepository.save(district);

        // 3. Create Sector (Parent = District)
        Location sector = new Location();
        sector.setName("Kacyiru");
        sector.setCode("KAC");
        sector.setType(ELocation.SECTOR);
        sector.setParent(district);
        locationRepository.save(sector);

        // 4. Create Cell (Parent = Sector)
        Location cell = new Location();
        cell.setName("Kamatamu");
        cell.setCode("KAM");
        cell.setType(ELocation.CELL);
        cell.setParent(sector);
        locationRepository.save(cell);

        // 5. Create Village (Parent = Cell)
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