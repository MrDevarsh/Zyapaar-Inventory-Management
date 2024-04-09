package com.example.Inventory.Management.mapper;

import com.example.Inventory.Management.dto.ProductDto;
import com.example.Inventory.Management.model.Products;
import com.example.Inventory.Management.model.Stock;

import java.util.List;
import java.util.stream.Collectors;

public class ProductStockMapper {

    public static Products convertDtotoMapper(ProductDto dto) {
        Products prod = new Products();
        Stock stock = new Stock();

        prod.setName(dto.getName());
        prod.setDescription(dto.getDescription());
        prod.setPrice(dto.getPrice());

        stock.setQty(dto.getQty());
        stock.setProductId(prod);
        prod.setStock(stock);

        return prod;
    }

    public static ProductDto convertMappertoDto(Products prod) {
        ProductDto dto = new ProductDto();

        dto.setDescription(prod.getDescription());
        dto.setName(prod.getName());
        dto.setPrice(prod.getPrice());
        dto.setQty(prod.getStock().getQty());

        return dto;
    }

    public static List<ProductDto> convertMappersToDtos(List<Products> prod) {
        return prod.stream()
                .map(ProductStockMapper::convertMappertoDto)
                .collect(Collectors.toList());
    }

}
