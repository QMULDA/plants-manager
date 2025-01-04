package com.bezkoder.spring.datajpa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "plants")
public class Plant {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "commonName")
	private String commonName;

	@Column(name = "scientificName")
	private String scientificName;

	@Column(name = "isTrailing")
	private boolean isTrailing;

	@Column(name = "flowering")
	private boolean flowering;

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

	public void setScientificName(String scientificName) { this.scientificName = scientificName; }

	public boolean getIsTrailing() { return isTrailing; }

	public void setIsTrailing(boolean isTrailing) { this.isTrailing = isTrailing; }

	public boolean getFlowering() {return flowering;}

	public void setFlowering(boolean isFlowering) {this.flowering = isFlowering;}

	@Override
	public String toString() {
		return "Plant [id=" + id + ", commonName=" + commonName + ", desc=" + scientificName + ", trailing=" + isTrailing + ", flowering=" + flowering + "]";
	}

}
