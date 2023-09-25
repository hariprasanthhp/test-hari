import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandiqProCreateComponent } from './commandiq-pro-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CommandiqProCreateComponent', () => {
  let component: CommandiqProCreateComponent;
  let fixture: ComponentFixture<CommandiqProCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandiqProCreateComponent ],
      imports: [RouterTestingModule,HttpClientModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandiqProCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
