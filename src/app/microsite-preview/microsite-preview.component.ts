import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-microsite-preview',
  templateUrl: './microsite-preview.component.html',
  
  styleUrls: ['./microsite-preview.component.scss']
})
export class MicrositePreviewComponent implements OnInit {
  language: any;
  languageSubject;
  micrositeDetails: any;
  selectedLanguage: any;
  OS: string;
  
  browser: string;
  
  constructor(private translateService: TranslateService,) { }
  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
    this.language = data;
      
      // this.redraw();
    });
    this.micrositeDetails = JSON.parse(localStorage.getItem("calix.micrositeDetails"));
    if (navigator.appVersion.includes("Win")) this.OS =
      "Windows";
    if (navigator.appVersion.includes("Mac")) {
     if(/(macintosh|macintel|macppc|mac68k|macos)/i.test(navigator.platform)){
      this.OS = "Mac";
     }else if ( /(iphone|ipad|ipod)/i.test(navigator.platform)){
      this.OS = "IOS";
     }
    }
    if (navigator.appVersion.includes("X11")) this.OS =
      "UNIX";
    if (navigator.appVersion.includes("Linux")) this.OS =
      "Linux";
    if ((navigator.userAgent.includes("Opera") || navigator.userAgent.includes('OPR'))) {
      this.browser = 'Opera';
    }
    else if (navigator.userAgent.includes("Edg")) {
      this.browser = 'Edge';
    }
    else if (navigator.userAgent.includes("Chrome")) {
      this.browser = 'Chrome';
    }
    else if (navigator.userAgent.includes("Safari")) {
      if(navigator.userAgent.match('CriOS')){
        this.browser = 'Chrome';
      }else {
        this.browser = 'Safari';
      }
    }
    else if (navigator.userAgent.includes("Firefox")) {
      this.browser = 'Firefox';
    }
    else if (navigator.userAgent.includes("MSIE")) //IF IE > 10
    {
      this.browser = 'IE';
    }
    else {
      this.browser = 'unknown';
    }
  };

  mouseEnterDropdown() {
    document.getElementById('dropdownMenu2').style.background = (this.micrositeDetails?.defaultSecondaryColor) ? this.micrositeDetails?.defaultSecondaryColor : this.micrositeDetails.secondaryColor;
    document.getElementById('dropdownMenu2').style.color = 'white';
  }

  mouseLeavedropdown() {
    document.getElementById('dropdownMenu2').style.background = 'white';
    document.getElementById('dropdownMenu2').style.color = (this.micrositeDetails?.defaultSecondaryColor) ? this.micrositeDetails?.defaultSecondaryColor : this.micrositeDetails.secondaryColor;
  }


  selectItem(value) {
    this.selectedLanguage = value;
  }

}
