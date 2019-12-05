import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormControl } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public bankdata: any;
  public sessiontoken: any;
  public data:any;
  tickersymbol='';
  accountno='';
  action='';
  time='';
  quantity='';
  recurringvalue='';

    constructor(private formBuilder: FormBuilder,private  router: Router,private http: HttpClient) {
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

         this.http.post('/api/getUserStocks',
         { "email":this.sessiontoken})
         .subscribe(
               response => {
                   this.data = response;
                   //this.data = Array.of(this.data);
                   console.log("data :"+response);
              });
       }
       deletesched(){

      }
      submitquery(){
        this.http.post('/api/addSchedule',
      { "email":this.sessiontoken,
        "ticekrsymbol":this.tickersymbol,
        "buyorsell":this.action,
        "accountno":this.accountno,
        "Quantity":this.quantity,
        "recurringvalue":this.recurringvalue
      })
    .subscribe(
          response => {
              alert(response);
              //this.data = Array.of(this.data);
         });
        
      }
  }
 

