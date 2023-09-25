import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'src/app-services/translate.service';
import { Dialplandata, Dialplanadddata, DialPlanObjmock } from 'src/assets/mockdata/support/netops-management/configuration/dialplan';
import { ApiService } from 'src/app/shared/services/api.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DialPlanService } from '../../shared/dial-plan.service';
import { environment } from '../../../../../environments/environment';

import { DialPlanNewComponent } from './dial-plan-new/dial-plan-new.component';

import { DialPlanComponent } from './dial-plan.component';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DialPlanComponent', () => {
  let component: DialPlanComponent;
  let fixture: ComponentFixture<DialPlanComponent>;
  let dialPlanService: DialPlanService
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let sso: SsoAuthService;
  let httpTestingController: HttpTestingController;

    //child 
    let app: DialPlanNewComponent;
    let fixt: ComponentFixture<DialPlanNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialPlanComponent, DialPlanNewComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [TranslateService, Title, ApiService, SsoAuthService, NgbModal, DialPlanService]
    })
      .compileComponents()
      .then(() => {
        dialPlanService = TestBed.inject(DialPlanService);
        activatedRoute = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(DialPlanComponent);
        component = fixture.componentInstance;
        
       // child
       fixt = TestBed.createComponent(DialPlanNewComponent);
       app = fixt.componentInstance;
       app.viewDialPlan();
       fixt.detectChanges();
       app.ngOnInit();
      });

  });

  it('should initialized onInit()', () => {
    if (!component.dialPlanObj) {
      spyOn(component, 'loadDialPadList').and.callThrough();
      component.ngOnInit();
      // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
      // expect(component.loadDialPadList).toHaveBeenCalled();
      // expect(component.loadDialPadList).toHaveBeenCalledTimes(1);
    }
  });

  it('DialPlan list', () => {
    // if(['/support/netops-management/configuration/dial-plan',
    // '/cco/operations/cco-system-operations/sub-profile', 
    // '/cco/operations/cco-subscriber-operations/configurations/dial-plan', 
    // '/cco-foundation/foundation-operations/foundation-system-operation/sub-profile',
    // '/cco-foundation/foundation-configuration/configuration-prerequisites/dial-plan']
    // .indexOf(component.router?.url) > -1 && component.hasScopeAccess) {
    //   if(component.language) {
    spyOn(component, 'loadDialPadList').and.callThrough();
    component.loadDialPadList()
    component.dialPadList = Dialplandata;
    component.dialPadCount = 2;
    // console.log('html', fixture.nativeElement.querySelector('#managementTableId'))
    fixture.detectChanges();
    //console.log("dialplanlist : ", component.dialPadList);
    //console.log("dialplandatalist", Dialplandata[0]._id);
    

    //let subscriber_address = fixture.nativeElement.querySelector('.subscriber-address').innerHTML;
    expect(component.dialPadList[0]._id).toEqual(Dialplandata[0]._id)
    //   }
    // }
  });

    it('Add New Dial Plan button click test Case Check', fakeAsync(() => {
      component.hasScopeAccess = true
      component.loader = false
      fixture.detectChanges();
      spyOn(component, 'openDialog');
    component.openDialog();
      // let button = fixture.debugElement.nativeElement.querySelector('.position-relative div:nth-child(4) button');
      // //console.log(button);
      
      // button.click();
      // tick();
      // expect(component.showDialog).toBeTrue();
      expect(component.openDialog).toHaveBeenCalled();

    }));

    it('Add New Dial Plan test', () => {
      let url = `${environment[`SUPPORT_URL`]}/netops-dp/dial-plan?orgId=${sso.getOrgId()}`;
      spyOn(app, 'doSubmit').and.callThrough();
      spyOn(app.onClose, 'emit').and.callThrough();
      app.input = Dialplanadddata;
      // app.input['name'] = "muthu";
      // app.input['shortTimer'] = 6;
      // app.input['longTimer'] = 7;
      // app.input['rules'] = "^911n|^411|^[2-9][0-9]{6}";
      fixt.detectChanges();
      app.doSubmit();
      const req = httpTestingController.expectOne(reqs => {
        return reqs.url.includes('netops-dp/dial-plan') && reqs.method == 'POST'
      });
      req.flush(Dialplanadddata);
      fixt.detectChanges();
      expect(app.onClose.emit).toHaveBeenCalled();
    });

    it('Delete Dial Plan button click test', () => {
      component.dialPlanObj = DialPlanObjmock;
      component.dialPlanObj._id = DialPlanObjmock._id;
      spyOn(component, 'doDeleteDialPlan').and.callThrough();
      spyOn(component, 'reDrawTable').and.callThrough();
      let dialPadUrl = `${environment[`SUPPORT_URL`]}/netops-dp/dial-plan`
      //console.log(component.dialPlanObj._id) ; 
      fixture.detectChanges()
      component.doDeleteDialPlan();
      expect(component.doDeleteDialPlan).toHaveBeenCalled();
      expect(component.reDrawTable).toBeTruthy();
    });

    //    //console.log(component.dialPlanObj);
    //   // //let deleteSubnetByIdUrl: string = dialPadUrl + '/' + `${Dialplandata.DialPlanDeleteId._id}`
    //    component.doDeleteDialPlan();
    //   // fixture.detectChanges()
    //   expect(component.dialPlanObj).toBe('null');
    //   // expect(component.doDeleteDialPlan).toHaveBeenCalled();
    //   // expect(component.reDrawTable).toHaveBeenCalled();
    // })

});
