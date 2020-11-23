import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profile-feedAnimal',
  providers: [ProfileService],
  templateUrl: 'profile-feedAnimal.component.html',
  styleUrls: ['profile-feedAnimal.component.css']
})

export class ProfileFeedAnimalComponent implements OnInit {

  constructor(service: ProfileService) {
  }

  ngOnInit(): void {
  }

}
