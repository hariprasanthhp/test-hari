import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { MycommunityIqService } from '../services/mycommunity-iq.service';
import { USOCUploadComponent } from './usoc-upload.component';
import { errorStatus401, errorStatus503, errorStatus504 } from 'src/assets/mockdata/shared/error.data';

describe('USOCUploadComponent', () => {
  let component: USOCUploadComponent;
  let fixture: ComponentFixture<USOCUploadComponent>;
  let router: Router;
  let service: MycommunityIqService;
  let languageService: TranslateService;
  let http: HttpTestingController



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [Title, TranslateService, MycommunityIqService, SsoAuthService,
      ],
      declarations: [USOCUploadComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USOCUploadComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MycommunityIqService)
    languageService = TestBed.inject(TranslateService)
    router = TestBed.inject(Router)
    http = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

  it('should initialize UsocUpload Details', () => {
    languageService.selectedLanguage.subscribe(data => {
      component.language = data
    })
    const testUSOCText = fixture.debugElement.query(By.css('h4'))
    expect(testUSOCText.nativeElement.textContent).toEqual(' USOC File Upload')
  });


  it('should closeAlert', () => {
    spyOn(component, 'closeAlert').and.callThrough()
    expect(component.error).toBeUndefined()
    expect(component.success).toBeUndefined()
  })


  it('should handle Error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus401)
    expect(component.errorInfo).toBe("Access Denied");
  });


  it('should go to instructon Details', () => {
    spyOn(component, 'GoInstruction').and.callThrough()
    component.GoInstruction()
    expect(component.GoInstruction).toHaveBeenCalled()
  })


  it('should gateway Error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus504)
    expect(component.errorInfo).toBe("Gateway Timeout");
  });
  

  it('should unavailable Error', () => {
    spyOn(component, 'pageErrorHandle').and.callThrough()
    component.pageErrorHandle(errorStatus503)
    expect(component.errorInfo).toBe("Service Temporarily Unavailable");
  });

  it('should handle redoUrl details', () => {
    let e = {
      target:
      {
        files:
        {
          "0": { name: 'usoc_1line.csv', lastModified: 1666267809541, size: 145, type: "text/csv", webkitRelativePath: "" }
        }
      }
    }
    spyOn(component, 'readURL').and.callThrough()
    component.readURL(e)
    expect(component.uploadfile).toBe('usoc_1line.csv')
    expect(component.hideUpload).toBe(true)
  })

  it('should get fullimportUpload', () => {
    let file: any = new Blob([JSON.stringify({ name: 'usoc_1line.csv', lastModified: 1666267809541, size: 145, type: "text/csv", webkitRelativePath: "" })], { type: "text/csv" })
    component.file = file
    component.file.name = 'usoc_1line.csv'
    let formData = new FormData()
    formData.append('usoc_1line.csv', component.file, component.file.name)
    spyOn(component, 'fullImportUpload').and.callThrough()
    component.fullImportUpload()
    const req = http.expectOne(request => request.url.includes('billing-upload-service/usoc'))
    expect(req.request.method).toBe('PUT');
    req.flush('usoc_1line.csv uploaded.');
    expect(component.fullImportUpload).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});






