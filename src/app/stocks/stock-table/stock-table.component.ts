import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {
  stocks: Stock[] = [];
  isLoading = false;
  totalStocks = 0;
  userIsAuthenticated = false;
  private stockSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public stocksService: StockService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.stocksService.getStocks();
    this.stockSub = this.stocksService
      .getStockUpdateListener()
      .subscribe((stockData: { stocks: Stock[]; stockCount: number }) => {
        this.isLoading = false;
        this.totalStocks = stockData.stockCount;
        this.stocks = stockData.stocks;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

}
