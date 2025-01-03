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

	@Column(name = "published")
	private boolean published;

	public Plant() {

	}

	public Plant(String commonName, String description, boolean published) {
		this.commonName = commonName;
		this.description = description;
		this.published = published;
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

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean isPublished) {
		this.published = isPublished;
	}

	@Override
	public String toString() {
		return "Plant [id=" + id + ", commonName=" + commonName + ", desc=" + description + ", published=" + published + "]";
	}

}
