import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { SubscriberService } from '../service/subscriber.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  language: any;
  languageSubject;
  error: boolean = false;
  voicetype: boolean = false;
  videotype: boolean = false;
  errorInfo: string = "";
  submitted: boolean = false;
  loading: boolean = false;
  success: boolean = false;
  SubscriberForm = this.fb.group({
    Name: ['', Validators.required],
    Servicetype: ['DATA', Validators.required],
    CeVlan: ['', Validators.required],
    Vlans: ['', [Validators.required, Validators.pattern("^[0-9a-zA-Z\,]*$")]],
    VlanMode: ['', Validators.required],
    SubscribersPerVlan: ['', Validators.required],
    priH248GwController: [""],
    secH248GwController: [""],
    sipProxyServerAddress: [""],
    multicastProfile: [""]
  })
  edit: boolean = false;
  name: string;
  successInfo: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private subscriberService: SubscriberService,
    private router: Router,
    private translateService: TranslateService,
    private commonOrgService: CommonService,
    private customTranslateService: CustomTranslateService,) {

  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    })
    this.edit = false;
    this.name = this.route.snapshot.paramMap.get("id");
    if (this.name) {
      this.edit = true;
      this.getsubscriber();
    }
  }

  getsubscriber() {
    this.loading = true;
    this.subscriberService.getsubscriberDetail(this.name).subscribe((data: any) => {
      this.setoption(data);
      this.loading = false;
    },
      (err) => {
        this.error = true;
        this.errorInfo = err.error.message;
        this.loading = false;
      });
  }
  setoption(data) {
    if (data.serviceType == 'VOICE') {
      this.voicetype = true;
      this.SubscriberForm.controls['priH248GwController'].setValidators([Validators.required]);
      this.SubscriberForm.controls['priH248GwController'].updateValueAndValidity();
      this.SubscriberForm.controls['secH248GwController'].setValidators([Validators.required]);
      this.SubscriberForm.controls['secH248GwController'].updateValueAndValidity();
      this.SubscriberForm.controls['sipProxyServerAddress'].setValidators([Validators.required]);
      this.SubscriberForm.controls['sipProxyServerAddress'].updateValueAndValidity();
    }
    if (data.serviceType == 'VIDEO') {
      this.SubscriberForm.controls['multicastProfile'].setValidators([Validators.required]);
      this.SubscriberForm.controls['multicastProfile'].updateValueAndValidity();
      this.videotype = true;
    }
    this.SubscriberForm.patchValue({
      Name: data.name,
      Servicetype: data.serviceType,
      CeVlan: data["ceVlan"],
      Vlans: data.vlans,
      VlanMode: data["vlanMode"],
      SubscribersPerVlan: data.subscribersPerVlan,
      priH248GwController: data.priH248GwController,
      secH248GwController: data.secH248GwController,
      sipProxyServerAddress: data.sipProxyServerAddress,
      multicastProfile: data.multicastProfile
    });
  }
  goToList() {
    this.router.navigate(["/cco/operations/cco-subscriber-operations/templates/subscriber-templates/list"])
  }

  servicetypechanged(event) {
    this.submitted = false;
    if (this.SubscriberForm.value.Servicetype == 'VIDEO') {
      this.SubscriberForm.controls['multicastProfile'].setValidators([Validators.required]);
      this.SubscriberForm.controls['multicastProfile'].updateValueAndValidity();
      this.videotype = true;
    }
    else {
      this.SubscriberForm.controls['multicastProfile'].clearValidators();
      this.SubscriberForm.controls['multicastProfile'].updateValueAndValidity();
      this.videotype = false;
    }

    if (this.SubscriberForm.value.Servicetype == "VOICE") {
      this.voicetype = true;
      this.SubscriberForm.controls['priH248GwController'].setValidators([Validators.required]);
      this.SubscriberForm.controls['priH248GwController'].updateValueAndValidity();
      this.SubscriberForm.controls['secH248GwController'].setValidators([Validators.required]);
      this.SubscriberForm.controls['secH248GwController'].updateValueAndValidity();
      this.SubscriberForm.controls['sipProxyServerAddress'].setValidators([Validators.required]);
      this.SubscriberForm.controls['sipProxyServerAddress'].updateValueAndValidity();
    }
    else {
      this.voicetype = false;
      this.SubscriberForm.controls['priH248GwController'].clearValidators();
      this.SubscriberForm.controls['priH248GwController'].updateValueAndValidity();
      this.SubscriberForm.controls['secH248GwController'].clearValidators();
      this.SubscriberForm.controls['secH248GwController'].updateValueAndValidity();
      this.SubscriberForm.controls['sipProxyServerAddress'].clearValidators();
      this.SubscriberForm.controls['sipProxyServerAddress'].updateValueAndValidity();
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.SubscriberForm.invalid) {
      return;
    }
    let vlan = this.SubscriberForm.value.Vlans;
    vlan = vlan.toString().split(',');
    let data = {
      "name": this.SubscriberForm.value.Name,
      "serviceType": this.SubscriberForm.value.Servicetype,
      "ceVlan": this.SubscriberForm.value.CeVlan,
      "vlanMode": this.SubscriberForm.value.VlanMode,
      "ipAddressingType": "v4",
      "vlans": vlan,
      "subscribersPerVlan": this.SubscriberForm.value.SubscribersPerVlan,
    }
    if (this.SubscriberForm.value.Servicetype == "VOICE") {
      data = Object.assign(data, {
        priH248GwController: this.SubscriberForm.value.priH248GwController,
        secH248GwController: this.SubscriberForm.value.secH248GwController,
        sipProxyServerAddress: this.SubscriberForm.value.sipProxyServerAddress
      });
    }
    if (this.SubscriberForm.value.Servicetype == "VIDEO") {
      data = Object.assign(data, {
        multicastProfile: this.SubscriberForm.value.multicastProfile
      });
    }
    console.log(data);
    if (this.edit) {
      this.loading = true;
      this.subscriberService.putdata(data).subscribe((data: any) => {
        this.loading = false;
        this.success = true;
        this.successInfo = data;
        $("html, body").animate({ scrollTop: 0 }, "slow");
        setTimeout(() => {
          this.router.navigate(["/cco/operations/cco-subscriber-operations/templates/subscriber-templates/list"])
        }, 500)
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.error = true;
        this.errorInfo = err.error.message;
        $("html, body").animate({ scrollTop: 0 }, "slow");
      })
    }
    else {
      this.loading = true;
      this.subscriberService.postdata(data).subscribe((data: any) => {
        if (data.message) {
          this.loading = false;
          this.error = true;
          this.errorInfo = data.message;
          $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        else {
          this.loading = false;
          this.success = true;
          this.successInfo = data;
          $("html, body").animate({ scrollTop: 0 }, "slow");
          setTimeout(() => {
            this.router.navigate(["/cco/operations/cco-subscriber-operations/templates/subscriber-templates/list"])
          }, 500)
        }

      }, (err) => {
        this.loading = false;
        this.error = true;
        this.errorInfo = err.error.message;
        $("html, body").animate({ scrollTop: 0 }, "slow");
      })
    }

  }

  pageErrorHandle(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.errorInfo = this.language['Access Denied'];
    } else {
      this.errorInfo = this.commonOrgService.pageErrorHandle(err);
    }
  }
}
