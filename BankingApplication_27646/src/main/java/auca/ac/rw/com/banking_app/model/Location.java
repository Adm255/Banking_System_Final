package auca.ac.rw.com.banking_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code; // e.g., "KGL"

    @Enumerated(EnumType.STRING)
    private ELocation type; // Province, District, etc.

    // PARENT: The location above this one (e.g., Gasabo -> Kigali)
    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonIgnore // Stops infinite loops when fetching data
    private Location parent;

    // CHILDREN: The locations below this one (e.g., Kigali -> Gasabo, Kicukiro)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Location> children = new ArrayList<>();
}