import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {Label} from 'ng2-charts';

import {LocalStorage} from '../local.storage';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})

export class IntroductionComponent implements OnInit {

  constructor(private ls: LocalStorage) { }

  isLogin = this.ls.getObject('isLogin');
  ngOnInit() {
    // @ts-ignore
  }


}

