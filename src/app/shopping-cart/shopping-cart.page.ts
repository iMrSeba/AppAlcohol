import { Component, OnInit } from '@angular/core';
import { GeolocationPosition } from '@capacitor/geolocation';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
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
    // Puedes ajustar la ruta según tu configuración
  }

  finish() {
    // Lógica para finalizar
    // Puedes redirigir a otra página o realizar otras acciones
    ; // Puedes ajustar la ruta según tu configuración
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
  
  async captureLocation() {
    try {
      const permissions = await Geolocation['requestPermissions']();

       // Solicita permisos de geolocalización

      if (permissions.location === 'granted') {
        const coordinates = await Geolocation['getCurrentPosition'](); // Obtiene la ubicación actual
        const latitude = coordinates.coords.latitude;
        const longitude = coordinates.coords.longitude;

        // Aquí puedes hacer lo que necesites con las coordenadas
        console.log('Ubicación capturada:', latitude, longitude);
        
        // También puedes almacenar las coordenadas en el almacenamiento local si es necesario
        localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
      } else {
        console.log("Permisos de geolocalización denegados");
      }
    } catch (error) {
      console.error("Error al obtener la ubicación: " + error);
    }
  }

  ngOnInit() {
  }

}
