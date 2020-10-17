import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommoditiesRoutingModule} from './commodities-routing.module';
import {CommoditiesComponent} from './commodities.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [CommoditiesComponent],
  imports: [
    CommonModule,
    CommoditiesRoutingModule,
    MatTableModule
  ]
})
export class CommoditiesModule {
}
