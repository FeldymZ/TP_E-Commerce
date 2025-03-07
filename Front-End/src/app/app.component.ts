import { Component } from '@angular/core';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionListComponent, TransactionFormComponent],
  template: `
    <h1>Application E-commerce</h1>
    <app-transaction-form (transactionAdded)="refreshTransactions()"></app-transaction-form>
    <app-transaction-list #transactionList></app-transaction-list>
  `
})
export class AppComponent {
  refreshTransactions() {
    const transactionList = document.querySelector('app-transaction-list');
    (transactionList as any)?.component?.loadTransactions();  // méthode pour recharger la liste
  }
}
