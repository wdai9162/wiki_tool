import { Injectable } from '@angular/core';
import { Inidividual } from '../../model/inidividual/inidividual.model';
import {LocalStorage} from '../../local.storage';
import {rgba} from 'ng-chartjs';
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

  async getArticleData()
  {

      return await this.getData('http://127.0.0.1:3000/api/individual/getlist');
  }

  async checkoupdate(title)
  {

    return await this.getData('http://127.0.0.1:3000/api/individual/checkdateandupdate?title=' + title);
  }

  async getTopReddit(title)
  {

    return await this.getData('http://127.0.0.1:3000/api/individual/getredditnews?title=' + title);
  }

  async getReuserByrevnumber(title)
  {

    return await this.getData('http://127.0.0.1:3000/api/individual/reguserbyrevnumber?title=' + title);
  }

  async getTopUserGraph(title, user, startyear, endyear)
  {

    // tslint:disable-next-line:max-line-length
    return await this.getData('http://127.0.0.1:3000/api/individual/topusergraphdata?title=' + title + '&stryr=' + startyear + '&endyr=' + endyear + '&topuser=' + user);
  }

  async getGraph(title, startyear, endyear)
  {

    // tslint:disable-next-line:max-line-length
    return await this.getData('http://127.0.0.1:3000/api/individual/graphData?title=' + title + '&stryr=' + startyear + '&endyr=' + endyear);
  }


  getModel(): Inidividual
  {
    return new Inidividual();
  }
  getColor(): string
  {
    return rgba([Math.random() * 251, Math.random() * 250, Math.random() * 250], 0.3);
  }
}
