import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BondsComponent} from './bonds/bonds.component';
import {CommoditiesComponent} from './commodities/commodities.component';
import {StockTableComponent} from './stocks/stock-table/stock-table.component';
import {CurrencyComponent} from './currency/currency.component';
import {RealestateComponent} from './realestate/realestate.component';
import {InvestmentComponent} from './investment/investment.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import { StockPageComponent } from './stocks/stock-page/stock-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bonds',
    component: BondsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'commodities',
    component: CommoditiesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stock-table',
    component: StockTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'currency',
    component: CurrencyComponent,
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
    path: 'stock-page',
    component: StockPageComponent,
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


