package com.example.Inventory.Management.services.impl;

import com.example.Inventory.Management.dao.ProductDao;
import com.example.Inventory.Management.dao.StockDao;
import com.example.Inventory.Management.dto.StockDto;
import com.example.Inventory.Management.model.Products;
import com.example.Inventory.Management.model.Stock;
import com.example.Inventory.Management.services.StockService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class StockServiceImpl implements StockService {

    @Autowired
    StockDao stockDao;

    @Autowired
    ProductDao productDao;

    @Override
    public void updateProductStock(StockDto dto) {

        Optional<Products> prod = productDao.findById(dto.getProductId());

        Stock stock = prod.get().getStock();

        stock.setQty(dto.getQty());

        stockDao.save(stock);

    }
}
