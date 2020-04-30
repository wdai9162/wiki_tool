import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalStorage} from '../../../local.storage';
import {Router} from '@angular/router';
import {LoginService} from '../../../controller/login/login.service';
import {Login} from '../../../model/login/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginModel;
  constructor(private fb: FormBuilder, private ls: LocalStorage, public router: Router, public LoginSer: LoginService) {
    this.LoginModel = new Login();
  }

  visible = false;
  loginForm: FormGroup;


  // create event emitter on click Signup
  @Output() clickSignup = new EventEmitter();
  @Output() clickReset  = new EventEmitter();


  async onLogin(): Promise<void> {


    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);


    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    // 实例化类使用方法

    if(await this.LoginSer.loginStatus(this.loginForm.value))
    {
       window.location.assign('/');
       this.closeLogin();
    }
    else
    {
      alert('login fail');
    }



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

