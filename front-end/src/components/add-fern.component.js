import React, { Component } from "react";
import PlantDataService from "../services/plant.service";

export default class AddFern extends Component {
    constructor(props) {
        super(props);
        this.onChangeCommonName = this.onChangeCommonName.bind(this);
        this.onChangeScientificName = this.onChangeScientificName.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.saveFern = this.saveFern.bind(this);
        this.newFern = this.newFern.bind(this);

        this.state = {
            id: null,
            commonName: "",
            scientificName: "",
            roomId: "",
            rooms: [],
            isTrailing: false,
            flowering: false,
            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveRooms();
    }

    retrieveRooms() {
        PlantDataService.getRooms()
            .then(response => {
                this.setState({ rooms: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeCommonName(e) {
        this.setState({ commonName: e.target.value });
    }

    onChangeScientificName(e) {
        this.setState({ scientificName: e.target.value });
    }

    onChangeRoom(e) {
        this.setState({ roomId: e.target.value });
    }

    saveFern() {
        let data = {
            commonName: this.state.commonName,
            scientificName: this.state.scientificName,
            isTrailing: this.state.isTrailing,
            room: this.state.roomId ? { id: this.state.roomId } : null
        };

        PlantDataService.createFern(data)
            .then(response => {
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
                console.log(e);
            });
    }

    newFern() {
        this.setState({
            id: null,
            commonName: "",
            scientificName: "",
            roomId: "",
            isTrailing: false,
            flowering: false,
            submitted: false
        });
    }

    render() {
        const { commonName, scientificName, roomId, rooms, submitted } = this.state;

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newFern}>
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
                                value={commonName}
                                onChange={this.onChangeCommonName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="scientificName">Scientific Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="scientificName"
                                required
                                value={scientificName}
                                onChange={this.onChangeScientificName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="room">Room</label>
                            <select
                                className="form-control"
                                id="room"
                                value={roomId}
                                onChange={this.onChangeRoom}
                            >
                                <option value="">(No Room)</option>
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={this.saveFern} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
