import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from '../../shared/services/custom-translate.service';

@Component({
  selector: 'app-org-access-side-menu',
  templateUrl: './org-access-side-menu.component.html',
  styleUrls: ['./org-access-side-menu.component.scss']
})
export class OrgAccessSideMenuComponent implements OnInit {

  language: any;
  pageAvailable: boolean = false;
  constructor(
    private customTranslateService: CustomTranslateService,
  ) {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
  }

  ngOnInit() {
  }

}
