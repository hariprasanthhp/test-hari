import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { RegionApiService } from '../../services/region-api.service';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-cco-admin-configurations',
  templateUrl: './cco-admin-configurations.component.html',
  styleUrls: ['./cco-admin-configurations.component.scss']
})
export class CcoAdminConfigurationsComponent implements OnInit {
  regionSub: any;
  regionGroup: any;
  @ViewChild('addRegionModal', { static: true }) private addRegionModal: TemplateRef<any>;
  popupType = 1;
  popupTitle = '';
  selectedRegion: any;
  regionList = [];
  submitted = false;
  @ViewChild('addLocationModal', { static: true }) private addLocationModal: TemplateRef<any>;
  locationSub: any;
  locationGroup: any;
  locationPopupTitle = '';
  locationPopupType = 1;
  selectedLocation: any;
  loader = false;
  showError = false;
  errorMessage = '';
  language: any;
  languageSubject;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  warningMessage = '';
  isError = false;
  tableCounts;
  totalCount = 0;
  networkGroups = [];
  noNetworkGroup = false;
  redirectToFirst = false;
  searchText: string = "";
  showResult = false;
  filteredCount = 0;
  filterAndSearchFlag = false;
  hasScopeAccess: boolean;
  hasWriteAccess: boolean;
  sortBy = undefined;
  sortType = undefined;
  constructor(public regionService: RegionApiService,
    private formBuilder: FormBuilder,
    private dialogService: NgbModal,
    private translateService: TranslateService,
    private http: HttpClient,
    private titleService: Title,
    private router: Router,
    private sso: SsoAuthService,
    private commonOrgService: CommonService,

  ) {
    this.commonOrgService.currentPageAdder('cco-admin');
    let url = this.router.url;
    let MODULE = this.sso.getRedirectModule(url);
  }

