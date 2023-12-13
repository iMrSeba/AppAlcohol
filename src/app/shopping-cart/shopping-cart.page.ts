import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  public selectedDrinks: any[] = [];

  

  ionViewWillEnter() {
    // Cargar datos desde el localStorage al iniciar la página
    const storedData = localStorage.getItem('selectedDrinks');
    if (storedData) {
      this.selectedDrinks = JSON.parse(storedData);
    }
  }

  increaseQuantity(selectedDrink: any) {
    selectedDrink.quantity++;
    this.saveToLocalStorage();
  }

  decreaseQuantity(selectedDrink: any) {
    if (selectedDrink.quantity > 0) {
      selectedDrink.quantity--;
      this.saveToLocalStorage();
    }
  }

  cancel() {
    // Lógica para cancelar
    this.navCtrl.navigateBack('/'); // Puedes ajustar la ruta según tu configuración
  }

  finish() {
    // Lógica para finalizar
    // Puedes redirigir a otra página o realizar otras acciones
    this.navCtrl.navigateBack('/'); // Puedes ajustar la ruta según tu configuración
  }

  // Guardar en el localStorage
  saveToLocalStorage() {
    localStorage.setItem('selectedDrinks', JSON.stringify(this.selectedDrinks));
  }

  calculateTotal(): number {
    return this.selectedDrinks.reduce((total, drink) => {
      return total + (drink.quantity * parseInt(drink.price.replace('CLP ', '').replace('.', '')));
    }, 0);
  }
  

  ngOnInit() {
  }

}
