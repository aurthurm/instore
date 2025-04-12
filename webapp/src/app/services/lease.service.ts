import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { Lease } from '../models/lease.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LeaseService extends BaseService<Lease> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.LISTING,
    );
  }

  


}