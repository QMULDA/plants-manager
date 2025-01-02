import React, { Component } from "react";
import PlantDataService from "../services/plant.service";
import { withRouter } from '../common/with-router';

class Plant extends Component {
  constructor(props) {
    super(props);
    this.onChangeCommonName = this.onChangeCommonName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPlant = this.getPlant.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePlant = this.updatePlant.bind(this);
    this.deletePlant = this.deletePlant.bind(this);

    this.state = {
      currentPlant: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPlant(this.props.router.params.id);
  }

  onChangeCommonName(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPlant: {
          ...prevState.currentPlant,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentPlant: {
        ...prevState.currentPlant,
        description: description
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

  updatePublished(status) {
    var data = {
      id: this.state.currentPlant.id,
      title: this.state.currentPlant.title,
      description: this.state.currentPlant.description,
      published: status
    };

    PlantDataService.update(this.state.currentPlant.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPlant: {
            ...prevState.currentPlant,
            published: status
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
    const { currentPlant } = this.state;

    return (
      <div>
        {currentPlant ? (
          <div className="edit-form">
            <h4>Plant</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">CommonName</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPlant.title}
                  onChange={this.onChangeCommonName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPlant.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPlant.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPlant.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
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
            <p>Please click on a Plant...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Plant);