  ngOnInit(): void {
    let scopes = this.sso.getScopes();
    if (scopes?.['cloud.rbac.coc.operations.systemonboarding.regionsettings']?.length) {
      this.hasScopeAccess = true;
    }
    if (scopes?.['cloud.rbac.coc.operations.systemonboarding.regionsettings']?.indexOf('write') !== -1) {
      this.hasWriteAccess = true;
    }

    if (!this.hasScopeAccess) {
      this.sso.setPageAccess(false);
      return;
    } else {
      this.sso.setPageAccess(true);
    }

    let url = this.router.url;
    let MODULE = this.sso.getRedirectModule(url);
    this.getRegionListCount();
    this.loadRegionData();
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.reloadCurrentRoute();
      //this.newRedraw();
      this.titleService.setTitle(`${this.language['region']} ${this.language['settings']} - ${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
      //this.titleService.setTitle(`${this.language['Regions']} - ${this.language['Operations Cloud']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    });
    //this.titleService.setTitle(`${this.language['Regions']} - ${this.language['Operations Cloud']} - ${MODULE === 'systemAdministration' ? this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
    this.titleService.setTitle(`${this.language['region']} ${this.language['settings']} - ${this.language['System Onboarding']} - ${this.language['Operations']}  - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    this.regionGroup = this.formBuilder.group({
      regionName: [null, [Validators.required]],
      locationName: [null]
    });
    this.locationGroup = this.formBuilder.group({
      locationName: [null, [Validators.required]]
    });
  }

  get regionForm() { return this.regionGroup.controls; }

  get locationForm() { return this.locationGroup.controls; }

  getRegionListCount() {
    this.regionService.regionListCount().subscribe((res: any) => {
      this.totalCount = res.count;
      this.filteredCount = res.count;
      this.newRedraw();
    }, (err: HttpErrorResponse) => {
    });
  }

  refreshCurrentPage() {
    this.searchText = "";
    this.showResult = false;
    this.filteredCount = 0;
    this.regionService.regionListCount().subscribe((res: any) => {
      this.totalCount = res.count;
      this.reload();
    }, (err: HttpErrorResponse) => {
    });
  }


  submit() {
    if (this.regionGroup.value.regionName) {
      var name = this.regionGroup.value.regionName.trim();
      this.regionGroup.patchValue({ regionName: name });
    }
    this.submitted = true;
    if (this.popupType === 1) {
      if (this.regionGroup.value.locationName) {
        var name = this.regionGroup.value.locationName.trim();
        if (name.length !== 0) {
          this.networkGroups.push(name);
          this.regionGroup.patchValue({ locationName: null });
        }
      }
      if (this.networkGroups.length === 0) {
        this.noNetworkGroup = true;
        return;
      } else {
        this.noNetworkGroup = false;
      }
    }
    if (this.regionGroup.valid) {
      if (this.popupType === 1) {
        this.addRegion();
      } else if (this.popupType === 2) {
        this.editRegion();
      }
    }
  }

  locationSubmit() {
    if (this.locationGroup.value.locationName) {
      var name = this.locationGroup.value.locationName.trim();
      this.locationGroup.patchValue({ locationName: name });
    }
    this.submitted = true;
    if (this.locationGroup.valid) {
      if (this.locationPopupType === 1) {
        this.addLocation();
      } else if (this.locationPopupType === 2) {
        this.editLocation();
      }
    }
  }

  addRegion() {
    let params = {
      name: this.regionGroup.value.regionName,
      networkGroups: this.networkGroups
    };
    this.loader = true;
    this.regionSub = this.regionService.regionAdd(params).subscribe((res: any) => {
      this.closeModal();
      this.refreshCurrentPage();
      setTimeout(() => {
        this.loader = false;
      }, 1000);
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.networkGroups = [];
      this.showPopupError(err);
    });
  }

  editRegion() {
    let params = {
      name: this.regionGroup.value.regionName,
      networkGroups: this.selectedRegion.locations
    };
    this.loader = true;
    this.regionService.regionUpdate(params.name, this.selectedRegion.id).subscribe((res: any) => {
      this.closeModal();
      this.refreshCurrentPage();
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.showPopupError(err);
    });
  }

  deleteRegion() {
    this.loader = true;
    this.regionSub = this.regionService.regionDelete(this.selectedRegion.id).subscribe((res: any) => {
      this.closeModal();
      this.refreshCurrentPage();
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.showPopupError(err);
    });
  }

  addLocation() {
    let params = {
      name: this.locationGroup.value.locationName
    };
    this.loader = true;
    this.regionSub = this.regionService.locationAdd(params.name, this.selectedRegion.id).subscribe((res: any) => {
      this.closeModal();
      this.refreshCurrentPage();
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.showPopupError(err);
    });
  }

  editLocation() {
    let params = {
      name: this.locationGroup.value.locationName
    };
    this.loader = true;
    this.regionSub = this.regionService.locationUpdate(params.name, this.selectedRegion.id, this.selectedLocation.id).subscribe((res: any) => {
      this.closeModal();
      this.refreshCurrentPage();
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      this.loader = false;
      this.showPopupError(err);
    });
  }

  deleteLocation() {
    this.loader = true;
    this.regionSub = this.regionService.locationDelete(this.selectedRegion.id, this.selectedLocation.id).subscribe((res: any) => {
      this.closeModal();
      this.refreshCurrentPage();
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      this.showPopupError(err);
      this.loader = false;
    });
  }

  showModal(type) {
    this.errorMessage = '';
    this.showError = false;
    this.submitted = false;
    switch (type) {
      case 1:
        this.networkGroups = [];
        this.noNetworkGroup = false;
        this.popupType = 1;
        this.popupTitle = 'AddRegion';
        this.regionGroup.setValue({
          regionName: null,
          locationName: null
        });
        this.dialogService.open(this.addRegionModal, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
        break;
      case 2:
        this.networkGroups = [];
        this.popupType = 2;
        this.popupTitle = 'EditRegion';
        this.regionGroup.setValue({
          regionName: this.selectedRegion.name,
          locationName: null
        });
        this.dialogService.open(this.addRegionModal, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
        break;
      case 3:
        this.popupType = 3;
        this.popupTitle = 'DeleteRegion';
        this.dialogService.open(this.addRegionModal, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
        break;
      case 4:
        this.locationPopupType = 1;
        this.locationPopupTitle = 'AddLocation';
        this.locationGroup.setValue({
          locationName: null
        });
        this.dialogService.open(this.addLocationModal, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
        break;
      case 5:
        this.locationPopupType = 2;
        this.locationPopupTitle = 'EditLocation';
        this.locationGroup.setValue({
          locationName: this.selectedLocation.name
        });
        this.dialogService.open(this.addLocationModal, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
        break;
      case 6:
        this.locationPopupType = 3;
        this.locationPopupTitle = 'DeleteLocation';
        this.dialogService.open(this.addLocationModal, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
        break;
    }
  }

  closeModal() {
    this.errorMessage = '';
    this.submitted = false;
    this.dialogService.dismissAll();
  }

  closeAlert() {
    this.errorMessage = '';
    this.showError = false;
  }

  showPopupError(err: HttpErrorResponse) {
    if (err.error) {
      if (err.status == 401) {
        this.warningMessage = this.language['Access Denied'];
        this.errorMessage = this.language['Access Denied'];
      } else if (err.status == 500) {
        if (err?.error.message) {
          this.warningMessage = err.error.message;
          this.errorMessage = err.error.message;
        } else {
          this.warningMessage = this.language['internalServerError'];
          this.errorMessage = this.language['internalServerError'];
        }

      } else {
        this.warningMessage = this.language['Something went wrong'];
        this.errorMessage = err.error.message ? err.error.message : JSON.parse(err.error)?.message;
      }
      this.showError = true;
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    this.loader = false;
    if (err.status == 401) {
      this.warningMessage = this.language['Access Denied'];
    } else {
      this.warningMessage = this.language['Something went wrong'];
    }
    this.isError = true;
    $("body").scrollTop(0);
  }

  newRedraw() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  loadRegionData() {
    // this.loader = true;
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      ordering: true,
      dom: "tip",
      responsive: true,
      order:[],
      columnDefs: [
        { targets: [0], orderable: true },
        { targets: [1,2], orderable: false },
      ],
      ajax: (dataTablesParameters: any, callback) => {
        let pageNo = null;
        if (dataTablesParameters.start == 0) {
          pageNo = 0;
        } else {
          pageNo = dataTablesParameters.start / dataTablesParameters.length;
        }
        const params = new HttpParams()
        this.sortBy = dataTablesParameters.order && dataTablesParameters.order.length > 0 ? dataTablesParameters.order[0]?.column : undefined;
        this.sortType = dataTablesParameters.order && dataTablesParameters.order.length > 0 ? dataTablesParameters.order[0]?.dir : undefined;
        let orderBy = parseInt(this.sortBy) == 0 ? 'region':undefined;
        let sortingParams='';
        if (orderBy!=undefined) {
          sortingParams += `&sortBy=${orderBy}&sortOrder=${this.sortType}`;
        }
        that.http.get(environment.API_BASE + '/v1/nfa/regions/details?'+`${sortingParams}`+'&offset='+ pageNo * 10 + '&name=' + this.searchText + '&limit=' + 10).subscribe((resp: any) => {
          this.regionList = resp.regions;
          for (let i = 0; i < this.regionList.length; i++) {
            if (this.regionList[i].fqn) {
              if (this.regionList[i].fqn.startsWith('MS=CNAP')) {
                this.regionList[i].hasEdit = true;
              } else {
                this.regionList[i].hasEdit = false;
              }
            } else {
              this.regionList[i].hasEdit = false;
            }
          }
          if (resp.regions.length === 0 && dataTablesParameters.start !== 0) {
            this.newRedraw();
          }
          callback({
            recordsTotal: this.totalCount,
            recordsFiltered: this.totalCount,
            data: []
          });
        }, err => {
          this.isError = true;
          this.showPopupError(err);
        }), error => {
        }
      },
      drawCallback: (settings) => {
        this.tableLanguageOptions();
        let total = this.totalCount; // for server side rendering
        let length = settings._iDisplayLength;
        if (total <= length) {
          $(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
        } else {
          //$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
        }
      }
    };
  }

  addNetworkGroup() {
    if (this.regionGroup.value.locationName) {
      var name = this.regionGroup.value.locationName.trim();
      if (name.length === 0) {
        return;
      } else {
        this.networkGroups.push(name);
        this.regionGroup.patchValue({ locationName: null });
      }
    } else {
      return;
    }
  }

  removeNetworkGroup(index) {
    this.networkGroups.splice(index, 1);
  }

  reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload(null, false);
    });
  }

  checkLocation() {
    if (this.regionGroup.value.locationName) {
      var name = this.regionGroup.value.locationName.trim();
      this.regionGroup.patchValue({ locationName: name });
    }
  }

  search(text: string) {
    this.searchText = text ? text : '';
    if (this.searchText.length === 0) {
      this.showResult = false;
      this.getRegionListCount();
      /* CCL-56186  */
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.search(this.searchText).draw();
      });
      this.filterAndSearchFlag = false;
    } else {
      this.getFilteredListCount();
      this.showResult = true;
      this.filterAndSearchFlag = true;
    }
  }

  getFilteredListCount() {
    this.regionService.regionList('nfa/regions/details?offset=' + 0 + '&name=' + this.searchText).subscribe((res: any) => {
      this.totalCount = res.regions.length;
      this.reload();
    }, (err: HttpErrorResponse) => {
    });
  }


  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    } else if (
      this.language.fileLanguage == 'en' &&
      this.dtOptions.language
    ) {
      delete this.dtOptions.language;
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
