import { Component, OnInit } from '@angular/core';

import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';

declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',   class: '' },
    { path: '/profile', title: 'User Profile',   class: '' },
    { path: '/payment', title: 'Payment',  class: '' },
    { path: '/stocks', title: 'Stocks',  class: '' },
    { path: '/payment', title: 'Payment',  class: '' },
  
];
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  menuItems: any[];

  constructor(private customer: CustomerService,private  router: Router,private _socioAuthServ: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  logout(){
      this.customer.logout();
      this._socioAuthServ.signOut();
      this.router.navigateByUrl('/login');
    }

}
