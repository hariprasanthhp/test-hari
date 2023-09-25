import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChatbotComponent } from './chatbot.component';
import { TranslateService } from 'src/app-services/translate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CommonService } from '../services/common.service';
import { Title } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ChatBotService } from '../services/chat-bot.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
const routes: Routes = [];

describe('ChatbotComponent', () => {
  
  let translateService: TranslateService;
  let dialogService: NgbModal;
  let router: Router;
  let sso: SsoAuthService;
  let commonOrgService: CommonService;
  let titleService: Title;
  let common: CommonFunctionsService;
  let chatBotService: ChatBotService;
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ChatBotService,NgbModal],
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    chatBotService = TestBed.inject(ChatBotService);
    dialogService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set loading to true and call verifyChatBotConfig', fakeAsync(() => {
    const mockRes = [{ cloudStackStatus: 'INPROGRESS' }];
    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue(of(mockRes)); // Import 'of' from 'rxjs' if not already imported
  
    component.getData();
    tick();
  
    expect(component.loading).toBe(false);
  }));
  it('should set loading to true and update properties based on API response', fakeAsync(() => {
    const mockResponse = [
      {
        cloudStackStatus: 'INPROGRESS',
        agentChatBubbleColor: 'blue',
        customerChatBubble: 'green',
        messageTextColor: 'white',
        toolBarColor: 'black',
        chatBotBackGroundColor: 'gray',
        logoUrl: 'logo.png',
        messageFont: 'Arial',
        bspWebToolBarTitle: 'ChatBot',
        bspWebParentUrl: 'https://example.com',
      },
    ];

    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue(of(mockResponse));

    component.getData();
    tick();

    expect(component.loading).toBe(false);
    expect(component.disabledChatBot).toBe(false);
    expect(component.inProgress).toBe(true);
    expect(component.enableChatBot).toBe(false);
    expect(component.chatbotMessageBubbleColor).toBe('blue');
    expect(component.customerMessageBubbleColor).toBe('green');
    expect(component.chatbotMessageTextColor).toBe('white');
    expect(component.chatbotHeaderBgColor).toBe('black');
    expect(component.chatbotWindowBgColor).toBe('gray');
    expect(component.logoUrl).toBe('logo.png');
    expect(component.fontSelected).toBe('Arial');
    expect(component.chatBotName).toBe('ChatBot');
    expect(component.hostUrl).toBe('https://example.com');

  }));

  it('should handle error response from API', fakeAsync(() => {
    const mockError = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
    });
  
    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue(
      new Observable((observer) => {
        observer.error(mockError);
      })
    );
  
    spyOn(component, 'pageErrorHandle');
  
    component.getData();
    tick();
  
    expect(component.loading).toBe(true);
    expect(component.pageErrorHandle).toHaveBeenCalledWith(mockError);
  }));
  it('should handle DELETED or FAILED cloudStackStatus', fakeAsync(() => {
    const mockRes = [{ cloudStackStatus: 'DELETED' }];
    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue({
      subscribe: (callback: any) => {
        callback(mockRes);
      }
    });

    component.getData();
    tick();

    expect(component.enableChatBot).toBe(false);
    expect(component.disabledChatBot).toBe(false);
    expect(component.enableSetUp).toBe(false);
    expect(component.inProgress).toBe(false);
    expect(component.chatBotConfigured).toBe(true);
    expect(component.deleteChatPot).toBe(false);
  }));

  it('should set loading to true and update properties when response is empty', fakeAsync(() => {
    const mockResponse = '';
  
    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue(of(mockResponse));
  
    component.getData();
    tick();
  
    expect(component.loading).toBe(false);
    expect(component.disabledChatBot).toBe(true);
    expect(component.enableSetUp).toBe(true);
    expect(component.inProgress).toBe(false);
    expect(component.enableChatBot).toBe(false);
  }));
  it('should set loading to true and update properties when cloudStackStatus is "DONE"', fakeAsync(() => {
    const mockResponse = [
      {
        cloudStackStatus: 'DONE',
        agentChatBubbleColor: 'blue',
        customerChatBubble: 'green',
        messageTextColor: 'white',
        toolBarColor: 'black',
        chatBotBackGroundColor: 'gray',
        logoUrl: 'logo.png',
        messageFont: 'Arial',
        bspWebToolBarTitle: 'ChatBot',
        bspWebParentUrl: 'https://example.com',
      },
    ];
  
    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue(of(mockResponse));
  
    component.getData();
    tick();
  
    expect(component.loading).toBe(false);
    expect(component.chatBotConfigured).toBe(false);
    expect(component.deleteChatPot).toBe(true);
    expect(component.enableChatBot).toBe(true);
    expect(component.chatbotMessageBubbleColor).toBe('blue');
    expect(component.customerMessageBubbleColor).toBe('green');
    expect(component.chatbotMessageTextColor).toBe('white');
    expect(component.chatbotHeaderBgColor).toBe('black');
    expect(component.chatbotWindowBgColor).toBe('gray');
    expect(component.logoUrl).toBe('logo.png');
    expect(component.fontSelected).toBe('Arial');
    expect(component.chatBotName).toBe('ChatBot');
    expect(component.hostUrl).toBe('https://example.com');
  }));
 
  it('update properties when cloudStackStatus is "DELETE_IN_PROGRESS"', fakeAsync(() => {
    const mockResponse = [
      {
        cloudStackStatus: 'DELETE_IN_PROGRESS',
        agentChatBubbleColor: 'blue',
        customerChatBubble: 'green',
        messageTextColor: 'white',
        toolBarColor: 'black',
        chatBotBackGroundColor: 'gray',
        logoUrl: 'logo.png',
        messageFont: 'Arial',
        bspWebToolBarTitle: 'ChatBot',
        bspWebParentUrl: 'https://example.com',
      },
    ];
  
    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue(of(mockResponse));
  
    component.getData();
    tick();
    expect(component.loading).toBe(false);
    expect(component.chatBotConfigured).toBe(true);
    expect(component.disabledChatBot).toBe(false);
    expect(component.failedChatBot).toBe(false);
    expect(component.deleteChatPot).toBe(true);
    expect(component.deleteInprogress).toBe(true);
    expect(component.enableSetUp).toBe(false);
    expect(component.enableChatBot).toBe(false);
    expect(component.chatbotMessageBubbleColor).toBe('blue');
    expect(component.customerMessageBubbleColor).toBe('green');
    expect(component.chatbotMessageTextColor).toBe('white');
    expect(component.chatbotHeaderBgColor).toBe('black');
    expect(component.chatbotWindowBgColor).toBe('gray');
    expect(component.logoUrl).toBe('logo.png');
    expect(component.fontSelected).toBe('Arial');
    expect(component.chatBotName).toBe('ChatBot');
    expect(component.hostUrl).toBe('https://example.com');
  }));
  it('update properties when cloudStackStatus is "FAILED"', fakeAsync(() => {
    const mockResponse = [
      {
        cloudStackStatus: 'FAILED',
        agentChatBubbleColor: 'blue',
        customerChatBubble: 'green',
        messageTextColor: 'white',
        toolBarColor: 'black',
        chatBotBackGroundColor: 'gray',
        logoUrl: 'logo.png',
        messageFont: 'Arial',
        bspWebToolBarTitle: 'ChatBot',
        bspWebParentUrl: 'https://example.com',
      },
    ];

    spyOn(component.chatBotService, 'verifyChatBotConfig').and.returnValue(of(mockResponse));
  
    component.getData();
    tick();
    expect(component.loading).toBe(false);
    expect(component.enableChatBot).toBe(false);
    expect(component.disabledChatBot).toBe(false);
    expect(component.enableSetUp).toBe(false);
    expect(component.chatBotConfigured).toBe(true);
    expect(component.deleteChatPot).toBe(true);
    expect(component.failedChatBot).toBe(true);
    expect(component.deleteInprogress).toBe(false);
    expect(component.chatbotMessageBubbleColor).toBe('blue');
    expect(component.customerMessageBubbleColor).toBe('green');
    expect(component.chatbotMessageTextColor).toBe('white');
    expect(component.chatbotHeaderBgColor).toBe('black');
    expect(component.chatbotWindowBgColor).toBe('gray');
    expect(component.logoUrl).toBe('logo.png');
    expect(component.fontSelected).toBe('Arial');
    expect(component.chatBotName).toBe('ChatBot');
    expect(component.hostUrl).toBe('https://example.com');
  }));
  it('should handle 500 error', () => {
    spyOn(component.commonOrgService, 'pageErrorHandle').and.returnValue('Internal Server Error');
    spyOn(component.commonOrgService, 'openErrorAlert');
    spyOn(component.commonOrgService, 'pageScrollTop');

    const errorResponse = new HttpErrorResponse({ status: 500 });

    component.pageErrorHandle(errorResponse);

    expect(component.loading).toBe(false);
  });

 
  it('should call downloadChatConfig and create a download link', () => {
    const dummyConfigResponse = '<html><a>chatBot</a></html>';
  
    spyOn(chatBotService, 'downloadChatConfig').and.returnValue(
      of(dummyConfigResponse)
    );
  
    component.downloadChatBotSnippet();
  
    const downloadLink = document.querySelector('a') as HTMLAnchorElement;
  
    const clickSpy = spyOn(downloadLink, 'click');
  
    component.downloadChatBotSnippet();

  
  });
  it('should handle HTTP errors', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'invalid',
      status: 404, 
    });
  
    spyOn(chatBotService, 'downloadChatConfig').and.returnValue(
      throwError(errorResponse)
    );
    spyOn(component, 'pageErrorHandle').and.callThrough(); 

    component.downloadChatBotSnippet();
  
    expect(component.pageErrorHandle).toHaveBeenCalledWith(errorResponse);
    fixture.detectChanges();

  });
  it('should call deleteChatbotRequest and handle success', () => {
    spyOn(chatBotService, 'deleteChatbotRequest').and.returnValue(
      of('Success response')
    );

    spyOn(dialogService, 'dismissAll');

    spyOn(component, 'getData');

    component.deleteChatbot();

    expect(chatBotService.deleteChatbotRequest).toHaveBeenCalledWith({
      orgId: component.ORG_ID,
      cloudStackStatus: 'DELETED',
    });
    expect(dialogService.dismissAll).toHaveBeenCalled();
    expect(component.getData).toHaveBeenCalled();
  });


  it('should call deleteChatbotRequest and handle error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Error message',
      status: 500, 
       });

    spyOn(chatBotService, 'deleteChatbotRequest').and.returnValue(
      throwError(errorResponse)
    );

    spyOn(component, 'pageErrorHandle');

    component.deleteChatbot();

    expect(component.pageErrorHandle).toHaveBeenCalledWith(errorResponse);
  });
  it('should navigate to chatbot-create route', () => {
    const router = TestBed.inject(Router);   
    const navigateSpy = spyOn(router, 'navigate');
  
    component.routeToCreateChatbot();
  
    expect(navigateSpy).toHaveBeenCalledWith([`/${component.MODULE}/chatbot-create`]);
  });
  it('should open the delete modal', () => {
    const openSpy = spyOn(dialogService, 'open').and.stub();

    component.openDeleteModal('warningDeleteChatbot');

    expect(openSpy).toHaveBeenCalledWith("warningDeleteChatbot", {
      windowClass: 'custom-warning-modal clx-custom-modal',
      backdrop: 'static',
      keyboard: false,
    });
  });
  
});
