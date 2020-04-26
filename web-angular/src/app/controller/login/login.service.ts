import { Injectable } from '@angular/core';
import {LocalStorage} from '../../local.storage';
import {Login} from '../../model/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  async getData(url) {
    // tslint:disable-next-line:one-variable-per-declaration
    const request = await fetch(url);
    return await request.json();
  }

  async postData(url, data) {
    // tslint:disable-next-line:one-variable-per-declaration
    const request = await fetch(url, { body: JSON.stringify(data), method: 'POST', headers: {'Content-Type': 'application/json'}});
    return await request.json();
  }

  async loginStatus(User: []): Promise<boolean> {
    // tslint:disable-next-line:prefer-const
    const jsonStatus = await this.postData('http://127.0.0.1:3000/api/user/login', User);
    if (await jsonStatus.confirmation === 'success') {
        console.log(jsonStatus);
        await this.ls.setObject('isLogin', true);
        await this.ls.setObject('username', jsonStatus.user );
        await this.ls.setObject('token', jsonStatus.jst);
        return  true;
    } else {
      await this.ls.remove('isLogin');
      return false;

    }
  }
  constructor(private ls: LocalStorage) { }

}
