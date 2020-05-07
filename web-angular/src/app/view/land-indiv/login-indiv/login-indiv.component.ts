import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {IndividualService} from '../../../controller/inidividual/individual.service';


@Component({
  selector: 'app-login-indiv',
  templateUrl: './login-indiv.component.html',
  styleUrls: ['./login-indiv.component.css']
})
export class LoginIndivComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  // individual = [{_id: 123, title:223},{_id: 223, title:223},{_id:323, title:323}];
  Model;
  articleSerive;

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
  public pieChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];



  constructor(private IndiService: IndividualService) {
    this.Model = IndiService.getModel();
    // console.log(this.Model.articleList);
  }

  onStartChange(result: Date): void {

    this.Model.startyear = result.getFullYear();
  }

  onEndChange(result: Date): void {

    this.Model.endyear = result.getFullYear();
  }

  async changeSecondBar(result: string) {
    console.log(result);
    const label = [];
    const graphdata = [];
    // tslint:disable-next-line:max-line-length
    const respond = await this.IndiService.getTopUserGraph(this.Model.info, this.Model.UserSelect, this.Model.startyear, this.Model.endyear);
    for ( const i in respond.result)
    {
      label.push(respond.result[i]._id)
      graphdata.push(respond.result[i].topUserCount);
    }
    this.Model.userGraphData =  [{data: graphdata, label: this.Model.UserSelect}];
    this.Model.userGraphLabel = label;
  }
  selectData()
  {
    this.DataUpgrade(this.Model.info);
    console.log(this.Model.startyear);

    console.log(this.Model.endyear);
  }

  log(data: string): void
  {
    console.log(data);

  }
  setInfo(){
    this.Model.info = this.Model.defaultTitle;
  }

  async ngOnInit(): Promise<void> {
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // this.DataUpgrade('Australia');
    this.articleSerive = await this.IndiService.getArticleData();

    this.Model.articleList = this.articleSerive.data;
  }

  async DataUpgrade(title): Promise<void> {
    const respond = await this.IndiService.checkoupdate(title);
    console.log(respond);
    alert(respond.confirmation + ', and the new number of revision is :' + respond.newDownload);
    this.articleSerive = await this.IndiService.getArticleData();

    this.Model.articleList = this.articleSerive.data;

    for (const i in this.articleSerive.data)
    {
      // tslint:disable-next-line:triple-equals
      if ( this.articleSerive.data[i]._id == title)
      {
        this.Model.info = this.articleSerive.data[i]._id;
        this.Model.renumber = this.articleSerive.data[i].revCount;
        this.Model.reTitleS = this.articleSerive.data[i]._id;
        this.Model.reNumberS = this.articleSerive.data[i].revCount;

      }

    }
    const TopFiveUser = await this.IndiService.getReuserByrevnumber(title);
    this.Model.TopFiveUser = TopFiveUser.data;
    const TopNews = await this.IndiService.getTopReddit(title);
    this.Model.TopNews = TopNews.data;

  }



}
