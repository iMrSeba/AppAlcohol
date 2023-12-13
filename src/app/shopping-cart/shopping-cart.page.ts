import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  constructor(private authService: AuthService,private router: Router,private http: HttpClient,private alertController: AlertController,private faio:FingerprintAIO) {}

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
    localStorage.clear();
    this.router.navigate(['/home']);
  }



  finish() {
    if(this.calculateTotal() != 0){
      const user = this.authService.getUser();
      const data = {
        priceTotal: this.calculateTotal(),
        stringList: this.convertProductsToString(),
        ubication: "Tu casa",
        idUser: user.id,
      }
      this.http.post(environment.apiUrlOrder+"/orders",data).subscribe(
        (response) => {
          this.alertController.create({
          header: 'Creado Correctamente',
          message: 'Su pedido ha sido creado correctamente',
          buttons: ['OK']
          }).then(alert => alert.present());
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
          this.alertController.create({
            header: 'pedido no creado',
            message: 'Su pedido no ha sido creado',
            buttons: ['OK']
            }).then(alert => alert.present());
        }
      )
    }
    else{
      this.alertController.create({
        header: 'No hay productos en el carrito',
        message: 'No hay productos en el carrito',
        buttons: ['OK']
        }).then(alert => alert.present());
    }
    
  }

  authenticate() {
    this.faio.isAvailable().then(()=>{
      this.faio.show({}).then((val)=>{
        alert(JSON.stringify(val));
      },(err)=>{
        alert(JSON.stringify(err));
      })
    },(err)=>{
      alert("FingerprintAIO no disponible");
    })
  }

  // Guardar en el localStorage
  saveToLocalStorage() {
    localStorage.setItem('selectedDrinks', JSON.stringify(this.selectedDrinks));
  }

  async captureLocation() {
    try {
      const permissions = await Geolocation.requestPermissions();

       // Solicita permisos de geolocalización

      if (permissions.location === 'granted') {
        const coordinates = await Geolocation.getCurrentPosition(); // Obtiene la ubicación actual
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

  calculateTotal(): number {
    return this.selectedDrinks.reduce((total, drink) => {
      return total + (drink.quantity * parseInt(drink.price.replace('CLP ', '').replace('.', '')));
    }, 0);
  }
  
  async showLocation() {
    // Recupera la ubicación desde el almacenamiento local
    const storedLocation = localStorage.getItem('userLocation');

    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);

      // Crea una alerta para mostrar la ubicación
      const alert = await this.alertController.create({
        header: 'Ubicación Guardada',
        message: `Latitud: ${parsedLocation.latitude}, Longitud: ${parsedLocation.longitude}`,
        buttons: ['OK']
      });

      // Muestra la alerta
      await alert.present();
    } else {
      console.log('No se encontró ubicación guardada');
    }
  }

  convertProductsToString(): string {
    // Convierte la lista de productos a un string anidado (JSON.stringify)
    const productsString = JSON.stringify(this.selectedDrinks);
    return productsString;
  }

  ngOnInit() {
  }


}
