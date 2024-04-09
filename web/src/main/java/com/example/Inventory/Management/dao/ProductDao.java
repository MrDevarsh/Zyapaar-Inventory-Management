package com.example.Inventory.Management.dao;

import com.example.Inventory.Management.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDao extends JpaRepository<Products, Long> {
}
