import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visible = false;
  loginForm: FormGroup;


  onLogin(): void {


    if (this.loginForm.invalid) {
      return;
    }

    //console.log(this.loginForm.value);


    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    //create form group via formBuilder to implment validators
    this.loginForm = this.fb.group({
      'userEmail': [null, [Validators.required,Validators.email]],
      'password': [null, [Validators.required]],
      'remember': [true]
    });
  }

  openLogin(): void {
    this.visible = true;
  }

  closeLogin(): void{
    this.visible = false;
  }

  //create event emitter on click Signup
  @Output() clickSignup = new EventEmitter();

  openSignup(): void{
    this.visible = false;
    this.clickSignup.emit();
  }

}

