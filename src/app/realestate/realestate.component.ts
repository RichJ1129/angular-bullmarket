import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from 'src/app/investment/investment.model';
import { InvestmentService } from 'src/app/investment/investment.service';
import {MatTableDataSource} from '@angular/material/table';
import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import { StockService } from '../stocks/stock.service';
import { AuthService } from '../auth/auth.service';
import { RealEstateTableComponent } from 'src/app/realestate/realestate-table/realestate-table.component';
import { InvestmentBoxComponent } from 'src/app/investmentbox/investmentbox.component';


@Component({
    selector: 'app-realestate',
    templateUrl: './realestate.component.html',
  })
  export class RealEstateComponent {
      constructor() {};
    
    ngOnInit() {};
  }