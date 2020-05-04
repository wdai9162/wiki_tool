import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorage} from '../../../local.storage';
import {ResetService} from '../../../controller/reset/reset.service';
import {ancestorWhere} from 'tslint';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  constructor(private fb: FormBuilder, private ls: LocalStorage, private resetSer: ResetService) {}
  question = '';
  visible = false;
  loginForm: FormGroup;
  email = '';
  answer  = '';
  newPassword = '';
  // tslint:disable-next-line:variable-name
  switch_expression: string;

  // create event emitter on click Signup
  @Output() clickSignup = new EventEmitter();
   keyupHandlerEmail(event: any) {
    this.email = event.target.value;
  }
  keyupHandlerAnswer(event: any)
  {
    this.answer = event.target.value;
  }

  keyupHandlerReset(event: any)
  {
    this.newPassword = event.target.value;
  }


  onReset(): void {
    this.closeReset();

  }

  ngOnInit(): void {

    // create form group via formBuilder to implment validators
    this.loginForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      Answer: [null, [Validators.required]],
      NewPassword: [null, [Validators.required]],
    });
    this.switch_expression = '0';
  }

  openReset(): void {
    this.visible = true;

  }

  async openQuestion(): Promise<void> {
    console.log(this.email);
    const result = await this.resetSer.postQuestionData({userEmail: this.email});

    if (result.confirmation === 'Exists')
    {
      if (result.question === 'question1')
      {
        this.question = 'what\'s your favourite color?';
      }
      else if (result.question === 'question2')
      {
        this.question = 'what\'s your mother\'s name?';

      }
      else if (result.question === 'question3')
      {
        this.question = 'what\'s your favourite number?';
      }
      else
        {
          alert('problem account');
          this.closeReset();
      }
      this.switch_expression = '1';

    }
    else
    {
      alert('account is no exist');
      this.email = '';
      this.closeReset();
    }


  }

  async openNewPwd(): Promise<void> {
    console.log(this.answer);
    const result = await this.resetSer.postCheckAnswer({userEmail: this.email, answer: this.answer});
    console.log(result);
    // tslint:disable-next-line:triple-equals
    if ( result.confirmation == 'Correct!') {
    this.switch_expression = '2';
    }
    else
    {
      alert('your answer is wrong');
    }
  }

  async Reset(): Promise<void> {
    console.log(this.newPassword);
    const result = await this.resetSer.postReset({userEmail: this.email, password: this.newPassword});
    // tslint:disable-next-line:triple-equals
    if ( result.confirmation == 'Success!')
    {
      alert('congratulation,now you can login in your new password');
      this.closeReset();
    }
    else
    {
      alert('your fail in change your password');
      this.closeReset();
    }
  }


  closeReset(): void{
    this.switch_expression = '0';
    this.email = '';
    this.question = '';
    this.newPassword = '';
    this.visible = false;
  }




}

