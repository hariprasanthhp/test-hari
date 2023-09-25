import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { MarketingCampaignsApiService } from '../../marketing-campaigns/shared/services/marketing-campaigns-api.service';
import { MarketingCommonService } from '../../shared/services/marketing-common.service';
import { MarketingRoutingsService } from '../../shared/services/marketing-routings.service';
import { MarketingCampaignChannelsApiService } from '../shared/services/marketing-campaign-channels-api.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

@Component({
  selector: 'app-marketing-campaign-metrics',
  templateUrl: './marketing-campaign-metrics.component.html',
  styleUrls: ['./marketing-campaign-metrics.component.scss']
})
export class MarketingCampaignMetricsComponent implements OnInit {

  language: any;
  languageSubject: any;
  audienceSyncListSubject: any
  dtOptions: DataTables.Settings = {};
  isRerender = false;
@Input() campaignId :any

  scopes: any;
  searchText: string;
  loading:boolean = false;
  marketingAudienceTable = []
  finalTypeDataarr 
  channelType: any
  FilterAudience = []
  marketingCampaignSearchTableError: boolean = true

  search_Text_Value: any
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<any> = new Subject();
  audienceListErrorMsg: boolean = false;
  constructor(
    private translateService: TranslateService,
    private marketingCampaignChannelsApiService: MarketingCampaignChannelsApiService,
    private marketingCommonService: MarketingCommonService,
    private commonFunctionsService: CommonFunctionsService,
    private titleService: Title,
    private exportExcelService: ExportExcelService,

  ) {
    this.scopeAsssiner();
  }

  ngOnInit(): void {
    
    this.marketingAudienceTable = [...this.FilterAudience]
    this.language = this.translateService.defualtLanguage;
    this.campaignChannelList();
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
     
      this.search_Text_Value = '';
      this.channelType = this.language.All;
      this.dropDownListValue()
      this.campaignChannelList(true);
    });
    this.dropDownListValue()
    this.channelType = this.finalTypeDataarr[0].name;
  }
dropDownListValue(){
  this.finalTypeDataarr = [
    { id: 0, name: this.language['All Channels']  },
    { id: 1, name: 'Mobile Notification'},
    { id: 2, name: 'Mailchimp'}
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
    if (this.audienceSyncListSubject) {
      this.audienceSyncListSubject.unsubscribe();
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
      // columnDefs: [
      //   { targets: [-1], orderable: false }
      // ],
    };
 //  console.log(this.campaignId)
    this.tableLanguageOptions();
    //'51a512eb-760c-4c07-9b03-44e6b8e2ec09'
      this.audienceSyncListSubject = this.marketingCampaignChannelsApiService.audeinceSyncDetailGET(this.campaignId).subscribe((res: any) => {
        this.loading = true;

        if (Array.isArray(res)) {
      if(res && res.length>0){
        this.audienceListErrorMsg=false;
        this.marketingAudienceTable = res;
        this.FilterAudience = res
        this.dtTrigger.next()
        this.isRerender = true
      }
      else{
        this.audienceListErrorMsg=true;
        this.marketingAudienceTable = [];
        this.FilterAudience = []
        this.dtTrigger.next()
      }
    }
    },(error)=>{
      this.loading = true;
      this.dtTrigger.next()
      if(error){
      this.audienceListErrorMsg=true;
      this.marketingAudienceTable = [];
      this.FilterAudience = []
      }
    })
        
    

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
  



  
  errorReset() {
    this.audienceListErrorMsg = false;
  }


  selectCampaignFilter() {
    if (this.channelType == this.language['All Channels'] ) {
      this.marketingAudienceTable = this.FilterAudience;
    } else if (this.channelType != this.language['All Channels']) {
      this.marketingAudienceTable = this.FilterAudience.filter(
        (x) => x.channels == this.channelType
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

  download_camp() {
    if (this.FilterAudience.length > 0) {
      let data = this.usageByAppDataForming_1(this.FilterAudience)
      this.exportExcelService.downLoadCSVRevenue(this.language['Audience Sync Details'] , data);
    }else{
      let res=[{
        [this.language['Sync Date']]:'',
        [this.language.Name] :'',
        [this.language.Email]:'',
        [this.language.segmentChannels]:''
      }]
      this.exportExcelService.downLoadCSVRevenue(this.language['Audience Sync Details'] , res);
    }
  }

  usageByAppDataForming_1(array, page?: any) {
    let returnArray = [];
    let obj = {}

    array.forEach(el => {
      returnArray.push({ [this.language['Sync Date']] : el.createdDate , [this.language.Name]:el.name , [this.language.Email]: el.email,[this.language.segmentChannels]: el.channels })
    });

    return returnArray;
  }
}

