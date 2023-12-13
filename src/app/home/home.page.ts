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
    { name: 'Ron Zacapa 23 Solera', category: 'Ron', description: 'Ron guatemalteco, envejecido a través del sistema Solera, con notas de caramelo, frutas secas y especias.', price: 'CLP 40.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_021158027.png?alt=media&token=335e6613-ae6d-4fc4-a400-14934b72276a' },
    { name: 'Mount Gay XO', category: 'Ron', description: 'Ron de Barbados, con un equilibrio perfecto entre dulzura natural y complejidad.', price: 'CLP 55.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_021300292.png?alt=media&token=9413253a-490c-4300-890e-651425aa1dff' },
    { name: 'Flor de Caña 18 Años', category: 'Ron', description: 'Ron nicaragüense añejo, con notas de caramelo, coco y especias, ideal para un sabor suave y prolongado.', price: 'CLP 60.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_021332335.png?alt=media&token=3b399e2e-1a45-447e-9bd2-5f77f4fd49a4' },
    { name: 'Appleton Estate 21 Años', category: 'Ron', description: 'Ron jamaicano de alta gama, con un perfil rico y complejo, envejecido por un mínimo de 21 años.', price: 'CLP 80.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_021412688.png?alt=media&token=f197b3cf-34fe-4d9e-ba84-405c5342b6ac' },
    { name: 'El Dorado 21 Años', category: 'Ron', description: 'Ron de Guyana, conocido por su cuerpo completo y notas de frutas oscuras, especias y tabaco.', price: 'CLP 70.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_021519924.png?alt=media&token=10936230-2b78-4f46-9948-cfd9fd4cfb3f' },
    { name: 'Ron Centenario 25 Años', category: 'Ron', description: 'Ron costarricense super premium, con una mezcla de rones añejos y un sabor excepcionalmente suave.', price: 'CLP 100.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_021538562.png?alt=media&token=e45cdf22-04c5-4121-ac9d-ba1754336e96' },
    { name: 'Moët & Chandon Impérial', category: 'Champagne', description: 'Champagne francés vibrante y elegante, con notas de frutas verdes y cítricos.', price: 'CLP 50.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_022034081.png?alt=media&token=260bc87a-e874-4227-a04a-6eb3f2466f81' },
    { name: 'Veuve Clicquot Yellow Label', category: 'Champagne', description: 'Champagne reconocido por su equilibrio perfecto entre potencia y finura, con toques de vainilla y brioche.', price: 'CLP 60.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_022710288.png?alt=media&token=1b082d11-f98e-4a3b-9737-01f4d0ddd2f7' },
    { name: 'Perrier-Jouët Belle Epoque', category: 'Champagne', description: 'Champagne floral y refinado, con notas de frutas blancas y flores, presentado en una botella icónica.', price: 'CLP 180.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_022221537.png?alt=media&token=6c28b13c-2a8a-4edf-b69d-392824d67c5b' },
    { name: 'Krug Grande Cuvée', category: 'Champagne', description: 'Champagne de excepcional profundidad y complejidad, con un paladar rico y una textura sedosa.', price: 'CLP 220.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_022305144.png?alt=media&token=38977985-3397-4f5b-bb1e-99608e265cf3' },
    { name: 'Bollinger Special Cuvée', category: 'Champagne', description: 'Champagne con carácter distintivo, conocido por su estructura robusta y notas de frutas maduras.', price: 'CLP 100.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_022333661.png?alt=media&token=afae4759-656d-4a34-8ce7-17c5793c5cf1' },
    { name: 'Ruinart Blanc de Blancs', category: 'Champagne', description: 'Champagne exclusivamente de Chardonnay, con una frescura crujiente y aromas de cítricos y peras.', price: 'CLP 120.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Champagne%2Fimagen_2023-12-13_022354482.png?alt=media&token=824093af-d52b-4254-a625-f1a3d863de67' },
    { name: 'Delirium Tremens', category: 'Cervezas', description: 'Cerveza belga con un distintivo color rubio pálido y un sabor suave pero fuerte, conocida por su botella con elefantes rosados.', price: 'CLP 8.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_023127986.png?alt=media&token=fd313d54-7869-4e40-8754-a24edf22fc2c' },
    { name: 'Chimay Azul', category: 'Cervezas', description: 'Cerveza trapense oscura de Bélgica, con notas ricas de frutas y especias, y un carácter elegante y complejo.', price: 'CLP 10.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_023232985.png?alt=media&token=45c69c59-78ef-4679-a05e-205402c3e759' },
    { name: 'Weihenstephaner Hefe Weissbier', category: 'Cervezas', description: 'Cerveza alemana de trigo, con sabores de clavo y banana, refrescante y suave.', price: 'CLP 5.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_023324673.png?alt=media&token=d82ca4f0-5e35-4ec1-b5a7-b5d559064c8b' },
    { name: 'Guinness Draught', category: 'Cervezas', description: 'Cerveza stout irlandesa famosa por su sabor suave, cremoso y ligeramente tostado.', price: 'CLP 4.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_023350473.png?alt=media&token=8395db26-b408-48e2-a539-c8417fa4f8c0' },
    { name: 'Samuel Adams Boston Lager', category: 'Cervezas', description: 'Cerveza lager americana, equilibrada con sabores de malta caramelizada y lúpulo floral.', price: 'CLP 3.500', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_023410745.png?alt=media&token=0a4a8a99-4738-42b7-9ee3-cd9ad0a4381b' },
    { name: 'Dogfish Head 90 Minute IPA', category: 'Cervezas', description: 'Cerveza IPA americana, con un fuerte perfil de lúpulo y notas de malta dulce, una experiencia intensa y equilibrada.', price: 'CLP 6.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_023433281.png?alt=media&token=88564d4c-8f98-4bd3-bd97-819eb04557b9' },
    { name: 'Sapporo Premium Beer', category: 'Cervezas', description: 'Cerveza lager japonesa, conocida por su refrescante sabor limpio y su final nítido.', price: 'CLP 3.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Cervezas%2Fimagen_2023-12-13_023456922.png?alt=media&token=2258afe4-6a06-47b7-aab0-a4e8154cfb4d' },
    { name: 'Belvedere', category: 'Destilados', description: 'Vodka polaco de lujo, destilado cuatro veces para una mayor pureza, con un sabor suave y un toque de vainilla.', price: 'CLP 25.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_024213496.png?alt=media&token=c7ff7c95-5c6b-4a05-8491-afbaab12dd08' },
    { name: 'Absolut Elyx', category: 'Destilados', description: 'Vodka sueco premium, hecho con trigo de invierno único y agua pura, conocido por su textura sedosa y rica.', price: 'CLP 35.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_024235007.png?alt=media&token=518576cd-87a0-4fdd-80ce-f9df533514ca' },
    { name: 'Stolichnaya Elit', category: 'Destilados', description: 'Vodka ruso de alta gama, con un proceso de filtración especial que le otorga un sabor excepcionalmente suave y puro.', price: 'CLP 40.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_024301868.png?alt=media&token=e22499ab-7b1a-4aac-acab-6fd471da9227' },
    { name: 'Pisco Portón', category: 'Destilados', description: 'Pisco peruano premium, destilado en alambiques de cobre, con un perfil floral y frutal, ideal para Pisco Sour y otros cócteles.', price: 'CLP 20.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_024326037.png?alt=media&token=271f073c-c43b-41fe-ab5e-25704cf3eb43' },
    { name: 'Pisco Waqar', category: 'Destilados', description: 'Pisco chileno ultra-premium, elaborado con uvas Moscatel, con un sabor elegante y aromático, perfecto para cócteles refinados.', price: 'CLP 25.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_024348178.png?alt=media&token=0aaaf250-f993-4450-a374-dade77952c48' },
    { name: 'Pisco El Gobernador', category: 'Destilados', description: 'Pisco chileno de alta calidad, con un equilibrio perfecto entre dulzura y acidez, ideal para una amplia gama de cócteles.', price: 'CLP 15.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Destilados%2Fimagen_2023-12-13_024445606.png?alt=media&token=c8bf6669-4104-4e85-9ccb-3433b74ad955' },
    { name: 'Glenfiddich 21 Year Old Reserva Rum Cask Finish', category: 'Whisky/Whiskey', description: 'Whisky escocés único, finalizado en barricas de ron, con toques de plátano, higo y caramelo.', price: 'CLP 180.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_025040047.png?alt=media&token=e1711f14-72f2-4dd4-86d4-cd77486c2911' },
    { name: 'Jameson Black Barrel', category: 'Whisky/Whiskey', description: 'Whiskey irlandés, destilado tres veces y envejecido en barricas de bourbon carbonizadas, con notas de especias y vainilla.', price: 'CLP 35.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_025057116.png?alt=media&token=9a373b7d-d923-4d49-a8f7-93cf6ee139f7' },
    { name: 'Bulleit Bourbon 10 Year Old', category: 'Whisky/Whiskey', description: 'Bourbon americano añejo, con sabores ricos de roble tostado y notas de vainilla.', price: 'CLP 50.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_025125067.png?alt=media&token=5630f7e7-bb2d-481b-8740-caec2f41bf4b' },
    { name: 'Yamazaki 12 Year Old', category: 'Whisky/Whiskey', description: 'Whisky japonés de malta, con un perfil suave y frutal, con notas de melocotón y especias.', price: 'CLP 120.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_025148681.png?alt=media&token=24c2e51c-9ca4-4e14-8bcf-d99a918bb4fd' },
    { name: 'Lagavulin 16 Year Old', category: 'Whisky/Whiskey', description: 'Whisky escocés de Islay, conocido por su sabor intenso y ahumado, con notas de yodo y algas marinas.', price: 'CLP 85.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_025207615.png?alt=media&token=3c490252-589b-4f99-a19f-ba2cdcaf0aae' },
    { name: 'Jack Daniels Single Barrel', category: 'Whisky/Whiskey', description: 'Whiskey americano de Tennessee, seleccionado de barricas individuales para su carácter único, con notas de caramelo y especias.', price: 'CLP 60.000', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Whisky%26Whiskey%2Fimagen_2023-12-13_025247438.png?alt=media&token=cb4104ce-2830-45a9-8223-53d3c4086e8e' },
    { name: 'Ron Whesley', category: 'Ron', description: 'Un destilado mágico con un encantador toque de jengibre y especias, inspirado en el famoso personaje de una saga de magia. Perfecto para aquellos que disfrutan de un poco de magia en su copa.', price: 'INT_MAX', image: 'https://firebasestorage.googleapis.com/v0/b/imageuser-89a50.appspot.com/o/Productos%20-%20Ron%2Fimagen_2023-12-13_025620214.png?alt=media&token=41b11dd6-eea8-41c6-8dc7-291b7bf52845' }
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