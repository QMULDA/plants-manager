package com.spring.datajpa.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CACTUS")
public class Cactus extends Plant {

    public Cactus() {
        super.setIsTrailing(false);
    }

    public Cactus(String commonName, String scientificName, boolean flowering) {
        super(commonName, scientificName, false, flowering);
    }

    @Override
    public void setIsTrailing(boolean isTrailing) {
        super.setIsTrailing(false);
    }
}
