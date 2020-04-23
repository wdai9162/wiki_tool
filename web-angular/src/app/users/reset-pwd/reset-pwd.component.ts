import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorage} from '../../local.storage';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  constructor(private fb: FormBuilder, private ls: LocalStorage) {}

  visible = false;
  loginForm: FormGroup;
  // tslint:disable-next-line:variable-name
  switch_expression: string;

  // create event emitter on click Signup
  @Output() clickSignup = new EventEmitter();


  onReset(): void {
    this.closeReset();
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
    this.closeReset();

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
    this.switch_expression = '0';
  }

  openReset(): void {
    this.visible = true;

  }

  openQuestion(): void
  {
    this.switch_expression = '1';
  }

  openNewPwd(): void
  {
    this.switch_expression = '2';
  }


  closeReset(): void{
    this.switch_expression = '0';
    this.visible = false;
  }




}

