import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { CcoCommonService } from 'src/app/cco/shared/services/cco-common.service';

@Component({
  selector: 'app-system-topology-view',
  templateUrl: './system-topology-view.component.html',
  styleUrls: ['./system-topology-view.component.scss']
})
export class SystemTopologyViewComponent implements OnInit, OnDestroy {

  language;
  languageSubject;

  constructor(private translateService: TranslateService,
    private ccoCommonService: CcoCommonService
  ) {
    this.ccoCommonService.currentPageAdder('system-topology-view');
  }


  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

}
