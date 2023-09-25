import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CaptivePortalComponent } from './captive-portal.component';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { CaptivePortalService } from '../shared/service/captive-portal.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { of } from 'rxjs/internal/observable/of';

describe('CaptivePortalComponent', () => {
  let component: CaptivePortalComponent;
  let fixture: ComponentFixture<CaptivePortalComponent>;
  let captiveService: CaptivePortalService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CaptivePortalComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [CaptivePortalService, TranslateService, SsoAuthService]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptivePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it("should check ipv6 lan", () => {
    spyOn(captiveService, 'getCaptivePortal').and.returnValue(of(dhcp6));
    component.getCaptivePortal();
    fixture.detectChanges();
    expect(component.dataObj?.ip6LAN?.DHCPv6Mode).toEqual("M-and-A");
    //done();
  }); */
});
