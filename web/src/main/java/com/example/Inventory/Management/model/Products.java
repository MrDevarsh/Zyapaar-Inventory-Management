package com.example.Inventory.Management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "product_details")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid")
    private Long id;

    @Column(name = "pname")
    private String name;

    @Column(name = "pprice")
    private Long price;

    @Column(name = "pdescription")
    private String description;

    @OneToOne
    @JoinColumn(name = "pstock")
    private Stock stock;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }
}
