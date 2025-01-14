import com.jayway.jsonpath.JsonPath;
import com.spring.datajpa.SpringBootDataJpaApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = SpringBootDataJpaApplication.class)
@AutoConfigureMockMvc
class PlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetAllPlants() throws Exception {
        mockMvc.perform(get("/api/plants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testCreatePlantSuccess() throws Exception {
        String jsonPayload = """
            {
              "commonName": "String of Pearls",
              "scientificName": "Senecio rowleyanus",
              "isTrailing": true,
              "flowering": false
            }
        """;

        mockMvc.perform(post("/api/plants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.commonName").value("String of Pearls"));
    }

    @Test
    void testUpdatePlantNotFound() throws Exception {
        String jsonPayload = """
       {
         "commonName": "UpdatedName",
         "scientificName": "UpdatedSci",
         "isTrailing": true,
         "flowering": false
       }
    """;
        mockMvc.perform(put("/api/plants/9999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeletePlant() throws Exception {
        String newPlant = """
        {
          "commonName": "TempDeletion",
          "scientificName": "Temp Delete",
          "isTrailing": false,
          "flowering": false
        }
    """;
        MvcResult result = mockMvc.perform(post("/api/plants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newPlant))
                .andExpect(status().isCreated())
                .andReturn();

        String content = result.getResponse().getContentAsString();
        long newId = JsonPath.parse(content).read("$.id", Long.class);

        mockMvc.perform(delete("/api/plants/" + newId))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/plants/" + newId))
                .andExpect(status().isNotFound());
    }

    @Test
    void testImportCsv() throws Exception {
        mockMvc.perform(post("/api/import-csv"))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("CSV import successful")));
    }


}
