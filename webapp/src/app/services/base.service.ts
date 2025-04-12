import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IServerResponse } from '../models/server-response';

export class BaseService<T> {
  baseUrl = environment.server_url;
  constructor(protected http:HttpClient,   private entity:string) { }

  create(payload:any): Observable<IServerResponse<T>> {
    return this.http.post<IServerResponse<T>>(`${this.baseUrl}/${this.entity}`, payload);
  }

  bulkCreate(payload:any): Observable<IServerResponse<T>> {
    return this.http.post<IServerResponse<T>>(`${this.baseUrl}/${this.entity}/bulk`, payload);
  }
  
  update(id:any,payload:any) : Observable<IServerResponse<T>>{
    return this.http.put<IServerResponse<T>>(`${this.baseUrl}/${this.entity}/${id}`, payload);
  }

  delete(id:any) : Observable<IServerResponse<T>>{
    return this.http.delete<IServerResponse<T>>(`${this.baseUrl}/${this.entity}/${id}`);
  }

  get(query ={}) : Observable<IServerResponse<T>>{
    return this.http.get<IServerResponse<T>>(`${this.baseUrl}/${this.entity}`,{params:query});
  }

  filter(query ={}) : Observable<IServerResponse<T>>{
    return this.http.get<IServerResponse<T>>(`${this.baseUrl}/${this.entity}/filter`,{params:query});
  }

  getOne(id:string) : Observable<IServerResponse<T>>{
    return this.http.get<IServerResponse<T>>(`${this.baseUrl}/${this.entity}/${id}`);
  }
}
