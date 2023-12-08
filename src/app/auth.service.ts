import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private token: string = '';

  clearToken() {
    this.token = '';
  }
  
  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
