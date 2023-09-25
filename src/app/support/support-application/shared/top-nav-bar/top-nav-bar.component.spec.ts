import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavBarComponent } from './top-nav-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from 'src/app-services/translate.service';

describe('TopNavBarComponent', () => {
  let component: TopNavBarComponent;
  let fixture: ComponentFixture<TopNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavBarComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        TranslateService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test component', () => {
    component.translateService.selectedLanguage.next({});
    component.ngOnInit();
    component.ngOnDestroy();
    component.menus = [
      {
        label: 'Primary Network',
        value: 'primary-network',
        state: 'active',
      },
      {
        label: 'Staff Network',
        value: 'staff-network',
        display: false,
      },
    ];
    component.initMenus();
    component.tabSelectedEvent('primary')
  });
});
