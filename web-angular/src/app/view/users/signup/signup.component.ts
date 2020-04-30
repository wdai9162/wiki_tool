import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// tslint:disable-next-line:import-spacing
import  {SignupService} from '../../../controller/signup/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  visible = false;



  constructor(private fb: FormBuilder, private  SUservice: SignupService) {}

  selectedValue = 'question1';
  async onSignup(): Promise<void> {
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm.value);
    const respond = await this.SUservice.createuser(this.signupForm.value);

    if(await respond.error != null)
    {
      alert('register fail');
    }
    else
    {
      alert(respond.message);
    }
    this.closeSignup();
    // this.userService.createUser(this.signupForm.value.userEmail, this.signupForm.value.password);
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: [null , [Validators.required, Validators.required]],
      lastname: [null,  [Validators.required, Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.required]],
      answer:[null,  [Validators.required, Validators.required]],
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

