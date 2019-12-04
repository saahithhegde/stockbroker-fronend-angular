import { Component } from '@angular/core';
import {CustomerService} from './customer.service';
import {Router} from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  public sessiontoken: any;
  public name:any;
  constructor(private customer: CustomerService,private  router: Router,private _socioAuthServ: AuthService, private http: HttpClient) {
    this.sessiontoken = sessionStorage.getItem("TOKEN");
    this.name=sessionStorage.getItem("NAME")
    }
  
    logout(){
      this.customer.logout();
      this._socioAuthServ.signOut();
      this.router.navigateByUrl('/login');
    }  

}
