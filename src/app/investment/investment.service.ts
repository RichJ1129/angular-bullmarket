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
import { InvestmentList } from 'src/app/investmentbox/investmentList'

interface IDAuthData{
  _id: string;
  email: string;
  userName: string;
}

interface InvestmentMath{
  name: string;
  symbol: string;
  type: string;
  shares: number;
  currentPrice: number;
  transactionPrice: number;
}

interface InvestmentForm {
  symbol: string;
  name: string;
  type: string;
  country: string;
}

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class InvestmentService {

  private investments: Investment[] = [];
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private stockApi: StockService, private countryApi: RealEstateService, private currencyApi: CurrencyService, private commodityApi: CommodityService) {}
  private investmentsUpdated = new Subject<Investment[]>();
  private investmentsUpdated2 = new Subject<InvestmentMath[]>();
  private userEmail: string;
  private UID: string;
  private queryUID: string;
  private result: any = [];
  private currencyBalance = 0;
  private returnValue: number;
  private investmentValue: number;
  private portfolio: InvestmentMath[] = [];
  private add: number;
  stock2: Stock;
  country: Country;
  currency: Currency;
  commodity: Commodity;
  tempshares = 0;
  
  //Get Today's Date
  today = new Date();
  dd = String(this.today.getDate()).padStart(2,'0');
  mm = String(this.today.getMonth() + 1).padStart(2,'0');
  yyyy = this.today.getFullYear();
    
  todayString = this.yyyy + '-' + this.mm + '-' + this.dd;


