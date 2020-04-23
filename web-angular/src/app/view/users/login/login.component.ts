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


    // tslint:disable-next-line:only-arrow-functions
    // fetch('http://localhost:4200').then(re => re.text()).then( function(re) {
    //      // 这里是相当于用controller的方法直接去根据返回值渲染具体状态，状态设置完全由loginStatus控制
    //     thisCompoement.loginStatus(re);
    //     window.location.assign('/');
    //     thisCompoement.closeLogin();
    //   }
    //   // tslint:disable-next-line:only-arrow-functions
    // ).catch(function(error) {
    //   alert(error);
    // });

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

