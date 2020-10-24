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
    net: +100
  },
  {
    name: 'EUROS',
    symbol: 'EURUSD',
    shares: 10000,
    currentPrice: 1.17,
    purchasePrice: 1.10,
    net: +700
  }
]; 
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent {

  dataSource = INVESTMENT_DATA;
  displayedColumns: string[] = ['name', 'symbol', 'shares', 'currentPrice', 'purchasePrice', 'net', 'button'];

  
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


  investmentValue=this.calculateAssets(INVESTMENT_DATA);
  netValue=this.calculateNet(INVESTMENT_DATA);
  cashValue=(100000-(this.investmentValue-this.netValue));

  onClickBuy(x, index){
    console.log("Yolo");
    console.log(x);
    this.investmentValue+=1;
    this.dataSource[index].shares=(this.dataSource[index].shares + +x);

  }

  onClickSell(x, index){
    console.log("Yolo");
    console.log(x);
    this.investmentValue-=1;
    this.dataSource[index].shares=(this.dataSource[index].shares - +x);

  }

};

