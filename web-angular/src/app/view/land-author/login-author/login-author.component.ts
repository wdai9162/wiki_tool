import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorage} from '../../../local.storage';
import {AuthorService} from '../../../controller/author/author.service';



import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
@Component({
  selector: 'app-login-author',
  templateUrl: './login-author.component.html',
  styleUrls: ['./login-author.component.css']
})
export class LoginAuthorComponent implements OnInit {

  Model;
  constructor(private Authorser: AuthorService, private ls: LocalStorage) {
    this.articlelistHeight = {height: this.ls.getObject('windowHeight') * 0.8 + 'px'};
    console.log(this.articlelistHeight);
    this.Model = this.Authorser.getModel();

    // 防抖
    this.InputQueryChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(model => {
        this.InputValue = model;
        this.getcheckuser(this.InputValue);
      });
  }
  InputQueryChanged: Subject<string> = new Subject<string>();


  articlelistHeight;
  selectArticle;


  filteredOptions: string[] = [];
  options = [];


  FirstInputime: number;
  InputValue = '';

  timer;
  onChange(value: string): void {

    this.InputQueryChanged.next(value);

  }




  async getcheckuser(value) {
    const data = await this.Authorser.postAuthorList({keyword: value});

    this.options = [];
    // tslint:disable-next-line:forin
    for (const i in data.result) {
      this.options.push(data.result[i].user);
    }
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  async search() {
    const respond = await this.Authorser.postArticleList({name: this.InputValue});
    console.log(respond);
    this.Model.articleList = respond.data;


  }

  async ngOnInit(): Promise<void> {

  }
  clear()
  {
    this.Model.timeStampList = [];
    this.Model.articleList = [];
    this.selectArticle = null;
  }

  async getTimestamp() {
    this.Model.timeStampList = ['loading'];
    const respond = await this.Authorser.postTimeStampList({title: this.selectArticle, name: this.InputValue})
    const resultlist = [];
    for(const i in respond.result)
    {
      resultlist.push(respond.result[i].timestamp);
    }
    this.Model.timeStampList = resultlist;
  }
}
