import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user.model';
import {LocalStorage} from '../../local.storage';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private ls: LocalStorage) {
  }

  createUser(email: string, password: string) {
    const user: User = {
      email,
      password
    }
    this.http.post('http://localhost:3000/user/signup', user)
      .subscribe(response => {
        console.log(response);
      });

  }

  // tslint:disable-next-line:ban-types
  loginStatus(status: string): string {
    // tslint:disable-next-line:prefer-const
    //纯ui

    //纯ui
    const jsonStatus = status
    if (jsonStatus) {
      this.ls.setObject('isLogin', true);
      this.ls.setObject('username', "123123");
      return jsonStatus;
    } else {
      alert('password error');

    }
  }


}


