export class Author {
  get timeStampList(): string[] {
    return this._timeStampList;
  }

  set timeStampList(value: string[]) {
    this._timeStampList = value;
  }
  get articleList(): string[] {
    return this._articleList;
  }

  set articleList(value: string[]) {
    this._articleList = value;
  }
  get authorList(): string[] {
    return this._authorList;
  }

  set authorList(value: string[]) {
    this._authorList = value;
  }
  // tslint:disable-next-line:variable-name
  private _authorList: string [];

  // tslint:disable-next-line:variable-name
  private _articleList: string[] =[];

  // tslint:disable-next-line:variable-name
  private _timeStampList: string[] = [];
}
