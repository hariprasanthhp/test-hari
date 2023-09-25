import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { CommonFunctionsService } from 'src/app/flow-config/services/common-functions.service';
import _ from 'lodash';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'acl-for-remote-access',
  templateUrl: './acl-for-remote-access.component.html',
  styleUrls: ['./acl-for-remote-access.component.scss']
})
export class AclForRemoteAccessComponent implements OnInit {

  @Input() set selectedCategoryName(value) {
    this.formType = value === 'ACL Entry for Remote Access' ? 'aclForRemoteAccessForm' : 'aclForVoipForm';
    this.form = this.parent.form;
    this.initForm();
    this.initSorting();
  };
  @ViewChild(DataTableDirective, { static: true }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  language;
  languageSubject

  IpAddressError = false;
  duplicateIpAddressError = false;
  form: FormGroup;
  formType = '';
  rule: any = {
    Type: 'IPv4',
    IPAddress: ''
  };
  rules = [];
  sortingId = '';
  formTouched = false;

  constructor(
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    public parent: FormGroupDirective,
    private translateService: TranslateService,
    private commonFunctionsService: CommonFunctionsService,
  ) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.dtOptions = {
      paging: false,
      searching: false,
      info: false,
      ordering: true,
      serverSide: true,
      processing: false,
      responsive: true,
      order: [],
      dom: 'tipr',
      ajax: (dataTablesParameters: any, callback) => {
        if (!dataTablesParameters.order[0]) return;
        this.initSorting();
        let dir = dataTablesParameters.order[0].dir;
        let columnName = '';
        let id = '';

        if (dataTablesParameters.order[0].column == 0) {
          columnName = 'IPAddress';
          id = 'ip-addresses';
        } else if (dataTablesParameters.order[0].column == 1) {
          columnName = 'Type'
          id = 'version';
        } else {
          columnName = 'action'
          id = 'action';
        }

        this.rules = _.orderBy(this.rules, columnName, dir);
        if (this.rules.length) this.setSortDirection(id, dir);

        callback({
          recordsTotal: this.rules.length,
          recordsFiltered: this.rules.length,
          data: [],
          draw: 1
        });
      },
      columns: [
        {
          data: "IpAddress"
        },
        {
          data: "Type"
        },
        {
          data: "action",
        }
      ]

    };
  }

  initSorting() {
    if (this.sortingId) {
      document.getElementById(this.sortingId).classList.add('sorting');
      document.getElementById(this.sortingId).classList.remove('sorting_asc', 'sorting_desc');
    }
  }

  setSortDirection(id, dir) {
    let addDir = dir == 'asc' ? 'sorting_asc' : 'sorting_desc';
    let removeDir = dir == 'asc' ? 'sorting_desc' : 'sorting_asc';
    this.sortingId = id;
    document.getElementById(id).classList.remove('sorting');
    document.getElementById(id).classList.remove(removeDir);
    document.getElementById(id).classList.add(addDir);
  }

  initForm() {
    if (this.formType === 'aclForRemoteAccessForm') {
      this.form.get(this.formType).patchValue({
        RemoteAcl: false
      });
    } else {
      this.form.get(this.formType).patchValue({
        SipAcl: false
      });
    }
    this.form.get(this.formType).patchValue({
      list4: [],
      list6: []
    });
    this.rules = [];
  }

  get ipv4FormArray(): FormArray {
    return this.form.get(this.formType).get('list4') as FormArray;
  }

  get ipv6FormArray(): FormArray {
    return this.form.get(this.formType).get('list6') as FormArray;
  }

  addRule() {
    this.formTouched = true;
    if (this.validateIpAddress()) {
      if (!this.duplicateIpAddressError) this.IpAddressError = true;
      return;
    }
    if (!this.rule.action) return;
    this.patchRule(this.rule);
    this.initSorting();
    this.formTouched = false;
    this.modalService.dismissAll();
  }

  patchRule(rule) {
    let ruleFormGroup = this.formBuilder.group({
      Type: this.formType == 'aclForRemoteAccessForm' ? 'remoteaccess' : 'sip',
      IPAddress: rule.IPAddress,
      action: rule.action
    });
    rule.Type == 'IPv4' ? this.ipv4FormArray.push(ruleFormGroup) : this.ipv6FormArray.push(ruleFormGroup);
    this.rules.push(rule);
  }

