import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {IndividualService} from '../../../controller/inidividual/individual.service';
import {totalmem} from 'os';



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

  public pieChartPlugins = [pluginDataLabels];


  constructor(private IndiService: IndividualService) {
    this.Model = IndiService.getModel();

  }

  onStartChange(result: Date): void {

    this.Model.startyear = result.getFullYear();
  }

  onEndChange(result: Date): void {

    this.Model.endyear = result.getFullYear();
  }

  async changeArticleBar(title, start, end) {
    const result = await this.IndiService.getGraph(title, start, end);
    const pieChartData = [];
    const pieChartLabel = [];
    const pieChartColor = [];
    // tslint:disable-next-line:forin
    for (const i in result)
    {
      pieChartData.push(result[i].total);
      pieChartLabel.push(i);
      pieChartColor.push(this.IndiService.getColor());
    }
    this.Model.pieChartData = pieChartData;
    this.Model.pieChartLabels = pieChartLabel;
    this.Model.pieChartColors =[{backgroundColor:pieChartColor}];




    // user hash to get rid of the data which is 0
    const ArticleLabel = [];
    const adminHash = new Array();
    const anonHash = new Array();
    const botHash = new Array();
    const regHash = new Array();
    for (let i = start; i < end; i++)
    {
      ArticleLabel.push(i);
      adminHash[i] = 0;
      anonHash[i] = 0;
      botHash[i] = 0;
      regHash[i] = 0;
    }
    for (const i in result.adminUser.result)
    {
      const currentyear = result.adminUser.result[i]._id;
      adminHash[currentyear] = result.adminUser.result[i].adminCount;
    }
    for (const i in result.botUser.result)
    {
      const currentyear = result.botUser.result[i]._id;
      botHash[currentyear] = result.adminUser.result[i].botCount;
    }
    for (const i in result.anonUser.result)
    {
      const currentyear = result.anonUser.result[i]._id;
      anonHash[currentyear] = result.anonUser.result[i].anonCount;
    }
    for (const i in result.regUser.result)
    {
      const currentyear = result.regUser.result[i]._id;
      regHash[currentyear] = result.regUser.result[i].regCount;
    }



    const AdminUser = [];
    const RegUser = [];
    const AnonUser = [];
    const BotUser = [];
    for (let i = start; i < end; i++)
    {
      AdminUser.push(adminHash[i]);
      AnonUser.push(anonHash[i]);
      RegUser.push(regHash[i]);
      BotUser.push(botHash[i]);
    }
    //
    this.Model.articalGraphLabel = ArticleLabel;
    this.Model.articalGraphData = [
      {data: AdminUser, label: 'Admin'},
      {data: AnonUser, label: 'Anon'},
      {data: BotUser, label: 'Bot'},
      {data: RegUser, label: 'Reg'}
    ];
  }

  async changeUserGraph(result: string) {
    console.log(result);
    const label = [];
    const graphdata = [];
    // tslint:disable-next-line:max-line-length
    const respond = await this.IndiService.getTopUserGraph(this.Model.info, this.Model.UserSelect, this.Model.startyear, this.Model.endyear);
    for ( const i in respond.result)
    {
      label.push(respond.result[i]._id);
      graphdata.push(respond.result[i].topUserCount);
    }
    this.Model.userGraphData =  [{data: graphdata, label: this.Model.UserSelect}];
    this.Model.userGraphLabel = label;
  }
  selectData()
  {
    if(this.Model.startyear && this.Model.endyear) {
      this.DataUpgrade(this.Model.info);
    }
    else
    {
      alert("please select the start year and end year");
    }
  }

  log(data: string): void
  {
    console.log(data);

  }
  setInfo(){
    this.Model.info = this.Model.defaultTitle;
  }

  async ngOnInit(): Promise<void> {
    this.articleSerive = await this.IndiService.getArticleData();

    this.Model.articleList = this.articleSerive.data;
  }

  async DataUpgrade(title): Promise<void> {
    const respond = await this.IndiService.checkoupdate(title);
    console.log(respond);
    let number;
    if (respond.newDownload)
    {
      number = respond.newDownload;
      alert(respond.confirmation + ', and the new number of download is :' + number);
    }
    else if (respond.newRevSavedToDB)
    {
      number = respond.newRevSavedToDB;
      alert(respond.confirmation + ', and the new number revision of saving to database is :' + number);
    }
    else {
      alert(respond.confirmation);
    }
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

    // for get the bar graph data and update the graph
    this.changeArticleBar(this.Model.info, this.Model.startyear, this.Model.endyear);

  }





}
