package com.spring.datajpa.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

@Entity
@Table(name = "plants")
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String commonName;
    private String scientificName;
    private boolean isTrailing;
    private boolean flowering;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id"
    )
    private Room room;

    public Plant() {
    }

    public Plant(String commonName, String scientificName, boolean isTrailing, boolean flowering) {
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.isTrailing = isTrailing;
        this.flowering = flowering;
    }

    public long getId() {
        return id;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public boolean getIsTrailing() {
        return isTrailing;
    }

    public void setIsTrailing(boolean isTrailing) {
        this.isTrailing = isTrailing;
    }

    public boolean getFlowering() {
        return flowering;
    }

    public void setFlowering(boolean flowering) {
        this.flowering = flowering;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    @Override
    public String toString() {
        return "Plant [id=" + id
                + ", commonName=" + commonName
                + ", scientificName=" + scientificName
                + ", trailing=" + isTrailing
                + ", flowering=" + flowering + "]";
    }
}
