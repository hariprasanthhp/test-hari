import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AclForRemoteAccessComponent } from './acl-for-remote-access.component';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileService } from 'src/app/support/netops-management/operations/services/profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AclForRemoteAccessComponent', () => {
  let component: AclForRemoteAccessComponent;
  let fixture: ComponentFixture<AclForRemoteAccessComponent>;
  let translateService: TranslateService;
  let profileService: ProfileService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AclForRemoteAccessComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, FormGroupDirective, TranslateService, ProfileService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AclForRemoteAccessComponent);
    component = fixture.componentInstance;
    // router = TestBed.inject(Router);
    translateService = TestBed.inject(TranslateService);
    profileService = TestBed.inject(ProfileService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should init component', () => {
    component.ngOnInit();
  });

  it('should call all simple functions', () => {
    component.sortingId = 'version';
    component.initSorting();
    component.setSortDirection('version', 'asc');
    component.addRule();
    component.openaclModal('aclModal');
    component.duplicateIpAddressCheck('test-ip');
  });


  it('should init remote access form', () => {
    component.formType = 'aclForRemoteAccessForm';
    component.form = formBuilder.group({
      aclForRemoteAccessForm: profileService.getAclForRemoteAccessForm()
    });
    component.initForm();
  });

  it('should init Voip form', () => {
    component.form = formBuilder.group({
      aclForVoipForm: profileService.getAclForVoipForm()
    });
    component.formType = 'aclForVoipForm';
    component.initForm();
  });

  it('should patch form value', () => {
    let rule = {
      Type: 'sip',
      IPAddress: 'test-ip',
      action: 'add'
    }
    component.form = formBuilder.group({
      aclForVoipForm: profileService.getAclForVoipForm()
    });
    component.formType = 'aclForVoipForm';
    component.patchRule(rule);
  });

  it('should delete form value - Ipv4', () => {
    let formGroup = formBuilder.group({
      IPAddress: 'test-ip',
      Type: 'IPv4'
    });
    component.form = formBuilder.group({
      aclForVoipForm: profileService.getAclForVoipForm()
    });
    component.formType = 'aclForVoipForm';
    component.form.get('aclForVoipForm').get('list4').value.push(formGroup);
    component.rules = [formGroup.value];
    component.deleteRule(0);
  });

  it('should delete form value - Ipv6', () => {
    let formGroup = formBuilder.group({
      IPAddress: 'test-ip',
      Type: 'IPv6'
    });
    component.form = formBuilder.group({
      aclForVoipForm: profileService.getAclForVoipForm()
    });
    component.formType = 'aclForVoipForm';
    component.form.get('aclForVoipForm').get('list6').value.push(formGroup);
    component.rules = [formGroup.value];
    component.deleteRule(0);
  });

  it('should validate IP Address', () => {
    // case 1
    component.formTouched = false;
    component.validateIpAddress();

    // case 2
    let rule = {
      IPAddress: '',
      Type: ''
    };
    component.formTouched = true;
    component.validateIpAddress();

    // case 3 - IPv4
    rule = {
      IPAddress: 'test-ip',
      Type: 'IPv4'
    };
    component.formTouched = true;
    component.rule = rule;
    component.rules = [rule];
    fixture.detectChanges();
    component.validateIpAddress();

    // case 4 - IPv6
    rule = {
      IPAddress: '1234::1234',
      Type: 'IPv6'
    };
    component.formTouched = true;
    component.rule = rule;
    component.rules = [rule];
    fixture.detectChanges();
    component.validateIpAddress();
  });

});
