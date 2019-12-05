import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public data: any;
  public bankdata: any;
  public sessiontoken: any;
  accountno='';
  quantity='';

  constructor(private customer: CustomerService,private  router: Router,private _socioAuthServ: AuthService, private http: HttpClient) {
    this.sessiontoken = sessionStorage.getItem("TOKEN");
    }

  ngOnInit() {
    this.http.post('/api/getBankDetails',
    { "email":this.sessiontoken})
    .subscribe(
          response => {
              this.bankdata = response;
              //this.data = Array.of(this.data);
              console.log("data :"+response);
         });
    this.http.get('/api/getAllStocks')
    .subscribe(
          response => {
              this.data = response;
              //this.data = Array.of(this.data);
              console.log("data :"+response);
         });
  }
  buyMyStocks(item){
    if(this.accountno==null || this.quantity==null || item["tickersymbol"]==null || item["stockname"]==null)
    {
      alert("enter both fields");
    }
    else{
    this.http.post('/api/buyNewStock',
    { "tickersymbol":item["tickersymbol"],
      "stockname":item["stockname"],
      "accountno":this.accountno,
      "quantity":this.quantity,
      "email":this.sessiontoken,
      "currentprice":item["currentprice"]
      },{ responseType: 'text' })
    .subscribe(
          response => {
           alert(response)
           this.ngOnInit();
         });
  }
  }

}
