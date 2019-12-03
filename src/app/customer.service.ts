import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';
const NAME = 'NAME';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  setName(fname: string): void{
    sessionStorage.setItem(NAME,fname);
  }

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN, token);
  }


  isLogged() {
    return sessionStorage.getItem(TOKEN) != null;
  }

  logout(){
    sessionStorage.clear();
  }
}
