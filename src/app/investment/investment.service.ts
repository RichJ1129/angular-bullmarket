import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Investment} from './investment.model';
import {environment} from '../../environments/environment';
import {Subject } from 'rxjs';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class InvestmentService {

  private investments: Investment[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  private investmentsUpdated = new Subject<Investment[]>();

  // tslint:disable-next-line:typedef
  getInvestments() {
    console.log(this.http.get(backendURL + '/investment'));
    return this.http.get(backendURL + '/investment');
    //return [...this.investments];
  }

  buyInvestment(userID: string, name: string, symbol: string, purchasePrice: number, shares: number){
    const newInvestment: Investment = { userID: userID, name: name, symbol: symbol, purchasePrice: purchasePrice, shares: shares }
    //this.investments.push(newInvestment);
    return this.http.post<{message: string}>(backendURL + '/investment', newInvestment)
      .subscribe((responseData) => {
        console.log(responseData.message);
      })

      this.investmentsUpdated.next([...this.investments]);
  }

  sellInvestment(){
    console.log("sell");
  }

  getInvestmentUpdateListener(){
    return this.investmentsUpdated.asObservable();
  }
}