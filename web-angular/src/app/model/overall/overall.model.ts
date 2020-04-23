import {Label} from 'ng2-charts';

export class Overall {

  // tslint:disable-next-line:variable-name
  private _hi_longest: [] ;
  // tslint:disable-next-line:variable-name
  private _hi_shortest: [];
  // tslint:disable-next-line:variable-name
  private _re_highest: [];
  // tslint:disable-next-line:variable-name
  private _re_lowest: [];
  // tslint:disable-next-line:variable-name
  private _user_largest: [];
  // tslint:disable-next-line:variable-name
  private _user_least: [];

  // tslint:disable-next-line:variable-name
  private _pieChartLabels: Label[];
  // tslint:disable-next-line:variable-name
  private _pieChartData: number[];

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

  constructor() {
  }

  get hi_longest(): [] {
    return this._hi_longest;
  }

  set hi_longest(value: []) {
    this._hi_longest = value;
  }

  get hi_shortest(): [] {
    return this._hi_shortest;
  }

  set hi_shortest(value: []) {
    this._hi_shortest = value;
  }

  get re_highest(): [] {
    return this._re_highest;
  }

  set re_highest(value: []) {
    this._re_highest = value;
  }

  get re_lowest(): [] {
    return this._re_lowest;
  }

  set re_lowest(value: []) {
    this._re_lowest = value;
  }

  get user_largest(): [] {
    return this._user_largest;
  }

  set user_largest(value: []) {
    this._user_largest = value;
  }

  get user_least(): [] {
    return this._user_least;
  }

  set user_least(value: []) {
    this._user_least = value;
  }
}
