import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  displayedColumns: any[] = ['stockName', 'symbol', 'price', 'pERatio', 'marketCap'];
  StockData: any = [];
  dataSource: MatTableDataSource<Stock>;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private stockApi: StockService) {
    this.stockApi.getStocks().subscribe(data => {
      this.StockData = data;
      this.dataSource = new MatTableDataSource<Stock>(this.StockData);
      this.dataSource.sort = this.sort;
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
