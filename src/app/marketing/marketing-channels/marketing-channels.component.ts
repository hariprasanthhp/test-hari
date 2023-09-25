import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { MarketingChannelsApiService } from './shared/services/marketing-channels-api.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { DataTableDirective } from 'angular-datatables';
import { MarketingCommonService } from '../shared/services/marketing-common.service';

@Component({
  selector: 'app-marketing-channels',
  templateUrl: './marketing-channels.component.html',
  styleUrls: ['./marketing-channels.component.scss']
})
export class MarketingChannelsComponent implements OnInit {
  language: any;
  languageSubject;

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  showDataTable = false;
  marketingChannelTable = []
  isRerender = false;

  segmentPostErrorMsg: any

  ///
  marketingChannelSubject: any;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('addSubscriberModal', { static: true }) private addSubscriberModal: TemplateRef<any>;
  @ViewChild('addEditModal', { static: true }) private addEditModal: TemplateRef<any>;

  constructor(private dialogService: NgbModal, private translateService: TranslateService,
    private marketingChannelsApiService: MarketingChannelsApiService,
    private marketingCommonService: MarketingCommonService,
    private CustomtranslateService: CustomTranslateService) { }

  ngOnInit(): void {
    this.marketingChannelList()

    this.language = this.translateService.defualtLanguage;
    this.tableLanguageOptions()
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.tableLanguageOptions()
    });

    // setTimeout(() => {
    //   this.showDataTable = true;
    // }, 500);
  }


  ngOnDestroy() {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.marketingChannelSubject) {
      this.marketingChannelSubject.unsubscribe();
    }
  }

  marketingChannelList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      ordering: true,
      searching: false,
    };
    this.marketingChannelSubject = this.marketingChannelsApiService.MarketingChannelsListGET().subscribe((res: any) => {
      this.segmentPostErrorMsg = false
      if (res) {
        if (res['status'] == undefined) {
          this.marketingChannelTable = res;
          this.showDataTable = true;
          this.isRerender = true;
          this.dtTrigger.next();
        } else {
        }
      }
    },
      (error: any) => {
        // if (error.status === 204) {
        this.segmentPostErrorMsg = this.marketingCommonService.errorHandling(error)


        // }
      });

  }
  errorReset() {
    this.segmentPostErrorMsg = false;
  }
  tableLanguageOptions() {
    if (this.language.fileLanguage == 'fr') {
      this.dtOptions.language = this.translateService.fr;
    } else if (this.language.fileLanguage == 'en') {
      delete this.dtOptions.language;
    }
    if (this.isRerender) {
      this.rerender()
    }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  showAddSubscriberModal() {
    this.dialogService.open(this.addSubscriberModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  showEditModal() {
    this.dialogService.open(this.addEditModal, { size: 'lg', centered: true, windowClass: 'custom-modal' });
  }

  closeModal() {
    this.dialogService.dismissAll();
  }



}
