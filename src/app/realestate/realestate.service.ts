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
  zoom: string;
  center: number[]; // Optional Parameter
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
  { coordinates: [69.160652, 34.543896], attributes: { name: 'Kabul' }, zoom: '23', center: [0, 0] },
  { coordinates: [19.819025, 41.327953], attributes: { name: 'Tirana' }, zoom: '70', center: [0, 0] },
  { coordinates: [3.086472, 36.737232], attributes: { name: 'Algiers' }, zoom: '10', center: [0, 0] },
  { coordinates: [13.234444,  -8.838333], attributes: { name: 'Luanda' }, zoom: '18', center: [16.234444,  -10.838333] },
  { coordinates: [-58.381592, -34.603722], attributes: { name: 'Buenos Aires' }, zoom: '6' , center: [0, 0]},
  { coordinates: [44.503490, 40.177200], attributes: { name: 'Yerevan' }, zoom: '60', center: [0, 0] },
  { coordinates: [149.128998, -35.282001], attributes: { name: 'Canberra' }, zoom: '6' , center: [0, 0]},
  { coordinates: [16.363449, 48.210033], attributes: { name: 'Vienna' }, zoom: '35', center: [0, 0] },
  { coordinates: [49.867092, 40.409264], attributes: { name: 'Baku' }, zoom: '50', center: [0, 0] },
  { coordinates: [50.5832, 26.21536], attributes: { name: 'Manama' }, zoom: '50', center: [0, 0] },
  { coordinates: [90.399452, 23.777176], attributes: { name: 'Dhaka' }, zoom: '50', center: [0, 0] },
  { coordinates: [27.567444, 53.893009], attributes: { name: 'Minsk' }, zoom: '42', center: [0, 0] },
  { coordinates: [4.309333, 50.872986], attributes: { name: 'Brussels' }, zoom: '65', center: [0, 0] },
  { coordinates: [2.60359, 6.49646], attributes: { name: 'Porto-Novo' }, zoom: '43', center: [2.60359, 8.49646] },
  { coordinates: [-68.119293, -16.489689], attributes: { name: 'La Paz' }, zoom: '22', center: [0, 0] },
  { coordinates: [18.413029, 43.856430], attributes: { name: 'Sarajevo' }, zoom: '42', center: [0, 0] },
  { coordinates: [25.906792, -24.653257], attributes: { name: 'Gaborone' }, zoom: '26', center: [25.906792, -23.653257] },
  { coordinates: [-47.882778, -15.793889], attributes: { name: 'Brasilia' }, zoom: '8' , center: [0, 0]},
  { coordinates: [23.319941, 42.698334], attributes: { name: 'Sofia' }, zoom: '42', center: [0, 0] },
  { coordinates: [-1.53388, 12.36566], attributes: { name: 'Ouagadougou' }, zoom: '42', center: [0, 0] },
  { coordinates: [29.9308, -3.4264], attributes: { name: 'Gitega' }, zoom: '80', center: [0, 0] },
  { coordinates: [104.91601, 11.56245], attributes: { name: 'Phnom Penh' }, zoom: '50', center: [0, 0] },
  { coordinates: [11.501346, 3.844119], attributes: { name: 'Yaounde' }, zoom: '28', center: [13.501346, 6.844119] },
  { coordinates: [-75.69812, 45.41117], attributes: { name: 'Ottawa' }, zoom: '2.75' , center: [0, 0]},
  { coordinates: [15.054325, 12.137752], attributes: { name: 'NDjamena' }, zoom: '18', center: [18.054325, 16.137752] },
  { coordinates: [-70.673676, -33.447487], attributes: { name: 'Santiago' }, zoom: '7', center: [-70.673676, -39.447487] },
  { coordinates: [116.383331, 39.916668], attributes: { name: 'Beijing' }, zoom: '6', center: [0, 0] },
  { coordinates: [-74.063644, 4.624335], attributes: { name: 'Bogota' }, zoom: '20', center: [0, 0] },
  { coordinates: [15.223333, -4.303056], attributes: { name: 'Kinshasa' }, zoom: '15', center: [24.223333, -5.303056] },
  { coordinates: [-84.087502, 9.934739], attributes: { name: 'San Jose' }, zoom: '70', center: [0, 0] },
  { coordinates: [15.966568, 45.815399], attributes: { name: 'Zagreb' }, zoom: '45', center: [15.966568, 44.815399] },
  { coordinates: [33.36667, 35.16667], attributes: { name: 'Nicosia' }, zoom: '100', center: [0, 0] },
  { coordinates: [-82.366592, 23.113592], attributes: { name: 'Havana' }, zoom: '41', center: [-80.366592, 21.113592] },
  { coordinates: [14.418540, 50.073658], attributes: { name: 'Prague' }, zoom: '42', center: [0, 0] },
  { coordinates: [12.568337, 55.676098], attributes: { name: 'Copenhagen' }, zoom: '45', center: [0, 0] },
  { coordinates: [-69.929611, 18.483402], attributes: { name: 'Santo Domingo' }, zoom: '42', center: [0, 0] },
  { coordinates: [-78.467834, -0.180653], attributes: { name: 'Quito' }, zoom: '42', center: [-78.467834, -2.180653] }, // Checked
  { coordinates: [31.233334, 30.033333], attributes: { name: 'Cairo' }, zoom: '20', center: [31.233334, 27.033333] },
  { coordinates: [-89.18718, 13.68935], attributes: { name: 'San Salvador' }, zoom: '80', center: [0, 0] },
  { coordinates: [38.93184, 15.33805], attributes: { name: 'Asmara' }, zoom: '42', center: [0, 0] }, // Checked
  { coordinates: [24.753574, 59.436962], attributes: { name: 'Tallinn' }, zoom: '40', center: [0, 0] },
  { coordinates: [38.763611, 9.005401], attributes: { name: 'Addis Ababa' }, zoom: '20', center: [0, 0] },
  { coordinates: [24.945831, 60.192059], attributes: { name: 'Helsinki' }, zoom: '12', center: [25.945831, 65.192059] }, // Checked
  { coordinates: [2.349014, 48.864716], attributes: { name: 'Paris' }, zoom: '23', center: [2.349014, 46.864716] },
  { coordinates: [44.783333, 41.716667], attributes: { name: 'Tbilisi' }, zoom: '50', center: [0, 0] },
  { coordinates: [13.404954, 52.520008], attributes: { name: 'Berlin' }, zoom: '25', center: [13.404954, 51.520008] },
  { coordinates: [-0.181784, 5.589254], attributes: { name: 'Accra' }, zoom: '42', center: [-0.181784, 7.589254] },
  { coordinates: [23.727539, 37.983810], attributes: { name: 'Athens' }, zoom: '35', center: [0, 0] },
  { coordinates: [-90.522713, 14.628434], attributes: { name: 'Guatemala City' }, zoom: '53', center: [-90.522713, 15.628434] },
  { coordinates: [-13.712222, 9.509167], attributes: { name: 'Conakry' }, zoom: '42', center: [-10.712222, 9.509167] },
  { coordinates: [-87.202438, 14.081999], attributes: { name: 'Tegucigalpa' }, zoom: '55', center: [0, 0] },
  { coordinates: [19.040236, 47.497913], attributes: { name: 'Budapest' }, zoom: '50', center: [0, 0] },
  { coordinates: [-21.827774, 64.128288], attributes: { name: 'Reykjavik' }, zoom: '32', center: [-19.827774, 65.128288] },
  { coordinates: [77.216721, 28.644800], attributes: { name: 'New Delhi' }, zoom: '10', center: [77.216721, 23.644800] },
  { coordinates: [106.798553, -6.225588], attributes: { name: 'Jakarta' }, zoom: '10', center: [116.798553, -6.225588] },
  { coordinates: [51.404343, 35.715298], attributes: { name: 'Tehran' }, zoom: '14', center: [53.404343, 30.715298] },
  { coordinates: [44.361488, 33.312805], attributes: { name: 'Baghdad' }, zoom: '35', center: [0, 0] },
  { coordinates: [-6.266155, 53.350140], attributes: { name: 'Dublin' }, zoom: '47', center: [0, 0] },
  { coordinates: [35.217018, 31.771959], attributes: { name: 'Jerusalem' }, zoom: '60', center: [0, 0] },
  { coordinates: [12.496366, 41.902782], attributes: { name: 'Rome' }, zoom: '23', center: [0, 0] },
  { coordinates: [-5.296440, 6.811558], attributes: { name: 'Yamoussoukro' }, zoom: '42', center: [0, 0] }, // Checked
  { coordinates: [-76.79358, 17.99702], attributes: { name: 'Kingston' }, zoom: '70', center: [0, 0] }, // Checked
  { coordinates: [139.839478, 35.652832], attributes: { name: 'Tokyo' }, zoom: '17', center: [139.839478, 38.652832] },
  { coordinates: [35.930359, 31.963158], attributes: { name: 'Amman' }, zoom: '50', center: [37.930359, 30.963158] },
  { coordinates: [71.44598, 51.1801], attributes: { name: 'Nur-Sultan' }, zoom: '10', center: [0, 0] },
  { coordinates: [36.817223, -1.286389], attributes: { name: 'Nairobi' }, zoom: '30', center: [36.817223, -0.286389] },
  { coordinates: [47.990341, 29.378586], attributes: { name: 'Kuwait City' }, zoom: '100', center: [0, 0] },
  { coordinates: [74.582748, 42.882004], attributes: { name: 'Bishkek' }, zoom: '42', center: [74.582748, 40.882004] },
  { coordinates: [102.630867, 17.974855], attributes: { name: 'Vientiane' }, zoom: '38', center: [0, 0] },
  { coordinates: [35.495480, 33.888630], attributes: { name: 'Beirut' }, zoom: '90', center: [0, 0] },
  { coordinates: [13.180161, 32.885353], attributes: { name: 'Tripoli' }, zoom: '20', center: [17.180161, 25.885353] },
  { coordinates: [25.279652, 54.687157], attributes: { name: 'Vilnius' }, zoom: '50', center: [25.279652, 54.787157] },
  { coordinates: [47.53613, -18.91368], attributes: { name: 'Antananarivo' }, zoom: '22', center: [0, 0] },
  { coordinates: [33.777218, -13.783934], attributes: { name: 'Lilongwe' }, zoom: '38', center: [0, 0] },
  { coordinates: [101.693207, 3.140853], attributes: { name: 'Kuala Lumpur' }, zoom: '44', center: [0, 0] },
  { coordinates: [-99.133209, 19.432608], attributes: { name: 'Mexico City' }, zoom: '15', center: [-100.133209, 22.432608] },
  { coordinates: [106.918556, 47.921230], attributes: { name: 'Ulanbaatar' }, zoom: '12', center: [0, 0] },
  { coordinates: [-6.841650, 34.020882], attributes: { name: 'Rabat' }, zoom: '20', center: [-6.841650, 28.020882] },
  { coordinates: [17.08323, -22.55941], attributes: { name: 'Windhoek' }, zoom: '23', center: [0, 0] },
  { coordinates: [85.300140, 27.700769], attributes: { name: 'Kathmandu' }, zoom: '42', center: [0, 0] }, // Checked
  { coordinates: [4.897070, 52.377956], attributes: { name: 'Amsterdam' }, zoom: '50', center: [0, 0] },
  { coordinates: [174.777969, -41.276825], attributes: { name: 'Wellington' }, zoom: '15', center: [0, 0] },
  { coordinates: [-86.251389, 12.136389], attributes: { name: 'Managua' }, zoom: '60', center: [-84.251389, 12.136389] },
  { coordinates: [2.1098, 13.51366], attributes: { name: 'Niamey' }, zoom: '20', center: [10.1098, 15.51366] },
  { coordinates: [7.491302, 9.072264], attributes: { name: 'Abuja' }, zoom: '25', center: [0, 0] },
  { coordinates: [10.757933, 59.911491], attributes: { name: 'Oslo' }, zoom: '10', center: [15.757933, 65.911491] },
  { coordinates: [58.545284, 23.614328], attributes: { name: 'Muscat' }, zoom: '29', center: [58.545284, 20.614328] },
  { coordinates: [73.084488, 33.738045], attributes: { name: 'Islamabad' }, zoom: '20', center: [73.084488, 29.738045] },
  { coordinates: [-79.516670, 8.983333], attributes: { name: 'Panama City' }, zoom: '50', center: [0, 0] },
  { coordinates: [-57.411827, -25.302309], attributes: { name: 'Asuncion' }, zoom: '28', center: [-57.411827, -23.302309] },
  { coordinates: [-77.042793, -12.046374], attributes: { name: 'Lima' }, zoom: '16', center: [-70.042793, -9.046374] },
  { coordinates: [120.984222, 14.599512], attributes: { name: 'City of Manila' }, zoom: '20', center: [125.984222, 10.599512] },
  { coordinates: [21.017532, 52.237049], attributes: { name: 'Warsaw' }, zoom: '35', center: [0, 0] },
  { coordinates: [-9.142685, 38.736946], attributes: { name: 'Lisbon' }, zoom: '41', center: [-6.142685, 39.736946] },
  { coordinates: [26.096306, 44.439663], attributes: { name: 'Bucharest' }, zoom: '40', center: [26.096306, 45.439663] },
  { coordinates: [37.618423, 55.751244], attributes: { name: 'Moscow' }, zoom: '3', center: [96.618423, 65.751244] },
  { coordinates: [30.082111, -1.935114], attributes: { name: 'Kigali' }, zoom: '70', center: [0, 0] },
  { coordinates: [46.738586, 24.774265], attributes: { name: 'Riyadh' }, zoom: '18', center: [0, 0] },
  { coordinates: [-17.467686, 14.716677], attributes: { name: 'Dakar' }, zoom: '45', center: [-13.467686, 14.716677] },
  { coordinates: [20.457273, 44.787197], attributes: { name: 'Belgrade' }, zoom: '50', center: [0, 0] },
  { coordinates: [-13.17994, 8.484444], attributes: { name: 'Freetown' }, zoom: '50', center: [-12.17994, 8.484444] },
  { coordinates: [17.107767, 48.149345], attributes: { name: 'Bratislava' }, zoom: '50', center: [20.107767, 48.149345] },
  { coordinates: [45.318161, 2.046934], attributes: { name: 'Mogadishu' }, zoom: '20', center: [45.318161, 5.046934] },
  { coordinates: [18.423300, -33.918861], attributes: { name: 'Cape Town' }, zoom: '22', center: [23.423300, -28.918861] },
  { coordinates: [127.024612, 37.532600], attributes: { name: 'Seoul' }, zoom: '43', center: [127.024612, 36.532600] },
  { coordinates: [-3.703790, 40.416775], attributes: { name: 'Madrid' }, zoom: '30', center: [0, 0] },
  { coordinates: [32.529831, 15.564836], attributes: { name: 'Khartoum' }, zoom: '20', center: [0, 0] },
  { coordinates: [18.063240, 59.334591], attributes: { name: 'Stockholm' }, zoom: '9', center: [18.063240, 61.334591] },
  { coordinates: [7.451123, 46.947456], attributes: { name: 'Bern' }, zoom: '60', center: [0, 0] },
  { coordinates: [36.278336, 33.510414], attributes: { name: 'Damascus' }, zoom: '35', center: [39.278336, 33.510414] },
  { coordinates: [100.523186, 13.736717], attributes: { name: 'Bangkok' }, zoom: '22', center: [0, 0] },
  { coordinates: [10.181667, 36.806389], attributes: { name: 'Tunis' }, zoom: '32', center: [10.181667, 33.806389] },
  { coordinates: [32.866287, 39.925533], attributes: { name: 'Ankara' }, zoom: '22', center: [34.866287, 37.925533] },
  { coordinates: [32.582520, 0.347596], attributes: { name: 'Kampala' }, zoom: '42', center: [0, 0] },
  { coordinates: [30.513346, 50.448853], attributes: { name: 'Kiev' }, zoom: '24', center: [32.513346, 48.448853] },
  { coordinates: [-0.116773, 51.510357], attributes: { name: 'London' }, zoom: '22', center: [-0.116773, 54.510357] },
  { coordinates: [-77.050636, 38.889248], attributes: { name: 'Washington' }, zoom: '4', center: [-112.050636, 50.889248] },
  { coordinates: [-56.18816, -34.89328], attributes: { name: 'Montevideo' }, zoom: '42', center: [-56.18816, -32.89328] },
  { coordinates: [69.240562, 41.311081], attributes: { name: 'Tashkent' }, zoom: '22', center: [65.240562, 41.311081] },
  { coordinates: [-66.916664, 10.500000], attributes: { name: 'Caracas' }, zoom: '28', center: [-66.916664, 6.200000] },
  { coordinates: [105.804817, 21.028511], attributes: { name: 'Hanoi' }, zoom: '20', center: [105.804817, 17.028511] },
  { coordinates: [44.191006, 15.369445], attributes: { name: 'Sanaa' }, zoom: '35', center: [47.191006, 15.369445] },
  { coordinates: [28.283333, -15.416667], attributes: { name: 'Lusaka' }, zoom: '30', center: [28.283333, -13.416667] },
  { coordinates: [31.053028, -17.824858], attributes: { name: 'Harare' }, zoom: '39', center: [31.053028, -18.824858] }
];

