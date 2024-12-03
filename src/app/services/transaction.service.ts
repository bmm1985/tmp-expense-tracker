import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactions$ = this.transactionsSubject.asObservable();

  private balanceSubject = new BehaviorSubject<number>(0);
  public balance$ = this.balanceSubject.asObservable();

  constructor(
    private storageService: StorageService
  ) {
    this.loadTransactions();
    this.updateBalance();
  }

  addTransaction(transaction: Transaction) {
    if (transaction.type === 'expense') {
      transaction.amount = -Math.abs(transaction.amount);
    }

    transaction.id = new Date().getTime();

    const updatedTransactions = [...this.transactionsSubject.value, transaction];
    this.transactionsSubject.next(updatedTransactions);
    this.saveTransactions();

    this.updateBalance();
  }

  deleteTransaction(id: number) {
    const updatedTransactions = this.transactionsSubject.value.filter(t => t.id !== id);

    this.transactionsSubject.next(updatedTransactions);
    this.saveTransactions();

    this.updateBalance();
  }

  private loadTransactions() {
    this.transactionsSubject.next(this.storageService.loadTransactions());
  }

  private saveTransactions() {
    this.storageService.saveTransactions(this.transactionsSubject.value);
  }

  private updateBalance() {
    let balance = 0;
    this.transactionsSubject.value.forEach(transaction => balance += transaction.amount);

    this.balanceSubject.next(balance);
  }
}
