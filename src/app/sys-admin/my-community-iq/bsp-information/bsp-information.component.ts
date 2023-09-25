import { Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { TimeZone, TimeZoneValues } from 'src/app/cco-foundation/cco-foundation-service/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { MycommunityIqService } from '../../services/mycommunity-iq.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { interval, Subject, Subscription } from 'rxjs';
import { ValidatorService } from 'src/app-services/validator.services';
declare let $: any;
@Component({
  selector: 'app-bsp-information',
  templateUrl: './bsp-information.component.html',
  styleUrls: ['./bsp-information.component.scss']
})
export class BSPInformationComponent implements OnInit, OnDestroy {
  @ViewChild('deleteModal', { static: true }) private deleteModal: TemplateRef<any>;
  @ViewChild('microSiteModal', { static: true }) private microSiteModal: TemplateRef<any>;
  @ViewChild('verifyBSPModal', { static: true }) private verifyBSPModal: TemplateRef<any>;
  @ViewChild('bspResetErrorModal', { static: true }) private bspResetErrorModal: TemplateRef<any>;
  @ViewChild('bspInfoWarnModal', { static: true }) private bspInfoWarnModal: TemplateRef<any>;
  @ViewChild('verifyMicrositeModel', { static: true }) private verifyMicrositeModel: TemplateRef<any>;
  language: any;
  languageSubject: any;
  timeZoneList: any = TimeZone;
  timeZoneValueList: any = TimeZoneValues;
  bspForm: FormGroup;
  bspFormSubmitted: boolean = false;
  submitted: boolean = false;
  addMicroSite: FormGroup;
  addMicroSiteFormSubmitted: boolean = false;
  errorInfo: any;
  successInfo: any;
  editIndex: number;
  minimumErr = {
    community: false,
    bsp: false,
    wifi: false,
    description: false,
    friendlyName: false
  }
  communityError = {
    community: false,
    bsp: false,
  }
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    dom: 'tipr',
    lengthChange: false,
    pageLength: 10,
    destroy: true,
    processing: false,
    columnDefs: [
      { orderable: false, targets: [5] },
      { targets: [0], orderable: true }
    ],
    order: [0, 'asc'],
    drawCallback: (settings) => {
      this._iDisplayStart = settings._iDisplayStart
      let total = settings.aoData.length;
      let length = settings._iDisplayLength;
      if (total <= length) {
        $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
      }
    }
  };
  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  tableDataAvailable: boolean;
  communityArr: any;
  tableData = [];
  buttonText: string = "Bsp_Add_Microsite";
  primaryColor: string;
  secondaryColor: string;
  defaultLogo: any;
  loader: boolean;
  addBspsub: any;
  BspData: any;
  error: boolean;
  success: boolean;
  bspId: any;
  logoFile: any;
  ORG_ID: any;
  status: any;
  frTable: any;
  Modelloader: boolean;
  logo: any;
  micrositeId: any;
  EditmicrositeId: any;
  micrositeloader: boolean;
  disblemicrosite: boolean;
  ShowMicrosite: boolean;
  flag: any;
  Micrositelogo: any
  communityDesc: any;
  loading: boolean;
  disableCommunity: boolean;

  editLoader: boolean;
  errorInfoMicrosite: any;
  saveBSP: boolean;
  esTable: any;
  UrLError: boolean;
  refreshBack: boolean = false;
  bsploader: boolean;
  iserror: boolean;
  workFlowData: any;
  micrositeName: any;
  MicrositeData: any;
  MODULE: any;
  private _iDisplayStart: number;
  de_DETable: { emptyTable: string; info: string; infoEmpty: string; infoFiltered: string; infoPostFix: string; thousands: string; lengthMenu: string; loadingRecords: string; processing: string; search: string; zeroRecords: string; paginate: { first: string; last: string; next: string; previous: string; }; };
  subscription: Subscription[] = [];
  constructor(private translateService: TranslateService,
    private router: Router,
    private titleService: Title,
    private sso: SsoAuthService,
    private formBuilder: FormBuilder,
    private dialogService: NgbModal,
    private commonOrgService: CommonService,
    private communityService: MycommunityIqService,
    private validatorService: ValidatorService,
  ) {
    this.frTable = this.translateService.fr;
    this.esTable = this.translateService.es;
    this.de_DETable = this.translateService.de_DE;
    this.ORG_ID = this.sso.getOrgId();
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('SmartTown Wi-Fi');
    this.subscription.push(interval(30000).subscribe(x => {
      setTimeout(() => {
        if (!this.ShowMicrosite && this.saveBSP) {
          this.GetBspProvider();
        }
      }, 0);

    }));
  }



  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.subscription.push(this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.tableDataAvailable = false;
      this.tableLanguageOptions();
      this.titleService.setTitle(`${this.language['Bsp_Info']} - ${this.language['myCommunityIQ']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
      setTimeout(() => {
        this.tableDataAvailable = true;
      }, 100);
    }));
    this.titleService.setTitle(`${this.language['Bsp_Info']} - ${this.language['myCommunityIQ']} - ${this.MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.GetBspProvider();
    this.GetMicrosites();
    this.getPredefinedCommunities();
    this.bspForm = this.formBuilder.group({
      shortName: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      timezone: [null, [Validators.required]],
      wifiNetworkName: ['', Validators.required],
      defaultLogo: [''],
      defaultPrimaryColor: ['#0279FF', Validators.required],
      defaultSecondaryColor: ['#CCCCCC', Validators.required],
      defaultTerms: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      friendlyName: ['']
    });
    this.addMicroSite = this.formBuilder.group({
      // shortName: [null, [Validators.required]],
      isPredefinedCommunity: [true],
      communityType: ['Permanent'],
      brandingType: ['Default'],
      communityName: [null, [Validators.required]],
      communityDesc: [''],
      logo: [''],
      primaryColor: ['#0279FF', Validators.required],
      secondaryColor: ['#CCCCCC', Validators.required]
    });
  }

  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.frTable;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.esTable;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.de_DETable;
    } else if (this.language.fileLanguage == 'en' && this.dtOptions.language) {
      delete this.dtOptions.language;
    }
  }

  urlValidation(url) {
    if (url) {
      let errorObj = this.validatorService.urlValidation(url)
      this.UrLError = errorObj.error;
    } else if (url = '') {
      this.UrLError = true;
    }
    else {
      this.UrLError = false;
    }

  }
  clsAlphaNoOnly(e, value?) {
    if (value === 'community') {
      var regex = new RegExp("^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
      let result = e.substring(0, 2);
      if (regex.test(e) && result !== 'c-') {
        this.communityError.community = false
      } else {
        this.communityError.community = true
      }
    } else {
      var regex = new RegExp("^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
      if (regex.test(e)) {
        this.communityError.bsp = false
      } else {
        this.communityError.bsp = true
      }
    }

  }
  checkMaxMin(e, value) {
    if (value === "community") {
      if (e.length > 0) {
        if (e.length >= 4 && e.length <= 31) {
          this.minimumErr.community = false
        } else {
          this.minimumErr.community = true
        }
      }
    } else if (value === 'bsp') {
      if (e.length > 0) {
        if (e.length >= 4 && e.length <= 31) {
          this.minimumErr.bsp = false
        } else {
          this.minimumErr.bsp = true
        }
      }
    } else if (value === 'description') {
      if (e.length > 0) {
        if (e.length <= 32) {
          this.minimumErr.description = false
        } else {
          this.minimumErr.description = true
        }
      }
    } else if (value === 'friendlyName') {
      if (e.length > 0) {
        if (e.length >= 3 && e.length <= 32) {
          this.minimumErr.friendlyName = false
        } else {
          this.minimumErr.friendlyName = true
        }
      } else {
        this.minimumErr.friendlyName = false
      }
    } else {
      if (e.length > 0) {
        if (e.length >= 3 && e.length <= 32) {
          this.minimumErr.wifi = false
        } else {
          this.minimumErr.wifi = true
        }
      }
    }


  }
  checkSpace(e) {
    const v = e.value.toString().replace(/\ /g, '');
    if (v.length == 0 && e.which == 32) e.preventDefault();
  }
  rerender(): void {
    this.tableDataAvailable = false;
    let that = this;
    this.dtElements.forEach((dtElement: DataTableDirective, i) => {
      if (dtElement.dtInstance)
        dtElement.dtInstance?.then((dtInstance: DataTables.Api) => {
          dtInstance.clear();
          dtInstance.destroy();
          if (i == 1) {
            that.reload()
          }
        });
    });
  }
  reload() {
    setTimeout(() => {
      this.dtTrigger.next();
      this.tableDataAvailable = true;
    }, 50);
  }

  patchCommunityDescription(event) {
    this.communityDesc = event.description
  }
  convertIntoFileBase(input) {
    let res: any;

    this.Micrositelogo = '';
    $('#logo-customimage-view').attr('src', ' ');

    if (input?.files && input?.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        $('#logo-customimage-view').attr('src', e.target.result);
        this.logo = e.target.result;
        res = e.target['result'];
      };

      reader.readAsDataURL(input?.files[0]);
      var fileName = input?.files[0].name;
      //this.logo = fileName; 
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach(e => e?.unsubscribe());
  }
  AddBspProvider() {
    this.bspFormSubmitted = true;
    this.error = false;
    this.iserror = false
    let formdata = new FormData;
    let logo;
    logo = $("input[name='logo']").get(0)?.files;

    if (logo?.length) {
      var file_ext = logo[0].name.split('.').pop();
      var logoimg = logo[0].size;
      var logoimgsize = logoimg / 1024;


      var allowed_extns = ["jpeg", "JPEG", "PNG", "png", "jpg", "JPG"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }
      if (logoimgsize > 400) {
        this.addError(this.language['LogoImage_uploaderror'] + " 400 KB");
        return;
      }

      $.each(logo, function (i, file) {
        formdata.append("defaultLogo", file);
        formdata.append('updateLogo', 'true');
      });
    } else {
      formdata.append("defaultLogo", '');
      formdata.append('updateLogo', 'false');
    }
    if (!this.bspForm.value.timezone || !this.bspForm.value.shortName || !this.bspForm.value.wifiNetworkName || !this.bspForm.value.defaultPrimaryColor || !this.bspForm.value.defaultSecondaryColor || !this.bspForm.value.defaultTerms) {
      return
    }
    if (this.bspForm.value.defaultTerms) {
      this.urlValidation(this.bspForm.value.defaultTerms);
    }
    if (this.bspForm.value.defaultTerms) {
      if (this.UrLError) {
        return
      }
    }

    if (this.bspForm.value.shortName) {
      this.checkMaxMin(this.bspForm.value.shortName, 'bsp');
      this.checkMaxMin(this.bspForm.value.wifiNetworkName, 'wifi');
      this.clsAlphaNoOnly(this.bspForm.value.shortName, 'bsp');
    }
    if (this.bspForm.value.friendlyName) {
      this.checkMaxMin(this.bspForm.value.friendlyName, 'friendlyName')
      if (this.minimumErr.friendlyName) {
        return
      }
    }
    if (this.minimumErr.bsp || this.minimumErr.wifi || this.communityError.bsp) {
      return
    }
    this.bsploader = true;
    formdata.append('orgId ', this.ORG_ID);
    formdata.append('shortName', this.bspForm.value.shortName);
    formdata.append('name', localStorage.getItem('calix.org_name'));
    formdata.append('timezone', this.bspForm.value.timezone);
    formdata.append('wifiNetworkName', this.bspForm.value.wifiNetworkName);
    formdata.append('defaultPrimaryColor', this.bspForm.value.defaultPrimaryColor);
    formdata.append('defaultSecondaryColor', this.bspForm.value.defaultSecondaryColor);
    formdata.append('defaultTerms', this.bspForm.value.defaultTerms);
    if (this.bspForm.value.friendlyName) {
      formdata.append('friendlyName', this.bspForm.value.friendlyName);
    };
    this.subscription.push(this.communityService.AddBspInfo(formdata).subscribe((res: any) => {
      this.saveBSP = true;
      //this.loader = false;
      this.GetBspProvider();
      this.closeAllModal();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, true);
      this.bsploader = false;
    }))
  }

  GetBspProvider() {
    if (this.refreshBack) {
      this.loader = false;
    } else {
      this.loader = true;
    }

    this.subscription.push(this.communityService.GetBspproviderInfo().subscribe((res: any) => {
      this.BspData = res ? res : {};
      this.bspId = res?.id
      if (this.BspData) {
        this.refreshBack = true
        this.loader = false
      }
      this.status = res?.status;
      if (this.status === 'READY') {
        this.ShowMicrosite = true;
      } else {
        this.ShowMicrosite = false;
      }
      this.bspForm.patchValue(this.BspData);
      this.bspForm.patchValue({ friendlyName: (this.BspData?.friendlyName !== 'undefined' && this.BspData?.friendlyName !== 'null') ? this.BspData?.friendlyName : '' })
      this.defaultLogo = this.BspData?.defaultLogo;
      this.bsploader = false;
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      //this.pageErrorHandle(err);
      this.loader = false;
      this.bspId = "";
      this.BspData = ""
      this.status = "";
      this.tableData = [];
      this.ShowMicrosite = false;
      this.bspFormSubmitted = false;
      this.defaultLogo = "";
      this.bspForm.reset({
        shortName: null,
        timezone: '',
        wifiNetworkName: '',
        defaultLogo: '',
        defaultPrimaryColor: '#0279FF',
        defaultSecondaryColor: '#CCCCCC',
        defaultTerms: '',
      })
      this.bsploader = false
    }));
  }

  GetMicrosites() {
    this.micrositeloader = true;
    this.subscription.push(this.communityService.GetMicrosite().subscribe((res: any) => {
      this.tableDataAvailable = false;
      this.tableData = res ? res : [];
      if (!this.tableData) {
        setTimeout(() => {
          this.showNoDataAvailable()
        }, 300)
      }
      this.dtOptions = {
        pagingType: 'full_numbers',
        dom: 'tipr',
        lengthChange: false,
        pageLength: 10,
        destroy: true,
        processing: true,

        displayStart: this._iDisplayStart ? this._iDisplayStart : 0,
        columnDefs: [
          { orderable: false, targets: [5] },
          { targets: [0], orderable: true }
        ],
        order: [0, 'asc'],
        drawCallback: (settings) => {
          this._iDisplayStart = settings._iDisplayStart
          let total = settings.aoData.length;
          let length = settings._iDisplayLength;
          if (total <= length) {
            $(settings.nTableWrapper).find(`#${settings.sTableId}_last`).addClass('disabled');
          }
        }
      };
      this.micrositeloader = false;
      this.closeAllModal()
      this.loadArloTables();
    }, (err: HttpErrorResponse) => {
      this.micrositeloader = false;
      this.loadArloTables();
      if (err.status == 404) {
        setTimeout(() => {
          this.showNoDataAvailable()
        }, 300)
      }
      this.pageErrorHandle(err, true);
    }));
  }
  BSPPreview() {
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(this.BspData));
    this.router.navigate([])?.then(result => { window.open('/microsite_preview', '_blank') });
  }
  AddMicrositePreview() {
    const AddMicrosite = {
      communityDesc: (this.addMicroSite.value.communityDesc && !this.addMicroSite.value.isPredefinedCommunity) ? this.addMicroSite.value.communityDesc : (this.communityDesc && this.addMicroSite.value.isPredefinedCommunity) ? this.communityDesc : this.addMicroSite.value.communityDesc,
      logo: this.logo ? this.logo : this.addMicroSite.value.brandingType !== 'Custom' ? this.defaultLogo : '',
      primaryColor: this.addMicroSite.value.brandingType === 'Custom' ? this.addMicroSite.value.primaryColor : this.BspData?.defaultPrimaryColor,
      secondaryColor: this.addMicroSite.value.brandingType === 'Custom' ? this.addMicroSite.value.secondaryColor : this.BspData?.defaultSecondaryColor
    }
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(AddMicrosite));
    this.router.navigate([])?.then(result => { window.open('/microsite_preview', '_blank') });
  }
  EditMicroPreview() {
    const AddMicrosite = {
      communityDesc: this.communityDesc ? this.communityDesc : this.addMicroSite.value.communityDesc,
      logo: this.logo ? this.logo : this.addMicroSite.value.brandingType === 'Custom' ? this.Micrositelogo : this.defaultLogo,
      primaryColor: this.addMicroSite.value.brandingType === 'Custom' ? this.addMicroSite.value.primaryColor : this.BspData?.defaultPrimaryColor,
      secondaryColor: this.addMicroSite.value.brandingType === 'Custom' ? this.addMicroSite.value.secondaryColor : this.BspData?.defaultSecondaryColor
    }
    localStorage.setItem("calix.micrositeDetails", JSON.stringify(AddMicrosite));
    this.router.navigate([])?.then(result => { window.open('/microsite_preview', '_blank') });
  }
  EditMicrositePreview(item?) {
    this.editLoader = true;
    let id = item?.id
    this.subscription.push(this.communityService.GetMicrositeForEdit(id).subscribe((res: any) => {
      this.MicrositeData = res ? res : {}
      this.editLoader = false;
      localStorage.setItem("calix.micrositeDetails", JSON.stringify(this.MicrositeData));
      this.router.navigate([])?.then(result => { window.open('/microsite_preview', '_blank') });
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, false);

      this.editLoader = false;
    }))

  }
  loadArloTables() {
    this.tableLanguageOptions();
    setTimeout(() => {
      this.tableDataAvailable = true;
    }, 0);

  }
  getPredefinedCommunities() {
    this.loading = true;
    this.subscription.push(this.communityService.GetpredefinedCommunities().subscribe((res: any) => {
      this.communityArr = res ? res : [];
      if (this.communityArr?.length === 0) {
        this.disableCommunity = true;
        this.addMicroSite.patchValue({ isPredefinedCommunity: false })
      } else {
        this.disableCommunity = false;
      }
      this.loading = false;

    }, (err: HttpErrorResponse) => {

      this.loader = false;
    }))
  }
  EditBspProvider() {
    this.bspFormSubmitted = true;
    this.error = false;
    this.iserror = false
    let formdata = new FormData;
    let logo;
    if (this.defaultLogo) {

    }
    logo = $("input[name='logo']").get(0)?.files;

    if (logo?.length) {
      var file_ext = logo[0].name.split('.').pop();
      var logoimg = logo[0].size;
      var logoimgsize = logoimg / 1024;
      var allowed_extns = ["jpeg", "JPEG", "PNG", "png", "jpg", "JPG"];
      if (allowed_extns.indexOf(file_ext) == -1) {
        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }
      if (logoimgsize > 400) {
        this.addError(this.language['LogoImage_uploaderror'] + " 400 KB");
        return;
      }
      $.each(logo, function (i, file) {
        formdata.append("defaultLogo", file);
        formdata.append('updateLogo', 'true');
      });
    } else {
      formdata.append('defaultLogo', '');
      formdata.append('updateLogo', 'false');
    }

    if (this.bspForm.value.defaultTerms) {
      this.urlValidation(this.bspForm.value.defaultTerms);
    }
    if (this.bspForm.value.defaultTerms) {
      if (this.UrLError) {
        return
      }
    }
    if (this.bspForm.value.friendlyName) {
      this.checkMaxMin(this.bspForm.value.friendlyName, 'friendlyName')
      if (this.minimumErr.friendlyName) {
        return
      }
    }

    this.bsploader = true;
    formdata.append('timezone', this.bspForm.value.timezone);
    formdata.append('defaultPrimaryColor', this.bspForm.value.defaultPrimaryColor);
    formdata.append('defaultSecondaryColor', this.bspForm.value.defaultSecondaryColor);
    formdata.append('defaultTerms', this.bspForm.value.defaultTerms);
    if (this.bspForm.value.friendlyName) {
      formdata.append('friendlyName', this.bspForm.value.friendlyName);
    }
    this.subscription.push(this.communityService.EditBspInfo(formdata).subscribe((res: any) => {
      //this.loader = false;
      this.GetBspProvider();
      this.closeAllModal();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, true);
      this.bsploader = false;
    }))
  }

  showNoDataAvailable() {
    setTimeout(() => {
      let span = document.querySelector('.dataTables_empty') as HTMLElement;
      if (span) {
        span.style.display = 'table-cell';
        span.classList.add('text-center');
      };
    }, 100);
  }

  public addError(str: string, value?): void {
    if (value) {
      this.errorInfoMicrosite = str
      this.iserror = true
      this.error = false;
    } else {
      this.errorInfo = str;
      this.error = true;
      this.iserror = false
    }

    this.micrositeloader = false;
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  getColorByBgColor(bgColor) {
    if (!bgColor) { return true; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? true : false;
  }

  // microsite submit
  onSubmit() {
    this.addMicroSiteFormSubmitted = true;
    let formdata = new FormData;
    if (this.EditmicrositeId) {
      if (!this.addMicroSite.value.isPredefinedCommunity) {
        if (!this.addMicroSite.value.communityDesc) {
          return
        }
      }
      if (this.minimumErr.description) {
        return
      }
      if (this.addMicroSite.value.brandingType === 'Custom') {
        this.micrositeloader = true;
        let logo;
        logo = $("input[name='white_logo']").get(0)?.files;

        if (logo?.length) {
          var file_ext = logo[0].name.split('.').pop();
          var logoimg = logo[0].size;
          var logoimgsize = logoimg / 1024;
          var allowed_extns = ["jpeg", "JPEG", "PNG", "png", "jpg", "JPG"];
          if (allowed_extns.indexOf(file_ext) == -1) {
            var allowed_extns_str = allowed_extns.join(", ");
            this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format'], true);
            return;
          }
          if (logoimgsize > 400) {
            this.addError(this.language['LogoImage_uploaderror'] + " 400 KB", true);
            return;
          }
          $.each(logo, function (i, file) {
            formdata.append("logo", file);
            formdata.append('updateLogo', 'true');
          });
        } else {
          formdata.append("logo", '');
          formdata.append('updateLogo', 'false');
        }
        formdata.append("primaryColor", this.addMicroSite.value.primaryColor);
        formdata.append("secondaryColor", this.addMicroSite.value.secondaryColor);
        formdata.append("brandingType", this.addMicroSite.value.brandingType);
        formdata.append('communityDesc', this.addMicroSite.value.communityDesc);
      } else {
        formdata.append("logo", '');
        formdata.append('updateLogo', 'false');
        formdata.append("primaryColor", '');
        formdata.append("secondaryColor", '');
        formdata.append('communityDesc', this.addMicroSite.value.communityDesc);
        formdata.append("brandingType", this.addMicroSite.value.brandingType);
      }
    } else {
      if (!this.addMicroSite.value.brandingType || !this.addMicroSite.value.communityName) {
        return
      }
      if (!this.addMicroSite.value.isPredefinedCommunity) {
        if (!this.addMicroSite.value.communityDesc) {
          return
        }
      }
      this.micrositeloader = true;
      if (this.addMicroSite.value.brandingType === 'Custom') {
        let logo;
        logo = $("input[name='white_logo']").get(0)?.files;

        if (logo?.length) {
          var file_ext = logo[0].name.split('.').pop();
          var logoimg = logo[0].size;
          var logoimgsize = logoimg / 1024;


          var allowed_extns = ["jpeg", "JPEG", "PNG", "png", "jpg", "JPG"];
          if (allowed_extns.indexOf(file_ext) == -1) {

            var allowed_extns_str = allowed_extns.join(", ");
            this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format'], true);
            return;
          }
          if (logoimgsize > 400) {
            this.addError(this.language['LogoImage_uploaderror'] + " 400 KB", true);
            return;
          }

          $.each(logo, function (i, file) {
            formdata.append("logo", file);
            formdata.append('updateLogo', 'true');
          });
        } else {
          // this.addError(this.language.upload_Logo_image);
          // return;
          formdata.append("logo", '');
          formdata.append('updateLogo', 'false');
        }
        formdata.append("primaryColor", this.addMicroSite.value.primaryColor);
        formdata.append("secondaryColor", this.addMicroSite.value.secondaryColor);
      } else {
        formdata.append("logo", '');
        formdata.append('updateLogo', 'false');
        formdata.append("primaryColor", '');
        formdata.append("secondaryColor", '');
      }
      if (!this.addMicroSite.value.isPredefinedCommunity) {
        formdata.append("communityDesc", this.addMicroSite.value.communityDesc);
        this.clsAlphaNoOnly(this.addMicroSite.value.communityName);
        this.checkMaxMin(this.addMicroSite.value.communityName, 'community');
        if (this.communityError.community || this.minimumErr.community || this.minimumErr.description) {
          this.micrositeloader = false;
          return
        }
      } else {
        formdata.append("communityDesc", '');
      }

      formdata.append("isPredefinedCommunity", this.addMicroSite.value.isPredefinedCommunity);
      formdata.append("brandingType", this.addMicroSite.value.brandingType);
      formdata.append("communityName", this.addMicroSite.value.communityName.toLowerCase());
      formdata.append("communityType", this.addMicroSite.value.communityType);
    }
    if (this.EditmicrositeId) {
      this.subscription.push(this.communityService.EditMicrosite(formdata, this.EditmicrositeId).subscribe((res: any) => {
        this.closeAllModal();
        this.GetMicrosites();
        this.getPredefinedCommunities();

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err, true);
        this.micrositeloader = false;
      }))
    } else {
      this.subscription.push(this.communityService.AddMicrosite(formdata).subscribe((res: any) => {
        this.closeAllModal();
        this.GetMicrosites();
        this.getPredefinedCommunities();

      }, (err: HttpErrorResponse) => {
        this.pageErrorHandle(err, true);
        this.micrositeloader = false;
      }))
    }

  }

  closeAllModal() {
    this.error = false
    this.iserror = false
    this.dialogService.dismissAll();
  }
  editMicroSite(value, index) {
    this.error = false;
    this.logo = ''
    this.iserror = false;
    this.EditmicrositeId = value.id
    this.disblemicrosite = true;
    this.disableCommunity = true
    this.minimumErr.description = false;
    this.minimumErr.community = false;
    this.editLoader = true;
    this.subscription.push(this.communityService.GetMicrositeForEdit(this.EditmicrositeId).subscribe((res: any) => {
      this.addMicroSite.patchValue(res);
      this.Micrositelogo = res?.logo;
      this.editLoader = false;
      this.dialogService.open(this.microSiteModal);
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, false);

      this.editLoader = false;
    }))

    this.editIndex = index;
  }
  checkColor() {
    if (this.addMicroSite.value.brandingType === 'Default') {
      this.addMicroSite.patchValue({
        primaryColor: '#0279FF',
        secondaryColor: '#CCCCCC'
      })
    }

  }
  addMicroSiteValue() {
    this.disblemicrosite = false;
    this.error = false;
    this.iserror = false;
    this.logo = ""
    this.addMicroSiteFormSubmitted = false;
    this.EditmicrositeId = ""
    this.minimumErr.community = false;
    this.minimumErr.description = false;
    this.communityDesc = "";
    this.communityError.community = false;
    this.Micrositelogo = '';
    if (this.communityArr?.length === 0) {
      this.disableCommunity = true;
      this.addMicroSite.patchValue({ isPredefinedCommunity: false })
    } else {
      this.disableCommunity = false;
    }
    this.addMicroSite.reset({
      shortName: null,
      communityType: 'Permanent',
      isPredefinedCommunity: this.disableCommunity ? false : true,
      brandingType: 'Default',
      communityName: null,
      communityDesc: '',
      logo: null,
      primaryColor: '#0279FF',
      secondaryColor: '#CCCCCC'
    })
    this.dialogService.open(this.microSiteModal);
  }
  deleteMicrosite(item: any, ind: any, content: any) {
    this.micrositeId = item.id
    this.dialogService.open(content, { size: 'md' });
  }
  DeleteMicrosite() {
    let micrositeId = this.micrositeId
    this.micrositeloader = true;
    this.subscription.push(this.communityService.DeleteMicrosite(micrositeId).subscribe((res: any) => {
      this.GetMicrosites();
      this.getPredefinedCommunities();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, false);

      this.micrositeloader = false;
    }))
  }
  WarToDelMicrosite(item: any,) {
    this.micrositeId = item.id;
    this.micrositeName = item?.communityName;
    let micrositeId = this.micrositeId
    this.micrositeloader = true;
    const data = {
      "orgId": this.ORG_ID,
      "actions.passpointConfig.communities.micrositeId": micrositeId
    }
    this.subscription.push(this.communityService.WarToDelMicrosite(this.ORG_ID, JSON.stringify(data)).subscribe((res: any) => {
      this.workFlowData = res ? res : []
      this.micrositeloader = false;
      if (res?.length !== 0) {
        this.dialogService.open(this.verifyMicrositeModel, { windowClass: 'custom-alert-warn' });
      } else {
        this.dialogService.open(this.deleteModal)
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, false);
      this.dialogService.open(this.deleteModal)
      this.micrositeloader = false;
    }))
  }
  DeleteBSP() {
    this.bsploader = true
    this.subscription.push(this.communityService.DeleteBspInfo().subscribe((res: any) => {
      this.GetBspProvider();
      //this.getPredefinedCommunities();
      this.closeAllModal();
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err, true);
      this.bsploader = false
      this.micrositeloader = false;
    }))
  }
  pageErrorHandle(err: HttpErrorResponse, value: boolean) {
    if (value) {
      this.iserror = true;
      if (err.status == 401) {
        this.errorInfoMicrosite = this.language['Access Denied'];
      } else {
        this.errorInfoMicrosite = this.commonOrgService.pageErrorHandle(err);
      }

    } else {
      this.error = true;
      if (err.status == 401) {
        this.errorInfo = this.language['Access Denied'];
      } else {
        this.errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
    }

    //this.closeAlert();

  }
  readURL(input: any) {
    let res: any;

    this.defaultLogo = '';
    $('#logo-image-view').attr('src', ' ');

    if (input?.files && input?.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        $('#logo-image-view').attr('src', e.target.result);
        res = e.target['result'];
      };

      reader.readAsDataURL(input?.files[0]);
      var fileName = input?.files[0].name;
      this.defaultLogo = fileName;
    }
  }
  closeAlert() {
    this.error = false;
    this.iserror = false;
    this.success = false
  }
  removeCommunity() {
    this.addMicroSite.patchValue({
      communityName: null,
      description: null,
    })
  }
  verifyBSPInfoModal() {
    this.bspFormSubmitted = true;
    this.error = false;
    this.iserror = false
    let logo = $("input[name='logo']").get(0)?.files;

    if (logo?.length) {
      var file_ext = logo[0].name.split('.').pop();
      var logoimg = logo[0].size;
      var logoimgsize = logoimg / 1024;


      var allowed_extns = ["jpeg", "JPEG", "PNG", "png", "jpg", "JPG"];
      if (allowed_extns.indexOf(file_ext) == -1) {

        var allowed_extns_str = allowed_extns.join(", ");
        this.addError(this.language['Image_extension_will_be'] + allowed_extns_str + this.language['file_format']);
        return;
      }
      if (logoimgsize > 400) {
        this.addError(this.language['LogoImage_uploaderror'] + " 400 KB");
        return;
      }
    }
    if (!this.bspForm.value.timezone || !this.bspForm.value.shortName || !this.bspForm.value.wifiNetworkName || !this.bspForm.value.defaultPrimaryColor || !this.bspForm.value.defaultSecondaryColor || !this.bspForm.value.defaultTerms) {
      return
    }
    if (this.bspForm.value.defaultTerms) {
      this.urlValidation(this.bspForm.value.defaultTerms);
    }
    if (this.bspForm.value.defaultTerms) {
      if (this.UrLError) {
        return
      }
    }
    if (this.bspForm.value.shortName) {
      this.checkMaxMin(this.bspForm.value.shortName, 'bsp');
      this.checkMaxMin(this.bspForm.value.wifiNetworkName, 'wifi');
      this.clsAlphaNoOnly(this.bspForm.value.shortName, 'bsp');
    }
    if (this.bspForm.value.friendlyName) {
      this.checkMaxMin(this.bspForm.value.friendlyName, 'friendlyName')
      if (this.minimumErr.friendlyName) {
        return
      }
    }
    if (this.minimumErr.bsp || this.minimumErr.wifi || this.communityError.bsp) {
      return
    }
    this.dialogService.open(this.verifyBSPModal, { windowClass: 'custom-alert-info' });
  }
  BSPresetErrorModal() {
    this.dialogService.open(this.bspResetErrorModal, { windowClass: 'custom-alert-error' });
  }
  BSPInfoWarnModal() {
    this.iserror = false
    this.dialogService.open(this.bspInfoWarnModal, { windowClass: 'custom-alert-warn' });
  }
}
