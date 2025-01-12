package com.bezkoder.spring.datajpa.repository;

import java.util.List;
import java.util.Map;

import com.bezkoder.spring.datajpa.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlantRepository extends JpaRepository<Plant, Long> {
	List<Plant> findByCommonNameContaining(String commonName);

	@Query("SELECT SUM(CASE WHEN p.isTrailing = true THEN 1 ELSE 0 END) as trailingCount, COUNT(p) as totalCount FROM Plant p")
	Map<String, Long> getTrailingAndTotalCount();

}
