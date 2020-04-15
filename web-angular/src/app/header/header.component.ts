import { Component, EventEmitter, Output } from "@angular/core";
import {LocalStorage} from '../local.storage';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})

export class HeaderComponent{

  // create event emitter on click Login
  @Output() clickLogin = new EventEmitter();

  // create event emitter on click Signup
  @Output() clickSignup = new EventEmitter();

  @Output() clickReset = new EventEmitter();

  @Output() clickLogout = new EventEmitter();
  constructor(private ls: LocalStorage) {
  }
  isLogin = this.ls.getObject('isLogin');

  onClickLogin() {
    this.clickLogin.emit();
  }

  onClickSignup() {
    this.clickSignup.emit();
  }

  onClickLogout() {
    // @ts-ignore
    this.ls.remove('isLogin');
    window.location.assign('');
  }

}
