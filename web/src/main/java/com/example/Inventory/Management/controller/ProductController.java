package com.example.Inventory.Management.controller;

import com.example.Inventory.Management.dto.ProductDto;
import com.example.Inventory.Management.dto.StockDto;
import com.example.Inventory.Management.services.ProductService;
import com.example.Inventory.Management.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    StockService stockService;

    @GetMapping(path = "/getProducts")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return productService.getAllProducts();
    }


    @GetMapping(path = "/product")
    public ResponseEntity<ProductDto> getProductById(
            @RequestParam("id") Long id
    ) {
        return productService.getProductById(id);
    }

    @PostMapping(path = "/product")
    public ResponseEntity<String> addProduct(
            @RequestBody ProductDto prod
    ) {
        if (prod == null) {
            return ResponseEntity.badRequest().body("Product name cannot be empty");
        }

        try {
            productService.addProduct(prod);
            return ResponseEntity.ok("Product added successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to add product: " + e.getMessage());
        }
    }

    @PutMapping(path = "/updateStock")
    public ResponseEntity<String> updateProductStock(
            @RequestBody StockDto dto
    ) {
        try {
            stockService.updateProductStock(dto);
            return ResponseEntity.ok("Product Stock Updated successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to update product: " + e.getMessage());
        }
    }

}
