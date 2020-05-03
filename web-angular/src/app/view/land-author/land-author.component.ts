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
  constructor(
    private ls: LocalStorage
  ) {}
  // chartOptions = {
  //   responsive: true
  // };
  // chartData = [
  //   { data: [330, 600, 260, 700], label: 'Account A' },
  //   { data: [120, 455, 100, 340], label: 'Account B' },
  //   { data: [45, 67, 800, 500], label: 'Account C' }
  // ];
  // chartLabels = ['January', 'February', 'Mars', 'April'];

  // tslint:disable-next-line:triple-equals
  isLogin = this.ls.getObject('isLogin');


  onChartClick(event) {
    console.log(event);
  }
  ngOnInit(): void {
  }

}
