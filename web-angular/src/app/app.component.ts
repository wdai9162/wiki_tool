import { Component } from '@angular/core';

import {LocalStorage} from './local.storage';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private MylocalStorage: LocalStorage) {
    const height = window.innerHeight;
    MylocalStorage.setObject('windowHeight', height);

    // tslint:disable-next-line:max-line-length
    if (this.MylocalStorage.exist('isLogin') === false) {
      this.MylocalStorage.setObject('isLogin', false);
    }
    else {
      // tslint:disable-next-line:max-line-length
      fetch('http://127.0.0.1:3000/api/user/loginstatus', {headers: {authorization: this.MylocalStorage.getObject('token')}}).then(res => res.json()).then(data => {
        if (data.decode) {
          this.MylocalStorage.setObject('isLogin', true);
        } else {
          console.log('error');
          this.MylocalStorage.setObject('isLogin', false);
        }
      });

    }
  }

  title = 'helloword';



}
