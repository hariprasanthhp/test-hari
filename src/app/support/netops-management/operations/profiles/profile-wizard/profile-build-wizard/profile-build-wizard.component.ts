import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { CategoryConfigurationService } from '../../../services/category-config.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-profile-build-wizard',
  templateUrl: './profile-build-wizard.component.html',
  styleUrls: ['./profile-build-wizard.component.scss']
})
export class ProfileBuildWizardComponent implements OnInit, OnDestroy {
  language: any;
  languageSubject;
  addNewCategory: boolean = false;
  isFoundation: boolean = false;
  _buildProfileObj: any = {}
  categoryConfigurationSubject;
  categoryConfigData: any;
  groupOfCategory: [];
  selectedCategoryType: any;
  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false,
    scrollX: true,
    paging: false,
    info: false,
    ordering: false
  };
  categoryListData: any = [];
  selectedCategory: any = 'DHCP Server';
  exisitingCategory: any = [];
  nonRemovableCategory: any = ['DNS Host Mapping', 'Set Parameter Value', 'QoS Rule', 'Wi-Fi SSID', 'Wi-Fi SSID For EXOS'];
  readonly NEW_CATEGORY_BUTTON_DISABLE = ['Bandwidth', 'DHCP Option82', 'Video - Multicast Range Filters', 'Video - Multicast VLAN Registration (MVR)'];
  groupOfcocCategory: never[];
  dev: boolean;
  enableMyCommunity: boolean;
  isCsc: boolean;

  @Input()
  set buildProfileObj(value: any) {
    this._buildProfileObj = value;
  }
  get buildProfileObj() {
    return this._buildProfileObj;
  }
  @Output() CerrorMsg = new EventEmitter<boolean>();
  constructor(private translateService: TranslateService, public router: Router, private categoryConfigService: CategoryConfigurationService, private sso: SsoAuthService, private dialogService: NgbModal,) { }

  ngOnInit(): void {
    let base = `${environment.API_BASE}`;

    if (base.indexOf('/dev.api.calix.ai') > -1) {
      this.dev = true;
    }
    let entitlement = this.sso.getEntitlements();
    if (entitlement && (entitlement['214']?.apptype === 214 || entitlement['222']?.apptype === 222||entitlement['223']?.apptype === 223)) {
      this.enableMyCommunity = true;
    } else {
      this.enableMyCommunity = false;
    }

    this.getCategoryObj();
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    // console.log('48', this.buildProfileObj);
    this.buildProfileObj.isStepperClicked = false;
    if (this.router.url.includes('cco-foundation')) {
      // console.log('50');
      this.isFoundation = true;
    } else {
      this.isFoundation = false;
    }
    if (this.router.url.includes('support')) {
      this.isCsc = true
    } else {
      this.isCsc = false
    }
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    this.categoryConfigurationSubject.unsubscribe();
    this.buildProfileObj.addNewCategory = false;
  }
  openaclModal(modal) { this.dialogService.open(modal, { size: 'lg', centered: true, windowClass: 'acl-custom-modal' }); }
  aclModal(aclModal: any, arg1: { size: string; centered: true; windowClass: string; }) {
    throw new Error('Method not implemented.');
  }

  onaddCategClicked() {
    if (this.buildProfileObj?.exisitingCategory?.length > 0) {
      this.selectedCategory = this.categoryConfigData['IP Addressing'].filter(category => {
        return (this.buildProfileObj.exisitingCategory.indexOf(category.displayName) === -1 || this.nonRemovableCategory.indexOf(category.displayName) !== -1);
      })[0].displayName;
      this.categoryChange();
    }
    this.buildProfileObj.addNewCategory = !this.buildProfileObj.addNewCategory;
  }

  categoryChange() {
    this.selectedCategoryType = undefined;
    for (let key of Object.keys(this.categoryConfigData)) {
      if (!this.selectedCategoryType) {
        this.selectedCategoryType = this.categoryConfigData[key].filter(category => {
          return (category.displayName === this.selectedCategory);
        })[0];
      }
    }
    this.buildProfileObj.categoryType = this.selectedCategory;
  }

  filterCategory(categoryname): boolean {
    return (this.buildProfileObj.exisitingCategory.indexOf(categoryname) === -1 || this.nonRemovableCategory.indexOf(categoryname) !== -1);
  }

  deleteCategory(deleteIndex, categoryName) {
    this.buildProfileObj?.categoryList?.splice(deleteIndex, 1);
    this.buildProfileObj.reviewPageCategoryList?.splice(deleteIndex, 1);
    if (categoryName === "TimezonePosix") {
      categoryName = "Time Zone - POSIX";
    }
    if (categoryName === "WiFi Unified Primary SSID for EXOS") {
      categoryName = "Wi-Fi Unified Primary SSID For EXOS";
    }



    this.buildProfileObj.exisitingCategory?.splice(this.buildProfileObj.exisitingCategory?.indexOf(categoryName), 1);
    if (this.buildProfileObj?.exisitingCategory?.length > 0) {
      this.buildProfileObj?.exisitingCategory?.forEach(category => {
        if (!this.buildProfileObj.disableAddCategoryBtn) {
          this.buildProfileObj.disableAddCategoryBtn = this.NEW_CATEGORY_BUTTON_DISABLE?.indexOf(category) === -1;
        }
      })
    } else {
      this.buildProfileObj.disableAddCategoryBtn = true;
    }

    if (this.buildProfileObj?.categoryList?.length === 0) {
      this.selectedCategory = 'DHCP Server';
      this.buildProfileObj.exisitingCategory = [];
      this.buildProfileObj.disableAddCategoryBtn = true;
      this.categoryChange()
    }
  }

  getCategoryObj() {
    this.categoryConfigurationSubject = this.categoryConfigService.categoryConfigData().subscribe((data: any) => {

      if (
        !(this.sso.getEntitlementsArr().indexOf('205') > -1) &&
        !(this.sso.getEntitlementsArr().indexOf('203') > -1) &&
        !(this.sso.getEntitlementsArr().indexOf('204') > -1)
      ) {
        data = data.filter(Obj => Obj.group !== "PIQ/EIQ Settings");
      } else {
        if (
          !(this.sso.getEntitlementsArr().indexOf('203') > -1) &&
          !(this.sso.getEntitlementsArr().indexOf('205') > -1) &&
          this.sso.getEntitlementsArr().indexOf('204') > -1
        ) {
          data = data.filter(Obj => Obj.name !== "ProtectIQ Security Settings");

        } else if (
          !(this.sso.getEntitlementsArr().indexOf('204') > -1) &&
          !(this.sso.getEntitlementsArr().indexOf('205') > -1) &&
          this.sso.getEntitlementsArr().indexOf('203') > -1
        ) {
          data = data.filter(Obj => Obj.name !== "ExperienceIQ Restrictions");
        } else {
          data = data;
        }
      }

      //console.log('the dataa',data)//for testing purpose..


      this.categoryListData = data;
      this.groupOfCategory = _.uniq(_.map(data, 'group')).sort();
      this.groupOfcocCategory = this.groupOfCategory.filter((obj: any) => { return obj !== 'Hotspot' && obj !== undefined });
      this.categoryConfigData = _.mapValues(_.groupBy(data, 'group'),
        groupList => groupList.map(group => _.omit(group, 'group')));

      delete this.categoryConfigData["undefined"]
      this.buildProfileObj.categoryConfigData = this.categoryConfigData;
      this.selectedCategoryType = this.categoryConfigData['IP Addressing'].filter(category => {
        return (category.displayName === this.selectedCategory);
      })[0];
    });
  }
  errorMsgFun() {
    this.CerrorMsg.emit(undefined);
  }
  emitError(error: any) {
    this.CerrorMsg.emit(error);
  }
}
