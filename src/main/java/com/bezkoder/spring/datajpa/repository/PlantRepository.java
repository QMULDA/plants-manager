package com.bezkoder.spring.datajpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bezkoder.spring.datajpa.model.Plant;

public interface PlantRepository extends JpaRepository<Plant, Long> {
	List<Plant> findByPublished(boolean published);
	List<Plant> findByCommonNameContaining(String title);
}
