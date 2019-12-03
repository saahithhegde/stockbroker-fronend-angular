import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
public data: any;
public sessiontoken: any;


  constructor(private customer: CustomerService,private  router: Router,private _socioAuthServ: AuthService, private http: HttpClient) {
  this.sessiontoken = sessionStorage.getItem("TOKEN");
  }

  logout(){
    this.customer.logout();
    this._socioAuthServ.signOut();
    this.router.navigateByUrl('/login');
  }
  buyMyStocks(item){
    this.http.post('/api/buyCurrentStocks',
    { "stock":item["tickersymbol"],
      "quantity":(document.getElementById("quantity") as HTMLInputElement).value
    })
    .subscribe(
          response => {
              this.data = response;
              //this.data = Array.of(this.data);
              console.log("data :"+response);
         });
    alert(item["tickersymbol"]+ (document.getElementById("quantity") as HTMLInputElement).value);
  }
  sellMyStocks(item){
    alert(item);
  }

  ngOnInit() {
  this.http.post('/api/getUserStocks',
    { "email":this.sessiontoken})
    .subscribe(
          response => {
              this.data = response;
              //this.data = Array.of(this.data);
              console.log("data :"+response);
         });
  }

}
