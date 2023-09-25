import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-device-group-deletion',
  templateUrl: './device-group-deletion.component.html',
  styleUrls: ['./device-group-deletion.component.scss']
})
export class DeviceGroupDeletionComponent implements OnInit {
  language: any;

  constructor(private translateService: TranslateService,
    private ssoService: SsoAuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
  }
  displayAddGroup() {
    this.router.navigate([
      `support/netops-management/operations/devices-groups`,
    ]);
  }
}
