import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-login-indiv',
  templateUrl: './login-indiv.component.html',
  styleUrls: ['./login-indiv.component.css']
})
export class LoginIndivComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  individual = [{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223},{_id: 123, title:223}]

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

  listOfPosition: string[] = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];


  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] =[];

  constructor() { }

  log(data: string): void
  {
    console.log(data);

  }

  ngOnInit(): void {
  }

}
