import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import { InvestmentService } from './investment.service';
import {MatTableDataSource} from '@angular/material/table';
import { InvestmentBuyButtonComponent } from './investment-button-buy/investment-button-buy.component';
import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import { InvestmentPageComponent } from './investment-page/investment-page.component';
import { StockService } from '../stocks/stock.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
})
export class InvestmentComponent {
    constructor() {};
  
  ngOnInit() {};
}
