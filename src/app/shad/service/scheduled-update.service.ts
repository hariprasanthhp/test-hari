import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduledUpdateService {

  constructor(private http: HttpClient) { }

  data: object = {
    start: 0,
    limit: 100
  };

  public result$ = new Subject();


  getfmList(data?: any): any {
    data = this.data;
    //console.log(data);
    return this.http.get(environment.SP_API_BASE_URL + '/schedule/jobs/list').subscribe(
      (res: any) => {
        this.result$.next(res);

      },
      (err: any) => {
        //console.log(err);
        this.result$.next([]);
      }
    );
  }

  getJob(id: any) {
    return this.http.get(environment.SP_API_BASE_URL + '/schedule/job?id=' + id);

  }

  deleteJob(id: any) {
    return this.http.delete(environment.SP_API_BASE_URL + '/schedule/jobs/delete?id=' + id);

  }


}
