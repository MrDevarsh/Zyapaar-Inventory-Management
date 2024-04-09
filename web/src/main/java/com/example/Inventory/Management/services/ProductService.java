package com.example.Inventory.Management.services;

import com.example.Inventory.Management.dto.ProductDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    ResponseEntity<List<ProductDto>> getAllProducts();

    ResponseEntity<ProductDto> getProductById(Long id);

    void addProduct(ProductDto prod);

    void deleteProduct(Long id);
}
