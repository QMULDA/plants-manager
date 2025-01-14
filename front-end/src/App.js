import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPlant from "./components/add-plant.component";
import AddCactus from "./components/add-cactus.component";
import Plant from "./components/plant.component";
import PlantsList from "./components/plants-list.component";
import Dashboard from "./components/dashboard";
import AddFern from "./components/add-fern.component";
import RoomsList from "./components/rooms-list.component";
import AddRoom from "./components/add-room.component";

class App extends Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/plants"} className="navbar-brand">
              Victoria Saprykina
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/plants"} className="nav-link">
                  Plants
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addCactus"} className="nav-link">
                  Add Cactus
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addFern"} className="nav-link">
                  Add Fern
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/rooms"} className="nav-link">
                  Rooms
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addRoom"} className="nav-link">
                  Add Room
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/plants" element={<PlantsList/>}/>
              <Route path="/plants/:id" element={<Plant />} />
              <Route path="/add" element={<AddPlant />} />
              <Route path="/addCactus" element={<AddCactus />} />
              <Route path="/addFern" element={<AddFern />} />
              <Route path="/" element={<RoomsList />} />
              <Route path="/rooms" element={<RoomsList />} />
              <Route path="/addRoom" element={<AddRoom />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
    );
  }
}

export default App;