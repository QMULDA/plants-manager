package com.bezkoder.spring.datajpa.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("Cactus")
@Table(name = "plants")
public class Cactus extends Plant{
    public Cactus(String commonName,String scientificName, boolean flowering) {
        super(commonName, scientificName, false, flowering);
    }

    public Cactus() {}
}