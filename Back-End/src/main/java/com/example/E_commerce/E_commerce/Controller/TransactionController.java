package com.example.E_commerce.E_commerce.Controller;

import com.example.E_commerce.E_commerce.Entity.MoneticoTransaction;
import com.example.E_commerce.E_commerce.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public MoneticoTransaction saveTransaction(@RequestBody MoneticoTransaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

    @GetMapping
    public List<MoneticoTransaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
}
