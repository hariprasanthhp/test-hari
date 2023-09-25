import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';

@Component({
  selector: 'app-scheduled-campaigns',
  templateUrl: './scheduled-campaigns.component.html',
  styleUrls: ['./scheduled-campaigns.component.scss']
})
export class ScheduledCampaignsComponent implements OnInit {
  language: any;
  languageSubject: any;
  tableOptions:DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthChange: true,
    processing: false,
    dom: 'tipr',
    columnDefs: [
      { targets: [-1], orderable: false }
    ]
  }
  constructor(private translateService: TranslateService,private dialogService: NgbModal) { }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })
  }
  modalOpen(model){
    this.dialogService.open(model,{backdrop: "static", keyboard: false, size: 'lg', centered: true, windowClass: 'default-modal-ui modal-cust-md'})
    
   }
}
