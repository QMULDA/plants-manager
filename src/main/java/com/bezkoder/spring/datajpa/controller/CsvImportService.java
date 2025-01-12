package com.bezkoder.spring.datajpa.controller;

import com.bezkoder.spring.datajpa.model.Plant;
import com.bezkoder.spring.datajpa.repository.PlantRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class CsvImportService {
    @Autowired
    private PlantRepository plantRepository;

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
                plantRepository.save(plant);
            }
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
