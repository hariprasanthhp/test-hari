import { Injectable } from '@angular/core';
import { isArray } from 'jquery';
import { Observable, of } from 'rxjs';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';

@Injectable({
  providedIn: 'root'
})
export class CcoSystemService {

  constructor(
    private commonFunctionsService: CommonFunctionsService
  ) { }


  getNetworkSystemList(): Observable<any> {
    let list = [];

    list = [
      {
        serielNumber: 'KH912924',
        type: 'OLT',
        model: 'E93',
        name: 'SD9212969',
        region: 'SD9212969',
        location: 'SD9212969',
        connection_status: 'Lees_Router',
        software_version: 'Pre-provisioned'
      },
      {
        serielNumber: 'KH912924',
        type: 'ASM',
        model: 'E93',
        name: 'SD9212969',
        region: 'SD9212969',
        location: 'SD9212969',
        connection_status: 'Lees_Router',
        software_version: 'Active'
      },
      {
        serielNumber: 'KH912924',
        type: 'OLT',
        model: 'E93',
        name: 'SD9212969',
        region: 'SD9212969',
        location: 'SD9212969',
        connection_status: 'Lees_Router',
        software_version: 'Offline'
      },
      {
        serielNumber: 'KH912924',
        type: 'OLT',
        model: 'E93',
        name: 'SD9212969',
        region: 'SD9212969',
        location: 'SD9212969',
        connection_status: 'Lees_Router',
        software_version: 'Active'
      },
      {
        serielNumber: 'KH912924',
        type: 'ASM',
        model: 'E93',
        name: 'SD9212969',
        region: 'SD9212969',
        location: 'SD9212969',
        connection_status: 'Lees_Router',
        software_version: 'Offline'
      },
    ]

    return of(list);

  }

  getSubscribersSystemList(): Observable<any> {
    let list = [];

    list = [
      {
        serielNumber: 'KH912924',
        ontSerielNumber: 'OLT',
        name: 'SD9212969',
        status: 'Pre-provisioned',
        model: 'E93',
        macAddress: 'E7:3F:2B:10:9A:EF',
        wan: '1',
        wifiradio: '1',
        subscriberName: 'Courtney Lee',
        accountID: 'Courtney',
        subscriberStatus: 'Active',
        revenue_edge_suits: 'ProductIQ',
        service_plan: 'Tier 1'
      },
      {
        serielNumber: 'KH912925',
        ontSerielNumber: 'OLT',
        name: 'SD9212969',
        status: 'Pre-provisioned',
        model: 'E93',
        macAddress: 'E7:3F:2B:10:9A:EF',
        wan: '1',
        wifiradio: '1',
        subscriberName: 'Courtney Lee',
        accountID: 'Courtney',
        subscriberStatus: 'Active',
        revenue_edge_suits: 'ProductIQ',
        service_plan: 'Tier 1'
      },
      {
        serielNumber: 'KH912926',
        ontSerielNumber: 'OLT',
        name: 'SD9212969',
        status: 'Pre-provisioned',
        model: 'E93',
        macAddress: 'E7:3F:2B:10:9A:EF',
        wan: '1',
        wifiradio: '1',
        subscriberName: 'Courtney Lee',
        accountID: 'Courtney',
        subscriberStatus: 'Active',
        revenue_edge_suits: 'ProductIQ',
        service_plan: 'Tier 1'
      },
      {
        serielNumber: 'KH912927',
        ontSerielNumber: 'OLT',
        name: 'SD9212969',
        status: 'Pre-provisioned',
        model: 'E93',
        macAddress: 'E7:3F:2B:10:9A:EF',
        // wan: '1',
        // wifiradio: '1',
        subscriberName: 'Courtney Lee',
        accountID: 'Courtney',
        subscriberStatus: 'Active',
        revenue_edge_suits: 'ProductIQ',
        service_plan: 'Tier 1'
      },
      {
        serielNumber: 'KH912928',
        ontSerielNumber: 'OLT',
        name: 'SD9212969',
        status: 'Pre-provisioned',
        model: 'E93',
        macAddress: 'E7:3F:2B:10:9A:EF',
        wan: '1',
        wifiradio: '1',
        subscriberName: 'Courtney Lee',
        accountID: 'Courtney',
        subscriberStatus: 'Active',
        revenue_edge_suits: 'ProductIQ',
        service_plan: 'Tier 1'
      },
      {
        serielNumber: 'KH912929',
        ontSerielNumber: 'OLT',
        name: 'SD9212969',
        status: 'Pre-provisioned',
        model: 'E93',
        macAddress: 'E7:3F:2B:10:9A:EF',
        wan: '1',
        wifiradio: '1',
        subscriberName: 'Courtney Lee',
        accountID: 'Courtney',
        subscriberStatus: 'Active',
        revenue_edge_suits: 'ProductIQ',
        service_plan: 'Tier 1'
      },
    ]

    return of(list);

  }

  exportDataConvertor(array) {
    let check = Array.isArray(array);
    if (check) {
      array.forEach(el => {
        delete el._id
        for (const key in el) {
          if (typeof el[key] == 'boolean') {
            if (el[key] == true) {
              el[key] = 'Yes'
            } else {
              el[key] = 'No'
            }
          }
        }
      });
    }
    return array;
  }

  generateExportName(firstName: string) {
    return this.commonFunctionsService.generateExportName(firstName);
  }

}

