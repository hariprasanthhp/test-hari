import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from 'src/app-services/translate.service';
import { Title } from '@angular/platform-browser';
import { ChatbotCreateComponent } from './chatbot-create.component';
import { ChatBotService } from '../services/chat-bot.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

describe('ChatbotCreateComponent', () => {
  let component: ChatbotCreateComponent;
  let fixture: ComponentFixture<ChatbotCreateComponent>;
  let chatBotService: ChatBotService;
  let dialogService: NgbModal;
  let translateService: TranslateService;
  let titleService: Title;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'organization-admin/chatbot', component: ChatbotComponent },
        ]),
        HttpClientTestingModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
      ],
      declarations: [ChatbotCreateComponent, ChatbotComponent],
      providers: [
        ChatBotService,
        NgbModal,
        TranslateService,
        Title,
        ColorPickerModule,
      ],
    }).compileComponents();

    ngZone = TestBed.inject(NgZone);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotCreateComponent);
    component = fixture.componentInstance;
    chatBotService = TestBed.inject(ChatBotService);
    dialogService = TestBed.inject(NgbModal);
    translateService = TestBed.inject(TranslateService);
    titleService = TestBed.inject(Title);
    router = TestBed.inject(Router);
  });

  it('should set saveClicked to true and call createChatBot method when form fields are valid', fakeAsync(() => {
    component.chatBotUrl = 'https://example.com';
    component.chatbotName = 'Test Chatbot';
    component.chatbotMessageBubbleColor = '#FCB4B4';
    component.dspName = 'Test DSP';
    component.customerMessageBubbleColor = '#EDF5FF';
    component.chatbotWindowBgColor = '#FFFFFF';
    component.logoUrl = 'https://example.com/logo.png';
    component.fontSelected = 'Arial Sans Serif' || 'Monospace';
    component.chatbotMessageTextColor = '#333333';
    component.ORG_ID = 'org123';
    component.chatbotHeaderBgColor = '#E51A1A';

    const createChatBotSpy = spyOn(chatBotService, 'createChatBot').and.returnValue(of({}));

    component.saveChanges();
    tick(); 

    expect(component.saveClicked).toBeTrue();
    
    expect(component.loading).toBeTrue();
  }));

 it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle error when createChatBot method fails', () => {
      component.chatBotUrl = 'https://example.com';
      component.chatbotName = 'Test Chatbot';
  
      const createChatBotSpy = spyOn(chatBotService, 'createChatBot').and.returnValue(throwError(new HttpErrorResponse({ status: 500 })));
  
      const pageErrorHandleSpy = spyOn(component, 'pageErrorHandle');
      TestBed.inject(NgZone).run(() => {
        component.saveChanges();
      });
  
      expect(component.saveClicked).toBeTrue();
      expect(createChatBotSpy).toHaveBeenCalled();
      expect(pageErrorHandleSpy).toHaveBeenCalled();
      expect(component.loading).toBeFalse();
    });
     it('should handle pageErrorHandle', () => {
    const errorResponse = new HttpErrorResponse({ status: 500 });

    const commonOrgServiceSpy = spyOn(component.commonOrgService, 'pageErrorHandle');
    const openErrorAlertSpy = spyOn(component.commonOrgService, 'openErrorAlert');
    const pageScrollTopSpy = spyOn(component.commonOrgService, 'pageScrollTop');
    TestBed.inject(NgZone).run(() => {
      component.pageErrorHandle(errorResponse);
    });
   expect(commonOrgServiceSpy).toHaveBeenCalledWith(errorResponse);
    expect(openErrorAlertSpy).toHaveBeenCalled();
    expect(pageScrollTopSpy).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });
  it('should navigate to the chatbot route', () => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    TestBed.inject(NgZone).run(() => {
      component.routeRedirectChatbot();
    });


    expect(navigateSpy).toHaveBeenCalledWith([`/${component.MODULE}/chatbot`]);
  });
it('should open the info modal', () => {
    const openSpy = spyOn(dialogService, 'open').and.returnValue({} as NgbModalRef);
    TestBed.inject(NgZone).run(() => {
      component.openInfoModal();
    });


    expect(component.modalRef).toBeDefined();
    expect(openSpy).toHaveBeenCalledWith(component.infoModal, { backdrop: 'static', keyboard: false });
  });

  it('should close the modal', () => {
    const mockModalRef = { close: jasmine.createSpy('close') };

    component.modalRef = mockModalRef;
    TestBed.inject(NgZone).run(() => {
      component.closeModal();
    });



    expect(mockModalRef.close).toHaveBeenCalled();
  });
});