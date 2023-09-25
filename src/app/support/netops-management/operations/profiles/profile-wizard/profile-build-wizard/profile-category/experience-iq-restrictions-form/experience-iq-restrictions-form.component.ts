import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { TranslateService } from 'src/app-services/translate.service';
import { ExperianceIQService } from 'src/app/support/support-application/shared/service/experiance-iq.service';
import { CategoriesModel } from 'src/app/support/support-application/shared/models/categories.model';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from '../../../../../../../data.service';
import { Apps } from '../../../../../../../support-application/shared/models/search-app.model';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'experience-iq-restrictions-form',
  templateUrl: './experience-iq-restrictions-form.component.html',
  styleUrls: ['./experience-iq-restrictions-form.component.scss']
})
export class ExperienceIqRestrictionsFormComponent implements OnInit {

  @Output() errorOutput = new EventEmitter<any>();

  loading = true;
  searchFailed: boolean;
  searching: boolean;
  modalLoader: boolean;
  showSuccess: boolean;
  showError: boolean;
  isError: boolean;

  errorMsg: any;
  warningMessage: any;
  scopeFlag: any = {};
  gloObj: any = {
    isValidWebsite: true
  };

  selectedAppIndex = null;
  selectedWebIndex = null;

  language;
  languageSubject;
  form: FormGroup;
  categoriesList = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private parent: FormGroupDirective,
    private translateService: TranslateService,
    private ssoService: SsoAuthService,
    private experianceIQService: ExperianceIQService,
    private dataService: DataServiceService,
  ) {
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    this.intiForm();
    this.loadData();
  }

  intiForm() {
    this.form = this.parent.form;
  }

  get categoriesFormArray(): FormArray {
    return this.form.get('experienceIqForm').get('categoryList') as FormArray;
  }

  get website(): FormControl {
    return this.form.get('experienceIqForm').get('website') as FormControl;
  }

  get webListFormArray(): FormArray {
    return this.form.get('experienceIqForm').get('webList') as FormArray;
  }

  loadData() {
    this.experianceIQService.getParentControlCategories().subscribe((response: any) => {
      this.categoriesList = response.categories;
      this.categoriesList.forEach(category => {
        this.addNewCategory(category);
      });
      this.form.get('experienceIqForm').patchValue({
        categoryGroup: "CU"
      });
      this.loading = false;
    }, error => {
      this.loading = false;
      this.pageErrorHandle(error);
    });
  }

  addNewCategory(category) {
    const categoryFormGroup = this.formBuilder.group({
      id: category.cid,
      name: category.name,
      block: false,
    });
    this.categoriesFormArray.push(categoryFormGroup);
  }

  setDeleteWebApp(path, id, mainResDel = true) {
    this.gloObj.deleteRestrictionPath = path;
    this.gloObj.delResId = id;
    this.gloObj.mainResDel = mainResDel;
  }

  addWebsite() {
    this.gloObj.isValidWebsite = this.ssoService.validateUrl(this.form.get('experienceIqForm').value.website) || this.ssoService.matchDomainAlone(this.form.get('experienceIqForm').value.website);
    this.gloObj.urlExist = !!(this.webListFormArray.value || []).find(obj => obj.webUrl === this.form.get('experienceIqForm').value.website);
    if (!this.gloObj.isValidWebsite || this.gloObj.urlExist) {
      return;
    }

    const webFormGroup = this.formBuilder.group({
      webUrl: this.website.value,
      block: false
    });
    this.webListFormArray.push(webFormGroup);
    this.website.patchValue('');
  }

  deleteWebsite() {
    this.webListFormArray.removeAt(this.selectedWebIndex);
  }

  /**************/
  /* Enable if Custom App List is required */

  // get app(): FormControl {
  //   return this.form.get('experienceIqForm').get('app') as FormControl;
  // }

  // get appListFormArray(): FormArray {
  //   return this.form.get('experienceIqForm').get('appList') as FormArray;
  // }

  // addApp(selectedApp) {
  //   this.gloObj.restAppExist = (this.appListFormArray?.value || []).filter(obj => obj.id == selectedApp.item.id).length;
  //   if (this.gloObj.restAppExist) {
  //     return
  //   };

  //   const appFormGroup = this.formBuilder.group({
  //     id: selectedApp.item.id,
  //     iconUrl: selectedApp.item.iconUrl,
  //     name: selectedApp.item.name,
  //     block: selectedApp.item.blocked,
  //   });
  //   this.appListFormArray.push(appFormGroup);
  //   this.app.patchValue('');
  // }

  // deleteApp() {
  //   this.appListFormArray.removeAt(this.selectedAppIndex);
  // }

  // appformatter = (result: Apps) => (result.name && this.app.value) || "";
  // searchAppMain = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     switchMap((term: string) => term.length < 2 ? of([]) :
  //       this.experianceIQService.searchAppMain(term, this.userId).pipe(
  //         tap(() => {
  //           this.showSuccess = false;
  //           this.showError = false;
  //           this.searchFailed = false;
  //           this.isError = false;
  //         }),
  //         catchError((error) => {
  //           this.errorMsg = error.error.errorDesc;
  //           this.showError = true;
  //           this.searchFailed = true;
  //           this.pageErrorHandle(error);
  //           return of([]);
  //         })
  //       )
  //     ),
  //     tap(() => this.searching = false)
  //   )

  // typeaheadbasickeyup($event) {
  //   this.gloObj.restAppExist = false;
  //   if (this.app.value === '') {
  //     this.isError = false;
  //   }
  // }

  /**************/
  /* Enable if Custom App List is required */

  openDeleteModal(content: any, type: string, index: number) {
    this.selectedAppIndex = null;
    this.selectedWebIndex = null;
    const ngbOptions = { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: 'custom-sm-modal' };
    if (type === 'web') {
      this.selectedWebIndex = index;
    } else {
      this.selectedAppIndex = index;
    }
    this.modalService.open(content, ngbOptions).result.then();
  }

  pageErrorHandle(err, disableDefault = false) {
    disableDefault ? (this.isError = false) : (this.isError = true);
    if (err.status === 401) {
      this.errorMsg = this.warningMessage = this.language['Access Denied'];
    } else if (err.status === 404) {
      this.errorMsg = this.warningMessage = 'Resource Not Found';
    } else {
      this.errorMsg = this.warningMessage = this.ssoService.pageErrorHandle(err);
    }
    this.errorOutput.emit(this.errorMsg);
  }

  closeModal(err = '') {
    this.modalLoader = false;
    this.modalService.dismissAll();
  }
}
