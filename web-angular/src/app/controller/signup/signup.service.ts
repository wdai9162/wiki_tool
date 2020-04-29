import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }


  async createuser(user)
  {
    const respond = await fetch('http://127.0.0.1:3000/api/user/signup', {body: JSON.stringify(user), method: 'POST', headers: {'Content-Type': 'application/json'}});

    return await respond.json();
  }
}
