import { Component, OnInit } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {OverallService} from '../../../controller/overall/overall.service';
import {Overall} from '../../../model/overall/overall.model';

@Component({
  selector: 'app-login-over-all',
  templateUrl: './login-over-all.component.html',
  styleUrls: ['./login-over-all.component.css']
})
export class LoginOverAllComponent implements OnInit {


  OverallModel;
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
   constructor(public OLService: OverallService) {
     this.OverallModel = new Overall();

   }
   async updateData(): Promise<void>{
   }



  // tslint:disable-next-line:variable-name
async getHistory( number: string): Promise<void>
  {
    // @ts-ignore
    const data = await this.OLService.getOverllHistoryService(number);
    // @ts-ignore
    this.OverallModel.hi_longest = await data.longest;
    // @ts-ignore
    this.OverallModel.hi_shortest = await data.shortest;
  }

  // tslint:disable-next-line:variable-name
  async getReNum( number: string): Promise<void>
  {
    // @ts-ignore
    const data = await this.OLService.getOverallReNumberService(number)
    // @ts-ignore
    this.OverallModel.re_highest = await data.highest;
    // @ts-ignore
    this.OverallModel.re_lowest = await data.lowest;
  }

  // tslint:disable-next-line:variable-name
  async getReUser( number: string): Promise<void>
  {
    // @ts-ignore

    const data = await this.OLService.getOverallReUserService(number);
    // @ts-ignore
    this.OverallModel.user_largest = await data.largest;
    // @ts-ignore
    this.OverallModel.user_least = await data.least;
  }


  // tslint:disable-next-line:variable-name
  async SetRandData( number: string): Promise<void>
  {
    await this.getHistory(number);
    await this.getReNum(number);
    await this.getReUser(number);
  }

  async ngOnInit(): Promise<void> {
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
    await this.SetRandData('2');


  }


}
