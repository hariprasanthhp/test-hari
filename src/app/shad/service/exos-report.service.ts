import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';
import { SsoAuthService } from "../../../app/shared/services/sso-auth.service";
import * as $ from "jquery";

@Injectable({
  providedIn: 'root'
})
export class ExosReportService {

  constructor(private http: HttpClient, private auth: SsoAuthService) { }

  public result$ = new Subject();
  routersCount = 0;
  doService: any;


  getExosReport(spid?: any): void {
    spid = spid ? spid : window.localStorage.getItem('calix.spid')
    this.doService = this.http.get(environment.SP_API_BASE_URL + '/report/exos?spid=' + spid).subscribe(
      (jdata: any) => {

        if (jdata && jdata.subscribers) {

          var data = jdata.subscribers;
          var length = data.length;
          var i, j;
          var routers = [];
          var routersLen = 0;
          var type = '';
          var installedDate, unInstalledDate;
          var name, d, ld, email, html;
          for (i = 0; i < length; i++) {
            if (!data[i]) {
              continue;
            }

            d = new Date(data[i].created);
            ld = d.toLocaleString();
            name = data[i].first_name + ' ' + data[i].last_name;

            routers = data[i].routers;
            routersLen = routers.length;

            for (j = 0; j < routersLen; j++) {

              type = routers[j].type;


              if (j == 0) {
                html += '<tr style="text-align: center; vertical-align: middle;" id="' + data[i].email + j + '"><td rowspan="' + routersLen + '">' + this.Capitalization(name) + '</td><td rowspan="' + routersLen + '">' + data[i].email + '</td><td>' + routers[j].mac_addr + '</td><td>' + routers[j].fsan_serial_number + '</td><td>' + routers[j].model_number + '</td><td>' + routers[j].type + '</td></tr>';
              } else {
                html += '<tr style="text-align: center; vertical-align: middle;" id="' + data[i].user_id + j + '"><td>' + routers[j].mac_addr + '</td><td>' + routers[j].fsan_serial_number + '</td><td>' + routers[j].model_number + '</td><td>' + routers[j].type + '</td></tr>';
              }

            }
          }

          $("#DLtoExcel").show();

          this.routersCount = jdata.total;
          var rcHtml = '<span> Number of Subscribers : </span><span> ' + this.routersCount + ' </span>';
          if (this.routersCount) {
            $("#container_count_div").html(rcHtml);
          } else {
            $("#container_count_div").html("");
          }


        } else {
          $("#DLtoExcel").hide();
        }

        $("#billing-report-body").html(html);

        $("#billing-report-table").show();
        $("#container_count_div").show();
        $("#billing-report-table").show();


        this.result$.next(this.routersCount);

      },
      (err: any) => {
        //console.log(err);
        this.result$.next({
          error: true,
          errorMsg: err.statusText
        });

      }
    );
  }

  Capitalization(str: any) {
    if (typeof str == 'undefined') {
      return str;
    }

    return str.toLowerCase().replace(/\b./g, function (a) { return a.toUpperCase(); });
  }

  undoService(): any {
    if (this.doService) {
      this.doService.unsubscribe();
    }
  }

}

