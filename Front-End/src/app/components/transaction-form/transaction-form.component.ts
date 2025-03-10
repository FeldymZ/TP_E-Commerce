import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService, MoneticoTransaction } from '../../services/transaction.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {

  transaction: Partial<MoneticoTransaction> = {};
  monnaies = ['Fcfa', 'Dollar', 'Euro', 'Yuan'];

  @Output() transactionAdded = new EventEmitter<void>();  // 🔥 Événement pour notifier l'ajout

  constructor(private transactionService: TransactionService) {}

  onSubmit(): void {
    this.transactionService.createTransaction(this.transaction as MoneticoTransaction)
      .pipe(
        tap(() => {
          alert('✅ Transaction enregistrée avec succès !');
          this.transactionAdded.emit();  // 🔥 Émet un événement pour mettre à jour la liste
        }),
        catchError(error => {
          alert('❌ Erreur lors de l\'enregistrement de la transaction.');
          console.error('Erreur API :', error);
          return of(null); // Évite que l'application plante
        })
      )
      .subscribe();
  }
}
