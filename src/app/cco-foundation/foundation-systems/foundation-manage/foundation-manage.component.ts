import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { FoundationCommonService } from './../../cco-foundation-service/foundation-common.service';

@Component({
  selector: 'app-foundation-manage',
  templateUrl: './foundation-manage.component.html',
  styleUrls: ['./foundation-manage.component.scss']
})
export class FoundationManageComponent implements OnInit, OnDestroy {
  language: any = {};
  languageSubject;

  constructor(
    private translateService: TranslateService,
    private foundation: FoundationCommonService
  ) {
    this.foundation.currentPageAdder('foundation-manage');
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnDestroy() {
    //sessionStorage.removeItem('foundation_list_search');
  }

}
