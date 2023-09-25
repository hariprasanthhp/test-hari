import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandiqUpdateComponent } from './commandiq-update.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { ColorPickerService } from 'ngx-color-picker';
const routes: Routes = [];

describe('CommandiqUpdateComponent', () => {
  let component: CommandiqUpdateComponent;
  let fixture: ComponentFixture<CommandiqUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [        RouterTestingModule.withRoutes(routes),
         HttpClientTestingModule],
      declarations: [ CommandiqUpdateComponent ],
      providers: [ColorPickerService], 

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandiqUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
