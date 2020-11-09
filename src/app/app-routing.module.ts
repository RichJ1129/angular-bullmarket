import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BondTableComponent} from './bonds/bonds-table/bonds.component';
import {CommodityTableComponent} from './commodities/commodities-table/commodities.component';
import {StockTableComponent} from './stocks/stock-table/stock-table.component';
import {RealestateComponent} from './realestate/realestate.component';
import {InvestmentComponent} from './investment/investment.component';
import {InvestmentPageComponent} from './investment/investment-page/investment-page.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import { StockPageComponent } from './stocks/stock-page/stock-page.component';
import { CurrencyTableComponent } from './currency/currency-table/currency-table.component';
import { CurrencyPageComponent } from './currency/currency-page/currency-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bond-table',
    component: BondTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'commodity-table',
    component: CommodityTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stock-table',
    component: StockTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'realestate',
    component: RealestateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'investment',
    component: InvestmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stock-page/:stock_ticker',
    component: StockPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'currency-table',
    component: CurrencyTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'currency-page/:currency_ticker',
    component: CurrencyPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}


