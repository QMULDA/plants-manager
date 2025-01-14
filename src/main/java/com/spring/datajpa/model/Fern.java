package com.spring.datajpa.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("FERN")
public class Fern extends Plant {

    public Fern() {
        super.setFlowering(false);
    }

    public Fern(String commonName, String scientificName) {
        super(commonName, scientificName, false, false);
    }

    @Override
    public void setFlowering(boolean flowering) {
        super.setFlowering(false);
    }
}
