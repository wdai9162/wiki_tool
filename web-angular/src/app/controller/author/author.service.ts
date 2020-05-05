import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }


  async getData(url) {
    // tslint:disable-next-line:one-variable-per-declaration
    // @ts-ignore
    const request = await fetch(url, {headers: {authorization: this.ls.getObject('token')}});
    // console.log(request);
    return await request.json();
  }

  async getAuthorList()
  {
   return await this.getData('http://127.0.0.1/getliset');
  }
}
