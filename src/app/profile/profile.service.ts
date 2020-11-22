import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {AuthService} from "../auth/auth.service";
import {AuthData} from "../auth/auth-data.model";
import {Subject} from "rxjs";

const backendURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //List of our animal images
  imageList = {'Bear': 'https://elasticbeanstalk-us-east-2-020439737471.s3.us-east-2.amazonaws.com/buckaroobear.png',
    'Bull:': 'https://elasticbeanstalk-us-west-2-380431846943.s3-us-west-2.amazonaws.com/benjaminBull2.png'};

  // Get Current User data
  userEmail = this.authService.getEmailID();
  userName = this.authService.getUserName();
  dataToSend;

  //for userAnimal subscription to dynamically change image
  userAnimalChange: Subject<string> = new Subject<string>();
  userAnimal : string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.userAnimalChange.subscribe((value => this.userAnimal = value));
  }


  //Call to user.js to update the user's animal
  public updateAnimal(userName: string, userAnimal: string) {
    this.dataToSend = {userName, userAnimal};
    return this.http.post<{message: string}>(backendURL + '/user/updateAnimal', this.dataToSend)
      .subscribe((responseData) => {
        console.log(responseData.message);
      })
  }

  //Call to user.js to retrieve the user's animal
  public getAnimal(userName: string) {
    this.dataToSend = {userName};
    return this.http.post<{message: string}>(backendURL + '/user/getAnimal', this.dataToSend)
      .subscribe((responseData) => {
        console.log(responseData.message);
      })
  }

}
