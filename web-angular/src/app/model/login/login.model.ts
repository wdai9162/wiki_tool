export class Login {
  get User(): { remember: boolean; password: string; userEmail: string } {
    return this._User;
  }

  set User(value: { remember: boolean; password: string; userEmail: string }) {
    this._User = value;
  }
  // tslint:disable-next-line:variable-name
  private _User = {userEmail: '', password: '', remember: false};

}
