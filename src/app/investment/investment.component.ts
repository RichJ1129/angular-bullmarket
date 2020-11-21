import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import { InvestmentService } from './investment.service';
import {MatTableDataSource} from '@angular/material/table';
import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import { InvestmentPageComponent } from './investment-page/investment-page.component';
import { StockService } from '../stocks/stock.service';
import { AuthService } from '../auth/auth.service';
import { InvestmentBoxComponent } from 'src/app/investmentbox/investmentbox.component';


@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
})
export class InvestmentComponent {
    constructor() {};
  
  ngOnInit() {};
}
