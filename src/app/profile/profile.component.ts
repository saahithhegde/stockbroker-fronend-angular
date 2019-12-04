import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { FormBuilder,FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');
  fname=new FormControl('');
  lname=new FormControl('');
  public sessiontoken: any;
  public name:any;
 
  

  constructor(private formBuilder: FormBuilder,private  router: Router,private http: HttpClient) {
    this.sessiontoken = sessionStorage.getItem("TOKEN");
    this.name = sessionStorage.getItem("NAME");
   }


  ngOnInit() {
   

    this.http.post('/api/getUserProfile',
    { "email":this.sessiontoken}).subscribe(
    response => {
      this.email.setValue(this.sessiontoken);
      this.fname.setValue(response[0]["firstname"]);
      this.lname.setValue(response[0]["lastname"]);
      this.password.setValue(response[0]["password"]);
      
  });
}
  
  updateProfile(){
    this.http.post('/api/updateUserProfile',
    { "email":this.email.value,
    "firstname":this.fname.value,
    "lastname":this.lname.value,
    "password":this.password.value
  },{ responseType: 'text' }).subscribe(
    response => {
      sessionStorage.removeItem("NAME");
      sessionStorage.setItem("NAME",this.fname.value);
   alert(response);
   this.ngOnInit();
    
  });
}

}