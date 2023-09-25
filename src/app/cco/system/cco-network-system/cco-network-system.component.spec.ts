import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { CcoCommonService } from '../../shared/services/cco-common.service';

import { CcoNetworkSystemComponent } from './cco-network-system.component';
import { SystemTableViewComponent } from 'src/app/cco/system/cco-network-system/system-table-view/system-table-view.component';

describe('CcoNetworkSystemComponent', () => {
  let component: CcoNetworkSystemComponent;
  let fixture: ComponentFixture<CcoNetworkSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcoNetworkSystemComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'cco/system/cco-network-system/system-table-view', component: SystemTableViewComponent }
        ]),
        HttpClientTestingModule

      ],
      providers: [TranslateService,
        CcoCommonService,
        SsoAuthService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcoNetworkSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
