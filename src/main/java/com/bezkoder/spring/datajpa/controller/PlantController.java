package com.bezkoder.spring.datajpa.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.bezkoder.spring.datajpa.model.Cactus;
import com.bezkoder.spring.datajpa.model.Fern;
import com.bezkoder.spring.datajpa.model.Room;
import com.bezkoder.spring.datajpa.repository.RoomRepository;
import com.bezkoder.spring.datajpa.service.CsvImportService;
import com.bezkoder.spring.datajpa.service.JsonImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.datajpa.model.Plant;
import com.bezkoder.spring.datajpa.repository.PlantRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class PlantController {

	@Autowired
	PlantRepository plantRepository;
	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	CsvImportService csvImportService;
	@Autowired
	JsonImportService jsonImportService;

	@PostMapping("/import-csv")
	public ResponseEntity<String> importCsv() {
		try {
			csvImportService.importCsvData();
			return ResponseEntity.ok("CSV import successful.");
		} catch (Exception e) {
			return new ResponseEntity<>("CSV import failed: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/import-json")
	public ResponseEntity<String> importJson() {
		try {
			jsonImportService.importJsonData();
			return ResponseEntity.ok("JSON import successful.");
		} catch (Exception e) {
			return new ResponseEntity<>("JSON import failed: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/plants")
	public ResponseEntity<List<Plant>> getAllPlants(@RequestParam(required = false) String commonName) {
		try {
			List<Plant> plants = new ArrayList<Plant>();

			if (commonName == null)
				plantRepository.findAll().forEach(plants::add);
			else
				plantRepository.findByCommonNameContaining(commonName).forEach(plants::add);

			if (plants.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(plants, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/trailing")
	public ResponseEntity<Map<String, Long>> getCountOfTrailingPlants() {
		Map<String, Long> trailingCount = plantRepository.getTrailingAndTotalCount();
		return new ResponseEntity<>(trailingCount, HttpStatus.OK);
	}

	@GetMapping("/flowering")
	public ResponseEntity<Map<String, Long>> getCountOfFloweringPlants() {
		Map<String, Long> floweringCount = plantRepository.getFloweringAndTotalCount();
		return new ResponseEntity<>(floweringCount, HttpStatus.OK);
	}

	@GetMapping("/plants/{id}")
	public ResponseEntity<Plant> getPlantById(@PathVariable("id") long id) {
		Optional<Plant> plantData = plantRepository.findById(id);

		if (plantData.isPresent()) {
			return new ResponseEntity<>(plantData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/plants")
	public ResponseEntity<Plant> createPlant(@RequestBody Plant plant) {
		try {
			if (plant.getRoom() != null && plant.getRoom().getId() != null) {
				Room existingRoom = roomRepository.findById(plant.getRoom().getId())
						.orElseThrow(() -> new RuntimeException("Room not found"));
				plant.setRoom(existingRoom);
			}

			Plant _plant = plantRepository.save(plant);
			return new ResponseEntity<>(_plant, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@PostMapping("/cactus")
	public ResponseEntity<Plant> createCactus(@RequestBody Plant plantRequest) {
		try {
			Cactus cactus = new Cactus(
					plantRequest.getCommonName(),
					plantRequest.getScientificName(),
					plantRequest.getFlowering()
			);
			if (plantRequest.getRoom() != null && plantRequest.getRoom().getId() != null) {
				Room existingRoom = roomRepository.findById(plantRequest.getRoom().getId())
						.orElseThrow(() -> new RuntimeException("Room not found"));
				cactus.setRoom(existingRoom);
			}
			Plant saved = plantRepository.save(cactus);
			return new ResponseEntity<>(saved, HttpStatus.CREATED);
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/fern")
	public ResponseEntity<Plant> createFern(@RequestBody Plant plantRequest) {
		try {
			Fern fern = new Fern(
					plantRequest.getCommonName(),
					plantRequest.getScientificName()
			);
			fern.setIsTrailing(plantRequest.getIsTrailing());

			if (plantRequest.getRoom() != null && plantRequest.getRoom().getId() != null) {
				Room existingRoom = roomRepository.findById(plantRequest.getRoom().getId())
						.orElseThrow(() -> new RuntimeException("Room not found"));
				fern.setRoom(existingRoom);
			}
			Plant saved = plantRepository.save(fern);
			return new ResponseEntity<>(saved, HttpStatus.CREATED);
		} catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}


	@PutMapping("/plants/{id}")
	public ResponseEntity<Plant> updatePlant(@PathVariable("id") long id, @RequestBody Plant plantRequest) {
		Optional<Plant> plantData = plantRepository.findById(id);

		if (plantData.isPresent()) {
			Plant existingPlant = plantData.get();
			existingPlant.setCommonName(plantRequest.getCommonName());
			existingPlant.setScientificName(plantRequest.getScientificName());
			existingPlant.setIsTrailing(plantRequest.getIsTrailing());
			existingPlant.setFlowering(plantRequest.getFlowering());

			if (plantRequest.getRoom() != null && plantRequest.getRoom().getId() != null) {
				Room existingRoom = roomRepository.findById(plantRequest.getRoom().getId())
						.orElseThrow(() -> new RuntimeException("Room not found with id: " + plantRequest.getRoom().getId()));
				existingPlant.setRoom(existingRoom);
			} else {
				existingPlant.setRoom(null);
			}

			Plant updatedPlant = plantRepository.save(existingPlant);
			return new ResponseEntity<>(updatedPlant, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/plants/{id}")
	public ResponseEntity<HttpStatus> deletePlant(@PathVariable("id") long id) {
		try {
			plantRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/plants")
	public ResponseEntity<HttpStatus> deleteAllPlants() {
		try {
			plantRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
