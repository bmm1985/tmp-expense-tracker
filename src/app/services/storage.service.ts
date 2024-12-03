import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageKey: string = 'transactions';

  loadTransactions(): Transaction[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTransactions(transactions: Transaction[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(transactions));
  }
}
