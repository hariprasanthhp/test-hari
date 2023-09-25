import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoCodingService {

  constructor(private http: HttpClient) { }

  getLatLonglocations(loc_coordinates, get_type?) {
    var geocodeRequest = '';


    if (get_type == 'address') {

      geocodeRequest = `https://dev.virtualearth.net/REST/v1/Locations/${loc_coordinates['latitude']},${loc_coordinates['longitude']}?key=${environment['BING_API_KEY']}`;

    } else {

      geocodeRequest = `https://dev.virtualearth.net/REST/v1/Locations?query=${loc_coordinates['address'] ? encodeURIComponent(loc_coordinates['address']) : loc_coordinates}&key=${environment['BING_API_KEY']}`;

    }

    return this.http.get(geocodeRequest);
  }
}
