import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-querystocks',
  templateUrl: './querystocks.component.html',
  styleUrls: ['./querystocks.component.css']
})
export class QuerystocksComponent implements OnInit {
  duration='';
  tickersymbol='';
  public data:any;
  public history:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/getAllStocks')
    .subscribe(
          response => {
              this.data = response;
              //this.data = Array.of(this.data);
              console.log("data :"+response);
         });

  }
  submitquery(){
    
    this.http.post('/api/getStockHistory',
    { 
      "tickerSymbol":this.tickersymbol,
      "range":this.duration
      })
    .subscribe(
          response => {
           this.history=response
   
         });
        }
    
  }


