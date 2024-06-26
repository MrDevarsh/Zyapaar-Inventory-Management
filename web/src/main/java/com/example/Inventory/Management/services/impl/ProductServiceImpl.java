package com.example.Inventory.Management.services.impl;

import com.example.Inventory.Management.dao.ProductDao;
import com.example.Inventory.Management.dao.StockDao;
import com.example.Inventory.Management.dto.ProductDto;
import com.example.Inventory.Management.mapper.ProductStockMapper;
import com.example.Inventory.Management.model.Products;
import com.example.Inventory.Management.model.Stock;
import com.example.Inventory.Management.services.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDao productDao;

    @Autowired
    StockDao stockDao;

    @Override
    public ResponseEntity<List<ProductDto>> getAllProducts() {

        List<Products> products = productDao.findAll();

        return ResponseEntity.ok().body(
                ProductStockMapper.convertMappersToDtos(products)
        );
    }

    @Override
    public ResponseEntity<ProductDto> getProductById(Long id) {
        Optional<Products> product = productDao.findById(id);

        return product.map(products -> ResponseEntity.ok().body(
                ProductStockMapper.convertMappertoDto(products)
        )).orElseGet(() -> ResponseEntity.internalServerError().body(null));


    }

    @Override
    public void addProduct(ProductDto dto) {
        Products prod = ProductStockMapper.convertDtotoMapper(dto);
        Stock stock = prod.getStock();

        productDao.save(prod);
        stockDao.save(stock);
    }

    @Override
    public void deleteProduct(Long id) {
        Optional<Products> prod = productDao.findById(id);

        Stock stock = prod.get().getStock();

        productDao.delete(prod.get());
        stockDao.delete(stock);

    }

    @Override
    public void updateProduct(ProductDto dto) {
        Optional<Products> existingProduct = productDao.findById(dto.getId());

        if (existingProduct.isPresent()) {
            Products product = existingProduct.get();

            product.setPrice(dto.getPrice());
            product.setDescription(dto.getDescription());

            Stock stock = product.getStock();

            stock.setQty(dto.getQty());

            productDao.save(product);
            stockDao.save(stock);
        }
    }

}
