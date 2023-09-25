import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  error: boolean;
  success: boolean;
  errorInfo: string = '';
  successInfo: string = '';
  AddData: any;
  subscribe: any;
  language: any;
  languageSubject;
  isEditPage = false;
  name: any = '';
  loading: boolean = false;
  btnDisabled: boolean = false;
  baseUrl = `${environment.COC_SERVICES_ACTIVATION_URL}/bandwidthTiers`;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonOrgService: CommonService,
    private translateServie: TranslateService,
    private http: HttpClient
  ) {
    this.language = this.translateServie.defualtLanguage;
    this.languageSubject = this.translateServie.selectedLanguage.subscribe((data: any) => {
      this.language = data;
    });
    this.AddData = {};
    this.AddData.upstreamPir = 0;
    this.AddData.downstreamPir = 0;
    this.AddData.upstreamCir = 0;
    this.AddData.downstreamCir = 0;
    this.name = this.route.snapshot.paramMap.get("name");
    // this.route.params.subscribe(params => {
    //   this.name = params.name;
    // });
  }

  ngOnInit(): void {
    if (this.name) {
      this.isEditPage = true;
      this.getBandwidth();
    }
  }

  getBandwidth() {
    this.loading = true;
    this.btnDisabled = true;
    this.subscribe = this.http.get(`${this.baseUrl}?name=${this.name}`).subscribe((res: any) => {
      if (res) {
        this.AddData.name = res.name;
        this.AddData.upstreamPir = res.upstreamPir;
        this.AddData.downstreamPir = res.downstreamPir;
        this.AddData.upstreamCir = res.upstreamCir;
        this.AddData.downstreamCir = res.downstreamCir;
        this.loading = false;
        this.btnDisabled = false;
      }
    }, (err: HttpErrorResponse) => {
      this.loading = false;
      this.error = true;
      this.btnDisabled = false;
      this.pageErrorHandle(err);
    })
  }

  goToList() {
    this.router.navigate(['/cco/operations/cco-subscriber-operations/templates/bandwidth-tiers/list'])
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.error = false;
      let obj = {
        "name": this.AddData.name,
        "upstreamPir": this.AddData.upstreamPir ? this.AddData.upstreamPir : 0,
        "upstreamCir": this.AddData.upstreamCir ? this.AddData.upstreamCir : 0,
        "downstreamPir": this.AddData.downstreamPir ? this.AddData.downstreamPir : 0,
        "downstreamCir": this.AddData.downstreamCir ? this.AddData.downstreamCir : 0
      }
      this.loading = true;
      this.btnDisabled = true;
      if (this.name == null) {
        this.subscribe = this.http.post(this.baseUrl, obj).subscribe((res: any) => {
          if (res.includes("Successfully")) {
            this.loading = false;
            this.btnDisabled = false;
            this.success = true;
            this.successInfo = res;
            setTimeout(() => {
              this.router.navigate(['/cco/operations/cco-subscriber-operations/templates/bandwidth-tiers/list'])
            }, 500)
          }
          else if (res.includes("exists")) {
            this.loading = false;
            this.btnDisabled = false;
            this.error = true;
            this.errorInfo = res;
          }
        }, (err: HttpErrorResponse) => {
          this.error = true;
          this.loading = false;
          this.btnDisabled = false;
          this.pageErrorHandle(err);
        });
      }
      else {
        this.loading = true;
        this.subscribe = this.http.put(this.baseUrl, obj).subscribe((res: any) => {
          if (res) {
            this.loading = false;
            this.success = true;
            this.btnDisabled = false;
            this.successInfo = res;
            setTimeout(() => {
              this.router.navigate(['/cco/operations/cco-subscriber-operations/templates/bandwidth-tiers/list'])
            }, 500)
          }
        }, (err: HttpErrorResponse) => {
          this.error = true;
          this.loading = false;
          this.btnDisabled = false;
          this.pageErrorHandle(err);
        });
      }
    }
    else {
      this.error = true;
      this.errorInfo = "Please enter required fields."
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.languageSubject) {
      this.languageSubject.unsubscribe();
    }
  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }

  closeAlert() {
    this.error = false;
  }

}
