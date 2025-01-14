import http from "../http-common";

class PlantDataService {
  getAll() {
    return http.get("/plants");
  }

  get(id) {
    return http.get(`/plants/${id}`);
  }

  create(data) {
    return http.post("/plants", data);
  }

  importCsv() {
    return http.post("/import-csv");
  }

  importJson() {
    return http.post("/import-json");
  }

  createCactus(data) {
    return http.post("/cactus", data);
  }

  createFern(data) {
    return http.post("/fern", data);
  }

  getCountTrailingPlants() {
    return http.get("/trailing");
  }

  getCountFloweringPlants() {
    return http.get("/flowering");
  }

  update(id, data) {
    return http.put(`/plants/${id}`, data);
  }

  delete(id) {
    return http.delete(`/plants/${id}`);
  }

  deleteAll() {
    return http.delete(`/plants`);
  }

  findByCommonName(commonName) {
    return http.get(`/plants?commonName=${commonName}`);
  }

  getRooms() {
    return http.get("/rooms");
  }

  getPlantsByRoom(roomId) {
    return http.get(`/rooms/${roomId}/plants`);
  }

  getAllRooms() {
    return http.get("/rooms");
  }

  createRoom(data) {
    return http.post("/rooms", data);
  }

  deleteRoom(id) {
    return http.delete(`/rooms/${id}`);
  }

}

export default new PlantDataService();