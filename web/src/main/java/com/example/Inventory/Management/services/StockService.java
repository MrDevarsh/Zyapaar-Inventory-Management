package com.example.Inventory.Management.services;

import com.example.Inventory.Management.dto.StockDto;
import org.springframework.http.ResponseEntity;

public interface StockService {
    void updateProductStock(StockDto sto);
}
