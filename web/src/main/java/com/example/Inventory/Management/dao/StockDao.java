package com.example.Inventory.Management.dao;

import com.example.Inventory.Management.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockDao extends JpaRepository<Stock, Long> {

}
