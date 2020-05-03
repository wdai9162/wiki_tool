export class Inidividual {
  get info(): string {
    return this._info;
  }

  set info(value: string) {
    this._info = value;
  }


  // tslint:disable-next-line:variable-name
  private _articleList: string[] = ['loading' ];
  // tslint:disable-next-line:variable-name
  private _info = 'loading';


  // tslint:disable-next-line:variable-name
  get articleList(): string[] {
    return this._articleList;
  }

  set articleList(value: string[]) {
    this._articleList = value;
  }

  get defaultTitle(): string {
    return this._defaultTitle;
  }

  set defaultTitle(value: string) {
    this._defaultTitle = value;
  }
  // tslint:disable-next-line:variable-name
  private _defaultTitle  = 'loading';
}
