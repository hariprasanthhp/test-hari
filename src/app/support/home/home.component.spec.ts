import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { DateUtilsService } from 'src/app/shared-utils/date-utils.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DataServiceService } from '../data.service';

import { HomeComponent } from './home.component';
import { HomeserviceService } from './homeservice/homeservice.service';
import { impactSubscriber, insightActiveRg, insightSysReboot, recentSubscriber } from 'src/assets/mockdata/support/home'
import { iterator } from 'rxjs/internal-compatibility';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [NgbModal, TranslateService, DataServiceService, SsoAuthService, HomeserviceService, DateUtilsService, CustomTranslateService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('should check insights', fakeAsync(() => {
    //spyOn(component, 'calculateInsights').withArgs(insightActiveRg, 'rgActive').and.callThrough();
    const rgResult = component.calculateInsights(insightActiveRg, 'rgActive');
    const rebootResult = component.calculateInsights(insightSysReboot, 'count');
    //console.log('test insight', rgResult, rebootResult);
    component.insight = {
      RGsVal: rgResult[0],
      RGsPerc: rgResult[1],
      RGsState: rgResult[2],
      sysRebootVal: rebootResult[0],
      sysRebootPerc: rebootResult[1],
      sysRebootState: rebootResult[2]
    };
    fixture.detectChanges();
    // const nativeElem: HTMLElement = fixture.nativeElement;
    // const firstCol = nativeElem.querySelector('#csc-active-rgs h3')!;
    // expect(firstCol.textContent).toEqual('212');
  }));

  it('should check recent subscribers', () => {
    component.subscriberList = recentSubscriber;
    component.scopeFlag.search = true;
    component.renderTable();
    fixture.detectChanges();
    // const nativeElem: HTMLElement = fixture.nativeElement;
    // const firstCol = nativeElem.querySelector('#recentListTable tbody td')!;
    // expect(firstCol.textContent).toEqual('joycegponu6x');
  })

  it('should check  getOutageStatus', () => {
    component.ngOnInit();
    spyOn(component, 'getOutageStatus').and.callThrough();
    component.getOutageStatus();
    component.impacts = impactSubscriber;
    expect(component.impacts[0].impactedSubscriber).toMatch("0");
    expect(component.impacts[0].impactedPon).toMatch("1");
    expect(component.getOutageStatus).toHaveBeenCalled();
  });
});
