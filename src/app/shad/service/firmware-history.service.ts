import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirmwareHistoryService {

  constructor(private http: HttpClient) { }

  data: object = {
    start: 0,
    limit: 10
  };

  doService: any;

  public loading: boolean = false;
  public result$ = new Subject();

  getHistory(data?: any): any {
    if (this.loading) {
      return;
    }

    this.loading = true;
    data = this.data;
    //console.log(data);
    return this.doService = this.http.get(environment.SP_API_BASE_URL + '/swupgrade/event/history?start=' + data['start'] + '&limit=' + data['limit']).subscribe(
      (res: any) => {
        this.data['start'] += res['results'].length;

        if (this.data['start'] >= res['total']) {
          res['showLoadMoreBtn'] = false;
        } else {
          res['showLoadMoreBtn'] = true;
        }

        if (res['results'].length) {
          this.result$.next(res);
        } else {
          res['results'] = [];
          this.result$.next(res);
        }

      },
      (err: any) => {
        //console.log(err);
      },
      () => {
        this.loading = false;
      }
    );
  }

  viewHistoryDetail(eventId: any, status?: any): any {
    return this.http.get(environment.SP_API_BASE_URL + '/swupgrade/event/history/detail?eventId=' + eventId + '&status=' + status);
  }

  undoService(): any {
    //this.data = {};
    this.data = {
      start: 0,
      limit: 10
    };

    if (this.doService) {
      this.doService.unsubscribe();
    }

  }
}
