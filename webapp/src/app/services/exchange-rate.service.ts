import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { ExchangeRate } from '../models/exchange-rate.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService extends BaseService<ExchangeRate> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.LISTING,
    );
  }

  


}
