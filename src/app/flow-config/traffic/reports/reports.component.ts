import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  language: any;
  pageAvailable: boolean = false;
  menus: any

  constructor( 
    private customTranslateService: CustomTranslateService
  ) { }

  ngOnInit(): void {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.menus[0].title = this.language["Mapped Endpoint List"];
      this.menus[1].title = this.language["Endpoint Count by Mapper"];
      this.menus[2].title = this.language['Unmapped IPs'];
    })

    this.menus = [
      {
        title: this.language["Mapped Endpoint List"],
        link: 'mapped-endpoint-list'
      },
      {
        title: this.language["Endpoint Count by Mapper"],
        link: 'endpoint-count-bymapper'
      },
      {
        title: this.language['Unmapped IPs'],
        link: 'unmapped-ips'
      }
    ];
  }

}

