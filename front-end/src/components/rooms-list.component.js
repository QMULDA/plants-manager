import React, { Component } from "react";
import PlantDataService from "../services/plant.service";
import { Link } from "react-router-dom";

export default class RoomsList extends Component {
    constructor(props) {
        super(props);

        this.retrieveRooms = this.retrieveRooms.bind(this);
        this.setActiveRoom = this.setActiveRoom.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
        this.refreshRooms = this.refreshRooms.bind(this);
        this.getPlantsByRoom = this.getPlantsByRoom.bind(this);

        this.state = {
            rooms: [],
            currentRoom: null,
            currentIndex: -1,
            plants: [],
            currentPlant: null,
            message: ""
        };
    }

    componentDidMount() {
        this.retrieveRooms();
    }

    retrieveRooms() {
        PlantDataService.getAllRooms()
            .then(response => {
                this.setState({
                    rooms: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActiveRoom(room, index) {
        this.setState({
            currentRoom: room,
            currentIndex: index
        });
        this.getPlantsByRoom(room.id);
    }

    getPlantsByRoom(roomId) {
        PlantDataService.getPlantsByRoom(roomId)
            .then(response => {
                this.setState({
                    plants: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshRooms() {
        this.retrieveRooms();
        this.setState({
            currentRoom: null,
            currentIndex: -1,
            plants: []
        });
    }

    removeRoom() {
        if (!this.state.currentRoom) return;
        PlantDataService.deleteRoom(this.state.currentRoom.id)
            .then(response => {
                console.log(response.data);
                this.refreshRooms();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { rooms, currentRoom, currentIndex, plants } = this.state;

        return (
            <div className="list row">
                {/* ROOMS LIST */}
                <div className="col-md-6">
                    <h4>Rooms List</h4>
                    <ul className="list-group">
                        {rooms &&
                            rooms.map((room, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveRoom(room, index)}
                                    key={index}
                                >
                                    {room.name}
                                </li>
                            ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeRoom}
                    >
                        Remove Selected Room
                    </button>
                </div>

                {/* PLANTS IN SELECTED ROOM */}
                <div className="col-md-6">
                    {currentRoom ? (
                        <div>
                            <h4>Plants in Room: {currentRoom.name}</h4>
                            {plants && plants.length > 0 ? (
                                <ul className="list-group">
                                    {plants.map((plant, index) => (
                                        <li className="list-group-item" key={index}>
                                            {plant.commonName} —{" "}
                                            <Link to={"/plants/" + plant.id} className="badge badge-warning">
                                                Details
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div>No plants in this room.</div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Room...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
