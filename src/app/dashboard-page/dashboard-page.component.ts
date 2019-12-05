import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
import * as Chartist from 'chartist';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
public data: any;
public bankdata:any;
public sessiontoken: any;
accountno='';
quantity='';
header = new HttpHeaders({Authorization: 'Basic ' + btoa('test:test123')});



  constructor(private customer: CustomerService,private  router: Router,private _socioAuthServ: AuthService, private http: HttpClient) {
  this.sessiontoken = sessionStorage.getItem("TOKEN");
  }

  logout(){
    this.customer.logout();
    this._socioAuthServ.signOut();
    this.router.navigateByUrl('/login');
  }
  buyMyStocks(item){
    if(this.accountno==null || this.quantity==null)
    {
      alert("enter both fields");
    }
    else{
    this.http.post('/api/buyCurrentStocks',
    { "stocktableid":item["stocktableid"],
      "accountno":this.accountno,
      "quantity":this.quantity,
      "currentprice":item["currentprice"]
      },{ responseType: 'text' })
    .subscribe(
          response => {
           alert(response)
           this.ngOnInit();
         });
  }
}
  sellMyStocks(item){
    if(this.accountno==null || this.quantity==null)
    {
      alert("enter both fields");
    }
    else{
    this.http.post('/api/sellCurrentStocks',
    { "stocktableid":item["stocktableid"],
      "accountno":this.accountno,
      "quantity":this.quantity,
      "currentprice":item["currentprice"]
      },{ responseType: 'text' })
    .subscribe(
          response => {
           alert(response);
           this.ngOnInit();
         });
  }
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