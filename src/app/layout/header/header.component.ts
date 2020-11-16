import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import { StockService } from '../../stocks/stock.service';
import { CurrencyService } from '../../currency/currency.service';
import { CommodityService } from '../../commodities/commodity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  StockData: any = [];
  currencyData: any = [];
  commodityData: any = [];



  constructor(private authService: AuthService,
              private stockService: StockService,
              private currencyService: CurrencyService,
              private commoditySevice: CommodityService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.stockService.getStocks().subscribe(data => {
      this.StockData = data;
    });
    this.currencyService.getCurrency().subscribe(data => {
      this.currencyData = data;
    });
    this.commoditySevice.getCommodities().subscribe(data => {
      this.commodityData = data;
      // console.log(this.commodityData);
    });
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
