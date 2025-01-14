package com.bezkoder.spring.datajpa.repository;

import com.bezkoder.spring.datajpa.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
