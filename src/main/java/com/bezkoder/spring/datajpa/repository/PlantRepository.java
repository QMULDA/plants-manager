package com.bezkoder.spring.datajpa.repository;

import java.util.List;

import com.bezkoder.spring.datajpa.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, Long> {
	List<Plant> findByPublished(boolean published);
	List<Plant> findByCommonNameContaining(String commonName);
}
