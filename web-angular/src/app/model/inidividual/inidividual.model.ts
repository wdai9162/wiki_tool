import {Label} from 'ng2-charts';

export class Inidividual {
  get pieChartLabels(): Label[] {
    return this._pieChartLabels;
  }

  set pieChartLabels(value: Label[]) {
    this._pieChartLabels = value;
  }

  get pieChartData(): number[] {
    return this._pieChartData;
  }

  set pieChartData(value: number[]) {
    this._pieChartData = value;
  }

  get pieChartColors(): [{ backgroundColor: string[] }] {
    return this._pieChartColors;
  }

  set pieChartColors(value: [{ backgroundColor: string[] }]) {
    this._pieChartColors = value;
  }
  get articalGraphLabel(): string[] {
    return this._articalGraphLabel;
  }

  set articalGraphLabel(value: string[]) {
    this._articalGraphLabel = value;
  }

  get articalGraphData(): { data: number[]; label: string }[] {
    return this._articalGraphData;
  }

  set articalGraphData(value: { data: number[]; label: string }[]) {
    this._articalGraphData = value;
  }
  get userGraphLabel(): any[] {
    return this._userGraphLabel;
  }

  set userGraphLabel(value: any[]) {
    this._userGraphLabel = value;
  }

  get userGraphData(): any[] {
    return this._userGraphData;
  }

  set userGraphData(value: any[]) {
    this._userGraphData = value;
  }
  get reNumberS() {
    return this._reNumberS;
  }

  set reNumberS(value) {
    this._reNumberS = value;
  }
  get UserSelect(): string {
    return this._UserSelect;
  }

  set UserSelect(value: string) {
    this._UserSelect = value;
  }

  get TopFiveUser(): { data: [{ _id: 'loading'; revCount: 'loading' }] } {
    return this._TopFiveUser;
  }

  set TopFiveUser(value: { data: [{ _id: 'loading'; revCount: 'loading' }] }) {
    this._TopFiveUser = value;
  }

  get TopNews(): { data: [{ title: 'loading'; URL: 'loading' }] } {
    return this._TopNews;
  }

  set TopNews(value: { data: [{ title: 'loading'; URL: 'loading' }] }) {
    this._TopNews = value;
  }

  get articleList(): { data: [{ _id: 'loading'; revCount: 'loading' }] } {
    return this._articleList;
  }

  set articleList(value: { data: [{ _id: 'loading'; revCount: 'loading' }] }) {
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
  // tslint:disable-next-line:variable-name
  private _TopFiveUser: {data: [{_id: 'loading', revCount: 'loading'}]};
  private _TopNews: {data: [{title: 'loading', URL: 'loading'}]};

 private _renumber = '0';


// tslint:disable-next-line:variable-name
  private _articleList: {data: [{_id: 'loading', revCount: 'loading'}]};



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
  private _reNumberS;
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

  // tslint:disable-next-line:variable-name
  private _UserSelect: string;
  // tslint:disable-next-line:variable-name
  private _userGraphLabel = ['loading'];
  // tslint:disable-next-line:variable-name
  private _userGraphData = [
    {data: [0], label: 'loading'},
  ];

  // tslint:disable-next-line:variable-name
  private _articalGraphLabel = ['null'];
  // tslint:disable-next-line:variable-name
  private _articalGraphData = [
    {data: [0], label: 'null'},
  ];

  private _pieChartLabels: Label[] = ['Loading'];

  private _pieChartData: number[] = [0];

  private _pieChartColors: [{ backgroundColor: string[] }] = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)']
    }
  ];


}

