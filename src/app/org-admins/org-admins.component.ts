import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { CommonService } from '../sys-admin/services/common.service';

@Component({
  selector: 'app-org-admins',
  templateUrl: './org-admins.component.html',
  styleUrls: ['./org-admins.component.scss']
})
export class OrgAdminsComponent implements OnInit, OnDestroy {

  @ViewChild('scrollTopId', { static: true }) private scrollTopId: ElementRef<any>;
  scrollSubs: any;

  error: boolean;
  success: boolean;
  errorInfo: string;
  successInfo: string;
  closeSubs: any;
  successSubs: any;
  errorSubs: any;
  rouerSubs: any;
  constructor(
    private common: CommonService,
    private router: Router
  ) {
    this.rouerSubs = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.common.closeAlert();
      }
    });
  }

  ngOnInit(): void {
    this.scrollSubs = this.common.scrollTop.subscribe(() => {
      try {
        this.scrollTop();
      } catch (ex) {
      }
    });

    this.closeSubs = this.common.closeAlerts.subscribe(() => {
      this.closeAlert();
    });

    this.successSubs = this.common.successAlert.subscribe((res: string) => {
      this.openSuccessAlert(res);
    });

    this.errorSubs = this.common.errorAlert.subscribe((res: string) => {
      this.openErrorAlert(res);
    });

  }

  ngOnDestroy(): void {
    if (this.scrollSubs) {
      this.scrollSubs.unsubscribe();
    }
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
    if (this.successSubs) {
      this.successSubs.unsubscribe();
    }
    if (this.errorSubs) {
      this.errorSubs.unsubscribe();
    }

    if (this.rouerSubs) {
      this.rouerSubs.unsubscribe();
    }
  }

  scrollTop() {
    this.scrollTopId.nativeElement.scrollIntoView();
  }

  closeAlert() {
    this.error = false;
    this.success = false;
  }

  openSuccessAlert(info: string) {
    if (info) {
      this.successInfo = info;
      this.success = true;
    }

  }

  openErrorAlert(info: string) {
    if (info) {
      this.errorInfo = info;
      this.error = true;
    }

  }

}
