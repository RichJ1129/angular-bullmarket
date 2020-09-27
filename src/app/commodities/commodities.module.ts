import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommoditiesRoutingModule } from './commodities-routing.module';
import { CommoditiesComponent } from './commodities.component';


@NgModule({
  declarations: [CommoditiesComponent],
  imports: [
    CommonModule,
    CommoditiesRoutingModule
  ]
})
export class CommoditiesModule { }
