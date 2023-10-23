import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public searchTerm: string = '';
  public drinks: any[] = [
    { name: 'Heineken', description: 'Cerveza lager de origen holandés.', price: 'CLP 1.800' },
    { name: 'Carmenere Reserva', description: 'Vino tinto chileno con notas de frutas rojas.', price: 'CLP 9.500' },
    { name: 'Absolut', description: 'Vodka sueco con un sabor claro y crujiente.', price: 'CLP 15.000' },
    { name: 'Havana Club 7 años', description: 'Ron cubano, añejado durante 7 años.', price: 'CLP 13.500' },
    { name: 'Jose Cuervo Especial', description: 'Tequila mexicano, perfecto para margaritas.', price: 'CLP 12.800' },
    { name: 'Johnnie Walker Black Label', description: 'Whisky escocés con notas ahumadas y afrutadas.', price: 'CLP 25.000' },
    { name: 'Bombay Sapphire', description: 'Ginebra con 10 ingredientes botánicos.', price: 'CLP 18.000' },
    { name: 'Pisco Capel', description: 'Pisco chileno, destilado de uvas muscat.', price: 'CLP 7.500' },
    { name: 'Corona Extra', description: 'Cerveza clara mexicana.', price: 'CLP 2.000' },
    { name: 'Casillero del Diablo', description: 'Vino tinto con cuerpo y un sabor característico.', price: 'CLP 10.500' }
    //acá se añaden más si es necesario
  ];
  public filteredDrinks: any[] = [];
  public isGrid: boolean = true;

    toggleView() {
      this.isGrid = !this.isGrid;
    }

  constructor() { }

  ngOnInit() {
    this.filteredDrinks = this.drinks; // Inicialmente mostrar todas las bebidas.
  }

  filterDrinks() {
    const searchTermLower = this.searchTerm.toLowerCase();
  
    if (!this.searchTerm.trim()) {
      this.filteredDrinks = this.drinks; // If no search term, show all drinks.
    } else {
      this.filteredDrinks = this.drinks.filter(drink => {
        return drink.name.toLowerCase().includes(searchTermLower);
      });
    }
  }
}