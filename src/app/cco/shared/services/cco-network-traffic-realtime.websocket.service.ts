import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
//import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketDataService {

    //socket:any;
    readonly uri: string = "ws://rtwsgw-dev.calix.com";

    socket;
    constructor() {
        this.socket = io(this.uri, {
            path: '/calix/socket-io/',
        });
    }
    listen(eventName: string): Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        })
    }
    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
    disconnect() {
        this.socket.disconnect();
    }

    reconnect() {
        this.socket.connect()
    }
    getStatus() {
        return this.socket;
    }

}
