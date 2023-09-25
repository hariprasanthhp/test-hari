import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data.service';
import { SsoAuthService } from "../../shared/services/sso-auth.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  loader: boolean;

  constructor(
    private service: DataServiceService,
    private sso: SsoAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const outUser = sessionStorage.getItem('outsideUser');
    const locId = outUser
      ? (decodeURIComponent((JSON.parse(outUser) || {})?.param.subscriberLocationId))
      : history?.state?.subscriberLocationId;
    localStorage.setItem('externalUser', outUser);
    sessionStorage.removeItem('outsideUser');
    let externalUserInfo = localStorage.getItem('externalUser');
    if (externalUserInfo && JSON.parse(externalUserInfo) instanceof Object && JSON.parse(externalUserInfo)?.externalUser)
      localStorage.removeItem('externalUser');
    const orgId = this.sso.getOrgId();
    this.loader = true;
    this.service.performSearch(orgId, `subscriberlocationid:"${decodeURIComponent(locId)}"`, 1, 1).subscribe((res: any) => {
      this.loader = false;
      if (res && res.records.length) {
        const data = res.records[0];
        sessionStorage.setItem(`calix.deviceData`, JSON.stringify(data.devices));
        sessionStorage.setItem(`calix.subscriberId`, data.subscriberId);
        this.service.setSubscriberInfo(undefined);
        this.service.setSubscriberTabInfoData(undefined);
        this.service.removeDataSaver();
        this.service.multipleRegInstance = undefined;
        const ticketId = outUser
          ? (decodeURIComponent((JSON.parse(outUser) || {})?.param.ticketId))
          : history?.state?.ticketId;
        sessionStorage.setItem('calloutcomeSubmitted', 'false');
        sessionStorage.setItem('extUserCheckModuleWise', JSON.stringify({ externalSearch: true, ticketId: ticketId, routeTo: '/support/overview' }));
        this.router.navigate(['/support/overview'], { state: { externalSearch: true, ticketId: ticketId } });
      } else {
        this.router.navigate(['/support/home'], { state: { externalUser: true, fromSearch: true } });
      }
    }, error => {
      this.loader = false;
      this.router.navigate(['/support/home'], { state: { externalUser: true, fromSearch: true } });
    })
  }

}