  deleteRule(ruleIndex) {
    if (this.rules[ruleIndex].Type === 'IPv4') {
      this.ipv4FormArray.removeAt(this.ipv4FormArray.value.findIndex(obj => obj.IPAddress == this.rules[ruleIndex].IPAddress));
    } else {
      this.ipv6FormArray.removeAt(this.ipv6FormArray.value.findIndex(obj => obj.IPAddress == this.rules[ruleIndex].IPAddress));
    }
    this.rules.splice(ruleIndex, 1);
  }

  validateIpAddress() {
    if (!this.formTouched) return;
    this.IpAddressError = false;
    this.duplicateIpAddressError = false;
    let ip = this.rule.IPAddress.trim();
    this.rule.IPAddress = ip;
    if (!this.rule.IPAddress) {
      this.IpAddressError = true;
      return true;
    }

    if (this.rule.Type === 'IPv6') {
      // let checkIPv6 = /(?:^|(?<=\s))(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(?=\s|$)/;
      // let checkIPv6 = /(^|\s)(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,6}:(((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|[/][\d]{1,2})(([/][\d]{1,2})?)|(([0-9a-fA-F]{1,4}[/])[\d]{1,2}[0-9]{1,2}))(?=\s|$)/;
      // let checkIPv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}(?:\/\d{1,3})?$|^(?:[0-9a-fA-F]{1,4}:){6}:[0-9a-fA-F]{1,4}(?:\/\d{1,3})?$|^(?:[0-9a-fA-F]{1,4}:){5}(?::[0-9a-fA-F]{1,4}){1,2}(?:\/\d{1,3})?$|^(?:[0-9a-fA-F]{1,4}:){4}(?::[0-9a-fA-F]{1,4}){1,3}(?:\/\d{1,3})?$|^(?:[0-9a-fA-F]{1,4}:){3}(?::[0-9a-fA-F]{1,4}){1,4}(?:\/\d{1,3})?$|^(?:[0-9a-fA-F]{1,4}:){2}(?::[0-9a-fA-F]{1,4}){1,5}(?:\/\d{1,3})?$|^(?:[0-9a-fA-F]{1,4}:){1}(?::[0-9a-fA-F]{1,4}){1,6}(?:\/\d{1,3})?$|^(?::[0-9a-fA-F]{1,4}){1,7}(?:\/\d{1,3})?$|^::$|^::1(?:\/\d{1,3})?$|^(?:[0-9a-fA-F]{1,4}:){1,6}(?:[0-9a-fA-F]{1,4}:)?(?:[0-9a-fA-F]{0,4}:)?(?:[0-9a-fA-F]{0,4}:)?(?:[0-9a-fA-F]{0,4}:)?(?:[0-9a-fA-F]{0,4}:)?(?:[0-9a-fA-F]{0,4}:)?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{1,3})?$/;
      // this.IpAddressError = !checkIPv6.test(ip);
      let checkIPv4added = /^([0-9a-fA-F]{1,4}:){6}((([0-9a-fA-F]{1,4}:){1,4}[0-9a-fA-F]{1,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/;
      this.IpAddressError = !this.commonFunctionsService.isValidIpV6Addr(ip) && !this.commonFunctionsService.isValidSubnetV6(ip) && !checkIPv4added.test(ip);
    } else {
      this.IpAddressError = !this.commonFunctionsService.isValidIpV4Addr(ip);
    }

    if (!this.IpAddressError) {
      return this.duplicateIpAddressCheck(ip);
    } else {
      return this.IpAddressError;
    }
  }

  duplicateIpAddressCheck(ip) {
    let duplicateIpAddress = this.rules.find(rule => rule.IPAddress === ip);
    this.duplicateIpAddressError = !!duplicateIpAddress;
    return this.duplicateIpAddressError;
  }

  openaclModal(modal) {
    this.IpAddressError = false;
    this.duplicateIpAddressError = false;
    this.formTouched = false;
    this.rule = {
      Type: 'IPv4',
      IPAddress: ''
    };
    this.modalService.open(modal, {
      size: 'lg',
      centered: true,
      windowClass: 'acl-custom-modal'
    });
  }

}
