import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {
  
  constructor(private cdr: ChangeDetectorRef,private alertController: AlertController) {}
  cartItems: { drink: any; quantity: number }[] = [];
  public selectedCategory: string = '';
  public searchTerm: string = '';
  public drinks: any[] = [
    //'Cervezas', 'Vinos', 'Licores', 'Cocteles', 'Sin alcohol'
    { name: 'Heineken',category: 'Cervezas', description: 'Cerveza lager de origen holandés.', price: 'CLP 1.800' },
    { name: 'Carmenere Reserva',category: 'Vinos', description: 'Vino tinto chileno con notas de frutas rojas.', price: 'CLP 9.500' },
    { name: 'Absolut',category: 'Licores' ,description: 'Vodka sueco con un sabor claro y crujiente.', price: 'CLP 15.000' },
    { name: 'Havana Club 7 años',category: 'Licores', description: 'Ron cubano, añejado durante 7 años.', price: 'CLP 13.500' },
    { name: 'Jose Cuervo Especial',category: 'Licores' ,description: 'Tequila mexicano, perfecto para margaritas.', price: 'CLP 12.800' },
    { name: 'Johnnie Walker Black Label',category: 'Licores' ,description: 'Whisky escocés con notas ahumadas y afrutadas.', price: 'CLP 25.000' },
    { name: 'Bombay Sapphire',category: 'Cocteles' ,description: 'Ginebra con 10 ingredientes botánicos.', price: 'CLP 18.000' },
    { name: 'Pisco Capel',category: 'Licores' ,description: 'Pisco chileno, destilado de uvas muscat.', price: 'CLP 7.500' },
    { name: 'Corona Extra',category: 'Cervezas' ,description: 'Cerveza clara mexicana.', price: 'CLP 2.000' },
    { name: 'Casillero del Diablo',category: 'Vinos' ,description: 'Vino tinto con cuerpo y un sabor característico.', price: 'CLP 10.500' }
    //acá se añaden más si es necesario
  ];
  public filteredDrinks: any[] = [];
  public isGrid: boolean = true;

    toggleView() {
      this.isGrid = !this.isGrid;
    }

  
  ngOnInit() {
    
    this.filteredDrinks = this.drinks; // Inicialmente mostrar todas las bebidas.
  }

  filterDrinks() {
    const searchTermLower = this.searchTerm.toLowerCase();
    const categoryLower = this.selectedCategory.toLowerCase();

    this.filteredDrinks = this.drinks.filter(drink => {
      const nameLower = drink.name.toLowerCase();
      const categoryMatch = !categoryLower || drink.category.toLowerCase() === categoryLower;
      const nameMatch = !searchTermLower || nameLower.includes(searchTermLower);

      return categoryMatch && nameMatch;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterDrinks();
  }

  async showQuantityPrompt(drink: any) {
    const alert = await this.alertController.create({
      header: 'Select Quantity',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          min: 1,
          value: 1,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            const quantity = data.quantity;
            const existingItem = this.cartItems.find((item) => item.drink === drink);

            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              this.cartItems.push({ drink, quantity });
            }

            console.log(`Selected quantity for ${drink.name}: ${quantity}`);
          },
        },
      ],
    });

    await alert.present();
  }

}