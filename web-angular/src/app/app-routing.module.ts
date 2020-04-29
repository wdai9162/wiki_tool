// This is used to split out routing module from main app-module for easier maintenance and more visibility.
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { IntroductionComponent } from './view/introduction/introduction.component';
import { LandOverAllComponent } from './view/land-over-all/land-over-all.component';
import { LandAuthorComponent } from './view/land-author/land-author.component';
import { LandIndivComponent } from './view/land-indiv/land-indiv.component';
import {ResetPwdComponent} from './view/users/reset-pwd/reset-pwd.component';



const routes: Routes = [
  { path: '', component: IntroductionComponent },
  { path: 'landOverall', component: LandOverAllComponent },
  { path: 'landAuthor', component: LandAuthorComponent },
  { path: 'landIndiv', component: LandIndivComponent },
  { path: 'Reset', component: ResetPwdComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
