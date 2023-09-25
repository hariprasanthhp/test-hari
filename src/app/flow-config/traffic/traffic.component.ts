import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/cco/shared/services/websocket.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {
  language: any;
  pageAvailable: boolean = false;
  menus: any
  activeRoute: any;

  constructor(
    public router: Router,
    private customTranslateService: CustomTranslateService,
    public webSocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.language = this.customTranslateService.defualtLanguage;
    if (this.language) {
      this.pageAvailable = true;
    }
    this.customTranslateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.menus[0].title = this.language.network;
      this.menus[1].title = this.language.locations;
      this.menus[2].title = this.language.Applications;
      this.menus[3].title = this.language.Reports;
    })

    this.menus = [
      {
        title: this.language.network,
        link: 'network'
      },
      {
        title: this.language.locations,
        link: 'location'
      },
      {
        title: this.language.Applications,
        link: 'application'
      },
      {
        title: this.language.Reports,
        link: 'reports'
      }
    ];
    this.activeRoute = this.router.url;
  }

  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
