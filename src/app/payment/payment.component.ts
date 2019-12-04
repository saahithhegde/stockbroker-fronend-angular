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
  public bankdata:any;
  accountno1=new FormControl('');
  accountno2=new FormControl('');
  amount=new FormControl('');



 
  constructor(private formBuilder: FormBuilder,private  router: Router,private http: HttpClient){
    this.sessiontoken = sessionStorage.getItem("TOKEN");
  }
  

  ngOnInit() {
    this.http.post('/api/getBankDetails',
    { "email":this.sessiontoken})
    .subscribe(
          response => {
              this.data = response;
              this.bankdata=response;
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
 
  transfer(){
    if(this.accountno1.value==null || this.accountno2.value==null || this.amount.value==null)
    {
      alert("enter all details to transfer");
    }
    else if (this.accountno1.value==this.accountno2.value)
    {
      alert("cannot transfer to same accounts");
    }
    else{
      this.http.post('/api/transferBankFunds',
    { "account1":this.accountno1.value,
      "account2":this.accountno2.value,
      "amount":this.amount.value
  },{ responseType: 'text' })
    .subscribe(
          response => {
            alert(response);
            this.ngOnInit();
            
         });

    }
  }
  }