import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';
import { Stock } from './stock.model';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class StockService {
  private stocks: Stock[] = [];
  private stocksUpdated = new Subject<{ stocks: Stock[]; stockCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  // tslint:disable-next-line:typedef
  getStocks() {
    this.http
      .get<{ message: string; stocks: any; maxPosts: number }>(
        'http://localhost:3000/api/stocks'
      )
      .pipe(
        map(stockData => {
          return {
            stocks: stockData.stocks.map(stock => {
              return {
                name: stock.name,
                symbol: stock.symbol,
                price: stock.priice,
                marketCap: stock.marketCap,
                closeDate: stock.closeDate
              };
            }),
            maxPosts: stockData.maxPosts
          };
        })
      )
      .subscribe(transformedStockData => {
        this.stocks = transformedStockData.stocks;
        this.stocksUpdated.next({
          stocks: [...this.stocks],
          stockCount: transformedStockData.maxPosts
        });
      });
  }

  // tslint:disable-next-line:typedef
  getStockUpdateListener() {
    return this.stocksUpdated.asObservable();
  }
}
