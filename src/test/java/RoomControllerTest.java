import com.spring.datajpa.SpringBootDataJpaApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SpringBootDataJpaApplication.class)
@AutoConfigureMockMvc
class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateRoom() throws Exception {
        String roomJson = """
          {
            "name": "TestRoom"
          }
        """;
        mockMvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(roomJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("TestRoom"));
    }

    @Test
    void testGetPlantsByRoom() throws Exception {
        mockMvc.perform(get("/api/rooms/1/plants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testCreateCactus() throws Exception {
        String cactusJson = """
    {
      "commonName": "Dragon fruit",
      "scientificName": "Selenicereus undatus",
      "flowering": true
    }
    """;
        mockMvc.perform(post("/api/cactus")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(cactusJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.commonName").value("Dragon fruit"));
    }


}
