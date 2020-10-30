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
import {StockTableComponent} from './stocks/stock-table/stock-table.component';
import {StockService} from './stocks/stock.service';
import {MatSortModule} from '@angular/material/sort';
import {InvestmentComponent} from './investment/investment.component';
import { StockPageComponent } from './stocks/stock-page/stock-page.component';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { TruncateModule } from 'ng2-truncate';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CommodityTableComponent,
    StockTableComponent,
    InvestmentComponent,
    StockPageComponent
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
    TruncateModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    StockService,
    CommodityService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
