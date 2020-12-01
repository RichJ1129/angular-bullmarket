import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {ProfileService} from '../profile.service';
import { InvestmentBoxService } from '../../investmentbox/investmentbox.service';

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

  constructor(service: ProfileService, private investmentApi: InvestmentBoxService) {
    this.investmentApi.getUserID().subscribe(data => {
      this.userObject = data;
      this.UID = this.userObject._id;
    });
  }

  //Subtract the cost of the food
  feedAnimal(price)
  {
    this.currency="DOLLAR"
    this.investmentApi.removeBaseCurrency(this.UID, this.currency, price);
    location.reload();
  }

  ngOnInit(): void {
  }

}
