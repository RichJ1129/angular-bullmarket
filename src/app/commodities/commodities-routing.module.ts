import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommoditiesComponent} from './commodities.component';

const routes: Routes = [{path: '', component: CommoditiesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommoditiesRoutingModule {
}
