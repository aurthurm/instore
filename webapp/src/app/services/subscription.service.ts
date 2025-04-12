import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { API_URL } from '../constants/api.urls';
import { IServerResponse } from '../models/server-response';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService<Subscription> {
  constructor(http:HttpClient) {
    super(
      http,API_URL.SUBSCRIPTION,
    );
  }

  getActiveSubscription(id:any) : Observable<IServerResponse<Subscription>>{
    return this.http.get<IServerResponse<Subscription>>(`${this.baseUrl}/${API_URL.SUBSCRIPTION}/active-subscription/${id}`);
  }

}
