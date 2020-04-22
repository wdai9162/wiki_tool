import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user.model';
import {LocalStorage} from '../../local.storage';

async function getData(id) {
  // tslint:disable-next-line:one-variable-per-declaration
  const url     = id,
    request = await fetch(url);
  return await request.text();
}

@Injectable({ providedIn: 'root' })
export class  OverallService{
  constructor(private http: HttpClient, private ls: LocalStorage) {
  }

  async getData(id) {
    // tslint:disable-next-line:one-variable-per-declaration
    const url     = id,
      request = await fetch(url);
    return await request.json();
  }

  async getTextData(url)
  {
    const text = await fetch(url);
    const data = await text.json();
    return await data.data;
  }


}


