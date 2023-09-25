import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { MarketingSegmentsApiService } from '../shared/marketing-segments-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recommeded-segments',
  templateUrl: './recommeded-segments.component.html',
  styleUrls: ['./recommeded-segments.component.scss']
})
export class RecommededSegmentsComponent implements OnInit {
  noDataRecomended: boolean
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  scopes: any;
  language: any;
  languageSubject: any;
  public dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  isRerender = false;
  recommendedDataSubject: any;
  recommendedSegmentArray: any;
  recommendedErroMessage: boolean=false;
  finalTypeDataarr
  campaignType: any
  FiltermarketingCampaign = []
  search_Text_Value: any
  constructor(
    private marketingRoutingsService: MarketingRoutingsService,
    private translateService: TranslateService,
    private marketingSegmentsApiService: MarketingSegmentsApiService,
    private marketingCommonService: MarketingCommonService,
    private titleService: Title

  ) {
    this.scopeAsssiner()
  }

  ngOnInit(): void {
  this.recommendedSegmentArray = [...this.FiltermarketingCampaign]
    this.getRecommendedSegmnets();
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
  getRecommendedSegmnets() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      searching: true,
      dom: 'tipr',
      retrieve: true,
      // columnDefs: [{ targets: [-1], orderable: false }],
    };
    
    this.recommendedDataSubject = this.marketingSegmentsApiService.recommendedDataSubject.subscribe((res: any) => {
      this.recommendedSegmentArray = res;
      this.FiltermarketingCampaign = res
      this.dtTrigger.next()
      this.isRerender = true
      if(res && res.length>0){
        this.recommendedErroMessage=false;
        this.recommendedSegmentArray = res;
        this.FiltermarketingCampaign = res
      }
      else{
        this.recommendedErroMessage=true;
        this.recommendedSegmentArray = [];
        this.FiltermarketingCampaign = []
      }
    },(error)=>{
      if(error){
      this.recommendedErroMessage=true;
      this.recommendedSegmentArray = [];
      this.FiltermarketingCampaign = []
      }
    })

  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    } else if (this.language.fileLanguage == 'de_DE') {
      this.dtOptions.language = this.translateService.de_DE;
    }
    if (this.language.fileLanguage == 'es') {
      this.dtOptions.language = this.translateService.es;
    }
    if (this.isRerender) {
      this.tableDestroyOnly();
    }
  }
  selectCampaignFilter() {
 
    if (this.campaignType == this.language['All Types']) {
      this.recommendedSegmentArray = this.FiltermarketingCampaign;
    } 
    else if (this.campaignType != this.language['All Types']) {
      this.recommendedSegmentArray = this.FiltermarketingCampaign.filter(
        (x) => x.segmentType  == this.campaignType
      );
    }
    else {
      this.recommendedSegmentArray = this.FiltermarketingCampaign.filter(
        (x) =>
             x.segmentType  == this.campaignType
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
  selectCampaign(data) {
    let fromData = data.campaignStatus == this.language.Active ? sessionStorage.setItem('StatusAct','Active'): sessionStorage.removeItem('StatusAct')
    this.marketingRoutingsService.newCampaignPageEdit(data.campaignId)
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
    if (this.recommendedDataSubject) {
      this.recommendedDataSubject.unsubscribe();
    }
  }

  getTimestamp(date) {
    return new Date(date).getTime()
  }
}
