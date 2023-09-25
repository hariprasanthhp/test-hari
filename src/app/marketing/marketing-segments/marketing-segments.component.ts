import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList, TemplateRef, ElementRef } from '@angular/core';
import { MarketingRoutingsService } from '../shared/services/marketing-routings.service';
import { TranslateService } from 'src/app-services/translate.service';
import { ReplaySubject, Subject } from 'rxjs';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MarketingApiService } from '../shared/services/marketing-api.sevice';
import { MarketingExploreCommonService } from './../marketing-explore-data/basic/shared/services/explore-data-common.service';
import { getRecommendedSegments, getSegmentList } from '../shared/services/qlik-connection.js';
import { MarketingSegmentsApiService } from './shared/marketing-segments-api.service';
import { DataTableDirective } from 'angular-datatables';
import { bool } from 'aws-sdk/clients/signer';
import { environment } from 'src/environments/environment';
import { MarketingCommonService } from '../shared/services/marketing-common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ReportScopeModel } from 'src/app/support/netops-management/shared/model/scopes.model';

@Component({
  selector: 'app-marketing-segments',
  templateUrl: './marketing-segments.component.html',
  styleUrls: ['./marketing-segments.component.scss']
})
export class MarketingSegmentsComponent implements OnInit {
  showDataTable = false;
  noDataRecomended: boolean
  noDataSaved: boolean = true
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('deleteSegment', { static: true }) private deleteSegment: TemplateRef<any>;


  scopes: any;
  savedPostErrorMsg: any
  recommendPostErrorMsg: any
  savedPostError: boolean
  recommendPostError: boolean
  savedSegmentArray: any;
  savedSegmentDataAvailable: boolean = false
  recommendedSegmentArray: any;
  recommendedSegmentDataAvailable: boolean = false
  segmentCheck: boolean = false
  segmentCheck1: boolean = false
  savedSegmentSubject: any;
  recommendedSegmentSubject: any;

  segmentDeleteSubject: any;

  recommended: boolean = true
  segment: boolean = false
  deleteSegmentObject: any;
  segmentDeleted: boolean = false;
  segmentAlertShow: boolean = false;
  segmentAlertMsg: any;

  tooltip_camp: any = []
  language: any;
  languageSubject: any;
  isRerender = false;

  public dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  defaultColDef: { sortable: boolean; };
  order: (string | number)[][];
  sortColName: any;
  sortDirection: any;
  ArrayData: any;
  sortedArray: any;
  savedSegmentErrorMessage: boolean = false;
  finalTypeDataarr
  campaignType: any
  FiltermarketingCampaign = []
  search_Text_Value: any
  constructor(
    private dialogService: NgbModal,
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private marketingSegmentsApiService: MarketingSegmentsApiService,
    private marketingCommonService: MarketingCommonService,
    private titleService: Title,
    private sso: SsoAuthService
  ) {
    this.scopeAsssiner()
  }

