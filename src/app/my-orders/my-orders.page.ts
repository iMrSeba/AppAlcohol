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

  constructor(private authService: AuthService,private router: Router,private http: HttpClient) { }

  ngOnInit() {
  }

  orders: any = [];
  ionViewWillEnter(){
    this.http.get(environment.apiUrlOrder + '/orders').subscribe(
      (res: any) => {
        this.orders = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
