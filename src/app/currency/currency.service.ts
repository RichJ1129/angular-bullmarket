import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

const backendURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line:typedef
  getCurrency() {
    return this.http.get(backendURL + '/currency');
  }

  // tslint:disable-next-line:typedef
  getOneCurrency(currencyTicker: string) {
    return this.http.get<{
      currencyName: string;
      ticker: string;
      rates: Array<number>;
      timeStamp: Array<string>;
    }>(backendURL + '/currency/' + currencyTicker);
  }
}
