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
    { name: 'Heineken',category: 'Cervezas', description: 'Cerveza lager de origen holandés.', price: 'CLP 1.800',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_012810054.png?alt=media&token=a8875cff-ac3d-4011-8365-236a99ca9361'},
    { name: 'Carmenere Reserva',category: 'Vinos', description: 'Vino tinto chileno con notas de frutas rojas.', price: 'CLP 9.500',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-13_012933412.png?alt=media&token=88d2545d-f22f-4e65-a73b-55031330699f' },
    { name: 'Absolut',category: 'Destilados' ,description: 'Vodka sueco con un sabor claro y crujiente.', price: 'CLP 15.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-12_192500238.png?alt=media&token=0130977a-c294-4d22-9699-ae86fed3ee11' },
    { name: 'Havana Club 7 años',category: 'Ron', description: 'Ron cubano, añejado durante 7 años.', price: 'CLP 13.500',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_013147668.png?alt=media&token=d670fcaa-f198-48cc-b07a-1bd0f937cb1f' },
    { name: 'Jose Cuervo Especial',category: 'Tequila' ,description: 'Tequila mexicano, perfecto para margaritas.', price: 'CLP 12.800',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Tequila%2Fimagen_2023-12-13_012344912.png?alt=media&token=f36df70a-b8c2-43a4-b70d-c4a7f870bcce' },
    { name: 'Johnnie Walker Black Label',category: 'Whisky/Whiskey' ,description: 'Whisky escocés con notas ahumadas y afrutadas.', price: 'CLP 25.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_012233718.png?alt=media&token=0ab64593-b0d5-4736-9c16-fb3f7bd43a4e' },
    { name: 'Bombay Sapphire',category: 'Destilados' ,description: 'Ginebra con 10 ingredientes botánicos.', price: 'CLP 18.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_011912928.png?alt=media&token=7f7cf9fc-035c-4f52-90d2-431a9a43f2d9' },
    { name: 'Pisco Capel',category: 'Destilados' ,description: 'Pisco chileno, destilado de uvas muscat.', price: 'CLP 7.500',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_012033164.png?alt=media&token=3e88df20-a32d-4170-ba29-f3205f919bab' },
    { name: 'Corona Extra',category: 'Cervezas' ,description: 'Cerveza clara mexicana.', price: 'CLP 2.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_013314073.png?alt=media&token=ab5b779c-c671-447d-86ce-5cb06dccb574' },
    { name: 'Casillero del Diablo',category: 'Vinos' ,description: 'Vino tinto con cuerpo y un sabor característico.', price: 'CLP 10.500',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-13_012933412.png?alt=media&token=88d2545d-f22f-4e65-a73b-55031330699f' },
    { name: 'Marqués de Cáceres', category: 'Vinos', description: 'Vino blanco, fresco y aromático, ideal para mariscos.', price: 'CLP 12.000 ',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-12_191431477.png?alt=media&token=78c90ebd-1a4f-410f-ba56-f556ad53e566'},
    { name: 'Santa Rita 120', category: 'Vinos', description: 'Vino rosado, ligero y frutal, perfecto para acompañar ensaladas.', price: 'CLP 8.500',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-13_010934494.png?alt=media&token=fc5b3be5-f210-43e7-a269-1474a57586d6' },
    { name: 'Concha y Toro Reservado', category: 'Vinos', description: 'Vino tinto suave, con notas de frutas maduras, ideal para carnes rojas.', price: 'CLP 9.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-12_191622872.png?alt=media&token=3276a625-4598-4b85-a051-15e695f9dbba'  },
    { name: 'Tarapacá Gran Reserva', category: 'Vinos', description: 'Vino tinto elegante y complejo, con toques de especias y chocolate.', price: 'CLP 15.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-12_191635229.png?alt=media&token=8e048206-ee14-404b-9f2d-affa9d586ff0'  },
    { name: 'Montes Alpha', category: 'Vinos', description: 'Vino tinto de alta gama, con cuerpo y perfectamente equilibrado.', price: 'CLP 20.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-13_010822386.png?alt=media&token=45b05660-3c50-44ca-ad1d-5284b82cbc7f'  },
    { name: 'Grey Goose Vodka', category: 'Destilados', description: 'Vodka francés ultra premium, conocido por su suavidad y pureza.', price: 'CLP 35.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_013550981.png?alt=media&token=eee36921-abf8-454c-8a83-5d0e92e25214'  },
    { name: 'Johnnie Walker Blue Label', category: 'Whisky/Whiskey', description: 'Whisky escocés de lujo, rico y ahumado, para paladares exigentes.', price: 'CLP 150.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_012233718.png?alt=media&token=0ab64593-b0d5-4736-9c16-fb3f7bd43a4e' },
    { name: 'Ron Diplomático Reserva Exclusiva', category: 'Ron', description: 'Ron venezolano premium, con notas de caramelo y especias exóticas.', price: 'CLP 45.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_014331713.png?alt=media&token=62c062e1-68bb-4a0f-b7e7-cfb30ecc5d62' },
    { name: 'Hennessy XO', category: 'Coñac', description: 'Coñac francés excepcional, con complejidad y profundidad de sabor.', price: 'CLP 120.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_014451281.png?alt=media&token=aa014c7e-7812-454d-8a92-cfe63244005b' },
    { name: 'Dom Pérignon Vintage', category: 'Champagne', description: 'Champagne francés de prestigio, símbolo de lujo y celebración.', price: 'CLP 200.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_014154734.png?alt=media&token=ad03785f-55b9-4714-a1a8-1b8fa0bae4cc' },
    { name: 'Château Margaux', category: 'Vinos', description: 'Vino tinto Bordeaux de alta gama, elegante y con gran reputación.', price: 'CLP 500.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-13_010934494.png?alt=media&token=fc5b3be5-f210-43e7-a269-1474a57586d6' },
    { name: 'Penfolds Grange', category: 'Vinos', description: 'Vino tinto australiano icónico, con gran potencial de envejecimiento.', price: 'CLP 350.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-13_011359959.png?alt=media&token=6c56913e-399d-4f39-923d-a4436ada8f3f' },
    { name: 'Sassicaia', category: 'Vinos', description: 'Vino tinto italiano Super Tuscan, con una complejidad excepcional.', price: 'CLP 250.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Vinos%2Fimagen_2023-12-13_011453170.png?alt=media&token=90cbff18-591c-439d-851a-2f810cc649cf' },
    { name: 'Macallan Sherry Oak 18 Years', category: 'Whisky/Whiskey', description: 'Whisky escocés de malta, envejecido en barricas de jerez, con notas ricas y complejas.', price: 'CLP 200.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_014853721.png?alt=media&token=8bbc86f1-1763-4ce6-8d0c-bf5c1f59099a' },
    { name: 'Louis Roederer Cristal', category: 'Champagne', description: 'Champagne de lujo, con equilibrio perfecto y finas burbujas.', price: 'CLP 180.000',image:'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_014948820.png?alt=media&token=9c17781a-ff84-458c-a311-f4872cbe76d2' },
    { name: 'Hennessy VS', category: 'Coñac', description: 'Coñac francés versátil, con notas de roble y almendras, ideal para cócteles.', price: 'CLP 50.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_015756619.png?alt=media&token=f01a48a4-906d-4348-b05c-de1be6f6545b' },
    { name: 'Rémy Martin VSOP', category: 'Coñac', description: 'Coñac suave y frutal, envejecido en barricas de roble francés, perfecto para disfrutar solo o en cócteles.', price: 'CLP 60.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_015821794.png?alt=media&token=61c754dd-975d-46fe-ac7b-28d81999eadc' },
    { name: 'Courvoisier XO', category: 'Coñac', description: 'Coñac de gama alta, con un complejo bouquet de cacao, vainilla y frutas exóticas, envejecido hasta 35 años.', price: 'CLP 120.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_015846551.png?alt=media&token=ae9525e9-900d-4f86-ac73-d078f2c8eb36' },
    { name: 'Martell Cordon Bleu', category: 'Coñac', description: 'Coñac exclusivo con una rica paleta de sabores, incluyendo notas de frutas confitadas y especias.', price: 'CLP 140.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_015915038.png?alt=media&token=ede79456-7255-477b-9a66-a1485932904e' },
    { name: 'Hine Antique XO', category: 'Coñac', description: 'Coñac XO con una mezcla de eaux-de-vie añejadas, destacando por su elegancia y complejidad.', price: 'CLP 160.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_015940803.png?alt=media&token=21b8a7d4-d0f9-4cdb-8ce7-9d04bb96390a' },
    { name: 'Camus Borderies XO', category: 'Coñac', description: 'Coñac único de la región de Borderies, con un perfil floral y aterciopelado, envejecido en barricas de roble.', price: 'CLP 170.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_020005013.png?alt=media&token=54d503bb-dcc2-4660-8ad8-bca06cc1f9a6' },
    { name: 'Louis XIII de Rémy Martin', category: 'Coñac', description: 'Uno de los coñacs más prestigiosos del mundo, mezclado con eaux-de-vie que tienen hasta 100 años de antigüedad.', price: 'CLP 1.000.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cognac%2Fimagen_2023-12-13_020056367.png?alt=media&token=d22aa520-8fce-4d0a-8706-e247b9a7f7d0' },
    { name: 'Ron Zacapa 23 Solera', category: 'Ron', description: 'Ron guatemalteco, envejecido a través del sistema Solera, con notas de caramelo, frutas secas y especias.', price: 'CLP 40.000', image: '' },
    { name: 'Diplomático Reserva Exclusiva', category: 'Ron', description: 'Ron venezolano premium, con un perfil dulce y complejo, perfecto para disfrutar solo.', price: 'CLP 45.000', image: '' },
    { name: 'Mount Gay XO', category: 'Ron', description: 'Ron de Barbados, con un equilibrio perfecto entre dulzura natural y complejidad.', price: 'CLP 55.000', image: '' },
    { name: 'Flor de Caña 18 Años', category: 'Ron', description: 'Ron nicaragüense añejo, con notas de caramelo, coco y especias, ideal para un sabor suave y prolongado.', price: 'CLP 60.000', image: '' },
    { name: 'Appleton Estate 21 Años', category: 'Ron', description: 'Ron jamaicano de alta gama, con un perfil rico y complejo, envejecido por un mínimo de 21 años.', price: 'CLP 80.000', image: '' },
    { name: 'El Dorado 21 Años', category: 'Ron', description: 'Ron de Guyana, conocido por su cuerpo completo y notas de frutas oscuras, especias y tabaco.', price: 'CLP 70.000', image: '' },
    { name: 'Ron Centenario 25 Años', category: 'Ron', description: 'Ron costarricense super premium, con una mezcla de rones añejos y un sabor excepcionalmente suave.', price: 'CLP 100.000', image: '' },
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
    if(category == 'Todos'){
      this.selectedCategory = '';
    }
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

  clearCategoryFilter() {
    this.selectedCategory = '';
    this.filterDrinks();
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