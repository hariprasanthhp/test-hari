import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule, DomSanitizer, Title } from '@angular/platform-browser';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

declare var require: any;
const $: any = require('jquery');

@Component({
  selector: 'app-block-page-template-view',
  templateUrl: './block-page-template-view.component.html',
  styleUrls: ['./block-page-template-view.component.scss']
})
export class BlockPageTemplateViewComponent implements OnInit {
  language: any;
  languageSubject;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private sanitization: DomSanitizer,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private titleService: Title,
  ) {
    this.commonOrgService.currentPageAdder('block_page');
  }

  id: any = '';
  logoImage: any;
  bodyBgImage: any;
  headerBgColor: any;
  bodyFontColor: any;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getData();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Block Template View']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Block Template View']} - ${this.language['Calix Cloud']}`);
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  getData() {

    let templateData: any;
    let params: any;
    if (localStorage.getItem("templateData")) {
      if (this.id && localStorage.getItem("templateData")) {

        templateData = JSON.parse(localStorage.getItem("templateData"));
        params = templateData[this.id];
        params["api_result"] = true;
      } else {
        params = JSON.parse(localStorage.getItem("params"));
      }

      if (typeof params == "object") {
        if (params && params["api_result"]) {
          if (params["logoBgColor"]) {
            if (params["bodyFontColor"] && params["bodyFontColor"].charAt(0) === '#') {
              this.bodyFontColor = params["bodyFontColor"];
            } else {
              this.bodyFontColor = `#${params["bodyFontColor"]}`;
            }

            if (params["logoBgColor"] && params["logoBgColor"].charAt(0) === '#') {
              this.headerBgColor = params["logoBgColor"];
            } else {
              this.headerBgColor = `#${params["logoBgColor"]}`;
            }

            this.logoImage = params['logoImage'];
            $("body").css({
              background: 'url(' + params["bodyBgImage"] + ')'
            });
          }

          if (params['bodyFontColor']) {
            $("#card-title").css({
              color: '#' + params["bodyFontColor"]
            });
          }

        } else {
          $("body").css({
            background: 'url(' + params["bodyBgImage"] + ')'
          });
          // this.bodyFontColor = params["bodyFontColor"];
          // this.headerBgColor = params["logoBgColor"];

          if (params["bodyFontColor"] && params["bodyFontColor"].charAt(0) === '#') {
            this.bodyFontColor = params["bodyFontColor"];
          } else {
            this.bodyFontColor = `#${params["bodyFontColor"]}`;
          }

          if (params["logoBgColor"] && params["logoBgColor"].charAt(0) === '#') {
            this.headerBgColor = params["logoBgColor"];
          } else {
            this.headerBgColor = `#${params["logoBgColor"]}`;
          }

          this.logoImage = params['logoImage'];
          this.bodyBgImage = params['bodyBgImage'];
        }
      }
    }

  }

}
