import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Investment} from './investment.model';
import {environment} from '../../environments/environment';
import {Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { RealEstateService } from 'src/app/realestate/realestate.service';
import { Country } from 'src/app/realestate/country.model';
import { CurrencyService } from 'src/app/currency/currency.service';
import { Currency } from 'src/app/currency/currency.model';
import { CommodityService } from 'src/app/commodities/commodity.service';
import { Commodity } from 'src/app/commodities/commodity.model';
import { StockService } from 'src/app/stocks/stock.service';
import { Stock } from 'src/app/stocks/stock.model';

interface IDAuthData{
  _id: string;
  email: string;
  userName: string;
};

interface InvestmentMath{
  name: string;
  symbol: string;
  type: string;
  shares: number;
  currentPrice: number;
  transactionPrice: number;
};

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class InvestmentService {

  private investments: Investment[] = [];
  constructor(private http: HttpClient, private router: Router, private authService: AuthService,private stockApi: StockService, private countryApi: RealEstateService, private currencyApi: CurrencyService, private commodityApi: CommodityService) {}
  private investmentsUpdated = new Subject<Investment[]>();
  private investmentsUpdated2 = new Subject<InvestmentMath[]>();
  private userEmail: string;
  private UID: string;
  private queryUID: string;
  private result: any = [];
  private currencyBalance=0;
  private returnValue: number;
  private investmentValue: number;
  private portfolio: InvestmentMath[] = [];
  private add: number;
  stock2: Stock;
  country: Country;
  currency: Currency;
  commodity: Commodity;
  tempshares = 0;


getUserID(){
  // Get Current User's Email
  this.userEmail = this.authService.getEmailID();

  // Get '_id' to return
  return this.http.get(backendURL + '/user/' + this.userEmail);

  }

  public transactionHistory(UID: string) {
    let params = new HttpParams();
    params = params.append('userID',UID);
    return this.http.get(backendURL + '/investment', {params: params});
  }

  public async numberOfShares(UID: string, symbol: string) : Promise<number> {
    this.tempshares = 0;
    let params = new HttpParams();
    params = params.append('userID',UID);
    this.result = await this.http.get(backendURL + '/investment', {params: params}).toPromise();

    for(let x=0;x<this.result.length;x++){ 
      if(this.result[x].symbol == symbol)
      {
        this.tempshares += +(this.result[x].shares);
      }
    }
    return this.tempshares;
  }

  public async getInvestments(UID: string) : Promise<InvestmentMath[]> {
    //Retrieve Investment List
    let params = new HttpParams();
    params = params.append('userID',UID);
    this.result = await this.http.get(backendURL + '/investment', {params: params}).toPromise();
    
   //Create Net Investment Portfolio from Investment List
   var temp2:InvestmentMath;
   for(let x=0;x<this.result.length;x++){
   this.add=1; // Reset Check for each Result Investment
   temp2={ 
     "currentPrice":this.result[x].transactionPrice, 
     "name":this.result[x].name, 
     "symbol":this.result[x].symbol,
     "shares":this.result[x].shares,
     "type":this.result[x].assetType, 
     "transactionPrice":this.result[x].transactionPrice
   };
   for(let y=0;y<this.portfolio.length;y++){ //Look to see if this has been add
     if(this.portfolio[y].symbol==temp2.symbol){
       this.portfolio[y].shares = (+this.portfolio[y].shares + +temp2.shares); // Add or Subtract Shares from this Symbol
       this.add=0; //Jump to Next Investment
       y=+(this.portfolio.length);// Symbols Match, Exit 'y' For Loop
     }
   }
   if(this.add==1){ //Investment Doesn't Exist in Portfolio Array, Add it
     this.portfolio.push(temp2);
   }
 }

 console.group("Current Prices:");
 //Update Current Price for Each Investment
 for(let z=0;z<this.portfolio.length;z++)
 {
   if(this.portfolio[z].type =="Stock" || this.portfolio[z].type=="stock"){
     //Retrieve Stock Information
     this.stockApi.getOneStock(this.portfolio[z].symbol).subscribe(stockData2 => {
       this.stock2 = { stockName: stockData2.stockName, symbol: stockData2.symbol, price: stockData2.price, marketCap: stockData2.marketCap, closeDate: stockData2.closeDate, pERatio: stockData2.pERatio };

       this.portfolio[z].currentPrice=this.stock2.price[0];
     })
   }
   if(this.portfolio[z].type =="Bond" || this.portfolio[z].type=="bond"){
    //No change
   }
   if(this.portfolio[z].type =="Commodities" || this.portfolio[z].type=="commodities"){

   //Retrieve Commodity Current Price
   this.commodityApi.getOneCommodity(this.portfolio[z].symbol).subscribe(commodityData => {
     this.commodity = {commodityName: commodityData.commodityName, symbol: commodityData.symbol, etfPrice: commodityData.etfPrice, commodityUnit: "", closeDate: [] };
   
     this.portfolio[z].currentPrice=this.commodity.etfPrice[0];
   });


   }
   if(this.portfolio[z].type =="Real Estate" || this.portfolio[z].type=="realestate"){
      //No change
   }
   if(this.portfolio[z].type =="Currency" || this.portfolio[z].type=="currency"){

   //Retrieve Currency Current Price
   this.currencyApi.getOneCurrency(this.portfolio[z].symbol).subscribe(currencyData => {
     this.currency = { currencyName: currencyData.currencyName, ticker: currencyData.ticker, rates: currencyData.rates, timeStamp: currencyData.timeStamp};

     this.portfolio[z].currentPrice=this.currency.rates[0];
   })
   }
 }

 //Return Portfolio Object
 return this.portfolio;
 }

  public async getInvestmentValue(UID: string) {
    let params = new HttpParams();
    params = params.append('userID',UID);

    this.result = await this.http.get(backendURL + '/investment', {params: params}).toPromise();
    this.investmentValue = 0;

    for (let x=0; x<this.result.length; x++){
      this.investmentValue += (this.result[x].transactionPrice * this.result[x].shares);
    }

    this.returnValue = (+(Math.round(this.investmentValue * 100) / 100).toFixed(2))
    return this.returnValue;

  }

  public async getCurrencyBalance(UID: string, baseCurrency: string) {
    let params = new HttpParams();
    params = params.append('userID',UID);
    params = params.append('baseCurrency',baseCurrency);
  
    this.result = await this.http.get(backendURL + '/baseCurrency', {params: params}).toPromise();
    this.currencyBalance = 0;
    for(let y=0; y<this.result.length; y++){
       this.currencyBalance+=(+this.result[y].shares);
    }

    this.returnValue = (+(Math.round(this.currencyBalance * 100) / 100).toFixed(2))
    return this.returnValue;
  }



  getInvestmentUpdateListener(){
    return this.investmentsUpdated.asObservable();
  }

  getInvestmentUpdateListener2(){
    return this.investmentsUpdated2.asObservable();
  }
}