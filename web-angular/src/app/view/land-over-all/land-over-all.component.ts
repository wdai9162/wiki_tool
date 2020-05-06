import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {LocalStorage} from '../../local.storage';
import { Overall } from '../../model/overall/overall.model';


@Component({
  selector: 'app-land-over-all',
  templateUrl: './land-over-all.component.html',
  styleUrls: ['./land-over-all.component.css']
})
export class LandOverAllComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };





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
