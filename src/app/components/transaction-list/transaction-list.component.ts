import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { Subject, takeUntil } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit, OnDestroy {
  public filterForm: FormGroup;

  private transactions: Transaction[] = [];
  public filteredTransactions: Transaction[] = [];

  private destroy$ = new Subject<void>();

  constructor(private transactionService: TransactionService) {
    this.filterForm = new FormGroup({
      type: new FormControl('All'),
      category: new FormControl('All')
    });
  }

  ngOnInit() {
    this.transactionService.transactions$.pipe(takeUntil(this.destroy$)).subscribe(transactions => {
      this.transactions = transactions;
      this.applyFilters();
    });

    this.filterForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(t => {
      return (this.filterForm.value.type === 'All' || t.type === this.filterForm.value.type) &&
        (this.filterForm.value.category === 'All' || t.category === this.filterForm.value.category);
    });
  }

  deleteTransaction(id: number) {
    this.transactionService.deleteTransaction(id);
  }
}
