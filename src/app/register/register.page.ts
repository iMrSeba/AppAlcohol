import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email:string = '';
  approved:boolean = false;
  connected: boolean = false;

  isRegistering: boolean = false;
  showProgressBar: boolean = false;

  register(){
    if(this.username != '' && this.password != '' && this.confirmPassword != '' && this.email != ''){
      this.isRegistering  = true;
      this.showProgressBar= true;
      
      const registerData = {
        username: this.username,
        password: this.password,
        email: this.email,
        approved: this.approved,
        connected:this.connected
      };
      
      if(this.password === this.confirmPassword){
            this.http.post(environment.apiUrl+"/users/Person", registerData).subscribe(
              (response) => {
                if(response == null){
                  this.http.post(environment.apiUrl+"/users/Email", registerData).subscribe(
                    (response) => {
                      if(response != null){
                        console.log("Correo Ingresado Ya Existe")
                        this.isRegistering  = false;
                        this.showProgressBar= false;
                      }
                      else{
                        this.http.post(environment.apiUrl+"/users", registerData).subscribe(
                          (response) => {
                            console.log("Usuario Creado con exito")
                            this.isRegistering  = false;
                            this.showProgressBar= false;
                            this.router.navigate(['/login']);
                          },
                          (error) => {
                            console.log(error)
                            this.isRegistering  = false;
                            this.showProgressBar= false;
                          }
                        );
                        
                      }
                    },
                    (error) => {
                      console.log(error)
                      this.isRegistering  = false;
                      this.showProgressBar= false;
                    }
                  );
                }
                else{
                  console.log("Usuario ya existente, Pruebe con otro")
                  this.isRegistering  = false;
                  this.showProgressBar= false;
                }
              },
              (error) => {
                console.log("Usuario No se pudo crear, Error Interno")
                this.isRegistering  = false;
                this.showProgressBar= false;
              }
            );
      }
      else{
        console.log("Las contraseñas no coinciden")
        this.isRegistering  = false;
        this.showProgressBar= false;
      }
    }
    else{
      console.log("Debe Completar todos los campos")
      this.isRegistering  = false;
      this.showProgressBar= false;
    }
    
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
