import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor() { }

  CommandIQdata = new Subject<any>();
  edgesuitData = new Subject<any>();
  systemvalue = new Subject<any>();

  setsystemsvalue(value: any) {
    this.systemvalue.next(value);
  }

  setcommandiq(value) {
    console.log(value)
    this.CommandIQdata.next(value);
  }

  setedgesuite(value) {
    console.log(value)
    this.edgesuitData.next(value);
  }

  getNetworkAvailabilityData() {
    let cData = [
      {
        "time": 1614142800000,
        "rssi": -42,
        "outage": 32738,
        "degrade": 59323,
        "bytesUp": 447662,
        "bytesDown": 15139869
      },
      {
        "time": 1614157200000,
        "rssi": -40,
        "outage": 503335,
        "degrade": 345435.8888888889,
        "bytesUp": 44173546,
        "bytesDown": 272174208
      },
      {
        "time": 1614160800000,
        "rssi": -40,
        "outage": 553941.25,
        "degrade": 361001.5,
        "bytesUp": 37922334,
        "bytesDown": 759335175
      },
      {
        "time": 1614164400000,
        "rssi": -39,
        "outage": 463187.75,
        "degrade": 362187.75,
        "bytesUp": 7812116,
        "bytesDown": 135174047
      },
      {
        "time": 1614168000000,
        "rssi": -40,
        "outage": 494298.5,
        "degrade": 356354.75,
        "bytesUp": 3207304,
        "bytesDown": 64699464
      },
      {
        "time": 1614171600000,
        "rssi": -45,
        "outage": 665593,
        "degrade": 415355,
        "bytesUp": 1641064,
        "bytesDown": 19707131
      },
      {
        "time": 1614175200000,
        "rssi": -46,
        "outage": 686878.75,
        "degrade": 416655.75,
        "bytesUp": 65057895,
        "bytesDown": 150901253
      },
      {
        "time": 1614178800000,
        "rssi": -45,
        "outage": 611247.75,
        "degrade": 355067.5,
        "bytesUp": 1708497,
        "bytesDown": 17849581
      },
      {
        "time": 1614182400000,
        "rssi": -39,
        "outage": 626743,
        "degrade": 305649.25,
        "bytesUp": 301307,
        "bytesDown": 304998
      },
      {
        "time": 1614186000000,
        "rssi": -36,
        "outage": 594735,
        "degrade": 369193.5,
        "bytesUp": 280472,
        "bytesDown": 1023369
      },
      {
        "time": 1614189600000,
        "rssi": -36,
        "outage": 536924.25,
        "degrade": 363530.5,
        "bytesUp": 215273,
        "bytesDown": 1990381
      },
      {
        "time": 1614193200000,
        "rssi": -37,
        "outage": 643600.25,
        "degrade": 330732.5,
        "bytesUp": 151068,
        "bytesDown": 173803
      },
      {
        "time": 1614196800000,
        "rssi": -38,
        "outage": 707275.75,
        "degrade": 320974.25,
        "bytesUp": 161921,
        "bytesDown": 193076
      },
      {
        "time": 1614200400000,
        "rssi": -38,
        "outage": 677439.25,
        "degrade": 352043.75,
        "bytesUp": 411998,
        "bytesDown": 192712
      },
      {
        "time": 1614204000000,
        "rssi": -38,
        "outage": 658584.75,
        "degrade": 436415.5,
        "bytesUp": 147644,
        "bytesDown": 150444
      },
      {
        "time": 1614207600000,
        "rssi": -36,
        "outage": 549071.75,
        "degrade": 415958.75,
        "bytesUp": 717339,
        "bytesDown": 1507988
      },
      {
        "time": 1614211200000,
        "rssi": -37,
        "outage": 584844,
        "degrade": 445406,
        "bytesUp": 591699,
        "bytesDown": 1388500
      },
      {
        "time": 1614214800000,
        "rssi": -37,
        "outage": 606534,
        "degrade": 432074.5,
        "bytesUp": 143831,
        "bytesDown": 83828
      },
      {
        "time": 1614218400000,
        "rssi": -36,
        "outage": 498013.25,
        "degrade": 455312,
        "bytesUp": 131992,
        "bytesDown": 249732
      },
      {
        "time": 1614222000000,
        "rssi": -36,
        "outage": 574417.75,
        "degrade": 448005,
        "bytesUp": 87835,
        "bytesDown": 77472
      },
      {
        "time": 1614225600000,
        "rssi": -37,
        "outage": 502032,
        "degrade": 437960.75,
        "bytesUp": 325446,
        "bytesDown": 278480
      },
      {
        "time": 1614229200000,
        "rssi": -37,
        "outage": 656110,
        "degrade": 477145.5,
        "bytesUp": 8674671,
        "bytesDown": 168901426
      },
      {
        "time": 1614232800000,
        "rssi": -38,
        "outage": 655080.5,
        "degrade": 393374,
        "bytesUp": 15929499,
        "bytesDown": 357366794
      },
      {
        "time": 1614236400000,
        "rssi": -38,
        "outage": 686838.3333333334,
        "degrade": 468177.3333333333,
        "bytesUp": 20477904,
        "bytesDown": 475458052
      },
      {
        "time": 1614240000000,
        "rssi": -37,
        "outage": 663116.25,
        "degrade": 428141.5,
        "bytesUp": 113083059,
        "bytesDown": 606376508
      },
      {
        "time": 1614243600000,
        "rssi": -37,
        "outage": 675409,
        "degrade": 418842.6666666667,
        "bytesUp": 79829163,
        "bytesDown": 413194380
      },
      {
        "time": 1614247200000,
        "rssi": -37,
        "outage": 628834.25,
        "degrade": 437331.25,
        "bytesUp": 5134782,
        "bytesDown": 95617636
      },
      {
        "time": 1614250800000,
        "rssi": -37,
        "outage": 669744,
        "degrade": 428890.25,
        "bytesUp": 97432424,
        "bytesDown": 438720219
      },
      {
        "time": 1614254400000,
        "rssi": -37,
        "outage": 616587.5,
        "degrade": 426175,
        "bytesUp": 4595692,
        "bytesDown": 130884929
      },
      {
        "time": 1614258000000,
        "rssi": -38,
        "outage": 636260.25,
        "degrade": 422857.25,
        "bytesUp": 3998062,
        "bytesDown": 180579427
      }
    ];

    return cData;
  }

  getColumnChartData() {
    let column = [
      {
        model: '716GE-1',
        value: 3
      },
      {
        model: '804Mesh',
        value: 3812
      },
      {
        model: '844E-1',
        value: 6787
      },
      {
        model: '844G-1',
        value: 53899
      },
      {
        model: '963168_T132A_C',
        value: 1
      },
      {
        model: 'GM1020',
        value: 2
      },
      {
        model: 'GM1028',
        value: 8
      },
      {
        model: 'GS2020E',
        value: 765
      },
      {
        model: 'GS2026E',
        value: 475
      },
      {
        model: 'GS2028E',
        value: 1
      },
      {
        model: 'GS4220E',
        value: 3276
      },
      {
        model: 'VSG1435-B101',
        value: 64
      },
    ];

    return column;
  }

  getSoftwareVersion(): Observable<any> {
    let software = [
      {
        "id": 1,
        "orgid": "7583",
        "modelname": "716GE-I",
        "manufacturer": "Calix",
        "softwareversion": "10.8.100.18",
        "cpecount": 1
      },
      {
        "id": 2,
        "orgid": "7583",
        "modelname": "716GE-I",
        "manufacturer": "Calix",
        "softwareversion": "10.8.110.25",
        "cpecount": 2
      },
      {
        "id": 3,
        "orgid": "7583",
        "modelname": "804Mesh",
        "manufacturer": "Calix",
        "softwareversion": "1.0.0.640",
        "cpecount": 5
      },
      {
        "id": 4,
        "orgid": "7583",
        "modelname": "804Mesh",
        "manufacturer": "Calix",
        "softwareversion": "1.1.0.100",
        "cpecount": 3
      },
      {
        "id": 5,
        "orgid": "7583",
        "modelname": "804Mesh",
        "manufacturer": "Calix",
        "softwareversion": "2.0.1.112",
        "cpecount": 5
      },
      {
        "id": 6,
        "orgid": "7583",
        "modelname": "804Mesh",
        "manufacturer": "Calix",
        "softwareversion": "3.0.2.100",
        "cpecount": 3857
      },
      {
        "id": 7,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "11.1.130.10",
        "cpecount": 2
      },
      {
        "id": 8,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "11.2.6.10.2",
        "cpecount": 1
      },
      {
        "id": 9,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "11.2.7.71",
        "cpecount": 1
      },
      {
        "id": 10,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.10.0.54",
        "cpecount": 6832
      },
      {
        "id": 11,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.8.1.11",
        "cpecount": 1
      },
      {
        "id": 12,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.8.12.3",
        "cpecount": 4
      },
      {
        "id": 13,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.8.4.9",
        "cpecount": 2
      },
      {
        "id": 14,
        "orgid": "7583",
        "modelname": "844E-1",
        "manufacturer": "Calix",
        "softwareversion": "M11.1.1.6",
        "cpecount": 5
      },
      {
        "id": 15,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "11.2.6.10.2",
        "cpecount": 3
      },
      {
        "id": 16,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.10.0.54",
        "cpecount": 53485
      },
      {
        "id": 17,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.11.0.129",
        "cpecount": 1
      },
      {
        "id": 18,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.12.0.184",
        "cpecount": 1
      },
      {
        "id": 19,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.4.125",
        "cpecount": 1
      },
      {
        "id": 20,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.7.52",
        "cpecount": 2
      },
      {
        "id": 21,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.8.1.11",
        "cpecount": 2
      },
      {
        "id": 22,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.8.12.3",
        "cpecount": 1
      },
      {
        "id": 23,
        "orgid": "7583",
        "modelname": "844G-1",
        "manufacturer": "Calix",
        "softwareversion": "12.2.8.4.9",
        "cpecount": 1
      },
      {
        "id": 24,
        "orgid": "7583",
        "modelname": "963168_T132A_C",
        "manufacturer": "Zhone",
        "softwareversion": "01.00.08",
        "cpecount": 1
      },
      {
        "id": 25,
        "orgid": "7583",
        "modelname": "GM1020",
        "manufacturer": "Calix",
        "softwareversion": "20.3.0.5.68",
        "cpecount": 1
      },
      {
        "id": 26,
        "orgid": "7583",
        "modelname": "GM1028",
        "manufacturer": "Calix",
        "softwareversion": "20.4.0.0.46",
        "cpecount": 1
      },
      {
        "id": 27,
        "orgid": "7583",
        "modelname": "GM1028",
        "manufacturer": "Calix",
        "softwareversion": "21.1.0.0.53",
        "cpecount": 12
      },
      {
        "id": 28,
        "orgid": "7583",
        "modelname": "GS2020E",
        "manufacturer": "Calix",
        "softwareversion": "20.1.0.4.3",
        "cpecount": 2
      },
      {
        "id": 29,
        "orgid": "7583",
        "modelname": "GS2020E",
        "manufacturer": "Calix",
        "softwareversion": "20.3.0.5.61",
        "cpecount": 724
      },
      {
        "id": 30,
        "orgid": "7583",
        "modelname": "GS2020E",
        "manufacturer": "Calix",
        "softwareversion": "20.4.0.3.55",
        "cpecount": 13
      },
      {
        "id": 31,
        "orgid": "7583",
        "modelname": "GS2020E",
        "manufacturer": "Calix",
        "softwareversion": "21.1.0.0.53",
        "cpecount": 1
      },
      {
        "id": 32,
        "orgid": "7583",
        "modelname": "GS2026E",
        "manufacturer": "Calix",
        "softwareversion": "20.3.0.5.61",
        "cpecount": 459
      },
      {
        "id": 33,
        "orgid": "7583",
        "modelname": "GS2026E",
        "manufacturer": "Calix",
        "softwareversion": "20.4.0.3.55",
        "cpecount": 7
      },
      {
        "id": 34,
        "orgid": "7583",
        "modelname": "GS2026E",
        "manufacturer": "Calix",
        "softwareversion": "21.1.0.0.53",
        "cpecount": 3
      },
      {
        "id": 35,
        "orgid": "7583",
        "modelname": "GS4220E",
        "manufacturer": "Calix",
        "softwareversion": "20.1.0.0.29",
        "cpecount": 56
      },
      {
        "id": 36,
        "orgid": "7583",
        "modelname": "GS4220E",
        "manufacturer": "Calix",
        "softwareversion": "20.3.0.5.61",
        "cpecount": 2067
      },
      {
        "id": 37,
        "orgid": "7583",
        "modelname": "GS4220E",
        "manufacturer": "Calix",
        "softwareversion": "20.4.0.0.44",
        "cpecount": 1854
      },
      {
        "id": 38,
        "orgid": "7583",
        "modelname": "GS4220E",
        "manufacturer": "Calix",
        "softwareversion": "21.1.0.0.50",
        "cpecount": 448
      },
      {
        "id": 39,
        "orgid": "7583",
        "modelname": "VSG1435-B101",
        "manufacturer": "ZyXEL",
        "softwareversion": "1.10(TUB.2)C0",
        "cpecount": 2
      },
      {
        "id": 40,
        "orgid": "7583",
        "modelname": "VSG1435-B101",
        "manufacturer": "ZyXEL",
        "softwareversion": "V1.12(AADX.3)b1_20140227",
        "cpecount": 51
      },
      {
        "id": 41,
        "orgid": "7583",
        "modelname": "VSG1435-B101",
        "manufacturer": "ZyXEL",
        "softwareversion": "V1.12(AADX.3)C0",
        "cpecount": 10
      }
    ];

    return of(software);
  }

  getUnitedStates() {
    let column = [
      {
        name: 'Alabama',
        value: 'Alabama'
      },
      {
        name: 'Alaska',
        value: 'Alaska'
      },
      {
        name: 'Arizona',
        value: 'Arizona'
      },
      {
        name: 'Arkansas',
        value: 'Arkansas'
      },
      {
        name: 'California',
        value: 'California'
      },
      {
        name: 'Colorado',
        value: 'Colorado'
      },
      {
        name: 'Connecticut',
        value: 'Connecticut'
      },
      {
        name: 'Delaware',
        value: 'Delaware'
      },
      {
        name: 'Florida',
        value: 'Florida'
      },
      {
        name: 'Georgia',
        value: 'Georgia'
      },
      {
        name: 'Hawaii',
        value: 'Hawaii'
      },
      {
        name: 'Idaho',
        value: 'Idaho'
      },
      {
        name: 'Illinois',
        value: 'Illinois'
      },
      {
        name: 'Indiana',
        value: 'Indiana'
      },
      {
        name: 'Iowa',
        value: 'Iowa'
      },
      {
        name: 'Kansas',
        value: 'Kansas'
      },
      {
        name: 'Kentucky',
        value: 'Kentucky'
      },
      {
        name: 'Louisiana',
        value: 'Louisiana'
      },
      {
        name: 'Maine',
        value: 'Maine'
      },
      {
        name: 'Maryland',
        value: 'Maryland'
      },
      {
        name: 'Massachusetts',
        value: 'Massachusetts'
      },
      {
        name: 'Michigan',
        value: 'Michigan'
      },
      {
        name: 'Minnesota',
        value: 'Minnesota'
      },
      {
        name: 'Mississippi',
        value: 'Mississippi'
      },
      {
        name: 'Missouri',
        value: 'Missouri'
      },
      {
        name: 'Montana',
        value: 'Montana'
      },
      {
        name: 'Nebraska',
        value: 'Nebraska'
      },
      {
        name: 'Nevada',
        value: 'Nevada'
      },
      {
        name: 'New Hampshire',
        value: 'New Hampshire'
      },
      {
        name: 'New Jersey',
        value: 'New Jersey'
      },
      {
        name: 'New Mexico',
        value: 'New Mexico'
      },
      {
        name: 'New York',
        value: 'New York'
      },
      {
        name: 'North Carolina',
        value: 'North Carolina'
      },
      {
        name: 'North Dakota',
        value: 'North Dakota'
      },
      {
        name: 'Ohio',
        value: 'Ohio'
      },
      {
        name: 'Oklahoma',
        value: 'Oklahoma'
      },
      {
        name: 'Oregon',
        value: 'Oregon'
      },
      {
        name: 'Pennsylvania',
        value: 'Pennsylvania'
      },
      {
        name: 'Rhode Island',
        value: 'Rhode Island'
      },
      {
        name: 'South Carolina',
        value: 'South Carolina'
      },
      {
        name: 'South Dakota',
        value: 'South Dakota'
      },
      {
        name: 'Tennessee',
        value: 'Tennessee'
      },
      {
        name: 'Texas',
        value: 'Texas'
      },
      {
        name: 'Utah',
        value: 'Utah'
      },
      {
        name: 'Vermont',
        value: 'Vermont'
      },
      {
        name: 'Virginia',
        value: 'Virginia'
      },
      {
        name: 'Washington',
        value: 'Washington'
      },
      {
        name: 'West Virginia',
        value: 'West Virginia'
      },
      {
        name: 'Wisconsin',
        value: 'Wisconsin'
      },
      {
        name: 'Wyoming',
        value: 'Wyoming'
      },

    ];

    return column;
  }

  getCanadaStates() {
    let data = [{
      name: 'ALBERTA',
      value: 'ALBERTA'
    },
    {
      name: 'BRITISH COLUMBIA',
      value: 'BRITISH COLUMBIA'
    },
    {
      name: 'MANITOBA',
      value: 'MANITOBA'
    },
    {
      name: 'NEW BRUNSWICK',
      value: 'NEW BRUNSWICK'
    },
    {
      name: 'NEWFOUNDLAND',
      value: 'NEWFOUNDLAND'
    },
    {
      name: 'NOVA SCOTIA',
      value: 'NOVA SCOTIA'
    },
    {
      name: 'ONTARIO',
      value: 'ONTARIO'
    },
    {
      name: 'PRINCE EDWARD ISLAND',
      value: 'PRINCE EDWARD ISLAND'
    },
    {
      name: 'QUEBEC',
      value: 'QUEBEC'
    },
    {
      name: 'SASKATCHEWAN',
      value: 'SASKATCHEWAN'
    },
    {
      name: 'YUKON',
      value: 'YUKON'
    },
    {
      name: 'CANADA',
      value: 'CANADA'
    }
    ]
    return data;
  }
}

