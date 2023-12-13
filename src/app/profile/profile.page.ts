import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

  constructor(
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
      this.image !== this.profileImage
    );
  }

  async uploadUserData() {
    console.log("Hola mundo")
  }

  goToLogin() {
    this.router.navigate(['/home']);
    this.editMode = false;
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.path = `yt/${this.file.name}`;
    }
  }

  ngOnInit(): void {}
}
