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

	@Column(name = "description")
	private String description;

	@Column(name = "isTrailing")
	private boolean isTrailing;

	@Column(name = "flowering")
	private boolean flowering;

	public Plant() {

	}

	public Plant(String commonName, String description, boolean isTrailing, boolean flowering) {
		this.commonName = commonName;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) { this.description = description; }

	public boolean getIsTrailing() { return isTrailing; }

	public void setIsTrailing(boolean isTrailing) { this.isTrailing = isTrailing; }

	public boolean getFlowering() {return flowering;}

	public void setFlowering(boolean isFlowering) {this.flowering = isFlowering;}

	@Override
	public String toString() {
		return "Plant [id=" + id + ", commonName=" + commonName + ", desc=" + description + ", trailing=" + isTrailing + ", flowering=" + flowering + "]";
	}

}
