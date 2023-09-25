import { Component, DoCheck } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslateService } from "src/app-services/translate.service";

@Component({
  selector: 'app-my-community-iq',
  templateUrl: './my-community-iq.component.html',
  styleUrls: ['./my-community-iq.component.scss']
})
export class MyCommunityIQComponent implements DoCheck {
  activeTab: string;
  ngDoCheck(): void {
    this.activeTab = this.router.url.includes('bsp-information') ? 'bsp-information' : this.router.url.includes('communities') ? 'communities' : 'community-users';
  }
  language: any;
  languageSubject: any;

  constructor(private router: Router,private translateService: TranslateService,private titleService: Title,) {
    this.activeTab = this.router.url.includes('bsp-information') ? 'bsp-information' : this.router.url.includes('communities') ? 'communities' : 'community-users';
  }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
  };
}
