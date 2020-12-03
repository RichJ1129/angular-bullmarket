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

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class InvestmentBoxService {

  private investments: Investment[] = [];
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
  private investmentsUpdated = new Subject<Investment[]>();
  private userEmail: string;
  private UID: string;
  private queryUID: string;

getUserID(){
  // Get Current User's Email
  this.userEmail = this.authService.getEmailID();

  // Get '_id' to return
  return this.http.get(backendURL + '/user/' + this.userEmail);

  }

  addBaseCurrency(userID: string, currency: string, amount: number, transactionDate: string){
    const currencyUpdate: Investment = { 
      userID: userID, 
      name: currency, 
      symbol: currency, 
      transactionPrice: 1, 
      shares: amount, 
      transactionType: "b", 
      assetType: "baseCurrency",
      transactionDate: transactionDate,
      lastPaymentDate: transactionDate
    }
    return this.http.post<{message: string}>(backendURL + '/investment', currencyUpdate)
      .subscribe((responseData) => {
        console.log(responseData.message);
      })
  }
  
  removeBaseCurrency(userID: string, currency: string, amount: number, transactionDate: string){
    const currencyUpdate: Investment = { 
      userID: userID, 
      name: currency, 
      symbol: currency, 
      transactionPrice: 1, 
      shares: amount, 
      transactionType: "s", 
      assetType: "baseCurrency",
      transactionDate: transactionDate,
      lastPaymentDate: transactionDate
    }
    return this.http.post<{message: string}>(backendURL + '/investment', currencyUpdate)
    .subscribe((responseData) => {
      console.log(responseData.message);
    })
  }

  buyInvestment(userID: string, name: string, symbol: string, transactionPrice: number, shares: number, transactionType: string, assetType: string, transactionDate: string){
    const newInvestment: Investment = { 
      userID: userID, 
      name: name, 
      symbol: symbol, 
      transactionPrice: transactionPrice, 
      shares: shares, 
      transactionType: transactionType, 
      assetType: assetType,
      transactionDate: transactionDate,
      lastPaymentDate: transactionDate
    }
    return this.http.post<{message: string}>(backendURL + '/investment', newInvestment)
      .subscribe((responseData) => {
        console.log(responseData.message);
      })

  }


  sellInvestment(userID: string, name: string, symbol: string, transactionPrice: number, shares: number, transactionType: string, assetType: string, transactionDate: string){
    const newSale: Investment = { 
      userID: userID, 
      name: name, 
      symbol: symbol, 
      transactionPrice: transactionPrice, 
      shares: shares, 
      transactionType: transactionType, 
      assetType: assetType,
      transactionDate: transactionDate,
      lastPaymentDate: transactionDate
    }
    return this.http.post<{message: string}>(backendURL + '/investment', newSale)
    .subscribe((responseData) => {
      console.log(responseData.message);
    })
  }

  getInvestmentUpdateListener(){
    return this.investmentsUpdated.asObservable();
  }
}