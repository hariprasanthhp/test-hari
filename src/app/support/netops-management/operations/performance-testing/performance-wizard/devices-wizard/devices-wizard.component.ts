import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef, ElementRef } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { Subject, Observable, forkJoin, combineLatest, of } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { PerformanceServiceService } from '../../performance-testing.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Options } from 'select2';
import * as $ from 'jquery';

import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SsoAuthService } from '../../../../../../shared/services/sso-auth.service';

@Component({
  selector: 'app-devices-wizard',
  templateUrl: './devices-wizard.component.html',
  styleUrls: ['./devices-wizard.component.scss']
})
export class DevicesWizardComponent implements OnInit, AfterViewInit, AfterViewChecked {
  error: boolean;
  orgId;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  loading = false;
  language: any;
  languageSubject;
  tableRenderedOnce: boolean = false;
  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    paging: false,
    info: false,
    drawCallback: (settings) => {

      this.tableRenderedOnce = true;
    }
  };
  saveClicked: boolean = false;
  formError: boolean = false;
  deviceData: string[] = [];
  devicesAdded = []
  @Input() inputData
  @Output() outputdata: EventEmitter<any> = new EventEmitter();
  @Output() activeTab: EventEmitter<any> = new EventEmitter();


  dataAvailable = false;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  isRerender = false;

  options: Options;
  protocols = [];
  selectData = [];
  intialPaste = true;

  @ViewChild('device_input', { static: true }) device_input: ElementRef;

  constructor(private translateService: TranslateService,
    private performanceService: PerformanceServiceService,
    private router: Router,
    private commonOrgService: CommonService,
    private sso: SsoAuthService,
    private cd: ChangeDetectorRef
  ) {

    $('body').on('paste', '#device_input', (event: any) => {

      return;
      let items = [];
      let inp: any = '';
      if (this.intialPaste) {
        this.deviceData = [];
      }

      this.intialPaste = false;
      let deviceData: any = this.deviceData;
      if (deviceData && deviceData.length) {
        deviceData.forEach((element: any) => {

          if (this.devicesAdded.indexOf(element.trim()) === -1) {
            items.push(element.trim());
          }

        });

      } else {
        this.deviceData = [];
      }


      //return;



      // let ele = document.getElementById("device_input") as HTMLElement;
      // ele.click();
      let delemiter = ' ';
      let clipboardData = event.clipboardData || event.originalEvent.clipboardData;



      let newTags = clipboardData.getData('text/plain');

      newTags = newTags.trim()
      newTags = newTags.replace(/,/g, ' ');
      newTags = newTags.replace(/,\s+/g, " ");
      newTags = newTags.replace(/\n/g, " ");
      newTags = newTags.replace(/\s\s+/g, ' ');

      // if ($('li[class="select2-selection__choice"]').length) {
      //   Options("destroy").select2();
      //   $('li[class="select2-selection__choice"]').each(function () {

      //   });
      // }

      Array.prototype.push.apply(items, newTags.split(" "));
      if (items.length) {
        let arr = [];
        items.forEach(element => {
          arr.push({
            id: element.trim(),
            text: element.trim()
          });
        });

        items = this.getUniqueArr(items);

        this.selectData = items;
      }

      newTags = ` ${newTags} `;

      if (!newTags.endsWith(delemiter)) {
        newTags += delemiter;
      }

      event.preventDefault();
      event.target.value = '';
      //event.target.value = '';
      setTimeout(() => {

        // let value = `${items.join(" ")} `;
        // event.target.value = value;
        //$('#device_input').click();
        this.deviceData = items;
        return false;
      }, 100);

      this.cd.detectChanges();
    });
  }

  getUniqueArr(arr: any = []) {

    var uniqueNames = [];
    $.each(arr, function (i, el) {
      if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });

    return uniqueNames;
  }

  ngOnInit(): void {
    this.selectData = this.selectData ? this.selectData : [];
    this.protocols = this.inputData?.protocols ? this.inputData.protocols : [];
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });

    if (this.inputData && this.inputData['verifyDevice']) {
      let data = this.inputData?.devices ? this.inputData.devices : [];
      data = data ? this.removeDuplicates(data) : [];
      this.inputData.devices = data;
      this.deviceData = data;
      this.devicesAdded = [];
      this.addDevices();
    } else {
      this.devicesAdded = this.inputData?.devices ? this.inputData.devices : [];
    }



    this.options = {
      width: '300',
      multiple: true,
      tags: true,
      tokenSeparators: [',', ' ', '\t'],
      selectOnClose: true
    };

    this.showTable();
  }

  ngOnDestroy() {
    this.languageSubject.unsubscribe();

    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    let ele = document.getElementById("device_input") as HTMLElement;
    ele.addEventListener('contextmenu', (e) => {
      //alert("You've tried to open context menu"); //here you draw your own menu
      e.preventDefault();
    }, false);

  }

  ngAfterViewChecked() {
    let ele = document.getElementById("device_input") as HTMLElement;
    ele.addEventListener('contextmenu', (e) => {
      //alert("You've tried to open context menu"); //here you draw your own menu
      e.preventDefault();
    }, false);

  }

  showTable() {
    if (this.tableRenderedOnce) {
      this.rerender();
    } else {
      setTimeout(() => {
        this.dtTrigger.next();
        this.tableRenderedOnce = true;
        this.dataAvailable = true;
      }, 100)

    }
  }

  validate() {
    this.formError = false;
    if (!this.devicesAdded.length) {
      this.formError = true;
      return
    }
  }
  // Add Devices
  errors = [];
  btnDisabled = false;
  addDevices() {
    this.inputData['verifyDevice'] = false;
    this.errors = [];

    let errors = [];

    if (this.deviceData && this.deviceData.length) {
      this.btnDisabled = true;

      const requests: Observable<any>[] = [];

      //   if (this.devicesAdded.indexOf(device) !== -1) {
      //   this.errorInfo = `Device Serial Number(s) already added.`;
      //   this.error = true;
      //   return;
      // }

      let dupSerNums = [];
      this.deviceData.forEach((element, index, object) => {

        if (this.devicesAdded.indexOf(element) !== -1) {
          dupSerNums.push(`${element}`);
          //return;
        }



        const req = this.performanceService.checkdeviceCafCapabilityBySN(element).pipe(
          catchError(err => of(err.status)),
        );

        requests.push(req);

      });

      if (dupSerNums.length) {
        //errors.push(`Device Serial Number(s) already added. <br> <ul>${dupSerNums.join("")}</ul>`);

        errors.push({
          title: `${'Device Serial Number(s) already added.'}`,
          body: dupSerNums
        });

        this.error = true;
        this.btnDisabled = false;
        this.errors = errors;
        this.deviceData = [];
        this.selectData = [];

        return;
      }

      //console.log(requests.length)
      if (requests.length) {
        this.loading = true;
        forkJoin(requests).subscribe((response: any) => {
          this.loading = false;
          this.btnDisabled = false;

          let errserialNum = [];
          let donotSupportSN = [];
          response.forEach((element: any, index) => {

            let newDevices = [];
            if (typeof element == 'object') {
              if (element && element.supported) {
                if (element?.details?.protocol) {
                  this.protocols.push(element?.details?.protocol);
                  //this.inputData.protocols = this.protocols ? this.removeDuplicates(this.protocols) : [];
                }
                //this.devicesAdded.push(this.deviceData[index]);
                newDevices.push(this.deviceData[index]);
              } else {
                donotSupportSN.push(`${this.deviceData[index]}`);
              }

            } else {
              errserialNum.push(`${this.deviceData[index]}`);
            }

            setTimeout(() => {
              this.deviceData = [];
              //this.cd.detectChanges();
              this.devicesAdded = [...this.devicesAdded, ...newDevices];
              this.rerender();
            }, 100);


          });

          this.deviceData = [];
          this.selectData = [];

          if (errserialNum.length) {
            //errors.push(`No device found by the given device(s) serial number <br> <ul  style="list-style:disc">${errserialNum.join("")}</ul>`);
            errors.push({
              title: `${'No device found by the given device(s) serial number.'}`,
              body: errserialNum
            });
            this.error = true;

            $("html, body").animate({ scrollTop: 0 }, "slow");
          }

          if (donotSupportSN.length) {
            errors.push({
              title: `${'Device(s) do(es) not support TR143 or Ookla.'}`,
              body: donotSupportSN
            });
            this.error = true;

            $("html, body").animate({ scrollTop: 0 }, "slow");
          }

          this.errors = errors;

          this.deviceData = [];
          this.selectData = [];




          //this.cd.detectChanges();

        }, (err: any) => {

          this.loading = false;
        }, () => {
          this.deviceData = [];
          this.selectData = [];
        })

      } else {
        this.errors = errors;
      }





    }
    else {
      // this.errors.push({
      //   title: `${'Please add atleast one System seriel number.' ? 'Please add atleast one System seriel number.' : 'Please add atleast one System seriel number.'}`,
      //   body: []
      // });

      // $("html, body").animate({ scrollTop: 0 }, "slow");

      // setTimeout(() => {
      //   this.errors = [];
      // }, 3500);
      this.saveClicked = true
    }
    this.cd.detectChanges();

  }

  onChangeData(value) {

    localStorage.removeItem('intialPaste');

    if (value !== null && value.length === 0) {
      this.deviceData = [];
      this.selectData = [];
      // this.deviceData = Object.assign([], []);
      // this.selectData = Object.assign([], []);
      setTimeout(() => {
        this.clearInputs();
      }, 1000)
      this.cd.detectChanges();
      return;
    }
    this.cd.detectChanges();
    //let index = this.getArrIndexByValue(this.selectData, value);
    // this.selectData.splice(index, 1);
    // this.selectData = Object.assign({}, this.selectData);

  }

  clearInputs() {
    this.intialPaste = true;
  }

  getArrIndexByValue(arr, value) {

    for (var i = 0, iLen = arr.length; i < iLen; i++) {

      if (arr[i].b == value) return i;
    }
  }


  deviceSN = '';
  doDeleteDevieSN() {
    this.saveClicked = false;
    let index = this.devicesAdded.indexOf(this.deviceSN);
    this.deviceSN = '';
    if (index !== -1) {
      this.devicesAdded.splice(index, 1);
    }

    if (!this.devicesAdded.length) {
      //this.inputData.levelPassed = 1;
      this.outputdata.emit(this.inputData);
    }
    this.rerender();
  }

  deleteDevice(item, index) {
    this.saveClicked = false;
    this.deviceSN = item;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  cancelDelete() {
    this.deviceSN = '';
  }

  go_next() {
    this.saveClicked = true;
    this.validate()
    if (this.formError) {
      return;
    }
    this.inputData.devices = this.devicesAdded;
    if (this.inputData.levelPassed <= 2) {
      this.inputData.levelPassed = 2;
    }

    if (this.inputData?.levelPassed >= 3 && this.inputData?.protocols) {
      if (this.inputData.protocols.indexOf('TR143 1.0') === -1 && this.protocols.indexOf('TR143 1.0') !== -1) {
        this.inputData.levelPassed = 2;
      }
    }

    this.inputData.protocols = this.protocols ? this.removeDuplicates(this.protocols) : [];

    this.outputdata.emit(this.inputData);
    this.activeTab.emit('TestServerDetails');

    return true;
  }

  gotoPrevious() {
    this.inputData.devices = this.devicesAdded;
    if (this.inputData?.levelPassed >= 3 && this.inputData?.protocols) {
      if (this.inputData.protocols.indexOf('TR143 1.0') === -1 && this.protocols.indexOf('TR143 1.0') !== -1) {
        this.inputData.levelPassed = 2;
      }
    }

    this.inputData.protocols = this.protocols ? this.removeDuplicates(this.protocols) : this.inputData.protocols;

    this.outputdata.emit(this.inputData);
    this.activeTab.emit('TestInstance');
  }

  rerender(): void {
    if (this.tableRenderedOnce) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      setTimeout(() => {
        this.dtTrigger.next();
        this.tableRenderedOnce = true;
        this.dataAvailable = true;
      }, 100)

    }

  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = 'Access Denied';
    } else {
      this.errorInfo = this.sso.pageErrorHandle(err);
    }
    this.closeAlert();
    this.error = true;

    this.errors.push({
      title: this.errorInfo,
      body: ''
    });
  }

  closeAlert(index?: any) {
    this.error = false;
    this.success = false;

    this.errors.splice(index, 1);

    this.errors = [...this.errors];

  }

  showSuccess(msg): void {
    this.closeAlert();
    this.successInfo = msg;
    this.success = true;
  }

  showError(msg): void {
    this.closeAlert();
    this.errorInfo = msg;
    this.error = true;
  }

  reload(): any {
    if (window.location.href?.indexOf('/cco/operations/configuration/performance-testing') !== -1) {
      this.router.navigate(['./cco/operations/configuration/performance-testing']);
      return;
    }
    this.sso.redirectByUrl([
      `support/netops-management/operations/performance-testing`,
      `cco/operations/cco-system-operations/performance-testing`, '',
      `/cco/operations/cco-subscriber-operations/operations/performance-testing`
    ]);
  }

  removeDuplicates(arr: any) {
    var uniqueNames = [];
    $.each(arr, function (i, el) {
      el = el.trim();
      if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });

    return uniqueNames;
  }

  inputBoxData: string = '';

  pasteMakeList(event: ClipboardEvent) {
    event.preventDefault();
    let clipboardData = event.clipboardData || (<any>window).clipboardData;
    let values = clipboardData.getData('text');
    this.makeList(values);
  }

  makeList(values?) {
    let data = '', newTags = '';
    if (values) {
      data = values;
      newTags = values;
      $('#device_input').val('')
    } else {
      data = this.inputBoxData;
      newTags = this.inputBoxData;
    }
    let items = [];
    newTags = newTags.trim();
    newTags = newTags.replace(/,/g, ' ');
    newTags = newTags.replace(/,\s+/g, " ");
    newTags = newTags.replace(/\n/g, " ");
    newTags = newTags.replace(/\s\s+/g, ' ');

    this.inputBoxData = '';
    Array.prototype.push.apply(items, newTags.split(" "));
    items = items.filter(el => el);
    if (items.length) {
      let arr = [];

      items.forEach(element => {
        if (element) {
          arr.push({
            id: element.trim(),
            text: element.trim()
          });
        }
      });

      items = this.getUniqueArr(items);

      let filteredData = [];
      items.forEach(element => {
        //if (!this.devicesAdded.includes(element) && !this.deviceData.includes(element)) {
        if (!this.deviceData.includes(element)) {
          filteredData.push(element.trim());
        }
      });

      this.deviceData = [...this.deviceData, ...filteredData];
    }

  }


  removeData(index) {
    this.deviceData.splice(index, 1);
  }


  onCustomPasteClick(event) {
    event.preventDefault();
    this.device_input.nativeElement.focus();
  }

}
