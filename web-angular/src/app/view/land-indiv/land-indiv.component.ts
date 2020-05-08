import { Component, OnInit } from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartOptions, ChartType} from 'chart.js';
import {LocalStorage} from '../../local.storage';


@Component({
  selector: 'app-land-indiv',
  templateUrl: './land-indiv.component.html',
  styleUrls: ['./land-indiv.component.css']
})
export class LandIndivComponent implements OnInit {
  isLogin = this.ls.getObject('isLogin');

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  imagestyle = {width: '100%', height: this.ls.getObject('windowHeight') + 'px'};

  constructor(private ls: LocalStorage) { }
  login()
  {
    alert("please login to operate");
  }

  ngOnInit() {
  }

  // events

}
