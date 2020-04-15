import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  visible = false;



  constructor(private fb: FormBuilder, public userService: UserService) {}

  selectedValue = 'question1';
  onSignup(): void {
    if (this.signupForm.invalid){
      return;
    }
    this.userService.createUser(this.signupForm.value.userEmail, this.signupForm.value.password);
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  openSignup(): void {
    this.visible = true;
  }

  closeSignup(): void{
    this.visible = false;
  }

}

