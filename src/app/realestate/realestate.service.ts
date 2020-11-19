import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Country} from './country.model';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {AuthService} from 'src/app/auth/auth.service';
import {AuthData} from 'src/app/auth/auth-data.model';
/*
const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};*/
const backendURL = environment.apiURL;


export class FeatureCollection {
  type: string;
  features: Feature[];
}

export class Feature {
  type: string;
  properties: FeatureProperty;
  geometry: FeatureGeometry;
}

export class FeatureProperty {
  name: string;
  color?: string;
}

export class FeatureGeometry {
  type: string;
  coordinates: number[][][];
}

export class Attributes {
  name: string;
}

export class Marker {
  coordinates: number[];
  attributes: Attributes;
}

const countryBorders: FeatureCollection = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      name: ''
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        []
      ]
    }
  }]
};

@Injectable({providedIn: 'root'})
export class RealEstateService {
  constructor(private http: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  getRealEstate() {
    console.log(this.http.get(backendURL + '/realestate'));
    return this.http.get(backendURL + '/realestate');
  }

  // tslint:disable-next-line:typedef
  getOneCountry(countryName: string) {
    console.log('One Country ');
    console.log(countryName);
    console.log(backendURL + '/country/' + countryName);
    return this.http.get<Country>(backendURL + '/country/' + countryName);
  }

  // tslint:disable-next-line:typedef
  getCountryBorders(countryName: string, coordinates) {
    countryBorders.features[0].properties.name = countryName;
    countryBorders.features[0].geometry.coordinates = coordinates;
    return countryBorders;
  }

  getMarkers(): Marker[] {
    return markers;
  }
}

const markers: Marker[] = [
  { coordinates: [69.160652, 34.543896], attributes: { name: 'Kabul' } },
  { coordinates: [19.819025, 41.327953], attributes: { name: 'Tirana' } },
  { coordinates: [3.086472, 36.737232], attributes: { name: 'Algiers' } },
  { coordinates: [13.234444,  -8.838333], attributes: { name: 'Luanda' } },
  { coordinates: [-58.381592, -34.603722], attributes: { name: 'Buenos Aires' } },
  { coordinates: [44.503490, 40.177200], attributes: { name: 'Yerevan' } },
  { coordinates: [149.128998, -35.282001], attributes: { name: 'Canberra' } },
  { coordinates: [16.363449, 48.210033], attributes: { name: 'Vienna' } },
  { coordinates: [49.867092, 40.409264], attributes: { name: 'Baku' } },
  { coordinates: [50.606998, 26.201000], attributes: { name: 'Manama' } },
  { coordinates: [90.399452, 23.777176], attributes: { name: 'Dhaka' } },
  { coordinates: [27.567444, 53.893009], attributes: { name: 'Minsk' } },
  { coordinates: [4.309333, 50.872986], attributes: { name: 'Brussels' } },
  { coordinates: [2.60359, 6.49646], attributes: { name: 'Porto-Novo' } },
  { coordinates: [-68.119293, -16.489689], attributes: { name: 'La Paz' } },
  { coordinates: [18.413029, 43.856430], attributes: { name: 'Sarajevo' } },
  { coordinates: [25.906792, -24.653257], attributes: { name: 'Gaborone' } },
  { coordinates: [-47.882778, -15.793889], attributes: { name: 'Brasilia' } },
  { coordinates: [23.319941, 42.698334], attributes: { name: 'Sofia' } },
  { coordinates: [-1.53388, 12.36566], attributes: { name: 'Ouagadougou' } },
  { coordinates: [29.9308, -3.4264], attributes: { name: 'Gitega' } },
  { coordinates: [104.91601, 11.56245], attributes: { name: 'Phnom Penh' } },
  { coordinates: [11.501346, 3.844119], attributes: { name: 'Yaounde' } },
  { coordinates: [-83.749207, 41.764053], attributes: { name: 'Ottawa' } },
  { coordinates: [15.054325, 12.137752], attributes: { name: 'NDjamena' } },
  { coordinates: [-70.673676, -33.447487], attributes: { name: 'Santiago' } },
  { coordinates: [116.383331, 39.916668], attributes: { name: 'Beijing' } },
  { coordinates: [-74.063644, 4.624335], attributes: { name: 'Bogota' } },
  { coordinates: [15.307045, -4.322447], attributes: { name: 'Kinshasa' } },
  { coordinates: [-84.087502, 9.934739], attributes: { name: 'San Jose' } },
  { coordinates: [15.966568, 45.815399], attributes: { name: 'Zagreb' } },
  { coordinates: [33.382275, 35.185566], attributes: { name: 'Nicosia' } },
  { coordinates: [-82.366592, 23.113592], attributes: { name: 'Havana' } },
  { coordinates: [14.418540, 50.073658], attributes: { name: 'Prague' } },
  { coordinates: [12.568337, 55.676098], attributes: { name: 'Copenhagen' } },
  { coordinates: [-69.929611, 18.483402], attributes: { name: 'Santo Domingo' } },
  { coordinates: [-78.467834, -0.180653], attributes: { name: 'Quito' } },
  { coordinates: [31.233334, 30.033333], attributes: { name: 'Cairo' } },
  { coordinates: [-89.18718, 13.68935], attributes: { name: 'San Salvador' } },
  { coordinates: [38.93184, 15.33805], attributes: { name: 'Asmara' } },
  { coordinates: [24.753574, 59.436962], attributes: { name: 'Tallinn' } },
  { coordinates: [38.763611, 9.005401], attributes: { name: 'Addis Ababa' } },
  { coordinates: [24.945831, 60.192059], attributes: { name: 'Helsinki' } },
  { coordinates: [2.349014, 48.864716], attributes: { name: 'Paris' } },
  { coordinates: [44.783333, 41.716667], attributes: { name: 'Tbilisi' } },
  { coordinates: [13.404954, 52.520008], attributes: { name: 'Berlin' } },
  { coordinates: [-0.181784, 5.589254], attributes: { name: 'Accra' } },
  { coordinates: [23.727539, 37.983810], attributes: { name: 'Athens' } },
  { coordinates: [-90.522713, 14.628434], attributes: { name: 'Guatemala City' } },
  { coordinates: [-13.712222, 9.509167], attributes: { name: 'Conakry' } },
  { coordinates: [-87.202438, 14.081999], attributes: { name: 'Tegucigalpa' } },
  { coordinates: [19.040236, 47.497913], attributes: { name: 'Budapest' } },
  { coordinates: [-21.827774, 64.128288], attributes: { name: 'Reykjavik' } },
  { coordinates: [77.216721, 28.644800], attributes: { name: 'New Delhi' } },
  { coordinates: [106.798553, -6.225588], attributes: { name: 'Jakarta' } },
  { coordinates: [51.404343, 35.715298], attributes: { name: 'Tehran' } },
  { coordinates: [44.361488, 33.312805], attributes: { name: 'Baghdad' } },
  { coordinates: [-6.266155, 53.350140], attributes: { name: 'Dublin' } },
  { coordinates: [35.217018, 31.771959], attributes: { name: 'Jerusalem' } },
  { coordinates: [12.496366, 41.902782], attributes: { name: 'Rome' } },
  { coordinates: [-5.296440, 6.811558], attributes: { name: 'Yamoussoukro' } },
  { coordinates: [-76.79358, 17.99702], attributes: { name: 'Kingston' } },
  { coordinates: [139.839478, 35.652832], attributes: { name: 'Tokyo' } },
  { coordinates: [35.930359, 31.963158], attributes: { name: 'Amman' } },
  { coordinates: [71.44598, 51.1801], attributes: { name: 'Nur-Sultan' } },
  { coordinates: [36.817223, -1.286389], attributes: { name: 'Nairobi' } },
  { coordinates: [47.990341, 29.378586], attributes: { name: 'Kuwait City' } },
  { coordinates: [74.582748, 42.882004], attributes: { name: 'Bishkek' } },
  { coordinates: [102.630867, 17.974855], attributes: { name: 'Vientiane' } },
  { coordinates: [35.495480, 33.888630], attributes: { name: 'Beirut' } },
  { coordinates: [13.180161, 32.885353], attributes: { name: 'Tripoli' } },
  { coordinates: [25.279652, 54.687157], attributes: { name: 'Vilnius' } },
  { coordinates: [47.53613, -18.91368], attributes: { name: 'Antananarivo' } },
  { coordinates: [33.777218, -13.783934], attributes: { name: 'Lilongwe' } },
  { coordinates: [101.693207, 3.140853], attributes: { name: 'Kuala Lumpur' } },
  { coordinates: [-99.133209, 19.432608], attributes: { name: 'Mexico City' } },
  { coordinates: [106.918556, 47.921230], attributes: { name: 'Ulanbaatar' } },
  { coordinates: [-6.841650, 34.020882], attributes: { name: 'Rabat' } },
  { coordinates: [17.08323, -22.55941], attributes: { name: 'Windhoek' } },
  { coordinates: [85.300140, 27.700769], attributes: { name: 'Kathmandu' } },
  { coordinates: [4.897070, 52.377956], attributes: { name: 'Amsterdam' } },
  { coordinates: [174.777969, -41.276825], attributes: { name: 'Wellington' } },
  { coordinates: [-86.251389, 12.136389], attributes: { name: 'Managua' } },
  { coordinates: [2.1098, 13.51366], attributes: { name: 'Niamey' } },
  { coordinates: [7.491302, 9.072264], attributes: { name: 'Abuja' } },
  { coordinates: [10.757933, 59.911491], attributes: { name: 'Oslo' } },
  { coordinates: [58.545284, 23.614328], attributes: { name: 'Muscat' } },
  { coordinates: [73.084488, 33.738045], attributes: { name: 'Islamabad' } },
  { coordinates: [-79.516670, 8.983333], attributes: { name: 'Panama City' } },
  { coordinates: [-57.411827, -25.302309], attributes: { name: 'Asuncion' } },
  { coordinates: [-77.042793, -12.046374], attributes: { name: 'Lima' } },
  { coordinates: [120.984222, 14.599512], attributes: { name: 'City of Manila' } },
  { coordinates: [21.017532, 52.237049], attributes: { name: 'Warsaw' } },
  { coordinates: [-9.142685, 38.736946], attributes: { name: 'Lisbon' } },
  { coordinates: [26.096306, 44.439663], attributes: { name: 'Bucharest' } },
  { coordinates: [37.618423, 55.751244], attributes: { name: 'Moscow' } },
  { coordinates: [30.082111, -1.935114], attributes: { name: 'Kigali' } },
  { coordinates: [46.738586, 24.774265], attributes: { name: 'Riyadh' } },
  { coordinates: [-17.467686, 14.716677], attributes: { name: 'Dakar' } },
  { coordinates: [20.457273, 44.787197], attributes: { name: 'Belgrade' } },
  { coordinates: [-13.234444, 8.484444], attributes: { name: 'Freetown' } },
  { coordinates: [103.851959, 1.290270], attributes: { name: 'Singapore' } },
  { coordinates: [17.107767, 48.149345], attributes: { name: 'Bratislava' } },
  { coordinates: [45.318161, 2.046934], attributes: { name: 'Mogadishu' } },
  { coordinates: [18.423300, -33.918861], attributes: { name: 'Cape Town' } },
  { coordinates: [127.024612, 37.532600], attributes: { name: 'Seoul' } },
  { coordinates: [-3.703790, 40.416775], attributes: { name: 'Madrid' } },
  { coordinates: [32.529831, 15.564836], attributes: { name: 'Khartoum' } },
  { coordinates: [18.063240, 59.334591], attributes: { name: 'Stockholm' } },
  { coordinates: [7.451123, 46.947456], attributes: { name: 'Bern' } },
  { coordinates: [36.278336, 33.510414], attributes: { name: 'Damascus' } },
  { coordinates: [100.523186, 13.736717], attributes: { name: 'Bangkok' } },
  { coordinates: [10.181667, 36.806389], attributes: { name: 'Tunis' } },
  { coordinates: [32.866287, 39.925533], attributes: { name: 'Ankara' } },
  { coordinates: [32.582520, 0.347596], attributes: { name: 'Kampala' } },
  { coordinates: [30.513346, 50.448853], attributes: { name: 'Kiev' } },
  { coordinates: [-0.116773, 51.510357], attributes: { name: 'London' } },
  { coordinates: [-77.050636, 38.889248], attributes: { name: 'Washington' } },
  { coordinates: [-56.164532, -34.901112], attributes: { name: 'Montevideo' } },
  { coordinates: [69.240562, 41.311081], attributes: { name: 'Tashkent' } },
  { coordinates: [-66.916664, 10.500000], attributes: { name: 'Caracas' } },
  { coordinates: [105.804817, 21.028511], attributes: { name: 'Hanoi' } },
  { coordinates: [44.191006, 15.369445], attributes: { name: 'Sanaa' } },
  { coordinates: [28.283333, -15.416667], attributes: { name: 'Lusaka' } },
  { coordinates: [31.053028, -17.824858], attributes: { name: 'Harare' } }
];

