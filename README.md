Overview
This application is a Plant Collection Manager built with React on the frontend and a Spring Boot backend. It allows you to:

* View all plants, either in a list or individually
* Create new plants (including specialized ones like Cactus or Fern)
* Edit or Delete existing plants
* Upload plant data from CSV or JSON files
* Assign plants to rooms and view plants by room
* Visualize key statistics (Trailing vs. Non-Trailing, Flowering vs. Non-Flowering, etc.) on a Dashboard


Prerequisites
1. Node.js & npm (or Yarn):
   * [Node.js Download](https://nodejs.org/en)
2. Java 17+
3. Maven
   * [Maven Download](https://maven.apache.org/download.cgi)

Clone the repository:

git clone https://github.com/YourUsername/plant-collection-manager.git
cd plant-collection-manager


Backend Setup:
1. Update database credentials in application.properties
2. Run: mvn clean install mvn spring-boot:run
3. Confirm the backend is running at http://localhost:8080

Frontend Setup:
1. Navigate to frontend folder
2. Run: npm install
3. Run: npm start
4. http://localhost:3000

Additional:
If you want to change the contents of the test data, navigate to plants.csv or plants.json in src/main/resources
