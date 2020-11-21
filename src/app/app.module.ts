import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {HomeModule} from './home/home.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {CommodityTableComponent} from './commodities/commodities-table/commodities.component';
import {CommodityService} from './commodities/commodity.service';
import {BondTableComponent} from './bonds/bonds-table/bonds.component';
import {BondService} from './bonds/bond.service';
import {StockTableComponent} from './stocks/stock-table/stock-table.component';
import {StockService} from './stocks/stock.service';
import {MatSortModule} from '@angular/material/sort';
import {InvestmentComponent} from './investment/investment.component';
import { StockPageComponent } from './stocks/stock-page/stock-page.component';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { InvestmentPageComponent } from './investment/investment-page/investment-page.component'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {InvestmentService} from './investment/investment.service';
import { CurrencyPageComponent } from './currency/currency-page/currency-page.component';
import {CurrencyTableComponent} from './currency/currency-table/currency-table.component';
import { RealEstateTableComponent } from './realestate/realestate-table/realestate-table.component';
import { RealEstateService } from './realestate/realestate.service';
import { RealEstateComponent } from './realestate/realestate.component';
import { RealEstateButton } from './realestate/realestate-button/realestate-button.component';
import { CountryPageComponent } from './realestate/country-page/country-page.component';
import {DxVectorMapModule} from 'devextreme-angular';
import { InvestmentBoxComponent } from './investmentbox/investmentbox.component'
import { InvestmentBoxService } from './investmentbox/investmentbox.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CommodityTableComponent,
    BondTableComponent,
    StockTableComponent,
    InvestmentComponent,
    StockPageComponent,
    InvestmentPageComponent,
    CurrencyTableComponent,
    CurrencyPageComponent,
    RealEstateTableComponent,
    RealEstateComponent,
    RealEstateButton,
    CountryPageComponent,
    InvestmentBoxComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    ChartsModule,
    MatAutocompleteModule,
    DxVectorMapModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    StockService,
    CommodityService,
    BondService,
    DatePipe,
    InvestmentService,
    RealEstateService,
    InvestmentBoxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
