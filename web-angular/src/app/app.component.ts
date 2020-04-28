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

    // tslint:disable-next-line:max-line-length
    fetch('http://127.0.0.1:3000/api/user/loginstatus', { headers : this.MylocalStorage.getObject('token')}).then(res => res.json()).then(data => {
      console.log(data);
      if (data.decode)
      {
        this.MylocalStorage.setObject('isLogin', true);
      }
      // if (this.MylocalStorage.exist('isLogin') === false) {
      //   this.MylocalStorage.setObject('isLogin', false);
      // }
      else {
        this.MylocalStorage.setObject('isLogin', false);
      }
    }).catch(error => this.MylocalStorage.setObject('isLogin', false));
    // if (this.MylocalStorage.exist('isLogin') === false) {
    //   this.MylocalStorage.setObject('isLogin', false);
    // }



  }

  title = 'helloword';



}
