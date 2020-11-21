import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import { InvestmentService } from './investment.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import {Subject } from 'rxjs';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent implements OnInit, OnDestroy{

  InvestmentData: any = [];
  CurrencyData: any = [];
  FormattedCurrency: MatTableDataSource<Investment>;

  investments: Investment[] =[];
  displayedColumns: string[] = ['name', 'symbol', 'shares', 'currentPrice', 'transactionPrice', 'net'];
  dataSource: MatTableDataSource<Investment>;
  investmentValue=0;
  cashValue=0;
  
  private investmentSub: Subscription;
  UID: string;
  userObject: any;

    constructor(private investmentApi: InvestmentService) {
      
      //Retrieve User ID
      this.investmentApi.getUserID().subscribe(data => {
        this.userObject=data;
        this.UID = this.userObject._id;
        console.log("??");
        console.log(this.UID);
      
      
     //Retrieve and Format User Investments
      this.investmentApi.getInvestments(this.UID).subscribe(data => {
        this.InvestmentData = data;
        
        for(var x=0; x<this.InvestmentData.length; x++){
          this.InvestmentData[x].currentPrice = +(this.InvestmentData[x].transactionPrice)+1;
          this.InvestmentData[x].net = (+this.InvestmentData[x].currentPrice)-(+this.InvestmentData[x].transactionPrice);
        }
        this.investmentValue = calculateAssets(this.InvestmentData);
        this.dataSource = new MatTableDataSource<Investment>(this.InvestmentData);
      console.log("between investments and currency");

      //Retrieve and Format Currency Balance
      this.investmentApi.getCurrencyBalance(this.UID,"DOLLAR").subscribe(currencyData => {
        this.CurrencyData=currencyData;
        console.log("Currency Data",currencyData);
        for(var y=0; y<this.CurrencyData.length; y++){
          this.cashValue+=(+this.CurrencyData[y].shares);
      }
      //Round to 2 Decimal Places
      this.cashValue=(+(Math.round(this.cashValue * 100) / 100).toFixed(2));
      this.investmentValue=(+(Math.round(this.investmentValue * 100) / 100).toFixed(2));

      console.log("Currency Balance: ", this.cashValue);

          });
        
      });

    });

  }

  ngOnInit() {
    this.investmentSub = this.investmentApi.getInvestmentUpdateListener()
      .subscribe((investments: Investment[]) => {
        this.dataSource = new MatTableDataSource<Investment>(investments);
      });

  }

  ngOnDestroy(){
    this.investmentSub.unsubscribe();
  }

  
};

  function calculateAssets(data){
    let assetValue=0;
    for (let i in data){
      assetValue += (data[i].currentPrice * data[i].shares);
    }
    return assetValue;
  }

/*
  getCurrentPrices(data){
    for (let i in data){
      data[i].currentPrice = data[i].purchasePrice + 1;
    }
    return data;
  }

*/

