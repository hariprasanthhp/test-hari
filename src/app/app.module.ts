import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgScrollbarModule } from "ngx-scrollbar";

import { HttpConfigInterceptor } from "./shared/services/httpconfig.interceptor";
import { GlobalErrorHandler } from "./shared/services/global-error-handler";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SelectDropdownComponent } from './shared/components/select-dropdown/select-dropdown.component';


import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SubscriberOverviewComponent } from './subscriber-overview/subscriber-overview.component';
import { SubscriberSubHeaderComponent } from './subscriber-sub-header/subscriber-sub-header.component';
import { SubscriberTabOptionComponent } from './subscriber-tab-option/subscriber-tab-option.component';
import { CardViewComponent } from './layout/card-view/card-view.component';

import { SampleTopologyComponent } from './sample-topology/sample-topology.component';
import { LogoutComponent } from './logout/logout.component';
import { BlockPageTemplateViewComponent } from './shad/block-page-template-view/block-page-template-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { WindowRefService } from './shared/services/window-ref.service';
import { EntitelmentsComponent } from './entitelments/entitelments.component';
import { ColorPickerService } from 'ngx-color-picker';
import { MicrositePreviewComponent } from './microsite-preview/microsite-preview.component';
import { RedirectComponent } from './redirect/redirect.component';
import { SharedModule } from './shared/shared.module';
import { CaptivePortalPreviewComponent } from './captive-portal-preview/captive-portal-preview.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        SelectDropdownComponent,
        SubscriberOverviewComponent,
        SubscriberSubHeaderComponent,
        SubscriberTabOptionComponent,
        CardViewComponent,
        SampleTopologyComponent,
        LogoutComponent,
        BlockPageTemplateViewComponent,
        EntitelmentsComponent,
        MicrositePreviewComponent,
        RedirectComponent,
        CaptivePortalPreviewComponent,

    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NgxSpinnerModule,
        AppRoutingModule,
        HighchartsChartModule,
        DataTablesModule,
        HttpClientModule,
        NgScrollbarModule,
        NgSelectModule,
        CalendarModule,
        SharedModule

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: WindowRefService },
    { provide: ColorPickerService },
        DataTablesModule

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
