import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent implements OnInit {
  language: any;
  languageSubject;
  endpointID: any;
  menus = {
    network: false,
    location: false,
    applications: false
  }

  constructor(
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public webSocketService: WebsocketService,
    private sso: SsoAuthService,
  ) {
    this.endpointID = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.webSocketService.previousURL = "";
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    let scopes = this.sso.getScopes();

    if (environment.VALIDATE_SCOPE) {
      let validScopes: any = Object.keys(scopes);
      if (validScopes) {
        for (let i = 0; i < validScopes.length; i++) {
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.network') !== -1) {
            this.menus['network'] = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.location') !== -1) {
            this.menus['location'] = true;
            continue;
          }
          if (validScopes[i].indexOf('cloud.rbac.coc.traffic.applications') !== -1) {
            this.menus['applications'] = true;
            continue;
          }
        }
      }
    } else {
      this.menus = {
        network: true,
        location: true,
        applications: true
      }
    }
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if(sessionStorage.getItem('aggregate_Endpoint_Id')){
      sessionStorage.removeItem('aggregate_Endpoint_Id');
    }
  }

  goToRealtime() {
    this.router.navigate(['/cco/traffic/endpoints/realtime'], { queryParams: { id: this.endpointID } });
  }

  goToReports() {
    this.router.navigate(['/cco/traffic/endpoints/reports'], { queryParams: { id: this.endpointID } });
  }

}
