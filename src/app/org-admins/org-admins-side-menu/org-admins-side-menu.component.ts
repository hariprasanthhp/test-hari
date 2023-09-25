import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
@Component({
  selector: 'app-org-admins-side-menu',
  templateUrl: './org-admins-side-menu.component.html',
  styleUrls: ['./org-admins-side-menu.component.scss']
})
export class OrgAdminsSideMenuComponent implements OnInit {
  language;
  languageSubject;

  constructor(private translateService: TranslateService,) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    })
  }

}
