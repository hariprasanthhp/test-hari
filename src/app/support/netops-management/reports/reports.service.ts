import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Observable, from } from 'rxjs';
import * as FileSaver from 'file-saver';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient, private sso: SsoAuthService) { }


  public getInventoryReport(params: any) {
    console.log(params);
    let query = "";
    for (var key in params) {

      if (params[key]) {
        if (query != "") {
          query += "&";
        }

        query += key + "=" + encodeURIComponent(params[key]);
      }

    }
    //&manufacturer=${params.manufacturer}&modelName=${params.modelName}&serialNumber=${params.serialNumber}&subscriber=${params.subscriber}&opmode=${params.opmode}
    //return this.http.get(`${environment.SUPPORT_URL}/netops-report/inventory-report?reportType=${params.reportType}&orgId=${params.orgId}&startTime=${params.startTime}&endTime=${params.endTime}&inversely_time_period=${params.inversely_time_period}`);

    return this.http.get(`${environment.SUPPORT_URL}/netops-report/inventory-report?${query}`);
  }

  getInventoryCount(params) {

    console.log("ppp" + JSON.stringify(params));
    let query = "";
    for (var key in params) {

      if (params[key]) {
        if (query != "") {
          query += "&";
        }

        query += key + "=" + encodeURIComponent(params[key]);
      }

    }

    return this.http.get(`${environment.SUPPORT_URL}/netops-report/inventory-report/count?${query}`);
  }

  getDropDownData(payload) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-device/device-type?matcher=${payload}`);
  }

  getSwapReportsCount(params){
    let query = "";
    for (var key in params) {

      if (params[key]) {
        if (query != "") {
          query += "&";
        }

        query += key + "=" + encodeURIComponent(params[key]);
      }

    }
    return this.http.get(`${environment.SUPPORT_URL}/netops-swapsystem/queryPendingSwapSystem/count?${query}`);
  }

  getSwapReportsList(){
    return this.http.get(`${environment.SUPPORT_URL}/netops-swapsystem/queryPendingSwapSystem`);
  }


  getChartData(params) {
    let query = "";
    for (var key in params) {
      if (params[key]) {
        if (query != "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(params[key]);
      }
      return this.http.get(`${environment.SUPPORT_URL}/netops-report/inventory-report?${query}`);
    }
  }




  getInventorySoftwareReport(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-report/softwareVersion?${ID}`);

  }
  /* getInventoryReport(orgId:string, reportType:string):Observable<any>{
     
     const tableData:any=[
       {
         "Id": "152650-487746-CXNK007D3FC5",
         "rowNo": 1,
         "Subid": "b189e694-e8ea-4903-bdb9-c6389536d869",
         "orgid": "152650",
         "serialnumber": "CXNK007D3FC5",
         "opmode": "RG",
         "manufacturer": "Calix",
         "modelname": "GS4220E",
         "lastdiscovertime": 1599808587224,
         "lastinformtime": 1599808573455,
         "createtime": 1597741020750,
         "periodicinformenable": "true",
         "periodicinforminterval": "86400",
         "productclass": "GigaSpire",
         "registrationid": "reg4220",
         "softwareversion": "20.4.500.108",
         "subnetmask": "255.255.255.0",
         "additionalhardwareversion": "UnitSerialNumber=422003014283",
         "hardwareversion": "3000286510",
         "ipaddress": "192.168.37.219",
         "macaddress": "48:77:46:cf:6d:6c",
         "normalizedipaddress": "192.168.037.219",
         "wanaccesstype": "CopperEthernet",
         "connectionrequesturl": "http://192.168.37.219:60002/q5S35xHy",
         "subscriberId": "test",
         "subscriberName": "autotest4220",
         "manufactureroui": "487746",
         "location": "3rd Floor of DeXun Build,Software RD, YuHua D",
         "subscriberAccount": "ytt",
         "subscriberPhone": "15195760150",
         "subscriberType": "business",
         "email": "15195760150@163.com",
         "billingAddress": "Nanjing, China",
         "serviceAddress": "nanjing",
         "region": "ET",
         "lastboottime": 1599632908312,
         "lastdiscovertimestamp": 1599808587224,
         "lastinformtimestamp": 1599808573455,
         "lastdiscoverdate": "Dec 1, 52665 2:13:44 AM",
         "lastinformdate": "Nov 30, 52665 10:24:15 PM"
       }
     ]
     
 alert('service')
     return from(tableData);
 
   }
 */

  getCallAvoidanceReport(params) {
    console.log(params);
    let query = "";
    for (var key in params) {
      if (params[key]) {
        if (query != "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(params[key]);
      }

    }
    return this.http.get(`${environment.SUPPORT_URL}/call/avoidance/subscriber_report?${query}`);
  }
  // this funtion will add & update the reports
  addReportQuery(requestData) {
    console.log("response called")
    if ('_id' in requestData) {
      return this.http.put(`${environment.SUPPORT_URL}/call/avoidance/subscriber_report`, requestData);
    } else {
      return this.http.post(`${environment.SUPPORT_URL}/call/avoidance/subscriber_report`, requestData);
    }
  }
  // this funtion will delete the reports
  deleteReport = (params) => {
    let query = "";
    for (var key in params) {
      if (params[key]) {
        if (query != "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(params[key]);
      }
    }
    return this.http.delete(`${environment.SUPPORT_URL}/call/avoidance/subscriber_report?${query}`);
  }

  getSummary(orgId, id) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/call/avoidance/task_execlog_summary?${ID}jobId=${id}`);
  }
  getSummaryDetails(orgId, id) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/call/avoidance/task_execlog_detail?${ID}_id=${id}`);
  }

  exportFromUrl(url, name) {
    let options = {
      headers: new HttpHeaders()
        .set("content-type", "application/json")
        .set('Accept-Encoding', 'gzip, deflate, br')
        .set('Connection', 'keep-alive')
        .set('Accept', '*/*'),
      // params: new HttpParams()
      // .set("fsan",fsan)
      // .set("username",username)
      // .set("password",password),
      responseType: 'arraybuffer' as 'arraybuffer'

    }
    this.http.get(url, options).subscribe((data) => {
      console.log("data=>", data);
      let blob: any = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, name);
    });
  }

}







