import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BondsComponent} from './bonds/bonds.component';
import {CommodityTableComponent} from './commodities/commodities-table/commodities.component';
import {StockTableComponent} from './stocks/stock-table/stock-table.component';
import {CurrencyComponent} from './currency/currency.component';
import {RealestateComponent} from './realestate/realestate.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'bonds',
    component: BondsComponent
  },
  {
    path: 'commodity-table',
    component: CommodityTableComponent
  },
  {
    path: 'stock-table',
    component: StockTableComponent
  },
  {
    path: 'currency',
    component: CurrencyComponent
  },
  {
    path: 'realestate',
    component: RealestateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


