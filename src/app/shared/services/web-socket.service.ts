import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws: any;

  data$ = new Subject();
  constructor() { }

  connect() {
    this.ws = webSocket("ws://localhost:8081");
  }

  getData() {
    this.ws.subscribe(
      (msg: any) => {
        console.log('message received: ' + msg)
        this.data$.next({ message: msg });
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  send(message) {
    this.ws.next({ message: message });
  }

  close() {
    this.ws.complete();
  }

}
