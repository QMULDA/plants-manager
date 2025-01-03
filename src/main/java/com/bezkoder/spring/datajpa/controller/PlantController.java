package com.bezkoder.spring.datajpa.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

	@GetMapping("/plants")
	public ResponseEntity<List<Plant>> getAllPlants(@RequestParam(required = false) String title) {
		try {
			List<Plant> plants = new ArrayList<Plant>();

			if (title == null)
				plantRepository.findAll().forEach(plants::add);
			else
				plantRepository.findByCommonNameContaining(title).forEach(plants::add);

			if (plants.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(plants, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
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
			Plant _plant = plantRepository
					.save(new Plant(plant.getCommonName(), plant.getDescription(), false));
			return new ResponseEntity<>(_plant, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/plants/{id}")
	public ResponseEntity<Plant> updatePlant(@PathVariable("id") long id, @RequestBody Plant plant) {
		Optional<Plant> plantData = plantRepository.findById(id);

		if (plantData.isPresent()) {
			Plant _plant = plantData.get();
			_plant.setCommonName(plant.getCommonName());
			_plant.setDescription(plant.getDescription());
			_plant.setPublished(plant.isPublished());
			return new ResponseEntity<>(plantRepository.save(_plant), HttpStatus.OK);
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

	@GetMapping("/plants/published")
	public ResponseEntity<List<Plant>> findByPublished() {
		try {
			List<Plant> plants = plantRepository.findByPublished(true);

			if (plants.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(plants, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
