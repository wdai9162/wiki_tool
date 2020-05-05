export class Author {
  get authorList(): string[] {
    return this._authorList;
  }

  set authorList(value: string[]) {
    this._authorList = value;
  }
  // tslint:disable-next-line:variable-name
  private _authorList: string [];

}
