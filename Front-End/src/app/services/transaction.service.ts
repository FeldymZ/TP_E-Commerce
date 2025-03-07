import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MoneticoTransaction {
  idTrx: string;
  dateTrx: string;
  heureTrx: string;
  origineTrx: string;
  moyen: string;
  numpan: string;
  datefin: string;
  cvx: string;
  montant: number;
  devise: string;
  banqueAcq: string;
  banqueEmt: string;
  scheme: string;
  typeProduit: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8080/api/transactions';  // À adapter si nécessaire

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<MoneticoTransaction[]> {
    return this.http.get<MoneticoTransaction[]>('http://localhost:8080/api/transactions');
  }
  createTransaction(transaction: MoneticoTransaction) {
    return this.http.post('http://localhost:8080/api/transactions', transaction);
  }
  
  
}
