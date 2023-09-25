import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.scss']
})
export class SpeedTestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoReports(): void {
    this.router.navigate(['support/service/data/traffic-report']);
  }

}