  ngOnInit(): void {
    
    this.savedSegmentArray = [...this.FiltermarketingCampaign]
    this.getRecommendedTrigger();
    this.noDataRecomended = true
    this.getSegmentsTrigger();
    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions()
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language["Recommended"]}-${this.language["Saved"]}-${this.language["Segments"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
      this.search_Text_Value = '';
      this.campaignType = this.language['All Types'];
      this.dropDownListValue()
      this.tableLanguageOptions()
    });
    this.titleService.setTitle(`${this.language["Recommended"]}-${this.language["Saved"]}-${this.language["Segments"]}-${this.language["Marketing_Cloud"]}-${this.language["Calix Cloud"]}`);
    this.dropDownListValue()
    this.campaignType = this.finalTypeDataarr[0].name;
  }
  dropDownListValue(){
    this.finalTypeDataarr = [
      { id: 0, name: this.language['All Types'] },
      { id: 1, name: 'Acquisition' },
      { id: 2, name: 'Retention' },
      { id: 3, name: 'Upload' },
      { id: 4, name: 'Upsell' }
    ];
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    }

    else if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    }
    if (this.isRerender) {
      this.tableDestroyOnly();
    }
  }

  scopeAsssiner() {
    this.scopes = this.marketingCommonService.getCMCScopes();
  }
  getRecommendedTrigger() {
    this.noDataRecomended = true
    if (this.scopes.exploredataRead) {
      this.recommendedSegmentSubject = this.marketingSegmentsApiService.recommendedSegmentsListNotGET().subscribe((res: any) => {
        this.recommendPostErrorMsg = ""
        this.recommendPostError = false
        if (Array.isArray(res) && res && res.length > 0) {
          let entitlement = this.sso.getEntitlements();
          if (!entitlement['209']) {
            res = res.filter(segmenttype => {
              if(segmenttype.segmentType == 'Upload'){
                let name = segmenttype.segmentName
                let segmentname = name.substring(name.lastIndexOf("_")+1)
                this.segmentCheck = segmentname == 'Prospects' ? true : false
              }
            return  segmenttype.segmentType != 'Acquisition' && !this.segmentCheck
            }
            );
          }
    
          this.recommendedSegmentArray = res;
          this.recommendedSegmentDataAvailable = true;

        } else {
       
          this.recommendedSegmentArray = []
          this.noDataRecomended = false;
        }
        this.marketingSegmentsApiService.setRecommendedSegmentData(this.recommendedSegmentArray)
      },
        (error: any) => {
          this.recommendedSegmentArray = []
          this.noDataRecomended = false;
          this.marketingSegmentsApiService.setRecommendedSegmentData(this.recommendedSegmentArray);
          this.recommendPostError = true;
          this.savedPostError = false;
          this.savedPostErrorMsg = "";
          if (error.status == 504 || error.status == 502) {
            this.recommendPostErrorMsg = this.language.timeoutErrorError;
            return;
          } else if (error.status == 400) {
            if (error.errorMessage == "OK") {
              this.recommendPostErrorMsg = this.language.Bad_Request;
            }
            else {
              this.recommendPostErrorMsg = this.language.timeoutErrorError;
              console.log(this.recommendPostErrorMsg ,'this.recommendPostErrorMsg ')
            }
            return;
          }
          else if (error.status == 503) {
            this.recommendPostErrorMsg = "Service Temporarily Unavailable";
            return;
          }
          else if (error.status == 500) {

            this.recommendPostErrorMsg = this.language.internalServerError;;


            return;
          }
        });
    }
  }


  selectCampaignFilter(ref?:any) {
 
    if (this.campaignType == this.language['All Types']) {
      this.savedSegmentArray = this.FiltermarketingCampaign;
    } 
    else if (this.campaignType != this.language['All Types']) {
      this.savedSegmentArray = this.FiltermarketingCampaign.filter(
        (x) => x.segmentType  == this.campaignType
      );
    }
    else {
      this.savedSegmentArray = this.FiltermarketingCampaign.filter(
        (x) =>
             x.segmentType  == this.campaignType
      );
    }
    this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      if(ref){
      dtInstance.clear().draw();
      }
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      // this.handleTableView();
      if (this.search_Text_Value) {
        this.searchName(this.search_Text_Value);
      }
    });
  }


  getSegmentsTrigger(ref?:any) {
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
        {targets: [5], orderable: true}
      ],
    };


    if (this.scopes.exploredataRead) {
      this.savedSegmentSubject = this.marketingSegmentsApiService.SavedSegmentsListNotGET().subscribe((res: any) => {
        this.savedPostError = false
        if (Array.isArray(res) && res && res.length > 0) {
          let entitlement = this.sso.getEntitlements();
          if (!entitlement['209']) {
            res = res.filter(segmenttype => {
              if(segmenttype.segmentType == 'Upload'){
                let name = segmenttype.segmentName
                let segmentname = name.substring(name.lastIndexOf("_")+1)
                this.segmentCheck1 = segmentname == 'Prospects' ? true : false
              }
            return  segmenttype.segmentType != 'Acquisition' && !this.segmentCheck1
            }
            );
          }
          if (res.length == 0) {
            this.savedSegmentErrorMessage = true;
          }
          else {
            this.savedSegmentErrorMessage = false;
          }
   
          this.savedSegmentArray =  res    
          this.FiltermarketingCampaign = res
     
          this.savedSegmentDataAvailable = true
          if(ref){
            this.selectCampaignFilter(ref)
          }else{
            this.dtTrigger.next();
            this.isRerender = true;
          }
        } else {
          this.savedSegmentErrorMessage = true;
          this.savedSegmentArray = []
          this.noDataSaved = false;
          this.FiltermarketingCampaign=[]
          this.dtTrigger.next();
          this.isRerender = true;
        }
       
      },
        (error: any) => {
          this.savedPostErrorMsg = this.marketingCommonService.errorHandling(error)
          this.savedSegmentErrorMessage = true;
          this.savedSegmentArray = []
          this.FiltermarketingCampaign=[]
          this.noDataSaved = false;
          this.dtTrigger.next();
          this.isRerender = true;
          this.savedPostError = true;
          this.recommendPostError = false;
          this.recommendPostErrorMsg = "";
          if (error.status == 504 || error.status == 502) {
            this.savedPostErrorMsg = this.language.timeoutErrorError;
            return;
          } else if (error.status == 400) {
            if (error.errorMessage == "OK") {
              this.savedPostErrorMsg = this.language.Bad_Request;
            }
            else {
              this.savedPostErrorMsg = this.language.timeoutErrorError;
            }
            return;
          }
          else if (error.status == 503) {
            this.recommendPostErrorMsg = "Service Temporarily Unavailable";
            return;
          }
          else if (error.status == 500) {
            this.savedPostErrorMsg = this.language.internalServerError;;

            return;
          }
        });
    }
  }


  segmentDeletePrompt(data) {
    this.deleteSegmentObject = data;
    this.dialogService.open(this.deleteSegment, { backdrop: "static", keyboard: false, size: 'lg', centered: true, windowClass: 'custom-modal' });

  }
  segmentDelete() {
    if (this.scopes.exploredataWrite) {
      this.segmentDeleteSubject = this.marketingSegmentsApiService.SavedSegmentsDELETE(this.deleteSegmentObject.segmentId, this.deleteSegmentObject.segmentType,this.deleteSegmentObject.segmentName)
        .subscribe((res) => {
          this.segmentDeleteConfirm();
        }, (error) => {
          if (error.status == 200) {
            this.segmentDeleteConfirm();
          } else {
            this.segmentDeleted = false;
            this.segmentAlertShow = true;
            this.segmentAlertMsg = `${error.error}`;
          }
        })
      this.closeModal()
    }
  }
  segmentDeleteConfirm() {
    this.segmentDeleted = true;
    this.segmentAlertShow = true;
    setTimeout(() => {
      this.segmentAlertShow = false;
    }, 5000);
    this.segmentAlertMsg = this.language.segmentDeleted;
    this.savedSegmentArray = [];
   // this.tableDestroyOnly1();
    this.getSegmentsTrigger(true);
  }
  closeModal() {
    this.dialogService.dismissAll();
    this.deleteSegmentObject = undefined;
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
  errorReset() {
    this.segmentDeleted = false;
    this.segmentAlertShow = false;
    this.segmentAlertMsg = undefined;
  }
  errorResetTab() {
    this.savedPostErrorMsg = "";
    this.savedPostError = false
    this.recommendPostErrorMsg = ""
  }
  tableDestroyOnly1() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    })
  }
  tableDestroyOnly() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }
  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.recommendedSegmentSubject) {
      this.recommendedSegmentSubject.unsubscribe()
    }
    if (this.savedSegmentSubject) {
      this.savedSegmentSubject.unsubscribe()
    }

  }

  tab_recom_seg(tabName) {
    this.recommended = tabName == 'recommended' ? true : false;
    this.segment = tabName == 'segment' ? true : false;
    this.campaignType = this.finalTypeDataarr[0].name;
    this.search_Text_Value = '';
    this.selectCampaignFilter()
  }
  selectCampaign(data) {
    let fromData = data.campaignStatus == this.language.Active ? sessionStorage.setItem('StatusAct','Active'): sessionStorage.removeItem('StatusAct')
    this.marketingRoutingsService.newCampaignPageEdit(data.campaignId)
  }
  // newCampaign() {
  //   this.marketingRoutingsService.exploreDataPage('segment');
  // }
  newSegments(segmentId, type,name) {
    let segmentCheck:boolean = false
    if(type == 'Upload'){
      let segmentname = name.substring(name.lastIndexOf("_")+1)
      segmentCheck = segmentname == 'Prospects' ? true : false
    }
    this.marketingRoutingsService.exploreDataPage(segmentId, type,segmentCheck);
    sessionStorage.setItem('explore','0')
  }
  campaignList(param) {
    this.tooltip_camp[param] = true
  }
  campaignList2(param) {
    this.tooltip_camp[param] = false
  }
  getTimestamp(date) {
    return new Date(date).getTime()
  }
}