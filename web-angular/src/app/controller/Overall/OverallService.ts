import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {LocalStorage} from '../../local.storage';




@Injectable({ providedIn: 'root' })
export class  OverallService{
  constructor(private http: HttpClient, private ls: LocalStorage) {
  }

  async getData(url) {
    // tslint:disable-next-line:one-variable-per-declaration
    const request = await fetch(url);
    return await request.json();
  }

  async getTextData(url)
  {
    const text = await fetch(url);
    const data = await text.json();
    return await data.data;
  }

  async getBarData(url)
  {

    const Data = await this.getData(url);


  }



}


