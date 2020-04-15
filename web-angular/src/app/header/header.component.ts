import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})

export class HeaderComponent{

  //create event emitter on click Login
  @Output() clickLogin = new EventEmitter();

  //create event emitter on click Signup
  @Output() clickSignup = new EventEmitter();

  @Output() clickReset = new EventEmitter();

  onClickLogin() {
    this.clickLogin.emit();
  }

  onClickSignup() {
    this.clickSignup.emit();
  }

  onClickReset() {
    this.clickReset.emit();
  }

}
