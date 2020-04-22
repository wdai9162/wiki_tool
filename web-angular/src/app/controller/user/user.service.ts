import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorage} from '../../local.storage';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private ls: LocalStorage) {
  }

  createUser(email: string, password: string, questionOption, LastName: string, FirstName: string) {


  }

  // tslint:disable-next-line:ban-types
  loginStatus(status: string): string {
    // tslint:disable-next-line:prefer-const
    const jsonStatus = status;
    if (jsonStatus) {
      this.ls.setObject('isLogin', true);
      this.ls.setObject('username', 'sam');
      return jsonStatus;
    } else {
      alert('password error');

    }
  }


}


