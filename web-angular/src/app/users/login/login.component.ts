import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalStorage} from '../../local.storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private ls: LocalStorage, public router: Router) {}

  visible = false;
  loginForm: FormGroup;
  // tslint:disable-next-line:variable-name

  // create event emitter on click Signup
  @Output() clickSignup = new EventEmitter();
  @Output() clickReset  = new EventEmitter();


  onLogin(): void {


    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);


    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    this.ls.setObject('isLogin', true);
    window.location.assign('/');
    this.closeLogin();


    fetch('http://127.0.0.1:3000/', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
      // tslint:disable-next-line:only-arrow-functions
      .then(response => response.text() )
      // tslint:disable-next-line:only-arrow-functions
      .then(function(mydata) {
        console.log(mydata);

    });
  }

  ngOnInit(): void {

    // create form group via formBuilder to implment validators
    this.loginForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  openLogin(): void {
    this.visible = true;

  }

  closeLogin(): void{
    this.visible = false;
  }

  openSignup(): void{
    this.visible = false;
    this.clickSignup.emit();
  }

  openReset(): void{
    this.visible = false;
    this.clickReset.emit();
  }


}

