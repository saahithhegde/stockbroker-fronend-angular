import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResultModel} from './model/LoginResultModel'
import { stringify } from 'querystring';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { getLocaleDayNames } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  login(emails: string, password: string): Observable<LoginResultModel>{
    const header = new HttpHeaders({Authorization: 'Basic ' + btoa('test:test123')});
    return this.http.post<LoginResultModel>('/api/login',{
      email: emails,
      password: password
    },{headers:header});
  }
  register(fname: String, lname: String,pwd: String, emails: String): Observable<LoginResultModel>{
    const header = new HttpHeaders({Authorization: 'Basic ' + btoa('test:test123')});
    return this.http.post<LoginResultModel>('/api/signUp', {
      firstname: fname,
      lastname: lname,
      password: pwd,
      email: emails
      //select_option: s_option
    },{headers:header});
  }

}
