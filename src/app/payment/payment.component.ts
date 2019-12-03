import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {Router} from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  accountno = new FormControl('');
  routingno = new FormControl('');
  public sessiontoken: any;
  public data:any;
  public  isChecked : boolean;


 
  constructor(private formBuilder: FormBuilder,private  router: Router,private http: HttpClient){
    this.sessiontoken = sessionStorage.getItem("TOKEN");
  }
  

  ngOnInit() {
    this.http.post('/api/getBankDetails',
    { "email":this.sessiontoken})
    .subscribe(
          response => {
              this.data = response;
              //this.data = Array.of(this.data);
              console.log("data :"+response);
         });
  }

  addBankAccount()
  {
    if(this.accountno.value==null && this.routingno.value==null)
    {
      alert("enter both values");

    }
    else{
    this.http.post('/api/addBankDetails',
    { "email":this.sessiontoken,
      "accountno":this.accountno.value,
      "routingno":this.routingno.value,
      "default": this.isChecked
  },{ responseType: 'text' })
    .subscribe(
          response => {
            alert(response);
            this.ngOnInit();
            
         });
  }
  }
  deleteAccount(accountno)
  {
    this.http.post('/api/deleteBankDetails',
    { "email":this.sessiontoken,
      "accountno":accountno
  },{ responseType: 'text' })
    .subscribe(
          response => {
            alert(response);
            this.ngOnInit();
            
         });
  }
 
  }