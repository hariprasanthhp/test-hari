import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as Highcharts from 'highcharts/highcharts';
@Injectable({
  providedIn: 'root',
})
export class NetworkSystemsApiService {
  constructor(private http: HttpClient, private router: Router) {}

  getSystemController(uuid) {
    let url = `${environment.API_BASE_URL}cnap/invmgr/devices/${uuid}/state`;
    return this.http.get(url);
  }
  getCardDetails(uuid) {
    let url = `${environment.API_BASE_URL}cnap/invmgr/equipment/state?system=${uuid}`;
    return this.http.get(url);
  }
  getCardInterfaceSummary(card, uuid) {
    let spiltCardShelf = card?.card?.split('/');
    let shelf = '',
      slot = '';
    shelf = spiltCardShelf && spiltCardShelf[0] ? spiltCardShelf[0] : '';
    slot = spiltCardShelf && spiltCardShelf[1] ? spiltCardShelf[1] : '';
    let url = `${environment.API_BASE_URL}cnap/invmgr/interfaces/state/summary?system=${uuid}&shelf=${shelf}&slot=${slot}`;
    return this.http.get(url);
  }

  getInterfaceDetails(card, from = 'CCO') {
    let url = `${environment.API_BASE_URL}cnap/invmgr/interfaces/state/details?system=${card?.uuid}&name=${card['pon']['name']}`;
    if(from == 'CCO') url += `&ifType=${card['pon']['ifType']}`;
    return this.http.get(url);
  }
  getOntList(card) {
    let url = `${environment.API_BASE_URL}cnap/invmgr/discoveredonts/names?system=${card?.uuid}&name=${card['pon']['name']}&ifType=${card['pon']['ifType']}`;
    return this.http.get(url);
  }
  getOntDetails(card, ont) {
    let url = `${environment.API_BASE_URL}cnap/invmgr/devices/${card?.uuid}/state/details?onuid=${ont?.ontId}`;
    return this.http.get(url);
  }
  getNfaOntCount(card, reportTypeSelected, sorting){	
    let params = {	
      reportType: reportTypeSelected,	
      tenant: 0,	
      system: card?.uuid,	
      discoveredPonPort : card['pon']['name'],	
    }	
    if(sorting?.sortBy){	
      params['sortBy'] = sorting?.sortBy;	
      params['sortOrder'] = sorting?.sortOrder;	
    }	
    let query = "";	
    for (var key in params) {	
      if (params[key] == undefined) {	
        continue;	
      }	
      if (query != "") {	
        query += "&";	
      }	
      query += key + "=" + encodeURIComponent(params[key]);	
    }	
    let url = `${environment.API_BASE_URL}nfa/onts/count?${query}`;	
    return this.http.get(url);	
  }
  getNfaOntList(card, reportTypeSelected, sorting){
    let params = {
      reportType: reportTypeSelected,
      tenant: 0,
      system: card?.uuid,
      discoveredPonPort : card['pon']['name'],
      limit : sorting?.limit
    }
    if(sorting?.sortBy){
      params['sortBy'] = sorting?.sortBy;
      params['sortOrder'] = sorting?.sortOrder;
    }

    let query = "";
    for (var key in params) {

      if (params[key] == undefined) {
        continue;
      }

      if (query != "") {
        query += "&";
      }


      query += key + "=" + encodeURIComponent(params[key]);

    }
    let url = `${environment.API_BASE_URL}nfa/onts?${query}`;
    return this.http.get(url);
  }
  secondsToDhms(seconds) {
    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600 * 24)),
      h = Math.floor((seconds % (3600 * 24)) / 3600),
      m = Math.floor((seconds % 3600) / 60),
      s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? d + 'd' : '',
      hDisplay = h > 0 ? h + 'h' : '',
      mDisplay = m > 0 ? m + 'm' : '',
      sDisplay = s > 0 ? s + 's' : '';

    let formattedTime = '';
    if(d > 0){
      formattedTime +=  dDisplay;
    }
    if(h > 0){
      if(d > 0){
        formattedTime += ', ';
      }
      formattedTime += hDisplay;
    }
    if(m > 0){
      if(h > 0 || d > 0){
        formattedTime += ', ';
      }
      formattedTime += (m > 9 ? mDisplay : ('0' + mDisplay));
    }
    if(s > 0){
      if(h > 0 || d > 0 || m > 0){
        formattedTime += ', ';
      }
      formattedTime += (s > 9 ? sDisplay : ('0' + sDisplay));
    }

    if(formattedTime){
      return formattedTime;
    }
    return 0;
  }
  bitsToSize(bits: any, round?: any, fixed?) {
    let bytes = bits;
    let sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
    if (!bytes) return '-';
    if (bytes == 0) return '0';
    if (bytes < 0) {
      bytes = bytes * -1;
      var i = Math.floor(Math.log(bytes) / Math.log(1000));
      if (round) {
        return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
      }
      let value: any;
      value = Highcharts.numberFormat(
        Math.abs(bytes / Math.pow(1000, i)),
        fixed
      );
      return (value * -1).toFixed(fixed) + ' ' + sizes[i];
    } else {
      var i = Math.floor(Math.log(bytes) / Math.log(1000));
      if (round) {
        return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
      }
      return (
        Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), fixed) +
        ' ' +
        sizes[i]
      );
    }
  }
  sortStringHavingSplChar(array, key) {
    if (array && array.length > 0) {
      let regex = /[^a-z]/gi;
      array.forEach((el) => {
        el['alphabets'] = el[key].replace(regex, '');
      });
      array.sort((a, b) => (a.alphabets > b.alphabets ? 1 : -1));

      let groupedArray = this.groupByValue(array, 'alphabets'),
        sortedArray = [];

      for (const value in groupedArray) {
        if (groupedArray[value] && groupedArray[value].length > 0) {
          groupedArray[value].forEach((el) => {
            el['sortingNum'] = Number(el[key].replace(/[^0-9]/g, ''));
          });
          groupedArray[value].sort((a, b) =>
            a.sortingNum > b.sortingNum ? 1 : -1
          );
          sortedArray = [...sortedArray, ...groupedArray[value]];
        }
      }

      return sortedArray;
    }
    return array;
  }
  groupByValue(array, key) {
    return array.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
