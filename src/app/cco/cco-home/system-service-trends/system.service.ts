import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  public CommandIQdata = new Subject<any>();
  public edgesuitData = new Subject<any>();


  setcommandiq(value) {
    this.CommandIQdata.next(value);
  }

  setedgesuite(value) {
    this.edgesuitData.next(value);
  }

}
