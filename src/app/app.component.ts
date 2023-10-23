import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/folder/Login', icon: 'person' },
    { title: 'Home', url: '/folder/Home', icon: 'person' },
    { title: 'Profile', url: '/folder/Profile', icon: 'person' },
    { title: 'Register', url: '/folder/Register', icon: 'person' },
  ];
  public labels = [];
  constructor() {}
}

