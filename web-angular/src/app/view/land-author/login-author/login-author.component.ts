import { Component, OnInit } from '@angular/core';
import {LocalStorage} from '../../../local.storage';

@Component({
  selector: 'app-login-author',
  templateUrl: './login-author.component.html',
  styleUrls: ['./login-author.component.css']
})
export class LoginAuthorComponent implements OnInit {

  articlelistHeight;
  selectArticle;
  constructor(private ls: LocalStorage) {
    this.articlelistHeight = {height: this.ls.getObject('windowHeight') * 0.8+'px'};
    console.log(this.articlelistHeight);
  }

  inputValue: string;
  filteredOptions: string[] = [];
  options = ['Sam', 'David', 'Mia','Sam', 'David', 'Mia','Sam', 'David', 'Mia','Sam', 'David', 'Mia','Sam', 'David', 'Mia','Sam', 'David', 'Mia','Sam', 'David', 'Mia','Sam', 'David', 'Mia','Sam', 'David', 'Mia'];


  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  search()
  {
    alert(this.inputValue);


  }

  ngOnInit(): void {
  }

  getTimestamp()
  {
    alert(this.selectArticle);
  }
}
