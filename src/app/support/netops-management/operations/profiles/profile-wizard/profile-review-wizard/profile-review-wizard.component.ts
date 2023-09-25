import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import * as _ from 'lodash';
import * as $ from 'jquery';



@Component({
  selector: 'app-profile-review-wizard',
  templateUrl: './profile-review-wizard.component.html',
  styleUrls: ['./profile-review-wizard.component.scss']
})
export class ProfileReviewWizardComponent implements OnInit {
  language: any;
  languageSubject;

  tableOptions: DataTables.Settings = {
    searching: false,
    lengthChange: false
  };
  readonly radiolblValue = ['Enabled', 'Disabled']
  buildCategoryFormData: any = {};
  _addProfileObj: any = {}
  @Input() isOverViewPage: boolean = true;
  @Input()
  set addProfileObj(value: any) {
    this.buildCategoryFormData = [];
    let allProfileData = (value.buildProfile && value.buildProfile.allProfileData) ? value.buildProfile.allProfileData : [];
    let allProfilesObj = {};
    if (allProfileData) {
      allProfileData?.forEach((element: any) => {
        allProfilesObj[element._id] = element.name;
      });
    }
    value?.buildProfile?.reviewPageCategoryList?.forEach((data: any) => {

      const item = data;
      if (item.parameterValues['version'] === 'dualStack' && item.category !== "Voice Service") {
        delete item.parameterValues['NATEnabled'];
        delete item.parameterValues['X_000631_Dhcp6cForPrefixDelegation'];
      }

      if (typeof item.parameterValues === 'object' && item.parameterValues['VlanTagAction'] === false && item.category !== "Voice Service") {
        delete item.parameterValues['AnyPortAnyServiceEnabled'];
        delete item.parameterValues['X_000631_VlanMux8021p'];
        delete item.parameterValues['X_000631_VlanMuxID'];

      }

      if (typeof item.parameterValues === 'object' && item.parameterValues['VlanTagAction'] === false && item.category == "Voice Service") {

        delete item.parameterValues['X_000631_VlanMuxID'];

      }
      if (typeof item.parameterValues === 'object' && item.parameterValues['QosType'] !== 'Custom' && item.category === 'QOS Rule') {
        delete item.parameterValues['ClassInterface'];
        delete item.parameterValues['DSCPMark'];
        delete item.parameterValues['DestIP'];
        delete item.parameterValues['DestMask'];
        delete item.parameterValues['DestPort'];
        delete item.parameterValues['DestPortRangeMax'];
        delete item.parameterValues['Ethertype'];
        delete item.parameterValues['SourcePort'];
        delete item.parameterValues['SourceIP'];
        delete item.parameterValues['SourceMask'];
        delete item.parameterValues['SourcePortRangeMax'];
      }
      if (typeof item.parameterValues === 'object' && item.parameterValues['QosType'] === 'Custom' && item.category === 'QOS Rule') {
        delete item.parameterValues['DSCPMark'];
        delete item.parameterValues['ClassInterface'];
        delete item.parameterValues['ClassificationEnable'];
      }

      if (typeof item.parameterValues === 'object' && (item.category == "Data Service" || item.category == "Video Service")
        && item.parameterValues["Mode"] == "RG L2 Bridged"
        && item.parameterValues["productFamily"] == "EXOS") {
        if (item.parameterValues["AnyPortAnyServiceEnabled"] == true) {
          delete item.parameterValues['X_000631_OUI_Enable'];
        }

      }
      /* fix the CCL-23699 */
      item.buildCategoryFormData = {};
      for (let category of item.selectedCategory) {

        if ((item.parameterValues[category.name] || item.parameterValues[category.name] === false || item.parameterValues[category.name] === 0) && category.displayName && category.name !== 'AdvancedSettings') {
          const formData: any = {}
          if (category.type !== 'radio' && category.valueEnums && category.valueEnums.length > 0) {
            if (!_.isArray(item.parameterValues[category.name])) {
              const dropdownVal = category.valueEnums.filter(option => {
                return (option.value === item.parameterValues[category.name]);
              })[0];
              formData[category.displayName] = (dropdownVal) ? dropdownVal.displayName : undefined;
            } else {
              let tempVal: any = [];
              item?.parameterValues[category.name]?.forEach(item => {
                tempVal.push(category.valueEnums.filter(option => {
                  return (option.value === item);
                })[0].displayName)
              })
              formData[category.displayName] = (tempVal) ? tempVal.toString() : undefined;
            }
          } else {
            formData[category.displayName] = (item.category !== 'Set Parameter Value' &&
              item.parameterValues[category.name] === true) ? this.getRadioBtnLblValue(category, true) :
              (item.category !== 'Set Parameter Value' && item.parameterValues[category.name] === false) ?
                this.getRadioBtnLblValue(category, false) : item.parameterValues[category.name];
          }
          item.buildCategoryFormData = Object.assign(item.buildCategoryFormData, formData);

          let formValues = {};

          if (item.buildCategoryFormData) {
            for (const key in item.buildCategoryFormData) {
              if (allProfilesObj[item.buildCategoryFormData[key]]) {
                formValues[key] = allProfilesObj[item.buildCategoryFormData[key]];
              } else {
                formValues[key] = item.buildCategoryFormData[key];
              }
            }

            item.buildCategoryFormData = formValues;
          }

        }
      };
    });
    this._addProfileObj = value;
  }
  get addProfileObj() {
    return this._addProfileObj;
  }
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    $(function () {
      let active = true;
      $('#accordinToggle').on('click', (function () {
        if (active) {
          active = false;
          $('#accordinToggle').removeClass('collapsedAll');
          $('.accordion-collaps').addClass('show');
          $('.card-header').removeClass('collapsed');
        } else {
          active = true;
          $('#accordinToggle').addClass('collapsedAll');
          $('.accordion-collaps').removeClass('show');
          $('.card-header').addClass('collapsed');
        }
      }));
    });
  }

  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  getRadioBtnLblValue(category, btnVal): string {
    if (category.valueEnums && category.valueEnums.length > 0) {
      if (category?.displayName === "This hotspot has residential and SmartTown Wi-Fi users") {
        return (btnVal) ? 'Yes' : 'No';
      } else {
        const selectedObj: any = category.valueEnums.filter(item => {
          return (item.value === btnVal);
        });
        if (selectedObj.length > 0 && this.radiolblValue.indexOf(selectedObj[0].displayName) === -1) {
          return selectedObj[0].displayName;
        } else {
          return (btnVal) ? 'ON' : 'OFF';
        }
      }
    } else if (category?.displayName === "This hotspot has residential and SmartTown Wi-Fi users") {
      return (btnVal) ? 'Yes' : 'No';
    } else {
      return (btnVal) ? 'ON' : 'OFF';
    }
  }

  onToggleAccordion(accordionIndex) {
    if (!$('#collapseOne_' + accordionIndex).hasClass('show')) {
      $('.accordion-collaps').removeClass('show');
      $('.card-header').addClass('collapsed');
    }
  }

}
