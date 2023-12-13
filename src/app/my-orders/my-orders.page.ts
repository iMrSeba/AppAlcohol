import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})


export class MyOrdersPage implements OnInit {
  orders: any[] = [];  
  idUser: any = null;
  constructor(private authService: AuthService,private router: Router,private http: HttpClient) { 
    this.http.get(environment.apiUrlOrder + '/orders').subscribe(
      (res: any) => {
        const user = this.authService.getUser();
      
        this.idUser = user.id,
      
        
        console.log(this.idUser+"id useire");


        this.orders = res.filter((order: { userId: any; }) => order.userId === this.idUser);
        console.log(this.orders);
        
      },
      (error) => {
        console.log(error);
      }
    );
    
  }

  

  ngOnInit() {
  }

}
