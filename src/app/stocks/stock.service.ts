import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class StockService {

  constructor(private http: HttpClient, private router: Router) {}

  // tslint:disable-next-line:typedef
  getStocks() {
    return this.http.get(backendURL + '/stocks');
  }

  // tslint:disable-next-line:typedef
  getOneStock(stockTicker: string) {
    return this.http.get<{
      stockName: string;
      symbol: string;
      price: Array<number>;
      marketCap: Array<number>;
      closeDate: Array<string>;
      pERatio: Array<number>;
    }>(backendURL + '/stocks/' + stockTicker);
  }

  // tslint:disable-next-line:typedef
  getOneCompany(companyTicker: string) {
    return this.http.get<{
      companyName: string;
      companySymbol: string;
      companyCountry: string;
      companySummary: string;
      companyCurrency: string;
    }>(backendURL + '/companies/' + companyTicker);
  }
}
