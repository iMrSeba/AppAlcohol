import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user: any;
  image: any = null;
  editMode: boolean = false;
  originalUserData: any;
  file: any = null;
  path: string = '';
  profileImage: any = null;
  loading: boolean = false;
  blobData: any = null;

  constructor(private camera: Camera,
    private alertController: AlertController,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private fireStorage: AngularFireStorage
  ) {
    this.user = this.authService.getUser();
    this.originalUserData = { ...this.user };
    this.image = this.authService.getUser().image;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    if (!this.editMode) {
      // If saving changes, check for modifications and upload if necessary
      if (this.isUserDataModified()) {
        this.uploadUserData();
        
      }
    } else {
      // If switching to edit mode, create a copy of the original user data
      this.originalUserData = { ...this.user };
    }
  }

  isUserDataModified(): boolean {
    // Check if any of the user data fields have been modified
    return (
      this.user.username !== this.originalUserData.username ||
      this.user.email !== this.originalUserData.email ||
      this.user.password !== this.originalUserData.password ||
      this.blobData !== null
    );
  }

  async uploadUserData() {
    this.loading = true;
    if(this.blobData){
      const ref = this.fireStorage.ref(this.path);
      await this.fireStorage.upload(this.path, this.blobData);
      this.profileImage = await ref.getDownloadURL().toPromise();
      this.user.image = this.profileImage;
      const data = {
        username: this.originalUserData.username,
        email: this.user.email,
        password: this.user.password,
        image: this.user.image,
        newUsername:this.user.username,
      };
      this.http.post(environment.apiUrl + '/users/updateUser', data).subscribe(
        (response) => {
          this.originalUserData = { ...this.user };
          this.authService.setUser(this.user);
          this.image = this.authService.getUser().image;
          this.editMode = false;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      const data = {
        username: this.originalUserData.username,
        email: this.user.email,
        password: this.user.password,
        image: this.user.image,
        newUsername:this.user.username,
      };
      this.http.post(environment.apiUrl + '/users/updateUser', data).subscribe(
        (response) => {
          this.originalUserData = { ...this.user };
          this.authService.setUser(this.user);
          this.image = this.authService.getUser().image;
          this.editMode = false;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/home']);
    this.editMode = false;
  }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
  
    try {
      this.image = await this.camera.getPicture(options);
      this.blobData = this.dataURItoBlob('data:image/jpeg;base64,' + this.image);
      this.path = `yt/${this.user.username}_profile_picture.jpg`;
      
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

  ngOnInit(): void {}
}

