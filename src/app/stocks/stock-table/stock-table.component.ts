import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  StockData: any = [];
  dataSource: MatTableDataSource<Stock>;
  displayedColumns: any[] = ['stockName', 'symbol', 'price', 'pERatio', 'marketCap'];

  constructor(private stockApi: StockService) {
    this.stockApi.getStocks().subscribe(data => {
      this.StockData = data;
      this.dataSource = new MatTableDataSource<Stock>(this.StockData);
    });
  }

  ngOnInit() { }
  // stocks: Stock[] = [];
  // isLoading = false;
  // totalStocks = 0;
  // userIsAuthenticated = false;
  // private stockSub: Subscription;
  // private authStatusSub: Subscription;
  //
  // constructor(
  //   public stocksService: StockService
  // ) { }
  //
  // ngOnInit() {
  //   this.isLoading = true;
  //   this.stocksService.getStocks();
  //   this.stockSub = this.stocksService
  //     .getStockUpdateListener()
  //     .subscribe((stockData: { stocks: Stock[]; stockCount: number }) => {
  //       this.isLoading = false;
  //       this.totalStocks = stockData.stockCount;
  //       this.stocks = stockData.stocks;
  //     });
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //   });
  // }

}
