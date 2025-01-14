package com.bezkoder.spring.datajpa.service;

import com.bezkoder.spring.datajpa.model.Plant;
import com.bezkoder.spring.datajpa.model.Room;
import com.bezkoder.spring.datajpa.repository.PlantRepository;
import com.bezkoder.spring.datajpa.repository.RoomRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;

@Service
public class CsvImportService {
    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private RoomRepository roomRepository;


    public void importCsvData() {
        String filePath = "src/main/resources/plants.csv";
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            String[] nextLine;
            reader.readNext();
            while ((nextLine = reader.readNext()) != null) {
                Plant plant = new Plant();
                plant.setCommonName(nextLine[0]);
                plant.setScientificName(nextLine[1]);
                plant.setIsTrailing(Boolean.parseBoolean(nextLine[2]));
                plant.setFlowering(Boolean.parseBoolean(nextLine[3]));
                if (!nextLine[4].isEmpty()) {
                    Long roomId = Long.parseLong(nextLine[4]);
                    Room room = roomRepository.findById(roomId).orElse(null);
                    plant.setRoom(room);
                }
                plantRepository.save(plant);
            }
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
