import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

  constructor(private router: Router, private http: HttpClient, private authService: AuthService,private fireStorage:AngularFireStorage,private alertController: AlertController) { }

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
                            if(this.file != null){
                              const uploadtask =  await this.fireStorage.upload(this.path,this.file);
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

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      async (imageData) => {
        // imageData es una cadena codificada en base64
        console.log('Image data:', imageData);
        
        // Se debe definir 'file2' y 'path2' con 'let' o 'const' si no están definidos en otro lugar
        let file2 = imageData;
        // Asegúrate de que 'this.file.name' esté definido y sea el nombre correcto del archivo
        let path2 = `yt/${this.file.name}`;

        // Puedes usar imageData según tus necesidades
        if (imageData) {
          // Sube la imagen a Firebase Storage
          // Asegúrate de que 'this.fireStorage' esté correctamente inicializado y configurado
          const uploadTask = await this.fireStorage.upload(path2, file2);
          const downloadURL = await uploadTask.ref.getDownloadURL();

          // Guarda la URL de la imagen en tu objeto de datos o en el servidor
          // Asegúrate de que 'this.profileImage' esté definido en tu clase
          this.profileImage = downloadURL;
          console.log('Image URL:', downloadURL);
          // Resto de tu lógica aquí, como enviar la URL al servidor, etc.
        }
      },
      (err) => {
        console.log('Error taking picture:', err);
      }
    );
  }


  
  
  this.camera.getPicture(options).then(
    async (imageData) => {
      // imageData is a base64 encoded string
      console.log('Image data:', imageData);
  
      // Convertir base64 a Blob
      const blobData = this.base64toBlob(imageData, 'image/jpeg');
  
      // Crear un objeto File a partir del Blob
      const file = new File([blobData], 'profile_picture.jpg', { type: 'image/jpeg' });
  
      // Puedes usar 'file' según tus necesidades
  
      // Sube la imagen a Firebase Storage
      const path = `yt/${this.username}_profile_picture.jpg`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const downloadURL = await uploadTask.ref.getDownloadURL();
  
      // Guarda la URL de la imagen en tu objeto de datos o en el servidor
      this.profileImage = downloadURL;
      console.log('Image URL:', downloadURL);
  
      // Resto de tu lógica aquí, como enviar la URL al servidor, etc.
    },
    (err) => {
      console.log('Error taking picture:', err);
    }
  );
  
  // Función para convertir base64 a Blob
  base64toBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }
  

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
}
