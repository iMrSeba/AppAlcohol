import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor() { }

  changePassword() {
    console.log("Change password clicked");
    // Implement functionality here
  }

  verifyEmail() {
    console.log("Verify email clicked");
    // Implement functionality here
  }

  changeAddress() {
    console.log("Change address clicked");
    // Implement functionality here
  }

  enable2FA() {
    console.log("Enable 2FA clicked");
    // Implement functionality here
  }

  logout() {
    console.log("Logout clicked");
    // Implement functionality here
  }
}
