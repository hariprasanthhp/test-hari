import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-captive-portal-preview',
  templateUrl: './captive-portal-preview.component.html',
  styleUrls: ['./captive-portal-preview.component.scss']
})
export class CaptivePortalPreviewComponent implements OnInit {
  language: any;

  portalData: any = {};
  constructor(private titleService: Title,private translateService: TranslateService,) {
    this.titleService.setTitle(`Customer Portal Preview - Calix Cloud`);
  }

  ngOnInit(): void {
    this.portalData = JSON.parse(localStorage.getItem('captivePreview'));
    this.language = this.translateService.defualtLanguage;
  }

  checkUrlIsValid(value) {
    let pattern = /((h|H)ttp(s)?:\/\/)+(www\.)*[-a-zA-Z0-9@:%._\+~#=]+\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return (pattern.test(value)) ? true : false;
  }

}
