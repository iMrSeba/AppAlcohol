import { Injectable } from '@angular/core';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private token: string = '';
  private user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    image: '',
  };

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
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
