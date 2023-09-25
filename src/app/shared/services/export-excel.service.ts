import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as Highcharts from "highcharts/highstock";

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor(
    private http: HttpClient,
  ) {

  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  ConvertToCSV(objArray, headerList) {
    // let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    // let str = '';
    // let row = '';
    // for (let index in headerList) {
    //   row += JSON.stringify(headerList[index]) + ',';
    // }
    // row = row.slice(0, -1);
    // str += row + '\r\n';
    // for (let i = 0; i < array.length; i++) {
    //   let line = '';
    //   for (let index in headerList) {
    //     let head = headerList[index];
    //     line += '\"' + (array[i][head] != undefined ? array[i][head] : '') + '\"' + ',';
    //   }
    //   str += line + '\r\n';
    // }
    // return str;
    // const header = Object.keys(objArray[0]); //CCL-42675
    const header = headerList.map((row) => row);
    const csv = objArray.map((row) =>
      header.map(
        (fieldName) => row[fieldName] != undefined ? this.containsSpecialCharacters(row[fieldName]) ? JSON.stringify(row[fieldName]) : row[fieldName] : ""))
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    return csvArray;
  }
  containsSpecialCharacters(str) {
    // var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    var regex = /[,]/g;
    return regex.test(str);
  }
  ConvertToTrendsCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];
        Highcharts.setOptions({
          lang: {
            decimalPoint: '.',
            thousandsSep: ','
          }
        });
        if (array[i][head] == "Total" || array[i][head] == "Streaming") {
          line += '\"' + (array[i][head] != undefined ? array[i][head] : '') + '\"' + ',';

        }
        else {
          line += '\"' + (array[i][head] != undefined ? Highcharts.numberFormat((array[i][head] / 1024), 2) : '') + '\"' + ',';

        }
      }
      str += line + '\r\n';
    }
    return str;
  }
  getSize(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }
  downLoadCSV(name: string, chartData: any, extraData?: any, after?: boolean) {
    let data = chartData;
    let headers = [];
    /* to get max length object */
    let maxSize = 0;
    let maxIndex = 0;
    let i = 0;
    for (let obj of data) {
      let size = this.getSize(obj);
      if (size > maxSize) {
        maxSize = size;
        maxIndex = i;
      }
      i++;
    }
    for (let key in data[maxIndex]) {
      if (headers.indexOf(key) === -1) {
        headers.push(key);
      }
    }
    let fName = name + '.csv';
    let fType = 'text/csv;charset=utf-8'
    let csvData = this.ConvertToCSV(data, headers);
    if (extraData) {
      if (after) {
        csvData = csvData + extraData;
      } else {
        csvData = extraData + csvData;
      }
    }
    const BOM = '\uFEFF';
    var blob = new Blob([BOM + csvData], { type: fType });
    saveAs(blob, fName);
  }
  downLoadCSVRevenue(name: string, chartData: any, extraData?: any, after?: boolean) {
    let data = chartData;
    let headers = [];

    for (let obj of data) {
      for (let key of Object.keys(obj)) {
        if (headers.indexOf(key) === -1) {
          headers.push(key);
        }
      }
    }
    let fName = name + '.csv';
    let fType = 'text/csv;charset=utf-8'
    let csvData = this.ConvertToCSV(data, headers);
    if (extraData) {
      if (after) {
        csvData = csvData + extraData;
      } else {
        csvData = extraData + csvData;
      }
    }

    csvData = '\ufeff' + csvData;
    var blob = new Blob([csvData], { type: fType });
    saveAs(blob, fName);
  }
  downLoadTrendsCSV(name: string, chartData: any, extraData?: any, after?: boolean) {
    let data = chartData;
    let headers = [];
    /* to get max length object */
    let maxSize = 0;
    let maxIndex = 0;
    let i = 0;
    for (let obj of data) {
      let size = this.getSize(obj);
      if (size > maxSize) {
        maxSize = size;
        maxIndex = i;
      }
      i++;
    }
    for (let key in data[maxIndex]) {
      if (headers.indexOf(key) === -1) {
        headers.push(key);
      }
    }
    let fName = name + '.csv';
    let fType = 'text/csv;charset=utf-8'
    let csvData = this.ConvertToTrendsCSV(data, headers);
    if (extraData) {
      if (after) {
        csvData = csvData + extraData;
      } else {
        csvData = extraData + csvData;
      }
    }
    var blob = new Blob([csvData], { type: fType });
    saveAs(blob, fName);
  }
  exportFromUrl(url: string, name: string, fsan?: string, username?: string, password?: string) {

    let authorizationData = 'Basic ' + btoa(username + ':' + password);
    console.log("user name=>", username);
    console.log("pass name=>", password);
    console.log("Basic AUth=>", authorizationData);
    let options = {
      headers: new HttpHeaders()
        .set('Authorization', authorizationData)
        .set("content-type", "application/json")
        /* .set('Accept-Encoding', 'gzip, deflate, br')
        .set('Connection', 'keep-alive') */
        .set('Accept', '*/*'),
      params: new HttpParams()
        .set("fsan", fsan)
        .set("username", username)
        .set("password", password),
      responseType: 'arraybuffer' as 'arraybuffer'

    }
    this.http.get(url, options).subscribe((data) => {
      console.log("data=>", data);
      let blob: any = new Blob([data], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, name);
    });



    return

    let headers = new HttpHeaders();
    console.log(url);

    //url = 'https://dev.api.calix.ai/files/5fb734670b0a6058a2c9592a?username=ee38fc1&password=1f8b497&fsan=CXNK002054E9';


    //let isPdf = true;

    let fileName = name ? name : 'download';
    if (1) {
      // url = 'http://localhost:4200/assets/download/file-sample.pdf';
      // url = 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf'
      let pdf = 'application/pdf';
      headers = headers.set('Accept', pdf);
      //headers = headers.set('dummy', pdf);
      return this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe((data) => {
        var blob = new Blob([data], { type: pdf });
        console.log(blob);
        saveAs(blob, fileName + '.pdf');
      });
    } else {
      //url = 'https://www.stats.govt.nz/assets/Uploads/Annual-enterprise-survey/Annual-enterprise-survey-2019-financial-year-provisional/Download-data/annual-enterprise-survey-2019-financial-year-provisional-csv.csv'
      //let csv = 'text/csv;charset=utf-8';
      let csv = 'application/csv';
      headers = headers.set('Accept', csv);
      return this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe((data) => {
        var blob = new Blob([data], { type: csv });
        console.log(blob);
        saveAs(blob, fileName + '.csv');
      });
    }

    /*
        let csv = 'text/csv;charset=utf-8';
        let pdf = 'application/pdf';
        headers = headers.set('Accept', csv);
        return this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe((data) => {
          var blob = new Blob([data], { type: csv });
          console.log(blob);
          saveAs(blob, '.csv');
        });
    
    
    
    
    
        this.getCsv(url).subscribe(response => {
          console.log(response)
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(new Blob([response], { type: 'text/csv' }));
          link.download = 'test' + '.csv';
          link.click();
        });
        */

    /*
  let dwldLink = document.createElement("a");
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
    dwldLink.setAttribute("target", "_blank");
  }
  if (window.navigator.msSaveBlob) { // IE
    // window.navigator.msSaveOrOpenBlob(blob, filename + ".csv")
  }
  let filename = 'sample.csv';
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", filename);
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
  // url = 'https://www.stats.govt.nz/assets/Uploads/Annual-enterprise-survey/Annual-enterprise-survey-2019-financial-year-provisional/Download-data/annual-enterprise-survey-2019-financial-year-provisional-csv.csv';
  // url = 'http://localhost:4200/assets/download/file-sample.pdf';
  //window.open(url, '_self');

  */
  }

  // getCsv(url): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Accept', 'application/csv');
  //   return this.http.get(url, {
  //     headers: headers,
  //     responseType: 'text'
  //   });
  // }
}
