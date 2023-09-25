import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockPageService {

  constructor(private http: HttpClient) { }

  private data: object = {
    start: 0,
    limit: 10
  };

  public loading: boolean = false;
  public templateData: any = {};
  public result$ = new Subject();
  doService: any;

  getList(spid?: any): any {
    let data;
    if (this.loading) {
      return;
    }
    this.loading = true;
    data = this.data;
    //console.log(data);
    return this.doService = this.http.get(environment.SP_API_BASE_URL + '/template/blockpage/list?start=' + data['start'] + '&limit=' + data['limit'] + '&spid=' + spid).subscribe(
      (res: any) => {
        this.data['start'] += res['results'].length;

        if (this.data['start'] >= res['total']) {
          res['showLoadMoreBtn'] = false;
        } else {
          res['showLoadMoreBtn'] = true;
        }

        for (let i = 0; i < res['results'].length; i++) {
          this.templateData[res['results'][i].id] = res['results'][i];
        }

        localStorage.setItem("templateData", JSON.stringify(this.templateData));
        this.loading = false;

        this.result$.next(res);
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

  setDefaultTemplate(templateId: any, spid: any): any {
    return this.http.post(environment.SP_API_BASE_URL + '/template/blockpage/set/default', { id: templateId, spid: spid });
  }

  deleteTemplate(templateId: any, spid: any): any {
    //return this.http.delete(environment.SP_API_BASE_URL + '/template/blockpage/delete?id=' + templateId);
    return this.http.request('DELETE', environment.SP_API_BASE_URL + '/template/blockpage/delete', {
      body: { id: templateId, spid: spid }
    });
  }

  add(params: any): any {
    return this.http.put(environment.SP_API_BASE_URL + '/template/blockpage/add', params);
  }

  getListByTemplateId(id: any, spid: any) {
    return this.http.get(environment.SP_API_BASE_URL + '/template/blockpage/list?id=' + id + '&spid=' + spid)
  }

  update(params: any): any {
    return this.http.post(environment.SP_API_BASE_URL + '/template/blockpage/update', params);
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

  setIntialData(): void {
    this.data = {
      start: 0,
      limit: 10
    };
  }

}
