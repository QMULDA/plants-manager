import React, { Component } from "react";
import PlantDataService from "../services/plant.service";
import { withRouter } from "../common/with-router";

class Plant extends Component {
    constructor(props) {
        super(props);
        this.onChangeCommonName = this.onChangeCommonName.bind(this);
        this.onChangeScientificName = this.onChangeScientificName.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.getPlant = this.getPlant.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.updatePlant = this.updatePlant.bind(this);
        this.deletePlant = this.deletePlant.bind(this);

        this.state = {
            currentPlant: {
                id: null,
                commonName: "",
                scientificName: "",
                isTrailing: false,
                flowering: false,
                room: null,
            },
            rooms: [],
            message: ""
        };
    }

    componentDidMount() {
        this.getPlant(this.props.router.params.id);
        this.getRooms();
    }

    getPlant(id) {
        PlantDataService.get(id)
            .then((response) => {
                this.setState({
                    currentPlant: response.data
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getRooms() {
        PlantDataService.getRooms()
            .then((response) => {
                this.setState({ rooms: response.data });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    onChangeCommonName(e) {
        const commonName = e.target.value;
        this.setState((prevState) => ({
            currentPlant: {
                ...prevState.currentPlant,
                commonName: commonName
            }
        }));
    }

    onChangeScientificName(e) {
        const scientificName = e.target.value;
        this.setState((prevState) => ({
            currentPlant: {
                ...prevState.currentPlant,
                scientificName: scientificName
            }
        }));
    }

    onChangeRoom(e) {
        const newRoomId = e.target.value;
        const newRoomObject = newRoomId ? { id: parseInt(newRoomId) } : null;
        this.setState((prevState) => ({
            currentPlant: {
                ...prevState.currentPlant,
                room: newRoomObject
            }
        }));
    }

    updatePlant() {
        PlantDataService.update(this.state.currentPlant.id, this.state.currentPlant)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    message: "The plant was updated successfully!"
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deletePlant() {
        PlantDataService.delete(this.state.currentPlant.id)
            .then((response) => {
                console.log(response.data);
                this.props.router.navigate("/plants");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentPlant, rooms } = this.state;

        return (
            <div>
                {currentPlant ? (
                    <div className="edit-form">
                        <h4>Plant</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="commonName">Common Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="commonName"
                                    value={currentPlant.commonName}
                                    onChange={this.onChangeCommonName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="scientificName">Scientific Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="scientificName"
                                    value={currentPlant.scientificName}
                                    onChange={this.onChangeScientificName}
                                />
                            </div>

                            <div className="form-group">
                                <label>Room</label>
                                <select
                                    className="form-control"
                                    value={currentPlant.room ? currentPlant.room.id : ""}
                                    onChange={this.onChangeRoom}
                                >
                                    <option value="">(No Room)</option>
                                    {rooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>

                        <div className="form-group">
                            <label>
                                <strong>Trailing Status:</strong>
                            </label>{" "}
                            {currentPlant.isTrailing ? "Trailing" : "Not Trailing"}
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Flowering Status:</strong>
                            </label>{" "}
                            {currentPlant.flowering ? "Flowering" : "Not Flowering"}
                        </div>

                        {currentPlant.isTrailing ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateIsTrailing(false)}
                            >
                                Not Trailing
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateIsTrailing(true)}
                            >
                                Trailing
                            </button>
                        )}

                        {currentPlant.flowering ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateFlowering(false)}
                            >
                                Not Flowering
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateFlowering(true)}
                            >
                                Flowering
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deletePlant}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updatePlant}
                        >
                            Update
                        </button>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a plant...</p>
                    </div>
                )}
            </div>
        );
    }

    updateIsTrailing(status) {
        const data = {
            ...this.state.currentPlant,
            isTrailing: status
        };
        PlantDataService.update(data.id, data)
            .then((response) => {
                this.setState({ currentPlant: response.data });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateFlowering(status) {
        const data = {
            ...this.state.currentPlant,
            flowering: status
        };
        PlantDataService.update(data.id, data)
            .then((response) => {
                this.setState({ currentPlant: response.data });
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export default withRouter(Plant);
