import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataServiceService } from '../../data.service';

@Component({
  selector: 'app-txrx',
  templateUrl: './txrx.component.html',
  styleUrls: ['./txrx.component.scss']
})
export class TXRXComponent implements OnInit {
  txData
  constructor(private dataService : DataServiceService) { }

  ngOnInit(): void {
    this.loadChart();

  }
  loadChart(){
    this.dataService.getHouseholdOptions().subscribe((data)=>{
      this.txData = data
    })
    const chart = Highcharts.chart('tx-chart', this.txData); 

  }
}
