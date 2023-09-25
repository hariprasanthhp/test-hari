import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connected-alarms',
  templateUrl: './connected-alarms.component.html',
  styleUrls: ['./connected-alarms.component.scss']
})
export class ConnectedAlarmsComponent implements OnInit {

  apiUrl = `${environment.API_BASE_URL}analytics-engine/topAlarm`;
  constructor() {

  }

  ngOnInit(): void {
    this.apiUrl = `${environment.API_BASE_URL}analytics-engine/topAlarm`;
  }

}
