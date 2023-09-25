import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoundationCommonService {

  public currentPageData = new Subject<any>();
  constructor() { }
  currentPageAdder(data) {
    this.currentPageData.next(data);
  };


}
