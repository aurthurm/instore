import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.server_url;

  constructor(private http:HttpClient) { }

/**
 * Authenticate
 * @param username 
 * @param password 
 */

authenticate(username:string, password:string, role='admin'):Observable<any>{
  return this.http.post(`${this.baseUrl}/auth/login`,{username,password,role});
}


/**
 * Get Authenticated User
 * 
 *
 */
 
getProfile(usertype="admin"):Observable<User | Account> {
  return this.http.get<User | Account>(`${this.baseUrl}/auth/profile`);
}


/**
 * Get Session USER
 */
get User():User {
  return JSON.parse(<string>localStorage.getItem('user')) as User | Account;
}


/**
 * Set User
 */
set User(user:User){
   localStorage.setItem('user', JSON.stringify(user));
}



/**
 * Set Token
 * 
 */
set Token(token:string){
  localStorage.setItem('token',token);
}


/**
 * Get Token
 */

get Token():string{
  return localStorage.getItem('token') as string;
}

/**
 * Reset password
 * @param email 
 * @returns 
 */
  resetPassword(email: string){
    return this.http.post(environment.server_url + 'auth/reset-password',{email});
  }
}