getUserID(){
  // Get Current User's Email
  this.userEmail = this.authService.getEmailID();

  // Get '_id' to return
  return this.http.get(backendURL + '/user/' + this.userEmail);

  }

  public transactionHistory(UID: string) {
    let params = new HttpParams();
    params = params.append('userID', UID);
    return this.http.get(backendURL + '/investment', {params});
  }

  public async numberOfShares(UID: string, symbol: string): Promise<number> {
    this.tempshares = 0;
    let params = new HttpParams();
    params = params.append('userID', UID);
    this.result = await this.http.get(backendURL + '/investment', {params}).toPromise();

    for (let x = 0; x < this.result.length; x++){
      if (this.result[x].symbol === symbol)
      {
        this.tempshares += +(this.result[x].shares);
      }
    }
    return this.tempshares;
  }

  public async getInvestments(UID: string): Promise<InvestmentMath[]> {
    // Retrieve Investment List
    let params = new HttpParams();
    params = params.append('userID', UID);
    this.result = await this.http.get(backendURL + '/investment', {params}).toPromise();

   // Create Net Investment Portfolio from Investment List
    let temp2: InvestmentMath;
    for (let x = 0; x < this.result.length; x++){
   this.add = 1; // Reset Check for each Result Investment
   temp2 = {
     currentPrice: this.result[x].transactionPrice,
     name: this.result[x].name,
     symbol: this.result[x].symbol,
     shares: this.result[x].shares,
     type: this.result[x].assetType,
     transactionPrice: this.result[x].transactionPrice
   };
   for (let y = 0; y < this.portfolio.length; y++){ 
     if (this.portfolio[y].symbol === temp2.symbol){ // Has this investment been added already
       this.portfolio[y].shares = (+this.portfolio[y].shares + +temp2.shares); // Add or Subtract Shares from this Symbol
       this.add = 0; // Jump to Next Investment
       y = +(this.portfolio.length); // Symbols Match, Exit 'y' For Loop
     }
   }
   if (this.add == 1){ // Investment Doesn't Exist in Portfolio Array, Add it
     this.portfolio.push(temp2);
   }
 }

//BUG FIX - Remove any portfolio element with 0 shares.
for(let x=0; x<this.portfolio.length;x++){
  if(this.portfolio[x].shares === 0){
    this.portfolio.splice(x,1);
    x--;
  }
}

 // Update Current Price for Each Investment
    for (let z = 0; z < this.portfolio.length; z++)
 {
   if (this.portfolio[z].type === 'Stock' || this.portfolio[z].type === 'stock'){
     // Retrieve Stock Information
     this.stockApi.getOneStock(this.portfolio[z].symbol).subscribe(stockData2 => {
       this.stock2 = { stockName: stockData2.stockName, symbol: stockData2.symbol, price: stockData2.price, marketCap: stockData2.marketCap, closeDate: stockData2.closeDate, pERatio: stockData2.pERatio };

       //Set to 2 decimal places
       this.portfolio[z].currentPrice = (+(Math.round(this.stock2.price[this.stock2.price.length - 1] * 100) / 100).toFixed(2));
     });
   }
   if (this.portfolio[z].type === 'Bond' || this.portfolio[z].type === 'bond'){
    // Bond Price is "1"
   }
   if (this.portfolio[z].type === 'Commodities' || this.portfolio[z].type === 'commodities'){

   // Retrieve Commodity Current Price
   this.commodityApi.getOneCommodity(this.portfolio[z].symbol).subscribe(commodityData => {
     this.commodity = {commodityName: commodityData.commodityName, symbol: commodityData.symbol, etfPrice: commodityData.etfPrice, commodityUnit: '', closeDate: [] };
     
    //Set to 2 Decimal Places
     this.portfolio[z].currentPrice = (+(Math.round(this.commodity.etfPrice[this.commodity.etfPrice.length - 1] * 100) / 100).toFixed(2));
   });


   }
   if (this.portfolio[z].type === 'Real Estate' || this.portfolio[z].type === 'Urban Real Estate' || this.portfolio[z].type === 'Rural Real Estate' || this.portfolio[z].type === 'realestate'){
    this.portfolio[z].currentPrice=(+(Math.round(this.portfolio[z].currentPrice * 100) / 100).toFixed(2));
  }
   if (this.portfolio[z].type === 'Currency' || this.portfolio[z].type === 'currency'){

   // Retrieve Currency Current Price
   this.currencyApi.getOneCurrency(this.portfolio[z].symbol).subscribe(currencyData => {
     this.currency = { currencyName: currencyData.currencyName, ticker: currencyData.ticker, rates: currencyData.rates, timeStamp: currencyData.timeStamp};

     //Set to 2 Decimal Places
     this.portfolio[z].currentPrice = (+(Math.round((1/this.currency.rates[this.currency.rates.length - 1]) * 100) / 100).toFixed(2)); //BUG FIX - set X currency rate as "USD per single unit of X currency" instead of "X currency per USD". This is like "Dollars per house" instead of "Houses per dollar".
   });
   }
 }

 // Return Portfolio Object
    return this.portfolio;
 }

  public async getInvestmentValue(UID: string) {
    let params = new HttpParams();
    params = params.append('userID', UID);

    this.result = await this.http.get(backendURL + '/investment', {params}).toPromise();
    this.investmentValue = 0;

    for (let x = 0; x < this.result.length; x++){
      this.investmentValue += (this.result[x].transactionPrice * this.result[x].shares);
    }

    this.returnValue = (+(Math.round(this.investmentValue * 100) / 100).toFixed(2));
    return this.returnValue;

  }


  public async updateRents(UID: string){
    let params = new HttpParams();
    params = params.append('userID', UID);

    this.result = await this.http.get(backendURL + '/investment', {params}).toPromise();



    for (let x = 0; x < this.result.length; x++){
      if(this.result[x].assetType==="Rural Real Estate"){
        console.log("Rural");

        // Retrieve Symbol, Type, Name
        let InvestmentListObject = InvestmentList.filter(obj => {
          return obj.symbol === this.result[x].symbol;
        });

        //console.log(InvestmentListObject[0].country);
        // Retrieve Information
       this.countryApi.getOneCountry(InvestmentListObject[0].country).subscribe(countryData => {
        this.country = {
          countryName: countryData.countryName,
          capitalCity: countryData.capitalCity,
          population: countryData.population,
          urbanRent: countryData.urbanRent,
          urbanPE: countryData.urbanPE,
          ruralRent: countryData.ruralRent,
          ruralPE: countryData.ruralPE,
          interestRate: countryData.interestRate,
          debtGDP: countryData.debtGDP,
          inflation: countryData.inflation,
          bondSymbol: countryData.bondSymbol,
          urbanSymbol: countryData.urbanSymbol,
          ruralSymbol: countryData.ruralSymbol,
          countrySummary: countryData.countrySummary
        };
        //Re
        console.log("Today Is: ",this.today);
        console.log("Last Payment Date: ",this.result[x].lastPaymentDate);
        console.log("Rural Rent: ",this.country.ruralRent);
        //this.result[x].lastPaymentDate: Date;
        //let lastPayment = new Date(this.result[x].lastPaymentDate.getTime())
        //this.today – Date.parse(this.result[x].lastPaymentDate.getTime());


        const date2 = new Date(this.todayString);
        const date1 = new Date(this.result[x].lastPaymentDate);
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffDays + " days");

      });



      }

      if(this.result[x].assetType==="Urban Real Estate"){
        console.log("Urban");
      }
    }


  }

  public async getCurrencyBalance(UID: string, baseCurrency: string) {
    let params = new HttpParams();
    params = params.append('userID', UID);
    params = params.append('baseCurrency', baseCurrency);

    this.result = await this.http.get(backendURL + '/baseCurrency', {params}).toPromise();
    this.currencyBalance = 0;
    for (let y = 0; y < this.result.length; y++){
       this.currencyBalance += (+this.result[y].shares);
    }

    this.returnValue = (+(Math.round(this.currencyBalance * 100) / 100).toFixed(2));
    return this.returnValue;
  }



  getInvestmentUpdateListener(){
    return this.investmentsUpdated.asObservable();
  }

  getInvestmentUpdateListener2(){
    return this.investmentsUpdated2.asObservable();
  }
}
