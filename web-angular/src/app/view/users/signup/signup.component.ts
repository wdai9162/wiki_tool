import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  visible = false;



  constructor(private fb: FormBuilder) {}

  selectedValue = 'question1';
  onSignup(): void {
    if (this.signupForm.invalid){
      return;
    }
    console.log(this.signupForm);
    // this.userService.createUser(this.signupForm.value.userEmail, this.signupForm.value.password);
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      FirstName: [null , [Validators.required, Validators.required]],
      LastName: [null,  [Validators.required, Validators.required]],
      userEmail:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.required]],
      Answer:[null,  [Validators.required, Validators.required]],
      question : [null]



    });
  }

  openSignup(): void {
    this.visible = true;
  }

  closeSignup(): void{
    this.visible = false;
  }

}

