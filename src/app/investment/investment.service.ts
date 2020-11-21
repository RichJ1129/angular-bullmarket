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
export class InvestmentService {

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

  public getInvestments(UID: string) {
    let params = new HttpParams();
    params = params.append('userID',UID);
    return this.http.get(backendURL + '/investment', {params: params});
  }

  public getCurrencyBalance(UID: string, baseCurrency: string) {
    let params = new HttpParams();
    params = params.append('userID',UID);
    params = params.append('baseCurrency',baseCurrency);
    console.log(backendURL+'/baseCurrency', params);
    return this.http.get(backendURL + '/baseCurrency', {params: params});
  }



  getInvestmentUpdateListener(){
    return this.investmentsUpdated.asObservable();
  }
}