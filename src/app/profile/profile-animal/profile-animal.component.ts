import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {ProfileService} from '../profile.service';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile-animal',
  providers: [ProfileService],
  templateUrl: 'profile-animal.component.html',
  styleUrls: ['profile-animal.component.css']
})

export class ProfileAnimalComponent implements OnInit {

  animalListener;
  animalDecider;
  nameListener;
  animalName;

  constructor(private profileService: ProfileService, private authService: AuthService) {
    this.animalListener = this.profileService.getAnimal()
      .subscribe(val1 => {this.animalDecider = val1;
        })
    this.nameListener = this.profileService.getAnimalName()
      .subscribe(val2 => {this.animalName = val2})
    }


  ngOnInit(): void {
  }

}
