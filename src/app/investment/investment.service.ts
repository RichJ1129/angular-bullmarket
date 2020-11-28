import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Investment} from './investment.model';
import {environment} from '../../environments/environment';
import {Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';

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
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
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

  public async getInvestments(UID: string) : Promise<InvestmentMath[]> {
    let params = new HttpParams();
    params = params.append('userID',UID);

    this.result = await this.http.get(backendURL + '/investment', {params: params}).toPromise();
    var temp2:InvestmentMath;

    for(let x=0;x<this.result.length;x++){
    this.add=1; // Reset Portfolio Symbol Check for each Result Investment Object
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
      console.log("Added ", temp2.symbol);
    }
  }

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
    console.log("service check investment", this.returnValue);
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
    console.log("service check balance", this.returnValue);


    return this.returnValue;



  }



  getInvestmentUpdateListener(){
    return this.investmentsUpdated.asObservable();
  }

  getInvestmentUpdateListener2(){
    return this.investmentsUpdated2.asObservable();
  }
}