import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Investment} from './investment.model';
import {environment} from '../../environments/environment';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class InvestmentService {

  constructor(private http: HttpClient, private router: Router) {}

  // tslint:disable-next-line:typedef
  getInvestments() {
    console.log(this.http.get(backendURL + '/investment'));
    return this.http.get(backendURL + '/investment');
  }

  buyInvestment(userID: string, name: string, symbol: string, purchasePrice: number, shares: number){
    const investment: Investment = { userID: userID, name: name, symbol: symbol, purchasePrice: purchasePrice, shares: shares }
    return this.http.post<{message: string}>(backendURL + '/investment', investment )
      .subscribe((responseData) => {
        console.log(responseData.message);
      })
  }

  sellInvestment(){
    console.log("sell");
  }

}