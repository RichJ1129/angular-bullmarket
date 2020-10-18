import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvestmentRoutingModule} from './investment-routing.module';
import {InvestmentComponent} from './investment.component';


@NgModule({
  declarations: [InvestmentComponent],
  imports: [
    CommonModule,
    InvestmentRoutingModule
  ]
})
export class InvestmentModule {
}
