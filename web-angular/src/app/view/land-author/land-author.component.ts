import { Component, OnInit } from '@angular/core';

import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';

import {LocalStorage} from '../../local.storage';

@Component({
  selector: 'app-land-author',
  templateUrl: './land-author.component.html',
  styleUrls: ['./land-author.component.css'],
})

export class LandAuthorComponent implements OnInit {
  constructor(private ls: LocalStorage) { }
  isLogin = this.ls.getObject('isLogin');
  imagestyle = {width: '100%', height: this.ls.getObject('windowHeight') + 'px'};
  ngOnInit() {
  }

  login()
  {
    alert("please login to operate");
  }

}
