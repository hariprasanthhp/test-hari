import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-disconnected-alarms',
  templateUrl: './disconnected-alarms.component.html',
  styleUrls: ['./disconnected-alarms.component.scss']
})
export class DisconnectedAlarmsComponent implements OnInit {
  apiUrl = `${environment.API_BASE_URL}analytics-engine/disconnectedDeviceDetails`;
  constructor() { }

  ngOnInit(): void {
  }

}
