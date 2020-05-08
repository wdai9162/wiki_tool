import { Component, OnInit } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {OverallService} from '../../../controller/overall/overall.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-login-over-all',
  templateUrl: './login-over-all.component.html',
  styleUrls: ['./login-over-all.component.css']
})
export class LoginOverAllComponent implements OnInit {
  OverallModel;

  render = false;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const label = ctx.chart.data.labels[ctx.dataIndex];
          const dataArr = ctx.chart.data.datasets[0].data;
          // @ts-ignore
          dataArr.map(data => {
            sum += data;
          });
          const percentage = (value * 100 / sum).toFixed(2) + '%';
          return label + ':' + percentage;
        },
      },
    }
  };

  public pieChartData: number[] = [300, 500, 100, 10, 5 ];
  public pieChartPlugins = [pluginDataLabels];




  public barChartOptions: ChartOptions = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        display: false
      }
    }
  };
  public barChartLabels: Label[];

  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] =  [];
   constructor(public OLService: OverallService) {
     this.OverallModel = this.OLService.getOverallModel();

   }
   async updateData(): Promise<void>{
     await this.SetRandData(this.OverallModel.info);
   }


  setInfo(){
    this.OverallModel.info = this.OverallModel.number;
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
    const data = await this.OLService.getOverallReNumberService(number);
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

  selectLine()
  {
    this.OverallModel.chartype = 'line';
  }
  selectBar()
  {
    this.OverallModel.chartype = 'bar';
  }

  async ngOnInit(): Promise<void> {
    this.OverallModel.chartype = 'bar';
    this.barChartLabels = ['loading'];
    this.barChartData = [
      {data: [0], label: 'loading'}
    ];
    await this.SetRandData('2');
    const graphdata = await this.OLService.getOverallGraphData();


    // tslint:disable-next-line:forin
    const pieLabel =  [];
    const data = [];
    const color = [];
    for (const i in graphdata)
    {
      pieLabel.push(i);
      data.push(graphdata[i]['total']);
      color.push(this.OLService.getColor());
    }
    this.OverallModel.pieChartLabels = pieLabel;
    this.OverallModel.pieChartData = data;
    this.OverallModel.pieChartColors = [{backgroundColor: color}];
    this.render = true;
    const year = [];
    const dataAdmin = [];
    const dataBot = [];
    const dataAnon = [];
    const dataReg = [];
    // tslint:disable-next-line:forin

    for (const i in graphdata['adminUser']['result'])
    {

           const currentyear = graphdata['adminUser']['result'][i]['_id'];
           console.log(currentyear)
           year.push(currentyear);
           dataAdmin.push(graphdata['adminUser']['result'][i]['adminCount']);
           if (graphdata['botUser']['result'][i])
           {
             dataBot.push(graphdata['botUser']['result'][i]['botCount']);
           }
           else {
             dataBot.push(0);
           }
           if (graphdata['anonUser']['result'][i])
          {
            dataAnon.push(graphdata['anonUser']['result'][i]['anonCount']);
          }
          else {
            dataAnon.push(0);
          }
           if (graphdata['regUser']['result'][i])
          {
            dataReg.push(graphdata['regUser']['result'][i]['regCount']);
          }
          else {
            dataReg.push(0);
          }

    }

    this.barChartLabels = year.reverse();
    this.barChartData = [
      {data: dataAdmin.reverse(), label: "admin"},
      {data: dataBot.reverse(), label: "Bot"},
      {data: dataReg.reverse(), label: "Reg"},
      {data: dataAnon.reverse(), label: "Anon"}
   ]

  }







}
