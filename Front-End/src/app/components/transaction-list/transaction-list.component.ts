import { Component, OnInit } from '@angular/core';
import { TransactionService, MoneticoTransaction } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';  // ✅ Import obligatoire pour *ngFor

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  imports: [CommonModule]  // ✅ Ajoute CommonModule ici !
})
export class TransactionListComponent implements OnInit {

  transactions: MoneticoTransaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(data => {
      this.transactions = data;
    }, error => {
      console.error('Erreur lors de la récupération des transactions', error);
    });
  }

  maskPan(pan: string): string {
    if (pan.length < 16) {
      return pan; // Cas extrême de sécurité
    }
    return pan.substring(0, 4) + ' XXXX XXXX ' + pan.substring(12);
  }
}
