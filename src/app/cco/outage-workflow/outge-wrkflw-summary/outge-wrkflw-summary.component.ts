import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';
import { OutageWorkflowService } from '../outage-workflow.service';
import { IssueService } from '../../issues/service/issue.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-outge-wrkflw-summary',
  templateUrl: './outge-wrkflw-summary.component.html',
  styleUrls: ['./outge-wrkflw-summary.component.scss']
})
export class OutgeWrkflwSummaryComponent implements OnInit {
  loader = false;
  language: any;
  languageSubject: any;
  regionsSubject: any;
  locationsSubject: any;
  regionsObj = {};
  geoInfo = {};
  showAllRegions = false;
  errorInfo: any;
  error: boolean;
  recepientsInfo: { emailRecipients: any; emailNotes: any; sms: any; webhooks: any; };
  @Input()
  set workflowObj(data: any) {
    console.log(data);

    this.recepientsInfo = {
      emailRecipients: data.emails,
      emailNotes: data.notes,
      sms: data?.sms,
      webhooks: data?.webhooks,
    }


    data = this.otgWrkflwSrvc.updateRegLocToAll(data);
    if (data?.region?.indexOf('All') !== -1) {
      this.showAllRegions = true;
    }
    this.generateExclusionDatazForDisplay(data?.filter);
    this._workflowObj = data;
  }
  get workflowObj() {
    return this._workflowObj;
  }

  private _workflowObj: any

  loading = false;
  showTitle = false;

  constructor(private translateService: TranslateService,
    private dateUtils: DateUtilsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private otgWrkflwSrvc: OutageWorkflowService,
    private issueService: IssueService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    let notificationId = this.route.snapshot.paramMap.get("notificationId");
    if (notificationId) {
      this.titleService.setTitle('Internet Outage Notifications - Email Notifications - Network Operations - Operations - Operations - Calix Cloud');
      this.showTitle = true;
      this.getRecordById(notificationId);
    } else {
      this.getRegions();
    }

  }

  getRegions() {
    this.regionsSubject = this.issueService.getRegions()
      .subscribe((res: any) => {
        if (res) {
          res = this.issueService.appendFqn(res);

          let data: any = {};
          res?.forEach(element => {
            data[element?.id] = element?.name;
            if (this.workflowObj?.region?.length && this.workflowObj?.region?.indexOf(element?.id) !== -1) {
              this.geoInfo[element?.id] = [];
            }
            // if (!this.workflowObj?.location?.length) {
            //   this.geoInfo[element?.id] = ['All'];
            // }
          });

          this.regionsObj = data;

          if (this.workflowObj?.region) {
            this.loadLocationValue();
          }



        }

      }, (error) => {
        console.log(error);
      })
  }

  loadLocationValue() {
    let ids = this.workflowObj.region;
    if (ids?.length) {
      let regionQuery = '';

      if (ids.length) {
        if (ids.indexOf('All') !== -1) {
          return;
        }
        ids.forEach(element => {
          if (element == 'All') {
            return;
          }
          if (regionQuery) {
            regionQuery += `&`;
          }
          regionQuery += `region=${element}`
        });

        this.locationsSubject = this.http.get(`${environment.API_BASE_URL}nfa/locations?${regionQuery}`).subscribe((res: any) => {
          if (this.workflowObj?.location?.length) {
            res = this.issueService.appendFqn(res);
            let dataMap = this.geoInfo;
            res?.forEach(element => {
              if (this.workflowObj?.location?.indexOf(element?.id) !== -1) {
                // if (dataMap[element?.regionId]?.indexOf('All') !== -1) {
                //   let index = dataMap[element?.regionId]?.indexOf('All');
                //   dataMap[element?.regionId]?.splice(index, 1);
                // }

                if (dataMap[element?.regionId]) {
                  dataMap[element?.regionId].push(element?.name);
                } else {
                  dataMap[element?.regionId] = [element?.name];
                }
              }
            });
            console.log(dataMap);
            this.geoInfo = dataMap;

          }

        }, (error) => {
        });

      }
    }

  }

  exclusions = [];
  generateExclusionDatazForDisplay(exclusions: any) {
    let data = [];
    exclusions?.forEach(element => {
      data.push({
        daysOfWeek: element?.daysOfWeek,
        fromTime: this.getStartDate(element?.fromTime),
        toTime: this.getEndDate(element?.toTime),
      });
    });

    this.exclusions = data;
  }

  getEndDate(endTime = '23:59') {
    return new Date(`${this.dateUtils.getTodayDateStr()} ${endTime}`);
  }

  getStartDate(startTime = '00:00') {
    return new Date(`${this.dateUtils.getTodayDateStr()} ${startTime}`);
  }

  getRecordById(id: any) {
    this.loader = true;
    let url = `${environment.API_BASE_URL}analytics-engine/outageworkflow?outageWorkflowId=${id}`;
    this.http.get(url).subscribe((json: any) => {
      if (json && Object.keys(json).length) {
        this.workflowObj = { ...this.workflowObj, ...json };
      }

      this.getRegions();

      this.loader = false;
    }, (err: any) => {
      console.log(err);
      this.pageErrorHandle(err);
    });
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
    this.error = true;
    this.loader = false;
  }

}
