import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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

  passwordsMatch: boolean = true;
  showPassword: boolean = false;
  username: string = '';
  password: string = '';
  profileImage: any = null;
  confirmPassword: string = '';
  email: string = '';
  birthdate: Date | null = null; 
  approved: boolean = false;
  connected: boolean = false;
  file: any = null;  
  path: string = '';
  isRegistering: boolean = false;
  showProgressBar: boolean = false;
  blobData: any = null;

  constructor(private camera: Camera,
    private sanitizer: DomSanitizer,
    private router: Router, private http: HttpClient, private authService: AuthService,private fireStorage:AngularFireStorage,private alertController: AlertController) { }

  checkPasswordMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async presentRegistrationConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que los datos ingresados son correctos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Registro cancelado');
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Proceed with the registration logic
            this.register();
          },
        },
      ],
    });

    await alert.present();
  }

  register() {
    if (this.birthdate) {
      const age = this.calculateAge(this.birthdate);
      if (age < 18) {
        this.showAgeAlert();
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
                        this.alertController.create({
                          header: 'Error',
                          message: 'Correo Ingresado Ya Existe.',
                          buttons: ['OK']
                        }).then(alert => alert.present());
                        console.log("Correo Ingresado Ya Existe")
                        this.isRegistering  = false;
                        this.showProgressBar= false;
                      }
                      else{
                        this.http.post(environment.apiUrl+"/users", registerData).subscribe(
                          async (response) => {
                            console.log("Usuario Creado con exito")
                            if(this.blobData != null){
                              const uploadtask =  await this.fireStorage.upload(this.path,this.blobData);
                              this.profileImage = await uploadtask.ref.getDownloadURL();
                              const requestData = {
                                username: this.username,
                                password: this.password,
                                email: this.email,
                                birthdate: this.birthdate,
                                image: this.profileImage
                              };
                              this.http.post(environment.apiUrl+"/users/UploadPhoto",requestData).subscribe(
                                (response) => {
                                  console.log("Imagen de perfil subida con exito")
                                },
                                (error) => {
                                  console.log(error)
                                }
                              );
                            }
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
                  this.alertController.create({
                    header: 'Error',
                    message: 'Usuario ya existente, Pruebe con otro.',
                    buttons: ['OK']
                  }).then(alert => alert.present());
                  this.isRegistering  = false;
                  this.showProgressBar= false;
                }
              },
              (error) => {
                console.log("Usuario No se pudo crear, Error Interno")
                this.alertController.create({
                  header: 'Error',
                  message: 'Usuario No se pudo crear, Error Interno.',
                  buttons: ['OK']
                }).then(alert => alert.present());
                this.isRegistering  = false;
                this.showProgressBar= false;
              }
            );
      }
      else{
        console.log("Las contraseñas no coinciden")
        this.alertController.create({
          header: 'Error',
          message: 'Las contraseñas no coinciden.',
          buttons: ['OK']
        }).then(alert => alert.present());
        this.isRegistering  = false;
        this.showProgressBar= false;
      }
    }
    else{
      console.log("Debe Completar todos los campos")
      this.alertController.create({
        header: 'Error',
        message: 'Debe Completar todos los campos.',
        buttons: ['OK']
      }).then(alert => alert.present());
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

  private showAgeAlert() {
    this.alertController.create({
      header: 'Error',
      message: 'Debes tener al menos 18 años para registrarte.',
      buttons: ['OK']
    }).then(alert => alert.present());
  }
    
  async onFileChanged(event: any) {
    this.file = event.target.files[0];
    if(this.file){
      this.path = `yt/${this.file.name}`;
    }
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
  
    try {
      const imageData = await this.camera.getPicture(options);
      this.blobData = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.path = `yt/${this.username}_profile_picture.jpg`;
      
      const uploadTask = this.fireStorage.upload(this.path, this.blobData);
      await uploadTask.then(async () => {
        const uploadtask =  await this.fireStorage.upload(this.path,this.blobData);
        this.profileImage = await uploadtask.ref.getDownloadURL();
        
      });
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }
  
  


  // Función para convertir data URI a Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mimeString });
  }


  ngOnInit() {
  }
}
