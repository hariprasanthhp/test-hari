import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { TranslateService } from 'src/app-services/translate.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { SubnetConfigAddData, SubnetConfigData, SubnetConfigFormData } from 'src/assets/mockdata/support/netops-management/configuration/subnetconfig';
import { environment } from 'src/environments/environment';


import { SubnetConfigComponent } from './subnet-config.component';

describe('SubnetConfigComponent', () => {
  let component: SubnetConfigComponent;
  let fixture: ComponentFixture<SubnetConfigComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let sso: SsoAuthService;
  let apiService: ApiService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubnetConfigComponent],
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule,HttpClientTestingModule
      ],
      providers: [
        TranslateService, ApiService, SsoAuthService, NgbModal, Title
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    sso = TestBed.inject(SsoAuthService);
    fixture = TestBed.createComponent(SubnetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'subnetCount').and.callThrough();
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    // expect(component.subnetCount).toHaveBeenCalled();
    // expect(component.subnetCount).toHaveBeenCalledTimes(1);
});

it('Subnet Config list', () => {
  spyOn(component, 'loadSubnetConfigurationList').and.callThrough();
  spyOn(component, 'tableLanguageOptions').and.callThrough();
  component.loadSubnetConfigurationList()
  component.subnetList = SubnetConfigData;
  fixture.detectChanges();
  expect(component.tableLanguageOptions).toBeTruthy();
  expect(component.subnetList[0]._id).toEqual(SubnetConfigData[0]._id)
});

it('Add New Subnet Config button click test Case Check', fakeAsync(() => {
  component.hasScopeAccess = true
  component.hasWriteAccess = true
  component.allowSubnetConfig = true
  component.subnetList = SubnetConfigData
  fixture.detectChanges();
  spyOn(component, 'addSubnetConfigMOdalOpen');

  let button = fixture.debugElement.nativeElement.querySelector('#subnet-config button');
  // console.log(button);
  
  button.click();
  tick();
  expect(component.addSubnetConfigMOdalOpen).toHaveBeenCalled();

}));

// it('Add New Subnet Config test', () => {
//   let subnetConfigUrl = `${environment[`SUPPORT_URL`]}/netops-subnet/subnet`;
//   component.subnetNgForm.value = SubnetConfigFormData
//   spyOn(apiService, 'post').and.returnValue(of(SubnetConfigAddData));
//   spyOn(component, 'closeSubnet').and.callThrough();
// component.onSaveSubnetConfig();
//   // app.input['name'] = "muthu";
//   // app.input['shortTimer'] = 6;
//   // app.input['longTimer'] = 7;
//   // app.input['rules'] = "^911n|^411|^[2-9][0-9]{6}";
//   fixture.detectChanges();
//   expect(component.closeSubnet).toBeTruthy();
// });
});
