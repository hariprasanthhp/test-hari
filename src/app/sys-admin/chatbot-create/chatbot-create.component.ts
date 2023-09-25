import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChatBotService } from '../services/chat-bot.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chatbot-create',
  templateUrl: './chatbot-create.component.html',
  styleUrls: ['./chatbot-create.component.scss']
})
export class ChatbotCreateComponent implements OnInit {
  language: any;
  languageSub: any;
  chatbotHeaderBgColor = '#E51A1A'
  chatbotWindowBgColor = '#FFFFFF';
  chatbotMessageTextColor = '#333333';
  chatbotMessageBubbleColor = '#FCB4B4';
  customerMessageBubbleColor = '#EDF5FF';
  chatbotName: string;
  logoUrl: string;
  fontSelected = 'Arial Sans Serif';
  headerBgColor: string;
  windowBgColor: string;
  messageTextColor: string;
  chatBotUrl:string;
  dspName:any;
  public ORG_ID: string;
  MODULE:any;
  selectedFont:any;
  loading:boolean = false;
  public infoBody: string;
  public infoTitle: string;
  public modalRef: any;
  patternvalidation = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?[^\/]$/i
  webPathPattern = /^\/.*[^\/]$/;
  chatBotWebPath:any;


  saveClicked: boolean = false;

  @ViewChild('infoModal', { static: true }) public infoModal: TemplateRef<any>;

  constructor(private translateService: TranslateService,
    private router: Router,
    private sso: SsoAuthService,
    public commonOrgService: CommonService,
    private titleService: Title,
    private httpClient: HttpClient,
    private chatBotService:ChatBotService,
    public dialogService: NgbModal,

    ) 
    
    {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('chatbot-create');
    this.ORG_ID = this.sso.getOrganizationID(url);
  //  this.commonOrgService.recordView.show = true;
    this.language = this.translateService.defualtLanguage;
    this.languageSub = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
     })
    this.titleService.setTitle(`${this.language['Chatbot']} -  ${this.MODULE === 'systemAdministration' ?
    this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit(): void {
    this.saveClicked = false;
   this.dspName = localStorage.getItem('calix.username');

  }

  ngOnDestroy(): void {
     if (this.commonOrgService.errorAlert.subscribe()){
        this.commonOrgService.closeAlerts.next();
     }
  }


  routeRedirectChatbot() {
    this.router.navigate([`/${this.MODULE}/chatbot`]);
  }

    
  saveChanges() {
    this.saveClicked = true;

    if (!this.chatBotUrl || !this.chatbotName) {
      return;
    }

    const params = {
      bspWebParentUrl: this.chatBotUrl,
      bspWebToolBarTitle: this.chatbotName,
      agentChatBubbleColor: this.chatbotMessageBubbleColor || '',
      bspName: this.dspName || '',
      customerChatBubbleColor: this.customerMessageBubbleColor || '',
      chatBotBackGroundColor: this.chatbotWindowBgColor || '',
      logoUrl: this.logoUrl || '',
      messageFont: this.fontSelected['$ngOptionLabel'] ? this.fontSelected['$ngOptionLabel'] :this.fontSelected,
      messageTextColor: this.chatbotMessageTextColor || '',
      orgId: this.ORG_ID || '',
      toolBarColor: this.chatbotHeaderBgColor || '',
      bspWebAppPath:this.chatBotWebPath
    };
    if(!this.chatBotWebPath){
      delete params.bspWebAppPath;
    }

   
    this.chatBotService.createChatBot(params).subscribe((res) => {
      this.loading = true;
      this.router.navigate([`/${this.MODULE}/chatbot`]);
    },(err: HttpErrorResponse) => {
      
      this.pageErrorHandle(err);
    });
  }
  
  
  
    public openInfoModal() {
      this.closeModal();
      this.modalRef = this.dialogService.open(this.infoModal, { backdrop: 'static', keyboard: false });
    }

    public closeModal(): void {
      if (this.modalRef) {
        this.modalRef.close();
      }
    }
    pageErrorHandle(err: HttpErrorResponse) {
          let errorInfo:string = ''
          if(err.status === 400){
            errorInfo = err.error.errors[0];
          } else{
            errorInfo = this.commonOrgService.pageErrorHandle(err);
          }
        this.commonOrgService.openErrorAlert(errorInfo);
        this.commonOrgService.pageScrollTop();
        this.loading = false;
      }
    }
  
