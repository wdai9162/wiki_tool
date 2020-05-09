import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';


import { LoginComponent } from './view/users/login/login.component';
import { IntroductionComponent } from './view/introduction/introduction.component';
import { LandOverAllComponent } from './view/land-over-all/land-over-all.component';
import { LandIndivComponent } from './view/land-indiv/land-indiv.component';
import { LandAuthorComponent } from './view/land-author/land-author.component';

import { HeaderComponent } from './view/header/header.component';


import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './view/users/signup/signup.component';
import { LocalStorage} from './local.storage';
import { ResetPwdComponent } from './view/users/reset-pwd/reset-pwd.component';
import { LoginOverAllComponent } from './view/land-over-all/login-over-all/login-over-all.component';
import { LoginAuthorComponent } from './view/land-author/login-author/login-author.component';
import { LoginIndivComponent } from './view/land-indiv/login-indiv/login-indiv.component';
import {ScrollingModule} from '@angular/cdk/scrolling';


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
    ResetPwdComponent,
    LoginOverAllComponent,
    LoginAuthorComponent,
    LoginIndivComponent,

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
    ScrollingModule,

  ],
  providers: [LocalStorage,{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
