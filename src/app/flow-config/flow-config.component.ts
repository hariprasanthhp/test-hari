import { Component, OnDestroy, OnInit } from '@angular/core';
// import { CustomTranslateService } from '../shared/services/custom-translate.service';
import { CommonService } from '../sys-admin/services/common.service';
import { NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-flow-config',
  templateUrl: './flow-config.component.html',
  styleUrls: ['./flow-config.component.scss']
})
export class FlowConfigComponent implements OnInit, OnDestroy {
  rouerSubs: any;

  constructor(
    private commonOrgService: CommonService,
    private router: Router,
    // private customTranslateService: CustomTranslateService
  ) {

    this.commonOrgService.currentPageAdder('flowAnalyze');

    this.rouerSubs = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.commonOrgService.closeAlert();
      }
    });

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.rouerSubs) {
      this.rouerSubs.unsubscribe();
    }
  }

  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


}
