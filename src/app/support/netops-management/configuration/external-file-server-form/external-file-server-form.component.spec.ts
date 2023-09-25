import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Router } from '@angular/router';
import { ExternalFileServerService } from '../../shared/service/external-file-server.service';

import { ExternalFileServerFormComponent } from './external-file-server-form.component';

describe('ExternalFileServerFormComponent', () => {
  let component: ExternalFileServerFormComponent;
  let fixture: ComponentFixture<ExternalFileServerFormComponent>;
  let router: Router;
  let sso: SsoAuthService;
  let externalFileServerService: ExternalFileServerService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalFileServerFormComponent],
      imports: [
        HttpClientTestingModule
, RouterTestingModule, FormsModule, ReactiveFormsModule
      ],
      providers: [TranslateService, Title, SsoAuthService, ExternalFileServerService]
    })
      .compileComponents()
      .then(() => {
        externalFileServerService = TestBed.inject(ExternalFileServerService);
        router = TestBed.inject(Router);
        sso = TestBed.inject(SsoAuthService);
        fixture = TestBed.createComponent(ExternalFileServerFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('should initialized onInit()', () => {
    spyOn(component, 'fetchExternalFileServer').and.callThrough();
    component.ngOnInit();
    // expect(component.dtOptions.pageLength).toBe(20, "Table length is not assigned");
    expect(component.fetchExternalFileServer).toHaveBeenCalled();
    expect(component.fetchExternalFileServer).toHaveBeenCalledTimes(1);
});
});
