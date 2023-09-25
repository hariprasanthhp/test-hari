import { Component, OnInit } from '@angular/core';
//import { request } from 'http';
import { SupportWifiService } from '../services/support-wifi.service';
import { TranslateService } from 'src/app-services/translate.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-wan-failover',
  templateUrl: './wan-failover.component.html',
  styleUrls: ['./wan-failover.component.scss']
})
export class WanFailoverComponent implements OnInit {
  userid
  sitescanres
  selectssid: any = false;
  selectedssidname: any = "";
  radioselectiondata: any;
  radioselectionsecuritytype: any;
  language: any = {};
  languageSubject;
  form: FormGroup;
  showPassPhrase: boolean = false
  password = "";
  bgTest: boolean = false;
  Captiveportal: boolean = false;
  Staffnetwork: boolean = false;
  POS: boolean = true;
  Primarynetwork: boolean = true;
  backupwanwifires
  selectdisable: boolean = true;

  posdisable: boolean = true;
  primarynetworkdisable: boolean = true;
  testhotspotdisable: boolean = true;
  passworddisable: boolean = true;
  hotspotnamedisable: boolean = true;
  hotspotbuttonvisibility: boolean = true;
  hotspotnamefrombakwan
  hotspotnamefromssidoverlayselection
  initialbackwanid
  public errorMsg: string;
  successmsg: boolean = false
  failedmsg: boolean = false
  formloader: boolean = false
  overlayloader: boolean = false;
  isError: boolean = false;
  idforstoptest
  bakwanreslenght
  sitescanreslength
  passlengthcheck
  teststatusres
  teststatuscheck

  constructor(
    private api: SupportWifiService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private ssoAuthService: SsoAuthService,
    private titleService: Title
  ) {
    this.userid = localStorage.getItem('ciquserid');
  }

