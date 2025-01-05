import React, { Component } from "react";
import PlantDataService from "../services/plant.service";

export default class AddCactus extends Component {
  constructor(props) {
    super(props);
    this.onChangeCommonName = this.onChangeCommonName.bind(this);
    this.onChangeScientificName = this.onChangeScientificName.bind(this);
    this.saveCactus = this.saveCactus.bind(this);
    this.newCactus = this.newCactus.bind(this);

    this.state = {
      id: null,
      commonName: "Cactus",
      scientificName: "CactusSci",
      isTrailing: false,
      flowering: false,

      submitted: false
    };
  }

  onChangeCommonName(e) {
    this.setState({
      commonName: e.target.value
    });
  }

  onChangeScientificName(e) {
    this.setState({
      scientificName: e.target.value
    });
  }

  saveCactus() {
    var data = {
      commonName: this.state.commonName,
      scientificName: this.state.scientificName
    };

    PlantDataService.createCactus(data)
      .then(response => {
        console.log(data);
        this.setState({
          id: response.data.id,
          commonName: response.data.commonName,
          scientificName: response.data.scientificName,
          isTrailing: response.data.isTrailing,
          flowering: response.data.flowering,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(data);
        console.log(e);
      });
  }

  newCactus() {
    this.setState({
      id: null,
      commonName: "cactus",
      scientificName: "cactusSci",
      isTrailing: false,
      flowering: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCactus}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="commonName">Common Name</label>
              <input
                type="text"
                className="form-control"
                id="commonName"
                required
                value={this.state.commonName}
                onChange={this.onChangeCommonName}
                name="commonName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="scientificName">Scientific Name</label>
              <input
                type="text"
                className="form-control"
                id="scientificName"
                required
                value={this.state.scientificName}
                onChange={this.onChangeScientificName}
                name="scientificName"
              />
            </div>

            <button onClick={this.saveCactus} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
