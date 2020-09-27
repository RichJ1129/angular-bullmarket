import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BondsComponent} from './bonds/bonds.component';
import {CommoditiesComponent} from './commodities/commodities.component';
import {StocksComponent} from './stocks/stocks.component';
import {CurrencyComponent} from './currency/currency.component';
import {RealestateComponent} from './realestate/realestate.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
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
    path: 'stocks',
    component: StocksComponent
  },
  {
    path: 'currency',
    component: CurrencyComponent
  },
  {
    path: 'realestate',
    component: RealestateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// @NgModule({
//   imports: [RouterModule.forRoot(routes, {
//     // preload all modules; optionally we could
//     // implement a custom preloading strategy for just some
//     // of the modules (PRs welcome 😉)
//     preloadingStrategy: PreloadAllModules
//   })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
