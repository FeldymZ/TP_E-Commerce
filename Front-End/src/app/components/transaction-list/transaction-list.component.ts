import { Component, OnInit } from '@angular/core';
import { TransactionService, MoneticoTransaction } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  imports: [CommonModule]
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

  /** Masque les 6 chiffres du milieu du PAN */
  maskPan(pan: string): string {
    if (!pan || pan.length < 16) {
      return pan; // Vérification pour éviter les erreurs si PAN trop court
    }
    return pan.substring(0, 6) + "******" + pan.substring(12);  // Masque les 6 chiffres du milieu
  }
}
