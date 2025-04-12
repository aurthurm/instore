import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_URL } from '../constants/api.urls';
import { Listing } from '../models/listing.model';
import { BaseService } from './base.service';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ListingService extends BaseService<Listing> {
  randomUserUrl = 'https://api.randomuser.me/';

  constructor(http:HttpClient) {
    super(
      http,API_URL.LISTING,
    );
  }

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http
      .get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params })
      .pipe(catchError(() => of({ results: [] })));
  }
  

}


