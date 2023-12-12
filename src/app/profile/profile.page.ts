import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user: any;
  image: any = null;
  editMode: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
    this.image = this.authService.getUser().image;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnInit(): void {}
}
