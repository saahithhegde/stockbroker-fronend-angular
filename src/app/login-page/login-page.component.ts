import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
 
  email = '';
  password = '';
  remail='';
  rpassword='';
  rcpassword='';
  rquestion='';
  ranswer='';
  rfname='';
  rlname='';
  

  constructor(private http: HttpClient,private api: ApiService, private customer: CustomerService, private router: Router,private _socioAuthServ: AuthService) {
  }
  ngOnInit() {
  this.customer.logout();
  this._socioAuthServ.signOut();
  }
  tryLogin() {
    if(this.email==null && this.password==null)
    {
      alert("enter both fields");
    }
    else
    {
    this.api.login(
      this.email,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setName(r.fname);
            this.customer.setToken(r.token);
            this.router.navigateByUrl('/dashboard');
          }
          else
          {
            alert(r.error);
          }
        });
  }
}
   logout(){
      this.customer.logout();
      this._socioAuthServ.signOut();
      this.router.navigateByUrl('/login');
    }

  signUp(){
    if(this.rfname==""&& this.rlname==""&&this.remail==""&& this.rpassword=="" && this.rcpassword=="" && this.rquestion=="" && this.ranswer=="")
    {
      alert("enter all fileds");
    }
    else
    {
      if(this.rpassword.toString==this.rcpassword.toString)
      {
        this.http.post('/api/signUp',
       {
          "firstname":this.rfname,
          "lastname": this.rlname,
          "email": this.remail,
          "password": this.rpassword,
          "question": this.rquestion,
          "answer": this.ranswer,
     
    },{ responseType: 'text' }).subscribe(
      response => {
          if(response=="created user") 
           {
             alert("created user");
          this.redirect();
          }
          else
          {
            alert("user already exists please try again")
          }
     });
      }
      else 
      {
        alert("passwords do not match")
      }
    }
  }

  getRegister()
  {
    document.getElementById("register").style.display="block";
    document.getElementById("login").style.display="none";
    document.getElementById("forgotpassword").style.display="none";
  }
  redirect(){
  document.getElementById("login").style.display="block";
  document.getElementById("register").style.display="none";
  document.getElementById("forgotpassword").style.display="none";

  }
 
  singInGoogle(platform : string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._socioAuthServ.signIn(platform).then(
      (response) => {
        if(response.email){

          this.api.login(
            response.email,
            "defaultpsw123"
          )
            .subscribe(
              r => {
                if (r.token) {
                  this.customer.setName(r.fname);
                  this.customer.setToken(r.token);
                  this.router.navigateByUrl('/dashboard');
                }
                else
                {
                  alert(r.error);
                }
              });
        }
        else
        {
          alert("could not sign in")
        }
      }
    );
  }

  singUpGoogle(platform: string): void{
    platform=GoogleLoginProvider.PROVIDER_ID;
    this._socioAuthServ.signIn(platform).then(
      (response) => {
        if(response.email){

          this.http.post('/api/signUp',
        {
          "firstname":response.firstName,
          "lastname": response.lastName,
          "email": response.email,
          "password": "defaultpsw123",
          "question": "",
          "answer": "",
     
    },{ responseType: 'text' }).subscribe(
      response => {
          alert(response); 
          this.redirect();
     });

        }

      }
    )
  }
  forgotpasswordfunc(){
    document.getElementById("register").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("forgotpassword").style.display="block";
  }
  showpassword(){
    this.http.post('/api/forgotPassword',
    { "email":this.remail,
    "question": this.rquestion,
    "answer": this.ranswer,
  },{ responseType: 'text' }).subscribe(
    response => {
      alert(response); 
      
  });
  }

}