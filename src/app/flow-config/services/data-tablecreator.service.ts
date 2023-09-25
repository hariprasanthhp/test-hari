import { Injectable } from '@angular/core';
// import { NgxCsvParser } from 'ngx-csv-parser';
// import { NgxCSVParserError } from 'ngx-csv-parser';
import { Subject, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataTablecreatorService {
  tableOptionsData = new Subject<any>();
  jsonDataOfCSV = new Subject<any>();
  csvRecords: any[] = [];
  tableOptions = {
    data: [],
    columns: []
  }
  columnsObject = {
    title: '',
    data: ''
  }
  header = true;
  xlsOption = {
    isToCamelCase: true,
    isNested: true,
  }
  constructor(
  ) { }

  generateJsonFromCsv(input, oldData?: any, importType?: any,): any {
    let data = [];
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const file = event.target.result;
      const lines = file.split(/\r\n|\n/);
      var result = [];
      var headers = lines[0].split(",");
      const regex = /"/gi;
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline: any = this.acceptComaName(lines[i]); /* CCL-42180 */
        for (var j = 0; j < headers.length; j++) {
          currentline[j] = currentline[j]?.replaceAll(regex, '') ? currentline[j]?.replaceAll(regex, '') : '';
          obj[headers[j]] = currentline[j] ? currentline[j] : '';
        }
        result.push(obj);
      }
      this.csvRecords = result;

      this.tableOptionsData.next(this.csvRecords)

    };

    reader.onerror = (event) => {
    };

    reader.readAsText(file);
  }

  /* CCL-42180 */
  acceptComaName(str1) {
    function removeComaStrings(str) {
      const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)];
      let test = JSON.parse(JSON.stringify({ str }))['str'];
      for (let i = 0; i < test.length; i++) {
        if (test[i] == '\"') {
          test = splitAt(i, test);
          break;
        }
      }
      if (Array.isArray(test)) {
        test[1] = test[1].replace("\"", "");
        test[1] = test[1].replace(",", 'coma;');
        /* CCL-49154 */  
        /* let count = 0;
          while (test[1][count] != '\"') {
            if (test[1][count] == ",") {
              test[1] = test[1].replace(",", 'coma;')
            }
            count++;
          } */
        test[1] = test[1].replace("\"", "");
        test = test[0] + test[1];
      }
      if (test.indexOf("\"") != -1)
        return removeComaStrings(test);
      return test;
    }
    str1 = removeComaStrings(str1).split(',').map(item => item.replaceAll(/coma;/g, ','));
    return str1;
  }


  tableOptionsCreator(object, language?: any, excludeKeys?: any, keysWithoutOld?) {
    let newArray = [];
    for (const key in object) {
      if (!excludeKeys.includes(key)) {
        const loopLength = keysWithoutOld.includes(key) ? 1 : 2;
        for (let i = 0; i < loopLength; i++) {
          let options = {
            title: key ? '' : `${i ? 'Old ' : ''}${language[key.replace(/['"]+/g, '')]}`,
            data: object[key] ? '' : key.replace(/['"]+/g, '')
          };
          newArray.push(options)
        }
      }
    }
    return newArray

  }


  getJsonFromCsv(input): any {
    let data = [];
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const file = event.target.result;
      const lines = file.split(/\r\n|\n/);
      var result = [];
      var headers = lines[0].split(",");
      const regex = /"/gi;
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline: any = this.acceptComaName(lines[i]); /* CCL-42180 */
        for (var j = 0; j < headers.length; j++) {
          currentline[j] = currentline[j]?.replaceAll(regex, '') ? currentline[j]?.replaceAll(regex, '') : '';
          obj[headers[j]] = currentline[j] ? currentline[j] : '';
        }
        result.push(obj);
      }
      this.csvRecords = result;
      this.jsonDataOfCSV.next(this.csvRecords);
      return result;

    };

    reader.onerror = (event) => {
    };

    reader.readAsText(file);
  }


}
