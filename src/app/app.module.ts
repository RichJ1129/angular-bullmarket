import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent} from './app.component';
import { LayoutModule} from './layout/layout.module';
import { AppRoutingModule} from './app-routing.module';
import { RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';
import { AuthInterceptor} from './auth/auth-interceptor';
import { CommodityTableComponent} from './commodities/commodities-table/commodities.component';
import { CommodityService} from './commodities/commodity.service';
import { BondTableComponent} from './bonds/bonds-table/bonds.component';
import { BondService} from './bonds/bond.service';
import { StockTableComponent} from './stocks/stock-table/stock-table.component';
import { StockService} from './stocks/stock.service';
import { InvestmentComponent} from './investment/investment.component';
import { StockPageComponent } from './stocks/stock-page/stock-page.component';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { InvestmentService} from './investment/investment.service';
import { CurrencyPageComponent } from './currency/currency-page/currency-page.component';
import { CurrencyTableComponent} from './currency/currency-table/currency-table.component';
import { ProfileComponent} from './profile/profile.component';
import { ProfileAnimalComponent} from './profile/profile-animal/profile-animal.component';
import { ProfileAnimalSelectorComponent} from './profile/profile-animalSelector/profile-animalSelector.component';
import { ProfileFeedAnimalComponent} from './profile/profile-feedAnimal/profile-feedAnimal.component';
import { ProfileAnimalPlayComponent} from './profile/profile-animalPlay/profile-animalPlay.component';
import { RealEstateTableComponent } from './realestate/realestate-table/realestate-table.component';
import { RealEstateService } from './realestate/realestate.service';
import { RealEstateComponent } from './realestate/realestate.component';
import { CountryPageComponent } from './realestate/country-page/country-page.component';
import { DxVectorMapModule} from 'devextreme-angular';
import { InvestmentBoxComponent } from './investmentbox/investmentbox.component';
import { InvestmentBoxHomeComponent } from './investmentbox/investmentboxhome.component';
import { InvestmentPortfolioComponent} from './investment/investmentportfolio.component';
import { InvestmentBoxService } from './investmentbox/investmentbox.service';
import { CommoditiesPageComponent } from './commodities/commodities-page/commodities-page.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { AngularMaterialModule } from './angular-material.module';
import { AboutSectionComponent } from './about-section/about-section.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CommodityTableComponent,
    BondTableComponent,
    StockTableComponent,
    InvestmentComponent,
    InvestmentPortfolioComponent,
    ProfileComponent,
    ProfileAnimalComponent,
    ProfileAnimalSelectorComponent,
    ProfileFeedAnimalComponent,
    ProfileAnimalPlayComponent,
    StockPageComponent,
    CurrencyTableComponent,
    CurrencyPageComponent,
    RealEstateTableComponent,
    RealEstateComponent,
    CountryPageComponent,
    InvestmentBoxComponent,
    InvestmentBoxHomeComponent,
    CommoditiesPageComponent,
    HomeComponent,
    ErrorComponent,
    AboutSectionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    DxVectorMapModule,
    AngularMaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    StockService,
    CommodityService,
    BondService,
    DatePipe,
    InvestmentService,
    RealEstateService,
    InvestmentBoxService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {
}
