import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RealestateRoutingModule} from './realestate-routing.module';
import {RealestateComponent} from './realestate.component';


@NgModule({
  declarations: [RealestateComponent],
  imports: [
    CommonModule,
    RealestateRoutingModule
  ]
})
export class RealestateModule {
}
