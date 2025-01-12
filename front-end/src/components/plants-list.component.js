import React, { Component } from "react";
import PlantDataService from "../services/plant.service";
import { Link } from "react-router-dom";

export default class PlantsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCommonName = this.onChangeSearchCommonName.bind(this);
    this.retrievePlants = this.retrievePlants.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePlant = this.setActivePlant.bind(this);
    this.removeAllPlants = this.removeAllPlants.bind(this);
    this.searchCommonName = this.searchCommonName.bind(this);

    this.state = {
      plants: [],
      currentPlant: null,
      currentIndex: -1,
      searchCommonName: ""
    };
  }

  componentDidMount() {
    this.retrievePlants();
  }

  onChangeSearchCommonName(e) {
    const searchCommonName = e.target.value;

    this.setState({
      searchCommonName: searchCommonName
    });
  }

  retrievePlants() {
    PlantDataService.getAll()
      .then(response => {
        this.setState({
          plants: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePlants();
    this.setState({
      currentPlant: null,
      currentIndex: -1
    });
  }

  setActivePlant(plant, index) {
    this.setState({
      currentPlant: plant,
      currentIndex: index
    });
  }

  removeAllPlants() {
    PlantDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCommonName() {
    this.setState({
      currentPlant: null,
      currentIndex: -1
    });

    PlantDataService.findByCommonName(this.state.searchCommonName)
      .then(response => {
        this.setState({
          plants: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchCommonName, plants, currentPlant, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Search by Common Name"
              value={searchCommonName}
              onChange={this.onChangeSearchCommonName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCommonName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Plants List</h4>

          <ul className="list-group">
            {plants &&
              plants.map((plant, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePlant(plant, index)}
                  key={index}
                >
                  {plant.commonName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPlants}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPlant ? (
              <div>
                <h4>Plant</h4>
                <div>
                  <label>
                    <strong>Common Name:</strong>
                  </label>{" "}
                  {currentPlant.commonName}
                </div>
                <div>
                  <label>
                    <strong>Scientific Name:</strong>
                  </label>{" "}
                  {currentPlant.scientificName}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentPlant.isTrailing ? "Trailing" : "Not Trailing"}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentPlant.flowering ? "Flowering" : "Not Flowering"}
                </div>

                <Link
                    to={"/plants/" + currentPlant.id}
                    className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
          ) : (
              <div>
                <br/>
                <p>Please click on a plant...</p>
              </div>
          )}
        </div>
      </div>
    );
  }
}
