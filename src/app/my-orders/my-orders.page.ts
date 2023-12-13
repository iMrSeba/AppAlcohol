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
  orders: any = null;  
  constructor(private authService: AuthService,private router: Router,private http: HttpClient) { 
    this.http.get(environment.apiUrlOrder + '/orders').subscribe(
      (res: any) => {
        this.orders = res;
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
