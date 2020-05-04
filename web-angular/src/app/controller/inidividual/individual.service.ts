import { Injectable } from '@angular/core';
import { Inidividual } from '../../model/inidividual/inidividual.model';
import {LocalStorage} from '../../local.storage';
@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  constructor(private ls: LocalStorage) { }
  async getData(url) {
    // tslint:disable-next-line:one-variable-per-declaration
    // @ts-ignore
    const request = await fetch(url, {headers: {authorization: this.ls.getObject('token')}});
    // console.log(request);
    return await request.json();
  }

  async getArticleData(title)
  {

      return await this.getData('http://127.0.0.1:3000/api/individual/getlist?title=' +title);
  }

  async checkoupdate(title)
  {

    return await this.getData('http://127.0.0.1:3000/api/individual/checkdate?title=' + title);
  }

  async getTopReddit(title)
  {

    return await this.getData('http://127.0.0.1:3000/api/individual/getredditnews?title=' + title);
  }

  async getReuserByrevnumber(title)
  {

    return await this.getData('http://127.0.0.1:3000/api/individual/reguserbyrevnumber?title=' + title);
  }


  getModel(): Inidividual
  {
    return new Inidividual();
  }
}
