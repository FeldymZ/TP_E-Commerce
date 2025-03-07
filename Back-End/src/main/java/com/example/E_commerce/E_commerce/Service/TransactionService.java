package com.example.E_commerce.E_commerce.Service;

import com.example.E_commerce.E_commerce.Entity.MoneticoTransaction;
import com.example.E_commerce.E_commerce.Repository.MoneticoTransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class TransactionService {

    private final MoneticoTransactionRepository repository;
    private final EncryptionService encryptionService;

    public TransactionService(MoneticoTransactionRepository repository, EncryptionService encryptionService) {
        this.repository = repository;
        this.encryptionService = encryptionService;
    }

    public MoneticoTransaction saveTransaction(MoneticoTransaction trx) {
        trx.setIdTrx(generateTransactionId());
        trx.setDateTrx(LocalDate.now());
        trx.setHeureTrx(LocalTime.now());

        try {
            trx.setNumpan(encryptionService.encrypt(trx.getNumpan()));
            trx.setDatefin(encryptionService.encrypt(trx.getDatefin()));
            trx.setCvx(encryptionService.encrypt(trx.getCvx()));
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du chiffrement des données sensibles", e);
        }

        return repository.save(trx);
    }

    public List<MoneticoTransaction> getAllTransactions() {
        List<MoneticoTransaction> transactions = repository.findAll();
        transactions.forEach(trx -> {
            try {
                trx.setNumpan(encryptionService.decrypt(trx.getNumpan()));
                trx.setDatefin(encryptionService.decrypt(trx.getDatefin()));
                trx.setCvx(encryptionService.decrypt(trx.getCvx()));
            } catch (Exception e) {
                throw new RuntimeException("Erreur lors du déchiffrement des données sensibles", e);
            }
        });
        return transactions;
    }

    private String generateTransactionId() {
        return "TRX" + System.currentTimeMillis();
    }
}
