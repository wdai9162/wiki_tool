import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  async postData(url, data) {
    // tslint:disable-next-line:one-variable-per-declaration
    const request = await fetch(url, { body: JSON.stringify(data), method: 'POST', headers: {'Content-Type': 'application/json'}});
    return await request.json();
  }

  async postQuestionData(email)
  {
   return await this.postData('http://127.0.0.1:3000/api/user/checkIfUserExists', email);
  }

  async postCheckAnswer(answerData)
  {
    return await this.postData('http://127.0.0.1:3000/api/user/checkIfAnswerCorrect', answerData);
  }

  async postReset(NewPasswordData)
  {
    return await this.postData('http://127.0.0.1:3000/api/user/resetPassword', NewPasswordData);
  }
  constructor() { }
}
