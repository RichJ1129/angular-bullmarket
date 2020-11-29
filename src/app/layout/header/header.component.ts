import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import { StockService } from '../../stocks/stock.service';
import { CurrencyService } from '../../currency/currency.service';
import { CommodityService } from '../../commodities/commodity.service';
import { InvestmentService } from 'src/app/investment/investment.service';

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
  UID: string;
  userObject: any;
  availableBalance: number;
  balanceString = 'Balance: $';


  constructor(private authService: AuthService,
              private stockService: StockService,
              private currencyService: CurrencyService,
              private commoditySevice: CommodityService,
              private investmentService: InvestmentService) {}

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
    this.investmentService.getUserID().subscribe(data => {
      this.userObject = data;
      this.UID = this.userObject._id;

      this.investmentService.getCurrencyBalance(this.UID, 'DOLLAR').then(result => {
         this.availableBalance = result;
       });

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
