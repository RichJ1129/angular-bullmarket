import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class StockService {

  constructor(private http: HttpClient, private router: Router) {}

  // tslint:disable-next-line:typedef
  getStocks() {
    // console.log(this.http.get(backendURL + '/stocks'));
    return this.http.get(backendURL + '/stocks');
  }

  // tslint:disable-next-line:typedef
  getOneStock(stockTicker: string) {
    return this.http.get(backendURL + '/stocks/' + stockTicker);
  }
}
