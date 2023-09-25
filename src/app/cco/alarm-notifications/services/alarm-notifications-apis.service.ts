import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IssueService } from '../../issues/service/issue.service';

@Injectable({
  providedIn: 'root',
})
export class AlarmNotificationsApisService {
    baseUrl = `${environment.API_BASE_URL}analytics-engine/`;
    regionsSubject;
  constructor(private http : HttpClient, private issueService: IssueService,) {}

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.http
        .get(`${this.baseUrl}alarmMasterCategory`)
        .subscribe((json: any) => {

          let categories = [{ id: 'All', name: 'All' }];

          if (json && json.length > 0) {
            categories = [];
            json.forEach((element) => {
              if (!element) {
                return;
              }

              categories.push({
                id: element,
                name: element,
              });
            });
          }
          categories.sort((a, b) =>
            (a.name || '')
              .toString()
              .localeCompare((b.name || '').toString(), 'en', {
                numeric: false,
              })
          );
          resolve(categories);
        },(err: any) => {
          // this.loading = false;
          resolve([]);
        });
    });
  }

  getIndividualAlarmData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.baseUrl}alarmMasterDetailsWithCustomSeverity`)
        .subscribe((json: any) => {
          let alarmsData = [];
              if (json && json.length > 0) {
                // json = [...json.filter((el) => el['name'] != 'ont-dying-gasp')];
                json = [...json.filter((el) => el['name']?.toLowerCase() != 'ont-power-off')];
                json.forEach((element) => {
                    element['alarm_name'] = element['name']?element['name'] : '';
                    element['alarm_category'] = element['category']?element['category'] : '';
                    element['severity'] = element['perceivedSeverity']?element['perceivedSeverity'] : '';
                    element['alarm_id'] = element['id']?element['id'] : '';
                  alarmsData.push(element);
                });
              }
              resolve(alarmsData);
            
        },(err: any) => {
          resolve([]);
        });
    });
  }

  getGroupAlarmData() : Promise<any>{
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.baseUrl}alarmgroupscount`)
        .subscribe((json: any) => {
          let groups = [];
          if (json && json.length > 0) {
            groups = [];
            json.forEach((element) => {
              if (!element) {
                return;
              }

              groups.push({
                group_name: element.name,
                no_of_alarms: element.count,
                group_id : element.uuid
              });
            });
          }
          resolve(groups);
        },(err: any) => {
          resolve([]);
        });
    });
  }
  getTransformAlarmData() : Promise<any>{
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.baseUrl}alarmRules`)
        .subscribe((json: any) => {
          let alarmsData = [];
              if (json && json.length > 0) {
                json.forEach((element) => {
                    element['alarm_name'] = element['name']?element['name'] : '';
                    element['alarmRuleId'] = element['alarmRuleId']?element['alarmRuleId'] : '';
                  alarmsData.push(element);
                });
              }
              resolve(alarmsData);
            
        },(err: any) => {
          // this.loading = false;
          resolve([]);
        });
    });
  }

  regionsApiLoader(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.regionsSubject = this.issueService.getRegions().subscribe(
        (res: any) => {
          let counts = {};
          res.forEach((x) => {
            counts[x.name] = (counts[x.name] || 0) + 1;
          });
          res.forEach((element, index) => {
            element['check_region_name'] = element.name + " (" + element.fqn?.split('=')[1].split(',')[0] + ")";
            if (counts[element['name']] > 1) {
              element.name = element.name + " (" + element.fqn?.split('=')[1].split(',')[0] + ")";
            }
          });
          res.sort();
          resolve(res);
        },
        (error) => {
          resolve([]);
        }
      );
    });
  }
  ngOnDestroy(): void {
    if (this.regionsSubject) this.regionsSubject.unsubscribe();
  }
}
