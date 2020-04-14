//This is used to split out routing module from main app-module for easier maintenance and more visibility.
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { LandOverAllComponent } from './land-over-all/land-over-all.component';
import { LandAuthorComponent } from './land-author/land-author.component';
import { LandIndivComponent } from './land-indiv/land-indiv.component';



const routes: Routes = [
  { path: '', component: IntroductionComponent },
  { path: 'landOverall', component: LandOverAllComponent },
  { path: 'landAuthor', component: LandAuthorComponent },
  { path: 'landIndiv', component: LandIndivComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
