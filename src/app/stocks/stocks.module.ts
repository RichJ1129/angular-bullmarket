import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StocksRoutingModule} from './stocks-routing.module';
import {StocksComponent} from './stocks.component';
import { StockTableComponent } from './stock-table/stock-table.component';


@NgModule({
  declarations: [StocksComponent, StockTableComponent],
  imports: [
    CommonModule,
    StocksRoutingModule
  ]
})
export class StocksModule {
}
