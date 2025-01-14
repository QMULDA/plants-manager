import React, { Component } from "react";
import PlantDataService from "../services/plant.service";

export default class AddRoom extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveRoom = this.saveRoom.bind(this);
        this.newRoom = this.newRoom.bind(this);

        this.state = {
            id: null,
            name: "",
            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    saveRoom() {
        let data = {
            name: this.state.name
        };

        PlantDataService.createRoom(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newRoom() {
        this.setState({
            id: null,
            name: "",
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Room added successfully!</h4>
                        <button className="btn btn-success" onClick={this.newRoom}>
                            Add Another
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <button onClick={this.saveRoom} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
