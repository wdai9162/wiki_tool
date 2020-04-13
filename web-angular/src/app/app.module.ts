import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';


import { LoginComponent } from './users/login/login.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { LandOverAllComponent } from './land-over-all/land-over-all.component';
import { LandIndivComponent } from './land-indiv/land-indiv.component';
import { LandAuthorComponent } from './land-author/land-author.component';

import { HeaderComponent } from './header/header.component';


import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './users/signup/signup.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,

    IntroductionComponent,

    LandOverAllComponent,
    LandIndivComponent,
    LandAuthorComponent,

    HeaderComponent,
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
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
