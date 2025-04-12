import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { Transaction } from '../models/transaction.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.TRANSACTION,
    );
  }

  


}
