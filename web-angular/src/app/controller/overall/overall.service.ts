import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverallService {

  constructor() { }

  async getData(url) {
    // tslint:disable-next-line:one-variable-per-declaration
    const request = await fetch(url);
    return await request.json();
  }
  // tslint:disable-next-line:variable-name
  async getOverllHistoryService(number: string): Promise<[]> {
    return await this.getData('http://127.0.0.1:3000/api/overall/history?number=' + number);
  }


  // tslint:disable-next-line:variable-name
  async getOverallReNumberService( number: string): Promise<[]> {
    return  await this.getData('http://127.0.0.1:3000/api/overall/revnumbers?number=' + number);
  }

  // tslint:disable-next-line:variable-name
  async getOverallReUserService( number: string): Promise<[]> {
    return await this.getData('http://127.0.0.1:3000/api/overall/regusers?number=' + number);
  }

}
