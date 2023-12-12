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

  constructor(private authService: AuthService,private router: Router) {
    this.user = this.authService.getUser();
    this.image = this.authService.getUser().image;
  }

  ngOnInit(): void {}

  changePassword() {
    this.router.navigate(['/change-password']);
    console.log("Change password clicked");
    // Implement functionality here
  }

  changeAddress() {
    console.log("Change address clicked");
    // Implement functionality here
  }
}
