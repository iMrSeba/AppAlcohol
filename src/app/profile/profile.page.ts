import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  user: any;
  imageSrc: string | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    if (this.user && this.user.image) {
      this.imageSrc = this.convertBufferToImageUrl(this.user.image.data);
    }
  }

  private convertBufferToImageUrl(bufferData: number[]): string {
    const blob = new Blob([new Uint8Array(bufferData)], { type: 'image/png' });
    return URL.createObjectURL(blob);
  }


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
