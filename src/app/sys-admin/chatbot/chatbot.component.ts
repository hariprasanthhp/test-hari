import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ChatBotService } from '../services/chat-bot.service';
import { allowedNodeEnvironmentFlags } from 'process';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  language: any;
  languageSub: any;
  public MODULE: string;
  chatbotHeaderBgColor = '#E51A1A'
  chatbotWindowBgColor = '#FFFFFF';
  chatbotMessageTextColor = '#333333';
  chatbotMessageBubbleColor = '#FCB4B4';
  customerMessageBubbleColor = '#EDF5FF';
  chatbotMessageColor = '#F44336';
  logoUrl = 'http://';
  fontSelected = 'Arial Sans Serif'
  chatBotName: any;
  modalRef: any;
  loading: boolean = false;
  disabledChatBot: boolean = false;
  inProgress: boolean = false;
  enableChatBot: boolean = false;
  enableSetUp: boolean = false;
  deleteChatPot: boolean = false;
  chatBotConfigured: boolean = true;
  deleteInprogress:boolean = false;
  failedChatBot:boolean = false;
  deleteInprocess:boolean = false;
  hostUrl: any;
  scopes:any;
  public ORG_ID: string;
  webPathUrl:any;
  constructor(
    private translateService: TranslateService,
    private dialogService: NgbModal,
    private router: Router,
    private sso: SsoAuthService,
    public commonOrgService: CommonService,
    private titleService: Title,
    private common: CommonFunctionsService,
    public chatBotService: ChatBotService
  ) {
    let url = this.router.url;
    this.MODULE = this.sso.getRedirectModule(url);
    this.commonOrgService.currentPageAdder('chatbot');
    this.ORG_ID = this.sso.getOrganizationID(url);
    this.language = this.translateService.defualtLanguage;
    this.languageSub = this.translateService.selectedLanguage.subscribe(
      (data) => {
        this.language = data;
      })
    this.titleService.setTitle(`${this.language['Chatbot']} - ${this.MODULE === 'systemAdministration' ?
      this.language['System Administration'] : this.language['administration']} - ${this.language['Calix Cloud']}`);
  }

  ngOnInit(): void {
     this.scopes = this.sso.getScopes();
    this.getData();
  }
  getData() {
    this.loading = true;
    this.chatBotService.verifyChatBotConfig(this.ORG_ID).subscribe((res) => {
      this.loading = false;
      const allowedStatus = ['NEW', 'INPROGRESS', 'UPDATE'];
      if(res[0]?.cloudStackStatus == 'DELETE_IN_PROGRESS' ){
        this.enableChatBot = false;
        this.failedChatBot = false;
        this.disabledChatBot = false;
        this.enableSetUp = false;
        this.inProgress = false;
        this.chatBotConfigured = true;
        this.deleteChatPot = true;
        this.deleteInprocess = true;
        this.deleteInprogress = true;
      } else if (res[0]?.cloudStackStatus == 'FAILED'){
        this.enableChatBot = false;
        this.disabledChatBot = false;
        this.enableSetUp = false;
        this.inProgress = false;
        this.chatBotConfigured = true;
        this.deleteChatPot = true;
        this.failedChatBot = true;
        this.deleteInprogress = false;
      } else if (res == '') {
        this.deleteInprogress = false;
        this.disabledChatBot = true;
        this.enableSetUp = true;
        this.inProgress = false;
        this.enableChatBot = false;

      } else if(allowedStatus.includes(res[0]?.cloudStackStatus) ){
        this.disabledChatBot = false;
        this.inProgress = true;

      } else if (res[0]?.cloudStackStatus == 'DONE') {
        this.chatBotConfigured = false;
        this.deleteChatPot = true;
        this.enableChatBot = true;

      }
      if (res.length) {
        res.forEach(element => {
          this.chatbotMessageBubbleColor = element.agentChatBubbleColor || '';
          this.customerMessageBubbleColor = element.customerChatBubble || '';
          this.chatbotMessageTextColor = element.messageTextColor || '';
          this.chatbotHeaderBgColor = element.toolBarColor || '';
          this.chatbotWindowBgColor = element.chatBotBackGroundColor || '';
          this.logoUrl = element.logoUrl || '';
          this.fontSelected = element.messageFont || '';
          this.chatBotName = element.bspWebToolBarTitle || '';
          this.hostUrl = element.bspWebParentUrl || '';
          this.webPathUrl = element.bspWebAppPath || '';

        });
      }
      if(this.scopes ['cloud.admin.users'] && !(this.scopes ['cloud.admin.users'].indexOf('write') !== -1)){
        this.deleteChatPot = false;
        this.enableSetUp = false;
        this.chatBotConfigured = false;
      }
    }, (err: HttpErrorResponse) => {
      this.pageErrorHandle(err);

    })
  }

  routeToCreateChatbot() {
    this.router.navigate([`/${this.MODULE}/chatbot-create`])
  }
  openDeleteModal(modal) {
    this.dialogService.open(modal, { windowClass: 'custom-warning-modal clx-custom-modal',backdrop: 'static', keyboard: false });
  }
  deleteChatbot() {
    let params ={
      orgId:this.ORG_ID,
      cloudStackStatus:'DELETED'
    }
    this.chatBotService.deleteChatbotRequest(params).subscribe((res) => {
    
      this.dialogService.dismissAll();
      if(res){
        this.getData();

      }

    },(err: HttpErrorResponse) =>{
      this.pageErrorHandle(err);

   }) 
  }


  downloadChatBotSnippet() {
    this.chatBotService.downloadChatConfig(this.ORG_ID, { responseType: 'text' }).subscribe((res) => {
        const element = document.createElement('a');
        element.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(res);
        element.download = 'parent.html';
        element.click();
      },
      (err: HttpErrorResponse) => {
        this.pageErrorHandle(err);

      }
    );
  }
  
  pageErrorHandle(err: HttpErrorResponse) {
    let errorInfo = '';
    if(err.status == 500) {
        errorInfo = this.commonOrgService.pageErrorHandle(err);
      }
      this.commonOrgService.openErrorAlert(errorInfo);
      this.commonOrgService.pageScrollTop();
      this.loading = false;
    }

  

}
