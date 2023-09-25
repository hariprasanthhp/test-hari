import {
  HttpClient
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { environment } from 'src/environments/environment';
import { CustomTranslateService } from '../shared/services/custom-translate.service';
import { SsoAuthService } from '../shared/services/sso-auth.service';
import { LoginComponent } from './login.component';
import { CommonService } from '../sys-admin/services/common.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule,
      ],
      providers: [{
        provide: Router, useValue: {
          url: '',
          navigate: jasmine.createSpy(),
        }
      }, CommonService,
      {
        provide: ActivatedRoute, useValue: {
          snapshot: { queryParams: {} },
          queryParams: of({ isLocalUser: 'true', username: 'user' }),
        }
      },
      {
        provide: SsoAuthService, useValue: {
          checkUsername: jasmine.createSpy().and.returnValue(of({})),
          getAuthToken: jasmine.createSpy().and.returnValue(of({ access_token: 'GoGGIb7o8TUkhyz', language: 'en_Us' })),
          getEntitlementsArr: jasmine.createSpy().and.returnValue(''),
          getEntitlements: jasmine.createSpy().and.returnValue({ 119: 'Mark', 200: 'found', 201: 'found', 118: 'supp', 120: 'supp', 102: 'co', 210: 'co' }),
          getRoles: jasmine.createSpy().and.returnValue(['OrgAdmin', 'System Admin', 'SysAdmin',]),
          isLoggedIn: jasmine.createSpy().and.returnValue(true),
          logoutResult$: of({ logout: '' }),
          getLandingPage: () => 'cco',
          getOrgId: jasmine.createSpy().and.returnValue('1q2q1'),
          setCscLoggedOut: jasmine.createSpy(),
          setShowHeader: jasmine.createSpy(),
          setLogoutFlag: jasmine.createSpy(),
          setCSCLoggedIn: jasmine.createSpy(),
          setLoginData: jasmine.createSpy(),
          setLoginInfo: jasmine.createSpy(),
          getCCOUrlInfo: jasmine.createSpy().and.returnValue({}),
          getRefresh: jasmine.createSpy().and.returnValue(''),
          getScopes: jasmine.createSpy().and.returnValue({ 'cloud.rbac.coc.insights': '', 'cloud.rbac.coc.issues': '', 'cloud.rbac.coc.health': '', 'cloud.rbac.coc.traffic': '', 'cloud.rbac.coc.operations': '', 'cloud.rbac.coc.dashboard': '' }),
          setRefresh: jasmine.createSpy(),
          doLogout: jasmine.createSpy(),
          setClientSessionId: jasmine.createSpy(),
          setOrgOracleId: jasmine.createSpy(),
          setActionLog: jasmine.createSpy(),
          isCscLoggedOut: () => true,
          getValidEntitlements: () => ["210", "102"],
          getallsupportedlanguages: () => of()
        }

      },
      { provide: TranslateService, useClass: CustomTranslateService },
      {
        provide: HttpClient, useValue: {
          get: jasmine.createSpy().and.returnValue(of({ calixOrganization: { oracleId: '50a11' } })),
        }
      },]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should load data', () => {
    //arrange
    spyOn(component, 'watchActiveLogin');
    spyOn(component, 'gotoUserSessionPage');
    spyOn((component as any).route.queryParams, 'subscribe');

    //act
    fixture.detectChanges();
    //assert
    expect((component as any).ssoAuthService.getCCOUrlInfo).toHaveBeenCalled();
    expect((component as any).ssoAuthService.setRefresh).toHaveBeenCalledWith(true);
    expect(component.watchActiveLogin).toHaveBeenCalled();
    expect(component.gotoUserSessionPage).toHaveBeenCalled();
    expect((component as any).service.setCscLoggedOut).toHaveBeenCalledWith(false);
    expect((component as any).route.queryParams.subscribe).toHaveBeenCalled();
  });

  it('should setActionLogOrgInfo', () => {
    //arrange 
    const redirectRes = '';
    let url = 'organizations/1q2q1';
    //act
    component.setActionLogOrgInfo(redirectRes);
    //assert
    expect((component as any).http.get).toHaveBeenCalledWith(url);
    expect((component as any).ssoAuthService.setClientSessionId).toHaveBeenCalled();
    expect((component as any).ssoAuthService.setOrgOracleId).toHaveBeenCalledWith('50a11');
  });
  it('should setActionLogOrgInfo fail', () => {
    //arrange 
    (component as any).http.get = () => throwError('error');
    spyOn((component as any).http, 'get').and.returnValue(throwError('error'));
    const redirectRes = '';
    let url = 'organizations/1q2q1';
    //act
    component.setActionLogOrgInfo(redirectRes);
    //assert
    expect((component as any).http.get).toHaveBeenCalledWith(url);
    expect((component as any).ssoAuthService.setClientSessionId).toHaveBeenCalled();
    expect((component as any).ssoAuthService.setOrgOracleId).toHaveBeenCalledWith('');
  });
  it('should get UserPreference', () => {
    //arrange 
    const uid = '1q2q1';
    let url = 'user/1q2q1';
    //act
    component.getUserPreference(uid);
    //assert
    expect((component as any).http.get).toHaveBeenCalledWith(url);
  });

  it('should be on Signin', () => {
    //arrange 
    const formData = { username: 'userA', password: '12p' };
    spyOn(component, 'clearError');
    //@ts-ignore
    event = { preventDefault: () => { } };
    spyOn(event, 'preventDefault');
    //@ts-ignore
    document.getElementById = () => ({ click: () => { } });
    component.isLocalUser = false;

    //act
    component.onSignin(formData);
    //assert
    expect(component.clearError).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect((component as any).service.setShowHeader).toHaveBeenCalledWith(true);
    expect(component.salesForceUser).toEqual('userA');
    expect((component as any).service.checkUsername).toHaveBeenCalledWith('userA');
    expect(component.loading).toBeFalsy();
    expect(component.disabled).toBeFalsy();
    expect(component.isLocalUser).toBeFalsy();
  });

  it('should get Authentication Token', () => {
    //arrange 
    const formValue = {
      'client_secret':
        '6QcEcYE6c3kZCklO', 'redirect_uri': 'sample@google.com'
    };
    const grantType =
      'password';
    spyOn(component, 'showApps');
    spyOn(component, 'setActionLogOrgInfo');
    //act
    component.getAuthenticationToken(formValue, grantType);
    //assert
    expect((component as any).service.getAuthToken).toHaveBeenCalledWith(formValue, grantType);
    expect(component.isLogInProcess).toBeTruthy();
    expect(component.loading).toBeFalsy();
    expect((component as any).service.setLogoutFlag).toHaveBeenCalledWith(false);
    expect((component as any).service.setCSCLoggedIn).toHaveBeenCalledWith(false);
    expect((component as any).service.setLoginData).toHaveBeenCalledWith({ access_token: 'GoGGIb7o8TUkhyz', language: 'en_Us' });
    expect((component as any).service.setLoginInfo).toHaveBeenCalledWith({ access_token: 'GoGGIb7o8TUkhyz', language: 'en_Us' });
    expect(component.showApps).toHaveBeenCalled();
    expect(component.setActionLogOrgInfo).toHaveBeenCalledWith({ access_token: 'GoGGIb7o8TUkhyz', language: 'en_Us' });
  });

  it('should go to DP', () => {
    //arrange 
    let redirectRoute = '';
    spyOn(component, 'addError');
    //act
    component.gotoDP();
    //assert
    expect((component as any).service.getEntitlementsArr).toHaveBeenCalled();
    expect((component as any).ssoAuthService.doLogout).toHaveBeenCalled();
    expect(component.addError).toHaveBeenCalledWith(' No Valid Entitlement [401]');
    expect(component.entitlementError).toEqual('');
    expect(component.disabled).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  it('should show Apps', () => {
    //arrange 
    //act
    component.showApps();
    //assert
    expect((component as any).service.getEntitlements).toHaveBeenCalled();
    expect((component as any).service.getRoles).toHaveBeenCalled();
    expect(component.apps.cmc).toBeTruthy();
    expect(component.apps.foundation).toBeTruthy();
    expect(component.apps.cco).toBeTruthy();
    expect(component.apps.csc).toBeTruthy();
    expect(component.apps.orgAdmin).toBeTruthy();
    expect(component.apps.calixAdmin).toBeTruthy();
  });

  it('should receive LogoutFlag', () => {
    //arrange
    spyOn((component as any).service.logoutResult$, 'subscribe');
    //act
    component.receiveLogoutFlag();
    //assert
    expect((component as any).service.logoutResult$.subscribe).toHaveBeenCalled();
    expect(component.isLogout).toBeFalsy();
  });
  it('should add Error', () => {
    //arrange
    //act
    component.addError('error');
    //assert
    expect(component.errorMsg).toEqual('error');
    expect(component.showError).toBeTruthy();
    expect(component.loading).toBeFalsy();

  });
  it('should clear Error', () => {
    //arrange
    //act
    component.clearError();
    //assert
    expect(component.errorMsg).toEqual('');
    expect(component.showError).toBeFalsy();

  });
  it('should go to User SessionPage', () => {
    //arrange
    spyOn(component, 'showApps');
    spyOn((component as any).service, 'getLandingPage').and.returnValue('cco');
    component.apps.cco = true;
    //act
    component.gotoUserSessionPage();
    //assert
    expect(component.showApps).toHaveBeenCalled();
    expect((component as any).service.getLandingPage).toHaveBeenCalled();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['']);

    //arrange    
    (component as any).service.getLandingPage = () => 'cmc';
    spyOn((component as any).service, 'getLandingPage').and.returnValue('cmc');
    component.apps.cmc = true;
    //act
    component.gotoUserSessionPage();
    //assert
    expect(component.showApps).toHaveBeenCalled();
    expect((component as any).service.getLandingPage).toHaveBeenCalled();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/engagement']);

    //arrange    
    (component as any).service.getLandingPage = () => 'csc';
    spyOn((component as any).service, 'getLandingPage').and.returnValue('csc');
    component.apps.csc = true;
    //act
    component.gotoUserSessionPage();
    //assert
    expect(component.showApps).toHaveBeenCalled();
    expect((component as any).service.getLandingPage).toHaveBeenCalled();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/support']);

    //arrange    
    (component as any).service.getLandingPage = () => 'shad';
    spyOn((component as any).service, 'getLandingPage').and.returnValue('shad');
    component.apps.shad = true;
    //act
    component.gotoUserSessionPage();
    //assert
    expect(component.showApps).toHaveBeenCalled();
    expect((component as any).service.getLandingPage).toHaveBeenCalled();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/shad']);
  });
  it('should get COUrl', () => {
    //arrange  
    environment.VALIDATE_SCOPE = 'true';
    //act
    component.getCCOUrl();
    //assert
    expect((component as any).ssoAuthService.getScopes).toHaveBeenCalled();
    expect(component.menus.home).toBeTruthy();
    expect(component.menus.issues).toBeTruthy();
    expect(component.menus.health).toBeTruthy();
    expect(component.menus.traffic).toBeTruthy();
    //expect(component.menus.systems).toBeTruthy();
    expect(component.menus.operations).toBeTruthy();
    expect(component.menus.dashboard).toBeTruthy();
    //arrange  
    environment.VALIDATE_SCOPE = '';
    //act
    component.getCCOUrl();
    //assert
    expect((component as any).ssoAuthService.getScopes).toHaveBeenCalled();
    expect(component.menus.home).toBeTruthy();
    expect(component.menus.issues).toBeTruthy();
    expect(component.menus.health).toBeTruthy();
    expect(component.menus.traffic).toBeTruthy();
    //expect(component.menus.systems).toBeTruthy();
    expect(component.menus.operations).toBeTruthy();
    expect(component.menus.dashboard).toBeTruthy();
  });

  it('should get page Redirection', () => {
    //arrange
    let page = { landingPage: 'cco' }
    component.apps.cco = true;
    component.ccoUrl = '/cco';
    //act
    component.pageRedirection(page);
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/cco']);

    //arrange 
    let page1 = { landingPage: 'cmc' }
    component.apps.cmc = true;
    //act
    component.pageRedirection(page1);
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/marketing']);

    //arrange 
    let page2 = { landingPage: 'csc' }
    component.apps.csc = true;
    //act
    component.pageRedirection(page2);
    //assert
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/support']);

    //arrange 
    spyOn(component, 'gotoDP');
    //act
    component.pageRedirection('');
    //assert
    expect(component.gotoDP).toHaveBeenCalled();
  });
  it('should toggle ShowPassword', () => {
    //arrange 
    //act
    component.toggleShowPassword();
    //assert
    expect(component.showPassword).toBeTruthy();
  });
  // it('should handle ApiError', () => {
  //   //arrange
  //   let page = { landingPage: 'cco' }
  //   component.apps.cco = true;
  //   component.ccoUrl = '/cco';
  //   //act
  //   component.handleApiError(page);
  //   //assert
  //   expect((component as any).router.navigate).toHaveBeenCalledWith(['/cco']);

  //   //arrange 
  //   let page1 = { landingPage: 'cmc' }
  //   component.apps.cmc = true;
  //   //act
  //   component.handleApiError(page1);
  //   //assert
  //   expect((component as any).router.navigate).toHaveBeenCalledWith(['/marketing']);

  //   //arrange 
  //   let page2 = { landingPage: 'csc' }
  //   component.apps.csc = true;
  //   //act
  //   component.handleApiError(page2);
  //   //assert
  //   expect((component as any).router.navigate).toHaveBeenCalledWith(['/support']);

  //   //arrange 
  //   spyOn(component, 'gotoDP');
  //   //act
  //   component.handleApiError('');
  //   //assert
  //   expect(component.gotoDP).toHaveBeenCalled();
  // });
});

