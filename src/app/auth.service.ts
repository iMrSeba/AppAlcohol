import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setUserId(userId: any) {
    this.userId = userId;
  }
  
  private token: string = '';
  private userId: string = '';
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
