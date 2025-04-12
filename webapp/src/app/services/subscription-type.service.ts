import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { SubscriptionType } from '../models/subscription-type.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypeService extends BaseService<SubscriptionType> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.SUBSCRIPTION_TYPE,
    );
  }

  


}