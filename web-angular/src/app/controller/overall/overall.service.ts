import { Injectable } from '@angular/core';
import {LocalStorage} from '../../local.storage';
import {Overall} from '../../model/overall/overall.model';
import {rgba} from 'ng-chartjs';

@Injectable({
  providedIn: 'root'
})
export class OverallService {

  constructor(private ls: LocalStorage) { }

  async getData(url) {
    // tslint:disable-next-line:one-variable-per-declaration
    // @ts-ignore
    const request = await fetch(url, {headers: {authorization: this.ls.getObject('token')}});
    // console.log(request);
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
  getOverallModel(): Overall
{
  return new Overall();
}

// @ts-ignore
  async getOverallGraphData(): Promise<[]>
{
  return await this.getData('http://127.0.0.1:3000/api/overall/graphdata');
}

  async getOverallbarData(): Promise<{}>
  {

    return null;
  }

  getColor(): string
  {
    return rgba([Math.random() * 251, Math.random() * 250, Math.random() * 250], 0.3);
  }
}
