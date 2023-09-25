import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.scss']
})
export class FoundationComponent implements OnInit, OnDestroy {

  language: any;
  translateSubscribe: any;
  pageAvailable: boolean;
  currentPage: any = 'block_page';
  constructor(
    private translateService: TranslateService,
    private commonOrgService: CommonService,
  ) {
    this.language = this.translateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.translateSubscribe = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })

    this.commonOrgService.currentPageData.subscribe((data: any) => {
      this.currentPage = data;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    if (this.translateSubscribe) {
      this.translateSubscribe.unsubscribe();
    }


  }

}
