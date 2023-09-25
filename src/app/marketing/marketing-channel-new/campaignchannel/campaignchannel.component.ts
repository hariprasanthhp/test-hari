import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-campaignchannel',
  templateUrl: './campaignchannel.component.html',
  styleUrls: ['./campaignchannel.component.scss']
})
export class CampaignchannelComponent implements OnInit {
  @ViewChild('deleteCampaign', { static: true }) private deleteCampaign: TemplateRef<any>;
  @ViewChild('pauseCampaign', { static: true }) private pauseCampaign: TemplateRef<any>;
  @ViewChild('unpauseCampaign', { static: true }) private unpauseCampaign: TemplateRef<any>;
  @ViewChild('resetCampaign', { static: true }) private resetCampaign: TemplateRef<any>;
  language: any;
  languageSubject: any;
  campaignListSubject: any
  campaignListDeleteSubject: any
  dtOptions: DataTables.Settings = {};
  isRerender = false;

  deleteCampaignObject: any;
  campaignDeleted: boolean = false;
  campaignAlertShow: boolean = false;
  campaignAlertMsg: any;
  marketingCampaignSearchTableErrorMsg: boolean = false

  scopes: any;
  searchText: string;
  campaignData: any;

  // dtElement: DataTableDirective;
  showDataTable = false;
  hideDataTable: boolean = true;
  loading = false;
  marketingCampaignTable = []
  finalStatusDataarr 
  finalTypeDataarr 
  campaignType: any
  campaignStatus: any
  FiltermarketingCampaign = []
  marketingCampaignSearchTableError: boolean = true

  search_Text_Value: any
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  campaignListErrorMsg: string;
  campaignListError: boolean = false;
  constructor(
    private dialogService: NgbModal,
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private marketingCampaignsApiService: MarketingCampaignsApiService,
    private marketingCommonService: MarketingCommonService,
    private titleService: Title

  ) {
    this.scopeAsssiner();
  }

