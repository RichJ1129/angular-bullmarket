import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {ProfileService} from '../profile.service';
import { InvestmentBoxService } from '../../investmentbox/investmentbox.service';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile-feedAnimal',
  providers: [ProfileService],
  templateUrl: 'profile-feedAnimal.component.html',
  styleUrls: ['profile-feedAnimal.component.css']
})

export class ProfileFeedAnimalComponent implements OnInit {
  userObject;
  UID;
  private currency: string;
  happiness;
  newHappiness;
  userName;

  constructor(private profileService: ProfileService, private investmentApi: InvestmentBoxService, private authService: AuthService) {
    this.investmentApi.getUserID().subscribe(data => {
      this.userObject = data;
      this.UID = this.userObject._id;
    });
    this.profileService.getHappiness().subscribe(data => {
      this.happiness = data;
    });
    this.userName = this.authService.getUserName();
  }

  //Subtract the cost of the food
  feedAnimal(price)
  {
    if (price == 10)
    {
      this.newHappiness = this.happiness + 10;
    }
    else if (price == 50)
    {
      this.newHappiness = this.happiness + 50;
    }
    else
    {
      this.newHappiness = 100;
    }

    if (this.newHappiness > 100)
    {
      this.newHappiness = 100;
    }

    //Adjust the happiness bar
    this.profileService.updateHappiness(this.userName, this.newHappiness.toString());

    //Adjust the user balance
    this.currency="DOLLAR"
    this.investmentApi.removeBaseCurrency(this.UID, this.currency, price);
    location.reload();
  }

  ngOnInit(): void {
  }

}
