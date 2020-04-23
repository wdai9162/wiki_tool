export class Login {
  private _UserEmail: string;
  private _Password: string;
  private _remember: string;

  get UserEmail(): string {
    return this._UserEmail;
  }

  set UserEmail(value: string) {
    this._UserEmail = value;
  }

  get Password(): string {
    return this._Password;
  }

  set Password(value: string) {
    this._Password = value;
  }

  get remember(): string {
    return this._remember;
  }

  set remember(value: string) {
    this._remember = value;
  }
}
