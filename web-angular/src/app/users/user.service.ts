import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";


@Injectable({ providedIn: "root" })
export class UserService  {
  constructor(private http: HttpClient){}

  createUser(email: string, password: string) {
    const user: User ={
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/user/signup", user)
    .subscribe(response => {
      console.log(response);
    });
  }
}
