import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public balance: number = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.transactionService.balance$.pipe(takeUntil(this.destroy$)).subscribe(balance => {
      this.balance = balance;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
