import { Injectable } from '@angular/core';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import * as Highcharts from 'highcharts/highstock';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  source: any;
  prevStreamData = {
    maxRate: [0, 0],
    packet: [0, 0]
  };

  data: any = {
    upRateData: [],
    downRateData: [],
    packetUpData: [],
    packetDownData: []
  };
  latestValues = new BehaviorSubject({});
  rateUpDeltaPerSec = 0;
  rateDownDeltaPerSec = 0;
  packetUpDeltaPerSec = 0;
  packetDownDeltaPerSec = 0;

  constructor(private sso: SsoAuthService, private router: Router) {
    //   router.events.subscribe((value) => {
    //     console.log("Router events",value instanceof NavigationEnd)
    // });
  }

  getData() {
    this.data = {
      upRateData: [],
      downRateData: [],
      packetUpData: [],
      packetDownData: []
    };
    this.prevStreamData = {
      maxRate: [0, 0],
      packet: [0, 0]
    };
    this.rateUpDeltaPerSec = 0;
    this.rateDownDeltaPerSec = 0;
    this.packetUpDeltaPerSec = 0;
    this.packetDownDeltaPerSec = 0;

    for (let i = 0; i <= 300; i++) {
      this.data.upRateData.push(0);
      this.data.downRateData.push(0);
      this.data.packetUpData.push(0);
      this.data.packetDownData.push(0);
    }
    this.emitLatestValues();
    let orgId = this.sso.getOrgId();
    let moniterType = 'EP';
    let moniterId = this.sso.getSubscriberEndpointId();

    if (!moniterId) {
      console.log("subscriber endpoint id not set");
      return;
    }

    if (this.source) {
      this.source.close();
      this.source = null;
    }

    let url = `${environment.SUPPORT_URL}/rt/sse/${orgId}/${moniterType}/${moniterId}/TAPP,TEP,TRF`;
    this.source = new EventSourcePolyfill(url, {
      headers: {
        'X-Calix-ClientID': environment.X_CALIX_CLIENTID,
        'X-Calix-AccessToken': this.sso.getAccessToken()
      }
    });

    this.source.addEventListener('open', (message: any) => { });

    this.source.addEventListener('state', (message: any) => { });

    this.source.addEventListener('message', (message: any) => {
      var data = JSON.parse(message.data);
      if (data.graphType === 'TRF') {
        this.rateUpDeltaPerSec = this.getDelta(this.prevStreamData.maxRate[0], data.maxRate[0]);
        this.rateDownDeltaPerSec = this.getDelta(this.prevStreamData.maxRate[1], data.maxRate[1]);
        this.packetUpDeltaPerSec = this.getDelta(this.prevStreamData.packet[0], data.packet[0]);
        this.packetDownDeltaPerSec = this.getDelta(this.prevStreamData.packet[1], data.packet[1]);
        this.prevStreamData.maxRate = data.maxRate;
        this.prevStreamData.packet = data.packet;
      }
    });

    this.source.addEventListener('error', (message: any) => {
      window.location.reload();
      if (this.source) {
        this.source.close();
        this.source = null;
      }
    });
  }

  getDelta(prev: number, new_val: number): number {
    let delta: number;
    if (prev <= 0) {
      delta = new_val;
    } else {
      delta = prev - new_val;
    }
    const deltaPerSec = delta / 15;
    // const dps = deltaPerSec/1024;
    return deltaPerSec;
  }

  emitLatestValues() {
    setInterval(() => {
      this.data.upRateData.splice(0, 1);
      this.data.downRateData.splice(0, 1);
      this.data.packetUpData.splice(0, 1);
      this.data.packetDownData.splice(0, 1);
      this.data.upRateData.push(this.calculateNewValue(this.data.upRateData[299], this.rateUpDeltaPerSec));
      this.data.downRateData.push(this.calculateNewValue(this.data.downRateData[299], this.rateDownDeltaPerSec));
      this.data.packetUpData.push(this.calculateNewValue(this.data.packetUpData[299], this.packetUpDeltaPerSec));
      this.data.packetDownData.push(this.calculateNewValue(this.data.packetDownData[299], this.packetDownDeltaPerSec));
      this.latestValues.next(this.data);
    }, 1000);
  }

  calculateNewValue(last, dRate) {
    const temp = (last + dRate).toFixed(2);
    const val = parseInt(temp)
    return val >= 0 ? val : 0;
  }

  unsubscribeStream() {
    if (this.source) {
      this.source.close();
      this.source = null;
    }
    this.data = {
      upRateData: [],
      downRateData: [],
      packetUpData: [],
      packetDownData: []
    };
    this.prevStreamData = {
      maxRate: [0, 0],
      packet: [0, 0]
    };
    this.rateUpDeltaPerSec = 0;
    this.rateDownDeltaPerSec = 0;
    this.packetUpDeltaPerSec = 0;
    this.packetDownDeltaPerSec = 0;
  }

  checkGetData() {
    if (!this.source) {
      this.getData();
    }
  }
}
