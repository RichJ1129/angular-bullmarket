import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {ProfileService} from '../profile.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-animalPlay',
  providers: [ProfileService],
  templateUrl: 'profile-animalPlay.component.html',
  styleUrls: ['profile-animalPlay.component.css']
})

export class ProfileAnimalPlayComponent implements OnInit {

  constructor(service: ProfileService) {
  }

  ngOnInit(): void {
  }

}
