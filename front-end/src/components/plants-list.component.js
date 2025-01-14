import React, { Component } from "react";
import PlantDataService from "../services/plant.service";
import { Link } from "react-router-dom";

export default class PlantsList extends Component {
    constructor(props) {
        super(props);

        this.importCsv = this.importCsv.bind(this);
        this.importJson = this.importJson.bind(this);
        this.onChangeSearchCommonName = this.onChangeSearchCommonName.bind(this);
        this.retrieveAllPlants = this.retrieveAllPlants.bind(this);
        this.retrieveRooms = this.retrieveRooms.bind(this);
        this.retrievePlantsByRoom = this.retrievePlantsByRoom.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePlant = this.setActivePlant.bind(this);
        this.removeAllPlants = this.removeAllPlants.bind(this);
        this.searchCommonName = this.searchCommonName.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.updatePlantRoom = this.updatePlantRoom.bind(this);

        this.state = {
            rooms: [],
            selectedRoomId: null,
            plants: [],
            currentPlant: null,
            currentIndex: -1,
            searchCommonName: ""
        };
    }

    componentDidMount() {
        this.retrieveAllPlants();
        this.retrieveRooms();
    }

    updatePlantRoom(newRoomId) {
        if (!this.state.currentPlant) return;

        const updatedPlant = {
            ...this.state.currentPlant,
            room: newRoomId ? { id: newRoomId } : null
        };

        PlantDataService.update(this.state.currentPlant.id, updatedPlant)
            .then(response => {
                this.setState({ currentPlant: response.data });
                console.log("Room updated ->", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveAllPlants() {
        PlantDataService.getAll()
            .then((response) => {
                this.setState({
                    plants: response.data,
                    selectedRoomId: null
                });
                console.log("All plants:", response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    retrieveRooms() {
        PlantDataService.getRooms()
            .then((response) => {
                this.setState({
                    rooms: response.data
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    retrievePlantsByRoom(roomId) {
        PlantDataService.getPlantsByRoom(roomId)
            .then((response) => {
                this.setState({
                    plants: response.data
                });
                console.log(`Plants in room ${roomId}:`, response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handleRoomChange(e) {
        const chosenRoomId = e.target.value;
        this.setState({ selectedRoomId: chosenRoomId, currentPlant: null, currentIndex: -1 });

        if (!chosenRoomId) {
            this.retrieveAllPlants();
        } else {
            this.retrievePlantsByRoom(chosenRoomId);
        }
    }

    importCsv() {
        PlantDataService.importCsv()
            .then((response) => {
                alert("CSV data imported successfully");
                this.retrieveAllPlants();
            })
            .catch((e) => {
                console.log(e);
                alert("Failed to import CSV data");
            });
    }

    importJson() {
        PlantDataService.importJson()
            .then((response) => {
                alert("JSON data imported successfully");
                this.retrieveAllPlants();
            })
            .catch((e) => {
                console.log(e);
                alert("Failed to import JSON data");
            });
    }

    onChangeSearchCommonName(e) {
        const searchCommonName = e.target.value;
        this.setState({
            searchCommonName: searchCommonName
        });
    }

    searchCommonName() {
        this.setState({
            currentPlant: null,
            currentIndex: -1
        });

        PlantDataService.findByCommonName(this.state.searchCommonName)
            .then((response) => {
                this.setState({
                    plants: response.data
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        if (this.state.selectedRoomId) {
            this.retrievePlantsByRoom(this.state.selectedRoomId);
        } else {
            this.retrieveAllPlants();
        }

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
            .then((response) => {
                console.log(response.data);
                this.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { plants, rooms, currentPlant, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <button
                        className="btn btn-primary m-2"
                        onClick={this.importCsv}
                    >
                        Import CSV
                    </button>
                    <button
                        className="btn btn-secondary m-2"
                        onClick={this.importJson}
                    >
                        Import JSON
                    </button>
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
                                <label><strong>Common Name:</strong></label>{" "}
                                {currentPlant.commonName}
                            </div>
                            <div>
                                <label><strong>Scientific Name:</strong></label>{" "}
                                {currentPlant.scientificName}
                            </div>
                            <div>
                                <label><strong>Status:</strong></label>{" "}
                                {currentPlant.isTrailing ? "Trailing" : "Not Trailing"}
                            </div>
                            <div>
                                <label><strong>Status:</strong></label>{" "}
                                {currentPlant.flowering ? "Flowering" : "Not Flowering"}
                            </div>
                            <div>
                                <label><strong>Room:</strong></label>{" "}
                                {currentPlant.room ? currentPlant.room.name : "(No Room)"}
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