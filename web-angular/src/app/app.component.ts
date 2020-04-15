import { Component } from '@angular/core';

import {LocalStorage} from './local.storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private MylocalStorage: LocalStorage) {

    if (this.MylocalStorage.exist('isLogin') === false) {
    this.MylocalStorage.setObject('isLogin', false);
  }


  }

  title = 'helloword';

}
