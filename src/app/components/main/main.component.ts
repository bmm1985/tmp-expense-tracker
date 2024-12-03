import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public form: FormGroup;

  public transactionTypes = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' }
  ];

  public categories = [
    { name: 'Groceries', value: 'groceries' },
    { name: 'Salary', value: 'salary' },
    { name: 'Entertainment', value: 'entertainment' }
  ];

  constructor(
    private transactionService: TransactionService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required]),
      transactionType: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      date: new FormControl(new Date().toISOString().substring(0, 10), Validators.required)
    });
  }

  addTransaction() {
    if (this.form.valid) {
      const newTransaction: Transaction = {
        id: 0,
        title: this.form.value.name,
        amount: this.form.value.amount,
        type: this.form.value.transactionType,
        category: this.form.value.category,
        date: new Date(this.form.value.date)
      };

      this.transactionService.addTransaction(newTransaction);

      this.form.reset({
        type: 'income',
        date: new Date().toISOString().substring(0, 10)
      });
    }
  }
}
