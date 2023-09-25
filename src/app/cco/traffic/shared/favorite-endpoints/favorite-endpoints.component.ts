import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { FavoritePageType, FavoritesApiService, FilterPresets, FilterPresetsCreate, SettingJson } from '../favorites-api.service';
import { Subject, Subscription } from 'rxjs';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { maskString } from 'src/app/cco/shared/functions/cco-mask';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-favorite-endpoints',
  templateUrl: './favorite-endpoints.component.html',
  styleUrls: ['./favorite-endpoints.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteEndpointsComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('modaleEndpointFavorites') modaleEndpointFavorites: TemplateRef<any>;

  @Input() pageType: FavoritePageType;
  @Input() endPointId: string;
  @Input() endPointName: string;
  @Input() showSensitiveInfo: boolean;

  FavoritePageType = FavoritePageType;

  deletableEndPoint: FilterPresets;
  isDeleteSelected = false;
  favoriteEndPoints: FilterPresets[] = [];
  dtOptions: DataTables.Settings = {
    paging: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: false,
    processing: false,
    searching: false,
    dom: 'tipr',
    retrieve: true,
    ordering: true,
    initComplete: () => {
      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
    columnDefs: [
      { targets: [1], orderable: false }],
  };
  dtTrigger: Subject<any> = new Subject();
  language: any;
  subscriptions: Subscription[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';

  private messageTimeout: NodeJS.Timeout;
  private settingType = 'Traffic_Realtime_Endpoint';

  constructor(
    private cdRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private favoritesApiService: FavoritesApiService,
    private commonService: CommonService,
    private dialogService: NgbModal,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.showSensitiveInfo?.currentValue != changes.showSensitiveInfo?.previousValue && !changes.showSensitiveInfo?.firstChange) {
      this.viewAllEndPoints();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions();
    });
    this.viewAllEndPoints();
    this.tableLanguageOptions();
  }

  get isEndPointPage(): boolean {
    if (this.endPointId && this.endPointName) {
      return true;
    }
    return false;
  }

  get selectedEndPoint(): FilterPresets {
    return this.favoriteEndPoints.find(f => f.settingJsonTyped.endPointId == this.endPointId);
  }

  private viewAllEndPoints() {
    this.favoriteEndPoints = [];
    this.subscriptions.push(this.favoritesApiService.getAllFavorites(this.settingType).subscribe(result => {
      result.sort((a, b) => a.settingName.localeCompare(b.settingName));
      result.forEach(r => {
        r.settingJsonTyped = JSON.parse(r.settingJson);
      });
      this.favoriteEndPoints = result;
      this.processMaskNames();
      this.cdRef.markForCheck();
    },
      (err: HttpErrorResponse) => this.showMessage(this.commonService.pageErrorHandle(err), false)
    ));
  }

  saveEndPoint() {
    const settingJson: SettingJson = { endPointId: this.endPointId, endPointName: this.endPointName };
    const favEndPoint: FilterPresetsCreate = {
      settingType: this.settingType,
      settingName: this.endPointName,
      settingJson: JSON.stringify(settingJson),
    };
    this.subscriptions.push(this.favoritesApiService.saveFavorite(favEndPoint).subscribe(result => {
      result.settingJsonTyped = JSON.parse(result.settingJson);
      this.favoriteEndPoints.unshift(result);
      this.processMaskNames();
      this.cdRef.markForCheck();
    },
      (err: HttpErrorResponse) => this.showMessage(this.commonService.pageErrorHandle(err), false)
    ));
  }

  cancelDelete() {
    this.isDeleteSelected = false;
  }

  deleteEndPoint(item: FilterPresets) {
    this.closeAlert();
    this.isDeleteSelected = true;
    this.deletableEndPoint = item;
  }

  confirmDelete(id: string) {
    this.subscriptions.push(this.favoritesApiService.deleteFavorite(id).subscribe(() => {
      this.favoriteEndPoints = this.favoriteEndPoints.filter(f => f.id != id);
      this.showMessage("Deleted Successfully", true);
      this.dialogService.dismissAll();
      this.isDeleteSelected = false;
      if (this.pageType == FavoritePageType.Traffic) {
        this.modalManageEndpoint();
      }
      this.cdRef.markForCheck();
    },
      (err: HttpErrorResponse) => this.showMessage(this.commonService.pageErrorHandle(err), false)
    ));

  }

  onSelectEndPoint(item: FilterPresets) {
    window.sessionStorage.setItem('endpointName', item.settingJsonTyped.endPointName);
    let url = window.location.pathname.indexOf('/organization-admin/') > -1 ? '/organization-admin/flowAnalyze/traffic/endpoint/realtime' : window.location.pathname.indexOf('/cco/traffic/') > -1 ? '/cco/traffic/endpoints/realtime' : '/systemAdministration/flowAnalyze/traffic/endpoint/realtime';
    this.router.navigate([url], { queryParams: { id: item.settingJsonTyped.endPointId } });
  }

  modalManageEndpoint() {
    this.isDeleteSelected = false;
    this.loading = true;
    const modelRef = this.dialogService.open(this.modaleEndpointFavorites,
      { size: 'md', centered: true, windowClass: 'custom-modal' });
    modelRef.result.then(() => {
      this.dtOptions.order = [0];
    });
    this.reRender();
  }

  processMaskNames() {
    if (!this.showSensitiveInfo) {
      this.favoriteEndPoints.forEach(f => {
        f.settingName = maskString(f.settingName);
        f.settingJsonTyped.endPointName = maskString(f.settingJsonTyped.endPointName);
      });
    }
  }

  closeAlert() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  private showMessage(message: string, isSuccess: boolean) {
    this.loading = false;
    clearTimeout(this.messageTimeout);
    if (isSuccess) {
      this.successMessage = message;
    } else {
      this.errorMessage = message;
    }
    this.messageTimeout = setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000);
  }

  private reRender(): void {
    this.dtTrigger = new Subject();
    setTimeout(() => {
      this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
      this.dtTrigger.next();
    }, 200);
  }

  private tableLanguageOptions() {
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
}
