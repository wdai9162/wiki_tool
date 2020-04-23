import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverallService {

  constructor() { }
  reUser = [];
  revnumbers = [];
  history = [];
  async getData(url) {
    // tslint:disable-next-line:one-variable-per-declaration
    const request = await fetch(url);
    return await request.json();
  }
  // tslint:disable-next-line:variable-name
  async getOverllHistoryService(number: string): Promise<[]> {
    this.history = await this.getData('http://127.0.0.1:3000/api/overall/history');
    // @ts-ignore
    return this.history;
  }


  // tslint:disable-next-line:variable-name
  async getOverallReNumberService( number: string): Promise<[]> {
    this.revnumbers = await this.getData('http://127.0.0.1:3000/api/overall/revnumbers');
    // @ts-ignore
    return this.revnumbers;
  }

  // tslint:disable-next-line:variable-name
  async getOverallReUserService( number: string): Promise<[]> {
    this.reUser = await this.getData('http://127.0.0.1:3000/api/overall/regusers');
    // @ts-ignore
    return this.reUser;
  }

}
