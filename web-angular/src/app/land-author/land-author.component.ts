import { Component, OnInit } from '@angular/core';

import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';
@Component({
  selector: 'app-land-author',
  templateUrl: './land-author.component.html',
  styleUrls: ['./land-author.component.css'],
})
export class LandAuthorComponent implements OnInit {

  constructor() { }
  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];
  onChartClick(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
