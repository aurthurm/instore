import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { User } from '../models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.USER,
    );
  }

  


}
