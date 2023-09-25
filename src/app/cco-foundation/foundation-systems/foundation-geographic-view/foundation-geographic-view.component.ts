import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationCommonService } from '../../cco-foundation-service/foundation-common.service';

@Component({
  selector: 'app-foundation-geographic-view',
  templateUrl: './foundation-geographic-view.component.html',
  styleUrls: ['./foundation-geographic-view.component.scss']
})
export class FoundationGeographicViewComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private foundation: FoundationCommonService,
    private titleService:Title
  ) {
    this.foundation.currentPageAdder('foundation-geographic-view');
  }

  ngOnInit(): void {
    this.titleService.setTitle('Geographic View - Systems - Deployment - Calix Cloud');
    setTimeout(() => {
      this.foundation.currentPageAdder('foundation-geographic-view');
    }, 100);

  }

}
