import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
@Injectable({
    providedIn: 'root'
  })
  
  export class SubscribeService{
  
    constructor() {   
    }

    private subscribeClicked = new ReplaySubject<string>(1);
    public subscribeClicked$ = this.subscribeClicked.asObservable();

    private showCountStatus = new BehaviorSubject<boolean>(false);
    public showCountStatus$ = this.showCountStatus.asObservable();

    private updateSSIDCountStatus = new BehaviorSubject<boolean>(false);
    public  updateSSIDCount$ = this.updateSSIDCountStatus.asObservable();

    public mobileAuthToken = new BehaviorSubject<string>(null);
    public  mobileAuthToken$ = this.mobileAuthToken.asObservable();

    updateClickStatus(clicked:string){
        this.subscribeClicked.next(clicked);
    }

    showCount(val:boolean){
      this.showCountStatus.next(val);
    }

    updateSSIDCount(val:boolean){
      this.updateSSIDCountStatus.next(val)
    }

    updateMobileToken(token:string){
      this.mobileAuthToken.next(token);
    }

  }