  ngOnInit(): void {
    
    this.marketingCampaignTable = [...this.FiltermarketingCampaign]
    this.language = this.translateService.defualtLanguage;
    this.campaignChannelList();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Scheduled Campaigns"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      
      this.search_Text_Value = '';
      this.campaignType = this.language.All;
      this.campaignStatus = this.language.All;
      this.dropDownListValue()
      this.campaignChannelList(true);
    });
    this.titleService.setTitle(`${this.language["Scheduled Campaigns"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    this.dropDownListValue()
    this.campaignType = this.finalTypeDataarr[0].name;
    this.campaignStatus = this.finalStatusDataarr[0].name;
  }
dropDownListValue(){
  this.finalStatusDataarr = [
    { id: 0, name: this.language.All },
    { id: 1, name: this.language.Complete },
    { id: 2, name: this.language.Draft },
    { id: 3, name: this.language['In-Progress']}
  ];
  this.finalTypeDataarr = [
    { id: 0, name: this.language.All },
    { id: 1, name: 'Acquisition' },
    { id: 2, name: 'Retention' },
    { id: 3, name: 'Upload' },
    { id: 4, name: 'Upsell' }
  ];
}
 
  searchName(searchText) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(searchText).draw();
    });
  }
  search_Text_Valuefun(){
   this.search_Text_Value=''
   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.search('').draw();
  });
  }

  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  ngOnDestroy() {
    // this.tableDestroyOnly();
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.campaignListSubject) {
      this.campaignListSubject.unsubscribe();
    }
    if (this.campaignListDeleteSubject) {
      this.campaignListDeleteSubject.unsubscribe();
    }
  }

  campaignChannelList(ref?: any) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      searching: true,
      dom: 'tipr',
      retrieve: true,
         columnDefs: [
        { targets: [-1], orderable: false }
      ],
      initComplete: () => {
        this.handleTableView();
      }
    };
   
    this.tableLanguageOptions();
    this.marketingCampaignSearchTableErrorMsg = false
    this.hideDataTable = true;
    this.showDataTable = false;
    if (this.scopes.campaignRead) {
       let lang = this.language.fileLanguage == 'fr' ? 2 : this.language.fileLanguage == 'es' ? 3 : this.language.fileLanguage == 'de_DE' ? 4 : 1
      this.campaignListSubject = this.marketingCampaignsApiService.CampaignsListGET('Scheduled',lang).subscribe((res: any) => {
        // res = []
        this.campaignListError = false;
        this.loading = true;

        if (Array.isArray(res)) {
          if (res.length > 0) {
            this.marketingCampaignTable = res
            // this.campaignData = res;
            this.FiltermarketingCampaign = res
            if (ref) {
              this.selectCampaignFilter();
              // this.rerender();
              // this.hideDataTable = true;
              this.dtTrigger.next();
              this.isRerender = true;
              // this.showDataTable = true;
              //this.handleTableView();
            } else {
              this.hideDataTable = true;
              setTimeout(() => {
                this.dtTrigger.next();
                this.isRerender = true;
                // this.showDataTable = true;
                // this.handleTableView();
              }, 300);
            }

          } else {
            this.marketingCampaignSearchTableErrorMsg = true
          }
        } else {
          this.marketingCampaignTable = [];
          // this.campaignData = res;
          this.FiltermarketingCampaign = [];
          this.marketingCampaignSearchTableError = false
          this.marketingCampaignSearchTableErrorMsg = true
          if (ref) {
            this.selectCampaignFilter();
            // this.rerender();
            this.hideDataTable = true;
            this.dtTrigger.next();
            this.isRerender = true;
            this.showDataTable = true;
            this.handleTableView();
          } else {
            this.hideDataTable = true;
            setTimeout(() => {
              this.dtTrigger.next();
              this.isRerender = true;
              this.showDataTable = true;
              this.handleTableView();
            }, 300);
          }
          this.marketingCampaignSearchTableErrorMsg = true
        }
      }, (error: any) => {
        this.showDataTable = true;
        this.campaignListError = true;
        this.loading = false;
        this.marketingCampaignSearchTableErrorMsg=true
        this.dtTrigger.next()
        this.marketingCampaignTable=[]
        this.FiltermarketingCampaign=[]
        this.rerender()
        if (error.status == 504 || error.status == 502) {
          this.campaignListErrorMsg = this.language.timeoutErrorError;
          return;
        }
        else if (error.status == 400) {
          if (error.error) {
            return error.error
          } else {
            this.campaignListErrorMsg = this.language.errorOccured;
            return;
          }
        }
        else if (error.status == 401) {
          this.campaignListErrorMsg = this.language['Access Denied'];
        }
        else if (error.status == 500) {
          this.campaignListErrorMsg = this.language.internalServerError;
          return;
        }
        else {
          if (error.error && error.error.errorDesc) {
            this.campaignListErrorMsg = `${error.error.errorDesc}`;
          } else if (error.error && error.error.message) {
            this.campaignListErrorMsg = `${error.error.message}`;
          } else {
            this.campaignListErrorMsg = `${error.message}`;
          }
        }
      })
    }

  }
  handleTableView() {
    setTimeout(() => {
      this.hideDataTable = false;
      this.showDataTable = true;
    }, 600);
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  tableDestroyOnly() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    }
    else if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    }
    else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    }
    // if (this.isRerender) {
    //   this.rerender()
    // }
  }
  deleteListCampaign = '';
  pausecampaign = '';
  unpausecampaign = '';
  resetListCampaign = ''
  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const isClose = document.activeElement.attributes.hasOwnProperty('data-dismiss');
    if (!isClose && event.key === 'Enter' && this.deleteListCampaign == 'delete') {
      this.campaignDelete();
    }
    this.deleteListCampaign = '';
    this.unpausecampaign = '';
    this.pausecampaign = '';
    this.resetListCampaign = ''

  }

  campaignDeletePrompt(data) {
    this.deleteCampaignObject = data;
    this.dialogService.open(this.deleteCampaign, { backdrop: "static", keyboard: false, size: 'lg', centered: true, windowClass: 'default-modal-ui modal-cust-md' });
    this.deleteListCampaign = "delete";
  }




  campaignDelete() {
    if (this.scopes.campaignWrite) {
      this.hideDataTable = true;
      this.showDataTable = false;
      this.campaignListDeleteSubject = this.marketingCampaignsApiService.CampaignDELETE(`${this.deleteCampaignObject.campaignId}`)
        .subscribe((res: any) => {
          this.campaignDeleteConfirm();
        }, (error) => {
          if (error.status == 200) {
            this.campaignDeleteConfirm();
          } else if (error.status == 409) {
            this.campaignDeleted = false;
            this.campaignAlertShow = true;
            this.campaignAlertMsg = `${error.status}  ${error.error.message}`;
          } else {
            this.campaignDeleted = false;
            this.campaignAlertShow = true;
            this.campaignAlertMsg = `${error.status}  ${error.error}`;
          }
          this.handleTableView();
        })

      this.closeModal()
    }
  }
  campaignDeleteConfirm() {
    this.campaignDeleted = true;
    this.campaignAlertShow = true;
    setTimeout(() => {
      this.campaignAlertShow = false;
    }, 5000);
    this.campaignAlertMsg = 'Campaign Deleted Successfully!.' 
    setTimeout(() => {
      this.campaignChannelList(true);
    }, 1000);
   
  }
  closeModal() {
    this.deleteListCampaign = "";
    this.deleteCampaignObject = undefined;
    this.dialogService.dismissAll();
    this.unpausecampaign = '';
    this.pausecampaign = '';
    this.resetListCampaign=''
  }
  errorReset() {
    this.campaignDeleted = false;
    this.campaignAlertShow = false;
    this.campaignAlertMsg = undefined;;
    this.campaignListError = false;
    this.campaignListErrorMsg = '';
  }


  selectCampaign(data) {
    this.marketingRoutingsService.newCampaignPageEdit(data.campaignId)
  }
  selectView(data) {
    this.marketingRoutingsService.newCampaignPageResult(data.campaignId)
  }
  selectCampaignFilter() {
    this.showDataTable = false;
    this.hideDataTable = true;
    if (this.campaignType == this.language.All && this.campaignStatus == this.language.All) {
      this.marketingCampaignTable = this.FiltermarketingCampaign;
    } else if (this.campaignType == this.language.All && this.campaignStatus != this.language.All) {
      this.marketingCampaignTable = this.FiltermarketingCampaign.filter(
        (x) => x.status == this.campaignStatus
      );
    }
    else if (this.campaignType != this.language.All && this.campaignStatus == this.language.All) {
      this.marketingCampaignTable = this.FiltermarketingCampaign.filter(
        (x) => x.segmentType  == this.campaignType
          
         
      );
    }
    else {
      this.marketingCampaignTable = this.FiltermarketingCampaign.filter(
        (x) =>
             x.segmentType  == this.campaignType  && x.status == this.campaignStatus
        
      );
    }
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      // this.handleTableView();
      if (this.search_Text_Value) {
        this.searchName(this.search_Text_Value);
      }
    });
  }


  newCampaign() {
    sessionStorage.removeItem('triggered')
    sessionStorage.removeItem('StatusAct')
    this.marketingRoutingsService.newCampaignPage();
  }
  channels() {
    this.marketingRoutingsService.channelsPage();
  }

  getTimestamp(date) {
    return new Date(date).getTime()
  }
 
}


