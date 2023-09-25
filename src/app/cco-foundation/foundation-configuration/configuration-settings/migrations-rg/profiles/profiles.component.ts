import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  language: any;
  languageSubject: any;

  constructor(private translateService: TranslateService,
    private titleService: Title) {

  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Profiles']} - ${this.language['Migrations']} - ${this.language['Settings']} - ${this.language['Configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Profiles']} - ${this.language['Migrations']} - ${this.language['Settings']} - ${this.language['Configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
  }

}
