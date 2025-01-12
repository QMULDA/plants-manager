package com.bezkoder.spring.datajpa.controller;

import com.bezkoder.spring.datajpa.model.Plant;
import com.bezkoder.spring.datajpa.repository.PlantRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@Service
public class JsonImportService {
    @Autowired
    private PlantRepository plantRepository;

    public void importJsonData() throws IOException {
        String filePath = "src/main/resources/plants.json";
        ObjectMapper objectMapper = new ObjectMapper();
        List<Plant> plants = objectMapper.readValue(new File(filePath), new TypeReference<List<Plant>>() {});
        plantRepository.saveAll(plants);
        System.out.println("Successfully imported " + plants.size() + " plants from JSON.");
    }}
