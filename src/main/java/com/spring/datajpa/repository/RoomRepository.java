package com.spring.datajpa.repository;

import com.spring.datajpa.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
