import { Component, OnInit, OnDestroy } from '@angular/core';

export interface Investment {
  name: string;
  symbol: string;
  shares: number;
  currentPrice: number;
  purchasePrice: number;
  net: number;
}

const INVESTMENT_DATA: Investment[] = [
  {
    name: 'GOLD',
    symbol: 'GLD',
    shares: 10,
    currentPrice: 190,
    purchasePrice: 183.42,
    net: -65.80
  },
  {
    name: 'SILVER',
    symbol: 'SLV',
    shares: 10,
    currentPrice: 190,
    purchasePrice: 183.42,
    net: -65.80
  }
]; 
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent {

  dataSource = INVESTMENT_DATA;
  displayedColumns: string[] = ['name', 'symbol', 'shares', 'currentPrice', 'purchasePrice', 'net'];
};

