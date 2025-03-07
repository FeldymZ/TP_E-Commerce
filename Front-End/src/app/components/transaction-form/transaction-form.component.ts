import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // 🔥 Ajoute CommonModule ici !
import { TransactionService, MoneticoTransaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule, CommonModule],   // ✅ CommonModule ajouté !
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {

  transaction: Partial<MoneticoTransaction> = {};
  monnaies = ['Fcfa', 'Dollar', 'Euro', 'Yuan'];  // ✅ Liste des devises

  @Output() transactionAdded = new EventEmitter<void>();

  constructor(private transactionService: TransactionService) {}

  onSubmit(): void {
    this.transactionService.createTransaction(this.transaction as MoneticoTransaction).subscribe(() => {
      alert('Transaction enregistrée avec succès !');
      this.transactionAdded.emit();
    }, error => {
      alert('Erreur lors de l\'enregistrement de la transaction');
    });
  }
}
