import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriberServicesService {

  constructor(private http: HttpClient,
    private config: ConfigService) { }

  data: object = {
    start: 0,
    limit: 100
  };

  public result$ = new Subject();

  getSubscriberServicesCount(): any {
    this.http.get(environment.SP_API_BASE_URL + '/subscriber/services').subscribe(
      (res: any) => {
        if (res && res.total) {
          this.data['limit'] = res.total;
        }

        this.getSubscriberServices();
      },
      (err: any) => {
        console.log(err);
        this.result$.next({
          error: true,
          errorMsg: err.statusText
        });

      }
    );


  }


  getSubscriberServices(data?: any): any {
    data = this.data;
    //console.log(data);
    return this.http.get(environment.SP_API_BASE_URL + '/subscriber/services?start=' + data['start'] + '&limit=' + data['limit']).subscribe(
      (res: any) => {
        let jdata = [];

        if (res && res['results']) {

          let containerAllowedObj = this.config.getContainersAllowedObj();
          for (let i = 0; i < res['results'].length; i++) {
            jdata = [];
            for (let j = 0; j < res['results'][i]['containersSelected'].length; j++) {
              jdata.push(containerAllowedObj[res['results'][i]['containersSelected'][j]]);
            }

            res['results'][i]['containersSelectedNames'] = jdata.join(', ');
          }
        }

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

  private pdata: object = {
    start: 0,
    limit: 10
  };

  public loading: boolean = false;
  public ssData: any = {};
  public ssresult$ = new Subject();
  doService: any;

  getList(data?: any): any {
    if (this.loading) {
      return;
    }
    this.loading = true;
    data = this.pdata;
    //console.log(data);
    return this.doService = this.http.get(environment.SP_API_BASE_URL + '/subscriber/services?start=' + data['start'] + '&limit=' + data['limit']).subscribe(
      (res: any) => {
        this.pdata['start'] += res['results'].length;

        if (this.pdata['start'] >= res['total']) {
          res['showLoadMoreBtn'] = false;
        } else {
          res['showLoadMoreBtn'] = true;
        }

        let jdata = [];

        if (res && res['results']) {

          let containerAllowedObj = this.config.getContainersAllowedObj();
          for (let i = 0; i < res['results'].length; i++) {
            jdata = [];
            for (let j = 0; j < res['results'][i]['containersSelected'].length; j++) {
              jdata.push(containerAllowedObj[res['results'][i]['containersSelected'][j]]);
            }

            res['results'][i]['containersSelectedNames'] = jdata.join(', ');
          }
        }

        this.loading = false;

        this.ssresult$.next(res);
      },
      (err: any) => {
        //console.log(err);
        this.loading = false;
        this.result$.next({
          error: true,
          errorMsg: err.statusText
        });

      },
      () => {
        this.loading = false;
      }
    );
  }

  setDefaultValue() {
    this.pdata = {
      start: 0,
      limit: 10
    }

    this.data = {
      start: 0,
      limit: 100
    };
  }
}
