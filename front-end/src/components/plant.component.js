import React, {Component} from "react";
import PlantDataService from "../services/plant.service";
import {withRouter} from '../common/with-router';

class Plant extends Component {
    constructor(props) {
        super(props);
        this.onChangeCommonName = this.onChangeCommonName.bind(this);
        this.onChangeScientificName = this.onChangeScientificName.bind(this);
        this.getPlant = this.getPlant.bind(this);
        this.updatePlant = this.updatePlant.bind(this);
        this.deletePlant = this.deletePlant.bind(this);

        this.state = {
            currentPlant: {
                id: null,
                commonName: "",
                scientificName: "",
                isTrailing: false,
                flowering: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getPlant(this.props.router.params.id);
    }

    onChangeCommonName(e) {
        const commonName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentPlant: {
                    ...prevState.currentPlant,
                    commonName: commonName
                }
            };
        });
    }

    onChangeScientificName(e) {
        const scientificName = e.target.value;

        this.setState(prevState => ({
            currentPlant: {
                ...prevState.currentPlant,
                scientificName: scientificName
            }
        }));
    }

    getPlant(id) {
        PlantDataService.get(id)
            .then(response => {
                this.setState({
                    currentPlant: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateIsTrailing(status) {
        var data = {
            id: this.state.currentPlant.id,
            commonName: this.state.currentPlant.commonName,
            scientificName: this.state.currentPlant.scientificName,
            isTrailing: status,
            flowering: this.state.currentPlant.flowering
        };

        PlantDataService.update(this.state.currentPlant.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentPlant: {
                        ...prevState.currentPlant,
                        isTrailing: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateFlowering(status) {
        var data = {
            id: this.state.currentPlant.id,
            commonName: this.state.currentPlant.commonName,
            scientificName: this.state.currentPlant.scientificName,
            isTrailing: this.state.currentPlant.isTrailing,
            flowering: status
        };

        PlantDataService.update(this.state.currentPlant.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentPlant: {
                        ...prevState.currentPlant,
                        flowering: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePlant() {
        PlantDataService.update(
            this.state.currentPlant.id,
            this.state.currentPlant
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The plant was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deletePlant() {
        PlantDataService.delete(this.state.currentPlant.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/plants');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentPlant} = this.state;

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
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentPlant.isTrailing ? "Trailing" : "Not Trailing"}
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentPlant.flowering ? "Flowering" : "Not Flowering"}
                            </div>
                        </form>

                        {
                            currentPlant.isTrailing ? (
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

                        {
                            currentPlant.flowering ? (
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
                        <br/>
                        <p>Please click on a plant...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Plant);