import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from './../../../../app-services/translate.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CcoCommonService } from '../../shared/services/cco-common.service';
import { Title } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-cco-subscriber-system',
  templateUrl: './cco-subscriber-system.component.html',
  styleUrls: ['./cco-subscriber-system.component.scss']
})

export class CcoSubscriberSystemComponent implements OnInit, OnDestroy {

  closeModal: string;
  currentPageSubs: any;
  currentPage: any;

  constructor(private translateService: TranslateService,
    private modalService: NgbModal,
    private ccoCommonService: CcoCommonService,
    private titleService: Title
  ) {
    this.currentPageSubs = this.ccoCommonService.currentPageData.subscribe((data: any) => {
      this.currentPage = data;
    });
  }

  languageSubject;
  language: any;
  ngOnInit(): void {
    //this.titleService.setTitle('Subscriber Systems - Systems -  Operations - Calix Cloud');
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Subscriber System']} - ${this.language['Subscribers']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
    });

    this.titleService.setTitle(`${this.language['Subscriber System']} - ${this.language['Subscribers']} - ${this.language['Services']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);

  }

  triggerModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }

    if (this.currentPageSubs) this.currentPageSubs.unsubscribe();
  }

  downloadExport() {
    this.ccoCommonService.doExport('subscriber-system-table-list');
  }


}


