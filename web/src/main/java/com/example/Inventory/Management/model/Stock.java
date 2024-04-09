package com.example.Inventory.Management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "product_stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sid")
    private Long id;

    @Column(name = "qty")
    private Long qty;

    @OneToOne
    @JoinColumn(name = "pid")
    private Products productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQty() {
        return qty;
    }

    public void setQty(Long qty) {
        this.qty = qty;
    }

    public Products getProductId() {
        return productId;
    }

    public void setProductId(Products productId) {
        this.productId = productId;
    }
}
