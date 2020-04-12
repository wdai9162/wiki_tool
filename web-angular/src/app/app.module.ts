import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { RegisterComponent } from './register/register.component';
import { LandOverAllComponent } from './land-over-all/land-over-all.component';
import { LandIndivComponent } from './land-indiv/land-indiv.component';
import { LandAuthorComponent } from './land-author/land-author.component';
import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IntroductionComponent,
    RegisterComponent,
    LandOverAllComponent,
    LandIndivComponent,
    LandAuthorComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgChartjsModule,
    ChartsModule,

    RouterModule.forRoot([
      { path: '', component: IntroductionComponent },
      { path: 'landOverall', component: LandOverAllComponent },
      { path: 'landAuthor', component: LandAuthorComponent },
      { path: 'landIndiv', component: LandIndivComponent}
    ])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
