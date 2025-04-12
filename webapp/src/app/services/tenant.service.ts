import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { Tenant } from '../helpers/tenant.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseService<Tenant> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.TENANT,
    );
  }

  


}