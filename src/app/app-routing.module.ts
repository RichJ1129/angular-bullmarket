import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BondsComponent} from './bonds/bonds.component';
import {CommoditiesComponent} from './commodities/commodities.component';
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
    redirectTo: 'login',
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
    path: 'commodities',
    component: CommoditiesComponent
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


