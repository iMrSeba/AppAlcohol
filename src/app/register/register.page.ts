import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('300ms ease-in-out')])
    ])
  ]
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  profileImage: any = null;
  confirmPassword: string = '';
  email: string = '';
  birthdate: Date | null = null; 
  approved: boolean = false;
  connected: boolean = false;

  isRegistering: boolean = false;
  showProgressBar: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  register() {
    if (this.birthdate) {
      const age = this.calculateAge(this.birthdate);
      if (age < 18) {
          console.log("Debes tener al menos 18 años para registrarte.");
          return;  // Stop further execution
      }
    }
  
    if(this.username != '' && this.password != '' && this.confirmPassword != '' && this.email != ''){
      this.isRegistering  = true;
      this.showProgressBar= true;
      
      const registerData = {
        username: this.username,
        password: this.password,
        email: this.email,
        birthdate: this.birthdate,
        approved: this.approved,
        connected: this.connected
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

  private calculateAge(birthDate: Date): number {
    let today = new Date();
    let birthDate2 = new Date(birthDate);
    let age = today.getFullYear() - birthDate2.getFullYear();
    let month = today.getMonth() - birthDate2.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate2.getDate())) {
        age--;
    }
    return age;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
}
