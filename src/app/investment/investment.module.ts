import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvestmentRoutingModule} from './investment-routing.module';
import {InvestmentComponent} from './investment.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [InvestmentComponent],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    MatTableModule,
    MatTableDataSource
  ]
})
export class InvestmentModule {
}
