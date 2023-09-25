import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public result$ = new Subject();
  doService: any;

  getData(data?: any): void {
    let params: any = {
      precision: 6,
      window: "15min",
      location: {
        topLeft: {
          lat: 90,
          lon: -180,
        },
        bottomRight: {
          lat: -90,
          lon: 180,
        }
      }
    };
    this.doService = this.http.post(environment.SP_API_BASE_URL + '/geo/telemetry/all', params).subscribe(
      (res: any) => {
        let mdata = res['result'];
        let mlength = mdata.length;
        let locations = [];

        for (let i = 0; i < mlength; i++) {
          if (mdata[i] && typeof mdata[i].location == "object" && mdata[i].location) {
            locations.push({
              lat: parseFloat(mdata[i].location.lat),
              lng: parseFloat(mdata[i].location.lon),
              macAddr: mdata[i].macAddr,
            });
          }
        }

        res['locations'] = locations;

        this.result$.next(res);

      },
      (err: any) => {
        //console.log(err);
        this.result$.next({
          error: true,
          errorMsg: err.statusText
        });

      }
    );
  }

  getGeoTelemetryData(macAddr: any): any {
    let locked: boolean;
    if (locked) {
      return;
    }

    locked = true;

    return this.http.get(environment.SP_API_BASE_URL + '/geo/telemetry/data?macAddr=' + macAddr);
  }

  undoService(): any {
    if (this.doService) {
      this.doService.unsubscribe();
    }
  }
}
