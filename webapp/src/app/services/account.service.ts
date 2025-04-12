import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { Account } from '../models/account.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<Account> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.ACCOUNT,
    );
  }

}
