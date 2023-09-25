import { Component, OnInit } from '@angular/core';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-support-system',
  templateUrl: './support-system.component.html',
  styleUrls: ['./support-system.component.scss']
})
export class SupportSystemComponent implements OnInit {
  newRouterView: boolean;
  isRgModel = false;
  rgModelData: any;

  constructor(
    private sso: SsoAuthService
  ) { }

  ngOnInit(): void {
    this.newRouterView = this.sso.exosVersionCheck("22.2", true);
  }

  rgModelAction(data) {
    this.isRgModel = data ? true : false;
    if (data) this.rgModelData = data;
  }

}
