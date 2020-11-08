import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from '../investment.model';
import { InvestmentService } from '../investment.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import {Subject } from 'rxjs';

@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.css'],
})
export class InvestmentPageComponent implements OnInit, OnDestroy{

  InvestmentData: any = [];
  investments: Investment[] =[];
  displayedColumns: string[] = ['name', 'symbol', 'shares', 'currentPrice', 'transactionPrice', 'net'];
  dataSource: MatTableDataSource<Investment>;
  investmentValue; netValue; cashValue;
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
        
        // Set a placeholder value in current price in order to test net value and netValue/cashValue/investmentValue variables at top of
        for(var x=0; x<this.InvestmentData.length; x++){
          this.InvestmentData[x].currentPrice = +(this.InvestmentData[x].transactionPrice)+1;
          this.InvestmentData[x].net = (+this.InvestmentData[x].currentPrice)-(+this.InvestmentData[x].transactionPrice);
        }

        
        this.dataSource = new MatTableDataSource<Investment>(this.InvestmentData);

        console.log("dataSource");
        console.log(this.dataSource);
        this.investmentValue="X"
        this.netValue="X"
        this.cashValue="X"
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
/*
  calculateAssets(data){
    let assetValue=0;
    for (let i in data){
      assetValue += (data[i].currentPrice * data[i].shares);
    }
    return assetValue;
  }

  calculateNet(data){
    let netValue=0;
    for (let i in data){
      netValue += (data[i].net);
    }
    return netValue;
  }

  getCurrentPrices(data){
    for (let i in data){
      data[i].currentPrice = data[i].purchasePrice + 1;
    }
    return data;
  }

  getRowNet(data, i){
      data[i].net = ((data[i].currentPrice - data[i].transactionPrice) * data[i].shares);
  }

*/

/*
const INVESTMENT_DATA: Investment[] = [
  {
    name: 'GOLD',
    symbol: 'GLD',
    shares: 10,
    currentPrice: 190,
    purchasePrice: 183.42,
    net: +65.80
  },
  {
    name: 'SILVER',
    symbol: 'SLV',
    shares: 10,
    currentPrice: 190,
    purchasePrice: 183.42,
    net: +65.80
  },
  {
    name: 'OIL',
    symbol: 'USO',
    shares: 25,
    currentPrice: 27.88,
    purchasePrice: 29.07,
    net: -29.75
  },
  {
    name: 'MICROSOFT',
    symbol: 'MSFT',
    shares: 30,
    currentPrice: 218.55,
    purchasePrice: 188.00,
    net: +916.50
  },
  {
    name: 'NOKIA',
    symbol: 'NOK',
    shares: 200,
    currentPrice: 4.06,
    purchasePrice: 2.50,
    net: +312
  },
  {
    name: 'COSTA RICA RURAL',
    symbol: 'RRCOS',
    shares: 1,
    currentPrice: 32400,
    purchasePrice: 32500,
    net: -100
  },
  {
    name: 'EUROS',
    symbol: 'EURUSD',
    shares: 10000,
    currentPrice: 1.17,
    purchasePrice: 1.10,
    net: +700
  }
]; */