import { Injectable } from '@angular/core';
import {LocalStorage} from '../../local.storage';
import {Author} from '../../model/author/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private ls: LocalStorage) { }


  async getData(url, data) {
    // tslint:disable-next-line:one-variable-per-declaration
    // @ts-ignore
    const request = await fetch(url, {body: JSON.stringify(data), headers: {authorization: this.ls.getObject('token')}, method: 'get'});
    // console.log(request);
    return await request.json();
  }

  async postData(url, data) {
    // tslint:disable-next-line:one-variable-per-declaration
    // @ts-ignore
    const request = await fetch(url, { body: JSON.stringify(data), method: 'POST', headers: {'Content-Type': 'application/json'}});
    // console.log(request);
    return await request.json();
  }
  //returnAuthorNames

  async getAuthorList(name)
  {
   return await this.getData('http://127.0.0.1:3000/api/author/returnAuthorNames', name);
  }

  async postAuthorList(name)
  {
    return await this.postData('http://127.0.0.1:3000/api/author/returnAuthorNames', name);
  }


  async postArticleList(name)
  {
    return await this.postData('http://127.0.0.1:3000/api/author/returnAuthorArticleAndNum', name);
  }

  async postTimeStampList(data)
  {
    return await this.postData('http://127.0.0.1:3000/api/author/returnArticleTimestamps',data);
  }

  getModel()
  {
    return new Author();
  }

}