  ngOnInit(): void {
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.titleService.setTitle(`${this.language['Network Resilience']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    });
    this.titleService.setTitle(`${this.language['Network Resilience']} - ${this.language['Wifi']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
    this.backupwanwifi();
  }
  showPassPhrasefun() {
    this.showPassPhrase = !this.showPassPhrase;
    //console.log("password", this.password)
  }
  runSiteScan() {
    this.selectdisable = true;
    this.sitescanres = ""
    this.overlayloader = true
    const request = {
      "userId": this.userid
    };
    this.api.sitestartbw(request).subscribe((res: any) => {
      //console.log("sitestartbw", res)
      setTimeout(() => {

        let i = 0;
        this.sitescanresult();
        const statusInterval = setInterval(() => {
          i++;
          if (!this.sitescanreslength) {
            this.sitescanresult();
            clearInterval(statusInterval);
          } else if (i == 3) {
            clearInterval(statusInterval);
          } else {
            clearInterval(statusInterval);
          }
        }, 1000);
      }, 1000);

    }, err => {
      this.overlayloader = false
      this.pageErrorHandle(err);
    });
  }
  sitescanresult() {
    this.sitescanreslength = ""
    this.api.sitescanresultbw(this.userid).subscribe((res: any) => {
      this.overlayloader = false
      this.sitescanres = res.wifis
      this.sitescanreslength = this.sitescanres?.length
      /*if (this.sitescanres && this.sitescanres?.length) {
        this.radioselectiondata = this.sitescanres[this.sitescanres?.length - 1].ssid
        this.radioselectionsecuritytype = this.sitescanres[this.sitescanres?.length - 1].securityType
       // this.selectdisable = false

      }*/
    }, err => {
      this.overlayloader = false
      this.pageErrorHandle(err);
    });
  }
  backupwanwifi() {
    this.formloader = true
    this.api.backupwanwifi(this.userid).subscribe((res: any) => {
      this.formloader = false
      if (res.backupWifis.length) {
        this.backupwanwifires = res.backupWifis[0]
        this.Captiveportal = this.backupwanwifires.appliedTraffic.customer;
        this.Staffnetwork = this.backupwanwifires.appliedTraffic.staff;
        this.POS = this.backupwanwifires.appliedTraffic.pos;
        this.Primarynetwork = this.backupwanwifires.appliedTraffic.owner;
        this.password = this.backupwanwifires.password;
        this.selectedssidname = this.backupwanwifires.ssid
        this.hotspotnamefrombakwan = this.backupwanwifires.ssid
        this.initialbackwanid = this.backupwanwifires.id
        this.idforstoptest = this.backupwanwifires.id
        let isback = true
        this.teststatus(isback)
        if (this.backupwanwifires.ssid) {
          // this.hotspotnamedisable = false
          this.passworddisable = false
        }
        if (this.backupwanwifires.password) {  // secured user 
          this.testhotspotdisable = false;
        }
        else {
          this.passworddisable = true
          this.testhotspotdisable = false;
        }

      }
    }, err => {
      this.formloader = false

      this.pageErrorHandle(err);
    });
  }
  backupwanadd(request) {
    this.api.backupwanwifiadd(request).subscribe((res: any) => {

    }, err => {
      //  this.pageErrorHandle(err);
    });
  }
  updateStaffnetworkwhiletoggle(event) {
    if (this.hotspotnamefrombakwan) {
      if (this.hotspotnamefrombakwan == this.hotspotnamefromssidoverlayselection || this.hotspotnamefrombakwan && !this.hotspotnamefromssidoverlayselection) {
        this.formloader = true

        const request = {
          "userId": this.userid,
          "id": this.initialbackwanid,
          "ssid": this.selectedssidname,
          "password": this.password,
          "appliedTraffic": {
            "owner": this.Primarynetwork,
            "staff": event.target.checked,
            "customer": this.Captiveportal,
            "pos": this.POS
          }
        };
        this.api.backupwanwifiupdate(request).subscribe((res: any) => {
          this.formloader = false
        }, err => {
          this.pageErrorHandle(err);
          this.formloader = false
        });
      }
    }
  }
  updateCaptiveportalwhiletoggle(event) {
    if (this.hotspotnamefrombakwan) {
      if (this.hotspotnamefrombakwan == this.hotspotnamefromssidoverlayselection || this.hotspotnamefrombakwan && !this.hotspotnamefromssidoverlayselection) {
        this.formloader = true

        const request = {
          "userId": this.userid,
          "id": this.initialbackwanid,
          "ssid": this.selectedssidname,
          "password": this.password,
          "appliedTraffic": {
            "owner": this.Primarynetwork,
            "staff": this.Staffnetwork,
            "customer": event.target.checked,
            "pos": this.POS
          }
        };
        this.api.backupwanwifiupdate(request).subscribe((res: any) => {
          this.formloader = false
        }, err => {
          this.pageErrorHandle(err);
          this.formloader = false
        });
      }
    }
  }
  /* backupwandelete(){
     this.api.backupwanwifidelete(this.userid, id: any).subscribe((res: any) => {
     
     }, err => {
       //this.pageErrorHandle(err);
     });
   }
   teststart(){
     this.api.teststartbw(request).subscribe((res: any) => {
     
     }, err => {
      // this.pageErrorHandle(err);
     });
   }
   
   teststop(){
     this.api.teststopbw(request).subscribe((res: any) => {
     
     }, err => {
      // this.pageErrorHandle(err);
     });
   }
 */
  teststatus(isback) {
    if (isback) { this.formloader = true }
    this.teststatuscheck = false
    this.api.teststatusbw(this.userid, this.initialbackwanid).subscribe((res: any) => {
      this.formloader = false

      /* if (res?.result == 'failed') {
         this.hotspotbuttonvisibility = true
       }
       else {
         this.hotspotbuttonvisibility = false
       }*/

      if (res?.failReason == "" && res?.result == "success") {
        this.hotspotbuttonvisibility = false
      }
      else {
        this.teststatuscheck = true
        this.hotspotbuttonvisibility = true
      }

    }, err => {

      this.formloader = false
      this.pageErrorHandle(err);
    });
  }

  SignalStrength(type) {
    let image;
    let type1 = parseInt(type);
    if (type1 == 0) {
      return image = './assets/images/wifi-icons/WiFi0.png';
    }
    else {
      return image = './assets/images/wifi-icons/WiFi' + type1 + '.svg';
    }

    /*let type1 = parseInt(type);
    let image;
   
      if (type1 >= -50)
        return image = './assets/images/wifi-icons/WiFi3.svg';
      else if (type1 >= -66 && type1 <= -51)
        return image = './assets/images/wifi-icons/WiFi2.svg';
      else if (type1 >= -69 && type1 <= -67)
        return image = './assets/images/wifi-icons/WiFi1.svg';
      else if (type1 >= -79 && type1 <= -70)
        return image = './assets/images/SignalIcons/signalstrength02.png';
      else if (type1 <= -80)
        return image = './assets/images/wifi-icons/WifiUnavailable.svg';
    */

  }

  selectssidfun(state, ssid, securitytype) {
    this.selectdisable = false
    this.radioselectiondata = ssid
    this.radioselectionsecuritytype = securitytype
    //console.log('state,ssid', state, ssid,securitytype)

  }

  selectssidoverlay() {
    this.selectedssidname = this.radioselectiondata
    this.hotspotnamefromssidoverlayselection = this.radioselectiondata
    //console.log('radioselectiondata', this.radioselectiondata ,"radioselectionsecuritytype",this.radioselectionsecuritytype)
    //this.hotspotnamedisable = false
    if (this.radioselectionsecuritytype == 0) {
      this.passworddisable = true
      this.testhotspotdisable = false;
      this.password = ""
    }
    else {
      this.passworddisable = false
      this.password = ""
      this.testhotspotdisable = true;
    }
  }
  bakwanandtestapi() {
    this.bakwanreslenght = ""
    this.api.backupwanwifi(this.userid).subscribe((res: any) => {
      this.formloader = false
      // console.log("backwanwificall")
      this.bakwanreslenght = res?.backupWifis?.length
      if (this.bakwanreslenght) {
        this.hotspotnamefrombakwan = res?.backupWifis[0]?.ssid
        //  console.log("backwanwificall if length")

        this.initialbackwanid = res?.backupWifis[0]?.id

        this.testapicall(this.initialbackwanid);
      }
    }, err => {
      this.formloader = false
      this.pageErrorHandle(err);
    });
  }

  testhotspotclick() {

    // console.log("this.selectedssidname", this.selectedssidname, "this.password", this.password, "Primarynetwork", this.Primarynetwork, "Staffnetwork", this.Staffnetwork)
    // console.log("hotspotnamefrombakwan", this.hotspotnamefrombakwan, "hotspotnamefromssidoverlayselection", this.hotspotnamefromssidoverlayselection)
    this.formloader = true

    if (!this.hotspotnamefrombakwan) //firsttime coming to  wan failover 
    {
      // console.log("new one")
      const request = {
        "userId": this.userid,
        "ssid": this.selectedssidname,
        "password": this.password,
        "appliedTraffic": {
          "owner": this.Primarynetwork,
          "staff": this.Staffnetwork,
          "customer": this.Captiveportal,
          "pos": this.POS
        }
      };
      // this.backupwanadd(request)
      this.api.backupwanwifiadd(request).subscribe((res: any) => {
        setTimeout(() => {
          let i = 0;
          this.bakwanandtestapi();
          const statusInterval = setInterval(() => {
            i++;
            // console.log("this.bakwanreslenght",this.bakwanreslenght)
            if (!this.bakwanreslenght) {
              clearInterval(statusInterval);
              this.bakwanandtestapi();
            } else if (i == 3) {
              clearInterval(statusInterval);
            } else {
              clearInterval(statusInterval);
            }
          }, 10000);
        }, 10000)

      }, err => {
        this.pageErrorHandle(err);
        this.formloader = false

      });
      // 1. add api 2. backupwan/wifi -get id  3. test start 4. test status -> success -> popup and else-error popup  button name change 
    }
    else
    // else if (this.hotspotnamefrombakwan == this.hotspotnamefromssidoverlayselection || this.hotspotnamefrombakwan && !this.hotspotnamefromssidoverlayselection) // user selected old ssidname 
    {
      // console.log("old one update", this.initialbackwanid)

      const request = {
        "userId": this.userid,
        "id": this.initialbackwanid,
        "ssid": this.selectedssidname,
        "password": this.password,
        "appliedTraffic": {
          "owner": this.Primarynetwork,
          "staff": this.Staffnetwork,
          "customer": this.Captiveportal,
          "pos": this.POS
        }
      };


      this.api.backupwanwifiupdate(request).subscribe((res: any) => {
        setTimeout(() => {

          let i = 0;
          this.bakwanandtestapi();
          const statusInterval = setInterval(() => {
            i++;
            if (!this.bakwanreslenght) {
              clearInterval(statusInterval);
              this.bakwanandtestapi();
            } else if (i == 3) {
              clearInterval(statusInterval);
            } else {
              clearInterval(statusInterval);
            }

          }, 10000);
        }, 10000)

      }, err => {
        this.pageErrorHandle(err);
        this.formloader = false

      });

      // 1. update api 2. backupwan/wifi - get id 3. test start 4. test status -> success -> popup and else-error popup  button name change 

    }
    /* else // user selected new ssid name 
     {
       // console.log("delete and add", this.initialbackwanid)
 
       this.api.backupwanwifidelete(this.userid, this.initialbackwanid).subscribe((res: any) => {
         setTimeout(() => {
 
           //if (res=='success')
           const request = {
             "userId": this.userid,
             "ssid": this.selectedssidname,
             "password": this.password,
             "appliedTraffic": {
               "owner": this.Primarynetwork,
               "staff": this.Staffnetwork,
               "customer": this.Captiveportal,
               "pos": this.POS
             }
           };
 
           // this.backupwanadd(request)
           this.api.backupwanwifiadd(request).subscribe((res: any) => {
             setTimeout(() => {
 
               let i = 0;
               this.bakwanandtestapi();
 
               const statusInterval = setInterval(() => {
                 i++;
                 if (!this.bakwanreslenght) {
                   clearInterval(statusInterval);
                   this.bakwanandtestapi();
                 } else if (i == 3) {
                   this.formloader = false
                   clearInterval(statusInterval);
                 } else {
                   clearInterval(statusInterval);
                 }
 
               }, 10000);
             }, 10000)
 
           }, err => {
             this.formloader = false
             this.pageErrorHandle(err);
           });
         }, 10000)
 
       }, err => {
         this.formloader = false
         this.pageErrorHandle(err);
       });
 
       // 1. delete api -> add api 2. backupwan/wifi 3. test start 4. test status -> success -> popup and else-error popup  button name change 
     }*/

  }
  teststatusintervalcall(idfrombackwan) {
    this.teststatusres = false
    this.api.teststatusbw(this.userid, idfrombackwan).subscribe((res: any) => {
      if (res?.result == 'success') {
        this.teststatusres = true
        this.hotspotbuttonvisibility = false
        this.successmsg = true
        this.formloader = false
        setTimeout(() => {

          let i = 0;
          let isback = false
          this.teststatus(isback);
          const statusInterval = setInterval(() => {
            i++;
            // console.log("this.bakwanreslenght",this.bakwanreslenght)
            if (!this.teststatuscheck && i != 3) {
              this.teststatus(isback)
            } else if (i == 3) {
              this.teststatuscheck = false
              clearInterval(statusInterval);
            } else {
              clearInterval(statusInterval);
            }
          }, 60000);

        }, 60000)
      }
      else if (res?.result == 'failed') {
        this.teststatusres = true
        this.hotspotbuttonvisibility = true
        this.failedmsg = true
        this.formloader = false
      }
      else {
        this.teststatusres = false
      }

    }, err => {
      this.formloader = false
      this.pageErrorHandle(err);
    });

  }
  testapicall(idfrombackwan) {
    this.formloader = true

    this.idforstoptest = idfrombackwan
    const request = {
      "userId": this.userid,
      "id": idfrombackwan
    };
    this.api.teststartbw(request).subscribe((res: any) => {
      setTimeout(() => {

        let i = 0;
        this.teststatusintervalcall(idfrombackwan);
        const statusInterval = setInterval(() => {
          i++;
          // console.log("this.bakwanreslenght",this.bakwanreslenght)
          if (!this.teststatusres && i != 17) {
            this.teststatusintervalcall(idfrombackwan);
          } else if (i == 17) {
            this.teststatusres = true
            this.hotspotbuttonvisibility = true
            this.failedmsg = true
            this.formloader = false
            clearInterval(statusInterval);
          } else {
            clearInterval(statusInterval);
          }
        }, 10000);

      }, 10000)
    }, err => {
      this.formloader = false
      this.pageErrorHandle(err);
    });


  }
  endhotspotclick() {
    this.formloader = true

    const request = {
      "userId": this.userid,
      "id": this.idforstoptest
    };
    this.api.teststopbw(request).subscribe((res: any) => {
      this.formloader = false
      this.hotspotbuttonvisibility = true
    }, err => {
      this.formloader = false
      this.pageErrorHandle(err);
    });
  }

  selectoverlay() {
    this.runSiteScan()
  }
  onKeyPhraseChange(event) {
    this.password = this.password.trim();
    let passwordentered = event.target.value;
    if (passwordentered.length >= 8) {
      this.testhotspotdisable = false;
      this.passlengthcheck = false
    }
    else {
      this.testhotspotdisable = true;
      this.passlengthcheck = true
    }


  }

  pageErrorHandle(err: any) {
    if (err.status === 401) {
      this.errorMsg = this.language['Access Denied'];
    } else {
      this.errorMsg = this.ssoAuthService.pageErrorHandle(err);
    }
    this.isError = true;
    //console.log("error from pagerror handler", this.errorMsg)
  }

}
