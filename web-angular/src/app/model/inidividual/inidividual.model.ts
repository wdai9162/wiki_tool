export class Inidividual {

  get TopFiveUser(): { data: [{ _id: "loading"; revCount: "loading" }] } {
    return this._TopFiveUser;
  }

  set TopFiveUser(value: { data: [{ _id: "loading"; revCount: "loading" }] }) {
    this._TopFiveUser = value;
  }

  get TopNews(): { data: [{ title: "loading"; URL: "loading" }] } {
    return this._TopNews;
  }

  set TopNews(value: { data: [{ title: "loading"; URL: "loading" }] }) {
    this._TopNews = value;
  }

  get articleList(): { data: [{ _id: "loading"; revCount: "loading" }] } {
    return this._articleList;
  }

  set articleList(value: { data: [{ _id: "loading"; revCount: "loading" }] }) {
    this._articleList = value;
  }
  get renumber(): string {
    return this._renumber;
  }

  set renumber(value: string) {
    this._renumber = value;
  }
  get info(): string {
    return this._info;
  }


  set info(value: string) {
    this._info = value;
  }
  private _TopFiveUser: {data: [{_id:'loading',revCount:'loading'}]};
  private _TopNews: {data: [{title:'loading',URL:'loading'}]};

 private _renumber = "0";


// tslint:disable-next-line:variable-name
  private _articleList:{data: [{_id:'loading',revCount:'loading'}]};;



// tslint:disable-next-line:variable-name
  private _info = 'Australia';


  // tslint:disable-next-line:variable-name


  get defaultTitle(): string {
    return this._defaultTitle;
  }

  set defaultTitle(value: string) {
    this._defaultTitle = value;
  }
  // tslint:disable-next-line:variable-name
  private _defaultTitle  = 'Australia';
  private reTitleS;
  private reNumberS;
  // tslint:disable-next-line:variable-name
  private _startyear;
  // tslint:disable-next-line:variable-name
  private _endyear;

  get startyear() {
    return this._startyear;
  }

  set startyear(value) {
    this._startyear = value;
  }

  get endyear() {
    return this._endyear;
  }

  set endyear(value) {
    this._endyear = value;
  }
}

