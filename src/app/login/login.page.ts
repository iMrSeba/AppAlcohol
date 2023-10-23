import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './login-response';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  username: string = '';
  password: string = '';
  isLoggingIn: boolean = false;
  showProgressBar: boolean = false;

  login() {
    // Realiza la solicitud de inicio de sesión a la API
    this.isLoggingIn = true;
    this.showProgressBar = true
    const loginData = {
      username: this.username,
      password: this.password,
    };
    
    this.http.post(environment.apiUrl+"/auth/login", loginData).subscribe(
      (response) => {
        if(response != null && response != 12){
          console.log('Inicio de sesión exitoso');
          const typedResponse = response as LoginResponse;
          this.authService.setToken(typedResponse.token);
          this.isLoggingIn = false;
          this.showProgressBar = false
          this.router.navigate(['/home']);
        }
        else if(response == 12){
          console.log('Contraseña Incorrecta');
          this.isLoggingIn = false;
          this.showProgressBar = false
        }
        else{
          console.log('Usuario No existe');
          this.isLoggingIn = false;
          this.showProgressBar = false
        }
      },
      (error) => {
        console.error('Error desde backend:', error);
        this.isLoggingIn = false;
        this.showProgressBar = false
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {}

}

