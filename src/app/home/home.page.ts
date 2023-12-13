import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {
  
  constructor(private cdr: ChangeDetectorRef, private alertController: AlertController) {}

  public selectedDrinks: any[] = [];
  public selectedCategory: string = '';
  public searchTerm: string = '';
  public drinks: any[] = [
    //'Cervezas', 'Vinos', 'Licores', 'Cocteles', 'Sin alcohol'
    { name: 'Heineken',category: 'Cervezas', description: 'Cerveza lager de origen holandés.', price: 'CLP 1.800'},
    { name: 'Carmenere Reserva',category: 'Vinos', description: 'Vino tinto chileno con notas de frutas rojas.', price: 'CLP 9.500' },
    { name: 'Absolut',category: 'Destilados' ,description: 'Vodka sueco con un sabor claro y crujiente.', price: 'CLP 15.000' },
    { name: 'Havana Club 7 años',category: 'Ron', description: 'Ron cubano, añejado durante 7 años.', price: 'CLP 13.500' },
    { name: 'Jose Cuervo Especial',category: 'Tequila' ,description: 'Tequila mexicano, perfecto para margaritas.', price: 'CLP 12.800' },
    { name: 'Johnnie Walker Black Label',category: 'Whisky/Whiskey' ,description: 'Whisky escocés con notas ahumadas y afrutadas.', price: 'CLP 25.000' },
    { name: 'Bombay Sapphire',category: 'Cocteles' ,description: 'Ginebra con 10 ingredientes botánicos.', price: 'CLP 18.000' },
    { name: 'Pisco Capel',category: 'Destilados' ,description: 'Pisco chileno, destilado de uvas muscat.', price: 'CLP 7.500' },
    { name: 'Corona Extra',category: 'Cervezas' ,description: 'Cerveza clara mexicana.', price: 'CLP 2.000' },
    { name: 'Casillero del Diablo',category: 'Vinos' ,description: 'Vino tinto con cuerpo y un sabor característico.', price: 'CLP 10.500' },
    { name: 'Marqués de Cáceres', category: 'Vinos', description: 'Vino blanco, fresco y aromático, ideal para mariscos.', price: 'CLP 12.000' },
    { name: 'Santa Rita 120', category: 'Vinos', description: 'Vino rosado, ligero y frutal, perfecto para acompañar ensaladas.', price: 'CLP 8.500' },
    { name: 'Concha y Toro Reservado', category: 'Vinos', description: 'Vino tinto suave, con notas de frutas maduras, ideal para carnes rojas.', price: 'CLP 9.000' },
    { name: 'Tarapacá Gran Reserva', category: 'Vinos', description: 'Vino tinto elegante y complejo, con toques de especias y chocolate.', price: 'CLP 15.000' },
    { name: 'Montes Alpha', category: 'Vinos', description: 'Vino tinto de alta gama, con cuerpo y perfectamente equilibrado.', price: 'CLP 20.000' },
    { name: 'Grey Goose Vodka', category: 'Destilados', description: 'Vodka francés ultra premium, conocido por su suavidad y pureza.', price: 'CLP 35.000' },
    { name: 'Johnnie Walker Blue Label', category: 'Whisky/Whiskey', description: 'Whisky escocés de lujo, rico y ahumado, para paladares exigentes.', price: 'CLP 150.000' },
    { name: 'Ron Diplomático Reserva Exclusiva', category: 'Ron', description: 'Ron venezolano premium, con notas de caramelo y especias exóticas.', price: 'CLP 45.000' },
    { name: 'Hennessy XO', category: 'Coñac', description: 'Coñac francés excepcional, con complejidad y profundidad de sabor.', price: 'CLP 120.000' },
    { name: 'Dom Pérignon Vintage', category: 'Champagne', description: 'Champagne francés de prestigio, símbolo de lujo y celebración.', price: 'CLP 200.000' },
    { name: 'Château Margaux', category: 'Vinos', description: 'Vino tinto Bordeaux de alta gama, elegante y con gran reputación.', price: 'CLP 500.000',image:'gs://imageuser-89a50.appspot.com/Productos - Vinos/imagen_2023-12-12_191612719.png' },
    { name: 'Penfolds Grange', category: 'Vinos', description: 'Vino tinto australiano icónico, con gran potencial de envejecimiento.', price: 'CLP 350.000' },
    { name: 'Sassicaia', category: 'Vinos', description: 'Vino tinto italiano Super Tuscan, con una complejidad excepcional.', price: 'CLP 250.000' },
    { name: 'Macallan Sherry Oak 18 Years', category: 'Whisky', description: 'Whisky escocés de malta, envejecido en barricas de jerez, con notas ricas y complejas.', price: 'CLP 200.000' },
    { name: 'Louis Roederer Cristal', category: 'Champagne', description: 'Champagne de lujo, con equilibrio perfecto y finas burbujas.', price: 'CLP 180.000' }
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


  //cart


  async presentActionSheet(drink: any) {
    const alert = await this.alertController.create({
      header: 'Opciones',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 0
        }
      ],
      buttons: [
        {
          text: 'Añadir al carrito',
          handler: (data) => this.addToSelected(drink, data.quantity)
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => this.resetQuantity(drink)
        }
      ]
    });

    await alert.present();
  }

  resetQuantity(drink: any) {
    // Restablecer la cantidad seleccionada
    drink.selectedQuantity = 0;
  }

  addToSelected(drink: any, quantity: number) {
    this.loadSelectedDrinksFromLocalStorage();
    // Verificar si la bebida ya está en el array seleccionado
    const existingDrink = this.selectedDrinks.find(selectedDrink => selectedDrink.name === drink.name);

    if (existingDrink) {
      // Si la bebida ya está en la lista, actualiza la cantidad
      const quantity1 = +quantity + +existingDrink.quantity;
      existingDrink.quantity = quantity1;

    } else {
      // Si la bebida no está en la lista, agrégala con la cantidad especificada
      this.selectedDrinks.push({
        name: drink.name,
        price: drink.price,
        quantity: quantity
      });
    }

    // Guardar en el almacenamiento local después de la modificación
    this.saveSelectedDrinksToLocalStorage();
  }

  removeFromSelected(drink: any) {
    // Remover la bebida del array seleccionado
    this.selectedDrinks = this.selectedDrinks.filter(selectedDrink => selectedDrink !== drink);
    // Puedes actualizar el almacenamiento local aquí si es necesario
    // Ejemplo: localStorage.setItem('selectedDrinks', JSON.stringify(this.selectedDrinks));
    this.saveSelectedDrinksToLocalStorage();
  }

  // Método para cargar los datos seleccionados desde el almacenamiento local si es necesario
  loadSelectedDrinksFromLocalStorage() {
    const storedSelectedDrinks = localStorage.getItem('selectedDrinks');
    if (storedSelectedDrinks) {
      this.selectedDrinks = JSON.parse(storedSelectedDrinks);
    }
  }

  saveSelectedDrinksToLocalStorage() {
    localStorage.setItem('selectedDrinks', JSON.stringify(this.selectedDrinks));
  }

  
}