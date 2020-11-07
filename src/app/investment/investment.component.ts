import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import { InvestmentService } from './investment.service';
import {MatTableDataSource} from '@angular/material/table';
import { InvestmentBuyButtonComponent } from './investment-button-buy/investment-button-buy.component';
import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import { InvestmentPageComponent } from './investment-page/investment-page.component';
import { StockService } from '../stocks/stock.service';


@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
})
export class InvestmentComponent {

 InvestmentData: any = [];
  displayedColumns: string[] = ['name', 'symbol', 'shares', 'currentPrice', 'purchasePrice', 'net'];
  dataSource: MatTableDataSource<Investment>;
  investmentValue; netValue; cashValue;
  options: string[] = ['GLD','SLV','NOK'];

    constructor(private investmentApi: InvestmentService) {
      this.investmentApi.getInvestments().subscribe(data => {
        this.InvestmentData = data;
        
        // Current Price and Net
        for(var x=0; x<this.InvestmentData.length; x++){
          this.InvestmentData[x].currentPrice = +(this.InvestmentData[x].purchasePrice)+2;
          this.InvestmentData[x].net = (+this.InvestmentData[x].currentPrice)+(+this.InvestmentData[x].purchasePrice);
        }
        //
        this.dataSource = new MatTableDataSource<Investment>(this.InvestmentData);


        this.investmentValue=1//Math.round((this.calculateAssets(this.dataSource) * 100)/100);
        this.netValue=2//Math.round((this.calculateNet(this.dataSource) * 100)/100);
        this.cashValue=3//Math.round((this.calculateAssets(this.dataSource) * 100)/100);
        console.log("Hello");
        console.log(this.dataSource);
      });
    }


  ngOnInit() {
  }
};

