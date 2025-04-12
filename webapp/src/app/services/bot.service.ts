import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.urls';
import { BotSession } from '../models/bot-session.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BotService extends BaseService<BotSession> {

  constructor(http:HttpClient) {
    super(
      http,API_URL.BOT,
    );
  }

  


}