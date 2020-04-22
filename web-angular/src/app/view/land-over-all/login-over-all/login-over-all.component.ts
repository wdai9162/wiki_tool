import { Component, OnInit } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {OverallService} from '../../../controller/Overall/OverallService';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';




@Component({
  selector: 'app-login-over-all',
  templateUrl: './login-over-all.component.html',
  styleUrls: ['./login-over-all.component.css']
})
export class LoginOverAllComponent implements OnInit {

  // @ts-ignore
  OverallService = new OverallService();
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales', 'hi', 'who'];
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

  public pieChartData: number[] = [300, 500, 100, 10, 5 ];
  test = '123';
  longest: [];
  public pieChartPlugins = [pluginDataLabels];

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
  public barChartLabels: Label[];

  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] =  [];
   constructor() {
   }
   async updateData(): Promise<void>{
     this.test = await this.OverallService.getData('http://127.0.0.1:4200/');
   };


  async ngOnInit(): Promise<void> {
    this.longest = await this.OverallService.getTextData('http://127.0.0.1:3000/api/overall/overallstats/');

    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
  }

}
