import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Carrito', url: '/shopping-cart', icon: 'cart'},
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Mis Pedidos', url: '/my-orders', icon: 'receipt' },
    { title: 'Cerrar sesión', url: '/login', icon: 'log-out' },
  ];

  public labels = [];
  constructor() {}
}

