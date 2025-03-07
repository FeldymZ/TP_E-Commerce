package com.example.E_commerce.E_commerce.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "MONETICO_TRANSACTIONS")
@Data  // Annotation Lombok pour les getters/setters/toString/equals/hashCode
public class MoneticoTransaction {

    @Id
    private String idTrx;

    private LocalDate dateTrx;
    private LocalTime heureTrx;
    private String origineTrx;
    private String moyen;

    private String numpan;    // Chiffré en BDD
    private String datefin;   // Chiffré en BDD
    private String cvx;       // Chiffré en BDD

    private BigDecimal montant;
    private String devise;
    private String banqueAcq;
    private String banqueEmt;
    private String scheme;
    private String typeProduit;
}
