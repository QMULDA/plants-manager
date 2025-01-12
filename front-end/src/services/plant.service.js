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
}

export default new PlantDataService();