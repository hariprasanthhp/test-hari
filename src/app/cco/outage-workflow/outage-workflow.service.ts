import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutageWorkflowService {

  constructor() { }

  public outageTabChanged$ = new Subject();

  setOutageTabChange() {
    this.outageTabChanged$.next(true);
  }

  updateRegLoc(data: any) {
    if (!data?.region) {
      data['region'] = ['11111111-1111-1111-1111-111111111111'];
    } else if (data?.region?.indexOf('All') !== -1) {
      let index = data?.region?.indexOf('All');
      if (index !== -1) {
        data?.region?.splice(index, 1, '11111111-1111-1111-1111-111111111111');
      }
    }

    if (!data?.location) {
      data['location'] = ['11111111-1111-1111-1111-111111111111'];
    } else if (data?.location?.indexOf('All') !== -1) {
      let index = data?.location?.indexOf('All');
      if (index !== -1) {
        data?.location?.splice(index, 1, '11111111-1111-1111-1111-111111111111');
      }
    }

    return data;
  }

  updateRegLocToAll(json: any) {
    if (!json?.region) {
      json['region'] = ['All'];
    } else if (json?.region?.indexOf('11111111-1111-1111-1111-111111111111') !== -1) {
      let index = json?.region?.indexOf('11111111-1111-1111-1111-111111111111');
      if (index !== -1) {
        json?.region?.splice(index, 1, 'All');
      }
    }

    if (!json?.location) {
      json['location'] = ['All'];
    } else if (json?.location?.indexOf('11111111-1111-1111-1111-111111111111') !== -1) {
      let index = json?.location?.indexOf('11111111-1111-1111-1111-111111111111');
      if (index !== -1) {
        json?.location?.splice(index, 1, 'All');
      }
    }

    return json;
  }

}
