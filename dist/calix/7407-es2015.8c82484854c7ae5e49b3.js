"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[7407],{57581:function(t,e,o){o.r(e),o.d(e,{OutliersWorkflowModule:function(){return X}});var n=o(38583),i=o(39895),s=o(92340),l=(()=>{return(t=l||(l={})).DETAILS_LABEL="Details",t.SYSTEMS_LABEL="OLT System",t.RECEPIENTS_LABEL="Recipients",t.SUMMARY_LABEL="Summary",l;var t})(),r=o(2792),a=o(37716),c=o(7450),u=o(39075),d=o(79765);let g=(()=>{class t{constructor(){this.outlierTabChanged$=new d.xQ}setOutlierTabChange(){this.outlierTabChanged$.next(!0)}updateRegLoc(t){var e,o,n,i,s,l;if(null==t?void 0:t.region){if(-1!==(null===(e=null==t?void 0:t.region)||void 0===e?void 0:e.indexOf("All"))){let e=null===(o=null==t?void 0:t.region)||void 0===o?void 0:o.indexOf("All");-1!==e&&(null===(n=null==t?void 0:t.region)||void 0===n||n.splice(e,1,"11111111-1111-1111-1111-111111111111"))}}else t.region=["11111111-1111-1111-1111-111111111111"];if(null==t?void 0:t.location){if(-1!==(null===(i=null==t?void 0:t.location)||void 0===i?void 0:i.indexOf("All"))){let e=null===(s=null==t?void 0:t.location)||void 0===s?void 0:s.indexOf("All");-1!==e&&(null===(l=null==t?void 0:t.location)||void 0===l||l.splice(e,1,"11111111-1111-1111-1111-111111111111"))}}else t.location=["11111111-1111-1111-1111-111111111111"];return t}updateRegLocToAll(t){var e,o,n,i,s,l;if(null==t?void 0:t.region){if(-1!==(null===(e=null==t?void 0:t.region)||void 0===e?void 0:e.indexOf("11111111-1111-1111-1111-111111111111"))){let e=null===(o=null==t?void 0:t.region)||void 0===o?void 0:o.indexOf("11111111-1111-1111-1111-111111111111");-1!==e&&(null===(n=null==t?void 0:t.region)||void 0===n||n.splice(e,1,"All"))}}else t.region=["All"];if(null==t?void 0:t.location){if(-1!==(null===(i=null==t?void 0:t.location)||void 0===i?void 0:i.indexOf("11111111-1111-1111-1111-111111111111"))){let e=null===(s=null==t?void 0:t.location)||void 0===s?void 0:s.indexOf("11111111-1111-1111-1111-111111111111");-1!==e&&(null===(l=null==t?void 0:t.location)||void 0===l||l.splice(e,1,"All"))}}else t.location=["All"];return t}getType(){return this.type}setType(t){t&&(this.type=t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var f=o(49342),p=o(91841),h=o(9128),b=o(48483),w=o(12664),m=o(27946),O=o(3679),v=o(40205),k=o(88002),A=o(5304),y=o(38048),_=o(14541),x=o(21693),j=o(86640);function C(t,e){if(1&t&&(a.TgZ(0,"div",14),a.TgZ(1,"p"),a._uU(2),a.qZA(),a.qZA()),2&t){const t=a.oxw();a.xp6(2),a.hij("",t.language["This field is required"],".")}}function Z(t,e){if(1&t&&(a.TgZ(0,"div",14),a.TgZ(1,"p"),a._uU(2),a.qZA(),a.qZA()),2&t){const t=a.oxw();a.xp6(2),a.hij("",t.language["This field is required"],".")}}function T(t,e){if(1&t&&(a.TgZ(0,"div",14),a.TgZ(1,"p"),a._uU(2),a.qZA(),a.qZA()),2&t){const t=a.oxw();a.xp6(2),a.hij("",t.language["This field is required"],".")}}let M=(()=>{class t{constructor(t,e,o,n,i,s,l){this.translateService=t,this.fb=e,this.otlrWrkflwSrvc=o,this.http=n,this.sso=i,this.chartOptionService=s,this.issueService=l,this.loading=!1,this.regionsDataArray=["All"],this.locationDataArray=["All"],this.systemDataArray=["All"],this.submitted=!1,this.isFormValid=new a.vpe,this.systemForm=this.fb.group({regions:["All",O.kI.required],locations:["All",O.kI.required],systems:["All",O.kI.required]})}set workflowObj(t){console.log(t),this._workflowObj=t}get workflowObj(){return this._workflowObj}ngOnInit(){var t,e,o,n,i,s,l,r,a;this.tabSub=this.otlrWrkflwSrvc.outlierTabChanged$.subscribe(t=>{this.submitted=!0}),this.getRegions(),this.systemForm.patchValue({regions:(null===(e=null===(t=this.workflowObj)||void 0===t?void 0:t.regions)||void 0===e?void 0:e.length)?null===(o=this.workflowObj)||void 0===o?void 0:o.regions:["All"],locations:(null===(i=null===(n=this.workflowObj)||void 0===n?void 0:n.locations)||void 0===i?void 0:i.length)?null===(s=this.workflowObj)||void 0===s?void 0:s.locations:["All"],systems:(null===(r=null===(l=this.workflowObj)||void 0===l?void 0:l.systems)||void 0===r?void 0:r.length)?null===(a=this.workflowObj)||void 0===a?void 0:a.systems:["All"]}),this.formSub=this.systemForm.valueChanges.subscribe(t=>{this.workflowObj.regions=null==t?void 0:t.regions,this.workflowObj.locations=null==t?void 0:t.locations,this.workflowObj.systems=null==t?void 0:t.systems,this.isFormValid.emit(this.systemForm.valid)}),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(t=>{this.language=t})}getRegions(){this.regionsSubject=this.issueService.getRegions().subscribe(t=>{var e;t&&((t=this.issueService.appendFqn(t)).sort(),this.regionsDataArray=[...this.regionsDataArray,...t],console.log(this.regionsDataArray),(null===(e=this._workflowObj)||void 0===e?void 0:e.regions)&&(this.systemForm.get("regions").setValue(this._workflowObj.regions),this.loadLocationValue("")))},t=>{console.log(t)})}loadLocationValue(t){let e=this.systemForm.get("regions").value;if(null==e?void 0:e.length){let t="";if(e.length){if(-1!==e.indexOf("All"))return this.locationDataArray=["All"],void this.systemForm.get("locations").setValue(["All"]);e.forEach(e=>{"All"!=e&&(t+=`&region=${e}`)}),this.locationsSubject=this.http.get(`${s.N.API_BASE_URL}nfa/locations?tenant=0${t}`).pipe((0,k.U)(t=>(t.sort((t,e)=>(t.name||"").toString().localeCompare((e.name||"").toString(),"en",{numeric:!1})),t)),(0,A.K)(this.handleError)).subscribe(t=>{var e;t=this.issueService.appendFqn(t),this.chartOptionService.setLocationsInfo(t),this.locationDataArray=["All"],this.locationDataArray=[...this.locationDataArray,...t],(null===(e=this._workflowObj)||void 0===e?void 0:e.locations)&&this.systemForm.get("locations").setValue(this._workflowObj.locations);let o=this.systemForm.get("locations").value;if(o&&o.length){let t=this.chartOptionService.getLocationsObj(),e=Object.keys(t).length?Object.keys(t):[],n=[];o.forEach(t=>{-1!==e.indexOf(t)&&n.push(t)}),n.length||(n=["All"]),this.systemForm.get("locations").setValue(n),this.loadSystemValue()}},t=>{})}else this.systemForm.get("regions").setValue(["All"]),this.systemForm.get("locations").setValue(["All"]),this.locationDataArray=["All"]}else this.systemForm.get("regions").setValue(["All"]),this.systemForm.get("locations").setValue(["All"]),this.systemForm.get("systems").setValue(["All"])}loadSystemValue(t){let e=this.systemForm.get("regions").value,o=this.systemForm.get("locations").value,n=this.systemForm.get("systems").value;if(e.length&&o.length&&-1===o.indexOf("All")){let t="";e.forEach(e=>{"All"!=e&&(t&&(t+="&"),t+=`region=${e}`)});let i="";o.forEach(t=>{"All"!=t&&(i+=`&location=${t}`)}),this.systemsSubject=this.http.get(`${s.N.API_BASE_URL}nfa/systems?${t}${i}`).pipe((0,k.U)(t=>(t.sort((t,e)=>(t.name||"").toString().localeCompare((e.name||"").toString(),"en",{numeric:!1})),t)),(0,A.K)(this.handleError)).subscribe(t=>{if(this.chartOptionService.setSystemsInfo(t),this.systemDataArray=["All"],this.systemDataArray=[...this.systemDataArray,...t],n&&n.length){let t=this.chartOptionService.getSystemsObj(),e=Object.keys(t).length?Object.keys(t):[],o=[];n.forEach(t=>{-1!==e.indexOf(t)&&o.push(t)}),o.length||(o=["All"]),this.systemForm.get("systems").setValue(o)}},t=>{})}else o.length||(this.systemForm.get("locations").setValue(["All"]),this.systemForm.get("systems").setValue(["All"]),this.systemDataArray=["All"])}handleError(t){return(0,v._)(t)}validateRegion(t){let e=this.systemForm.get("regions").value;if("All"===t)e=["All"];else{let t=e.indexOf("All");t>-1&&e.splice(t,1)}this.systemForm.get("regions").setValue(e),this.loadLocationValue("")}validateLocation(t){let e=this.systemForm.get("locations").value;if("All"===t)e=["All"];else{let t=e.indexOf("All");t>-1&&e.splice(t,1)}this.systemForm.get("locations").setValue(e),this.workflowObj.locations=e,this.loadSystemValue("")}validateSystem(t){let e=this.systemForm.get("systems").value;if(e.length)if("All"===t)e=["All"];else{let t=e.indexOf("All");t>-1&&e.splice(t,1)}else e=["All"];this.systemForm.get("systems").setValue(e)}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(c.s),a.Y36(O.qu),a.Y36(g),a.Y36(p.eN),a.Y36(y.t6),a.Y36(_.t),a.Y36(x.v))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-system"]],inputs:{workflowObj:"workflowObj"},outputs:{isFormValid:"isFormValid"},decls:26,vars:24,consts:[[1,"col-md-6"],[1,"row",3,"formGroup"],[1,"col-md-12","px-0"],[1,"cco-secondary-title","pb-1","border-bottom"],[1,"col-md-11"],[1,"pt-2","mb-1"],[1,"col-md-9"],["for","inputEmail3",1,"col-form-label"],[1,"w-100"],["formControlName","regions","bindValue","id","bindLabel","name",3,"multiple","items","clearable","searchable","placeholder","add","remove"],["class","errorMessage",4,"ngIf"],["formControlName","locations","bindValue","id","bindLabel","name",3,"multiple","items","placeholder","clearable","searchable","add","remove"],[1,"col-md-9","mb-3"],["formControlName","systems","bindValue","uuid","bindLabel","name",1,"selectboxwidth",3,"multiple","items","placeholder","clearable","searchable","add","remove"],[1,"errorMessage"]],template:function(t,e){1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a._uU(4),a.qZA(),a.qZA(),a.TgZ(5,"div",4),a.TgZ(6,"p",5),a._uU(7),a.qZA(),a.qZA(),a.TgZ(8,"div",6),a.TgZ(9,"label",7),a._uU(10),a.qZA(),a.TgZ(11,"div",8),a.TgZ(12,"ng-select",9),a.NdJ("add",function(t){return e.validateRegion(t)})("remove",function(t){return e.loadLocationValue(t)}),a.qZA(),a.YNc(13,C,3,1,"div",10),a.qZA(),a.qZA(),a.TgZ(14,"div",6),a.TgZ(15,"label",7),a._uU(16),a.qZA(),a.TgZ(17,"div",8),a.TgZ(18,"ng-select",11),a.NdJ("add",function(t){return e.validateLocation(t)})("remove",function(t){return e.loadSystemValue(t)}),a.qZA(),a.YNc(19,Z,3,1,"div",10),a.qZA(),a.qZA(),a.TgZ(20,"div",12),a.TgZ(21,"label",7),a._uU(22),a.qZA(),a.TgZ(23,"div",8),a.TgZ(24,"ng-select",13),a.NdJ("add",function(t){return e.validateSystem(t)})("remove",function(t){return e.validateSystem(t)}),a.qZA(),a.YNc(25,T,3,1,"div",10),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&t&&(a.xp6(1),a.Q6J("formGroup",e.systemForm),a.xp6(3),a.Oqu(e.language["OLT System"]),a.xp6(3),a.Oqu(e.language["Select a region, location, and OLT system to be included in the report"]),a.xp6(3),a.Oqu(e.language["Region(s)"]),a.xp6(2),a.s9C("placeholder",e.language.region),a.Q6J("multiple",!0)("items",e.regionsDataArray)("clearable",!1)("searchable",!0),a.xp6(1),a.Q6J("ngIf",!1),a.xp6(3),a.hij(" ",e.language["Location(s)"],""),a.xp6(2),a.s9C("placeholder",e.language.Location),a.Q6J("multiple",!0)("items",e.locationDataArray)("clearable",!1)("searchable",!0),a.xp6(1),a.Q6J("ngIf",!1),a.xp6(3),a.hij(" ",e.language["System(s)"],""),a.xp6(2),a.s9C("placeholder",e.language.System),a.Q6J("multiple",!0)("items",e.systemDataArray)("clearable",!1)("searchable",!0),a.xp6(1),a.Q6J("ngIf",!1))},directives:[O.JL,O.sg,j.w9,O.JJ,O.u,n.O5],styles:[""]}),t})();var P=o(67236),S=o(55634);function q(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",19),a.TgZ(1,"span",20),a._UZ(2,"img",21),a.qZA(),a.TgZ(3,"button",22),a.NdJ("click",function(){return a.CHM(t),a.oxw().closeAlert()}),a._UZ(4,"span"),a.qZA(),a._UZ(5,"div",23),a.qZA()}if(2&t){const t=a.oxw();a.xp6(5),a.Q6J("innerHtml",t.errorInfo,a.oJD)}}function I(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",24),a.TgZ(1,"span",25),a._UZ(2,"img",26),a.qZA(),a.TgZ(3,"button",22),a.NdJ("click",function(){return a.CHM(t),a.oxw().success=!1}),a._UZ(4,"span"),a.qZA(),a._UZ(5,"div",23),a.qZA()}if(2&t){const t=a.oxw();a.xp6(5),a.Q6J("innerHtml",t.language[t.successInfo]||t.successInfo,a.oJD)}}const F=function(t,e,o){return{"step-current":t,"":e,"step-done":o}};function N(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"li"),a.TgZ(1,"button",27),a.NdJ("click",function(){const e=a.CHM(t).index;return a.oxw().onTabChange(e)}),a.TgZ(2,"span"),a._uU(3),a.qZA(),a.qZA(),a.qZA()}if(2&t){const t=e.$implicit,o=e.index,n=a.oxw();a.xp6(1),a.s9C("title",n.language[t]||t),a.Q6J("ngClass",a.kEZ(3,F,n.activeTab===t,2===n.tabs.length,n.levelsPassed>o&&n.activeTab!==t)),a.xp6(2),a.Oqu(n.language[t]||t)}}const E=function(t){return{primary:t}};function L(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",28),a.NdJ("click",function(){a.CHM(t);const e=a.oxw();return e.onTabChange(e.selectedTabIndex-1)}),a._UZ(1,"img",29),a._uU(2),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("disabled",0===t.selectedTabIndex)("ngClass",a.VKq(3,E,0!==t.selectedTabIndex)),a.xp6(2),a.hij(" ",t.language["Go back"]," ")}}function J(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",30),a.NdJ("click",function(){a.CHM(t);const e=a.oxw();return e.onTabChange(e.selectedTabIndex+1)}),a._uU(1),a._UZ(2,"img",31),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("disabled",t.disableNextBtn),a.xp6(1),a.hij(" ",t.language.save_and_continue," ")}}function U(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",32),a.NdJ("click",function(){a.CHM(t);const e=a.oxw();return e.deploy(null!=e.workflowObj&&e.workflowObj.status?null==e.workflowObj?null:e.workflowObj.status:"DRAFT")}),a._uU(1),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("disabled",t.disableFinishBtn),a.xp6(1),a.hij(" ",t.language.save_and_pause," ")}}function R(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",33),a.NdJ("click",function(){return a.CHM(t),a.oxw().deploy("RUN")}),a._uU(1),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("disabled",t.disableFinishBtn),a.xp6(1),a.hij(" ",t.language.save_and_activate," ")}}function Y(t,e){if(1&t&&(a.TgZ(0,"div",34),a.TgZ(1,"div",35),a.TgZ(2,"div",36),a.TgZ(3,"span",37),a._uU(4),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&t){const t=a.oxw();a.xp6(4),a.Oqu(t.language.Loading)}}function Q(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"app-details",38),a.NdJ("isFormValid",function(e){return a.CHM(t),a.oxw().validateForm(e)}),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("workflowObj",t.workflowObj)}}function V(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"app-system",38),a.NdJ("isFormValid",function(e){return a.CHM(t),a.oxw().validateForm(e)}),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("workflowObj",t.workflowObj)}}function $(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"app-recepients",39),a.NdJ("isFormValid",function(e){return a.CHM(t),a.oxw().validateForm(e)}),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("dynamicFields",t.recepientFormFields)("dynamicFieldsObj",t.recepientFormFieldsObj)("workflowObj",t.workflowObj)}}function W(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"app-summary",38),a.NdJ("isFormValid",function(e){return a.CHM(t),a.oxw().validateForm(e)}),a.qZA()}if(2&t){const t=a.oxw();a.Q6J("workflowObj",t.workflowObj)}}let B=(()=>{class t{constructor(t,e,o,n,i,s,r,a,c,u){this.translateService=t,this.titleService=e,this.otlrWrkflwSrvc=o,this.route=n,this.commonOrgService=i,this.http=s,this.router=r,this.commonWorkflowService=a,this.dateUtils=c,this.modalService=u,this.titleObj={OPTICAL_OUTLIERS:"Optical Outlier Notification",EARLY_WARN_PON_CAP:"Early Warning PON Capacity Notification",EARLY_WARN_ETH_CAP:"Early Warning Ethernet Capacity Notification",EARLY_WARN_PON_LOSS:"Early Warning PON Loss Notification"},this.recepientFormFields=[{key:"emailRecipients",required:!0},{key:"emailNotes",required:!1},{key:"sms",required:!0},{key:"webhooks",required:!0}],this.recepientFormFieldsObj={emailRecipients:"emailRecipients",emailNotes:"emailNotes",sms:"sms",webhooks:"webhooks"},this.loader=!1,this.disableFinishBtn=!1,this.outliersWorkflow=l,this.activeTab=null==l?void 0:l.DETAILS_LABEL,this.selectedTabIndex=0,this.isTabChange=!0,this.disableNextBtn=!1,this.error=!1,this.errorInfo="",this.tabs=[null==l?void 0:l.DETAILS_LABEL,null==l?void 0:l.SYSTEMS_LABEL,null==l?void 0:l.RECEPIENTS_LABEL,null==l?void 0:l.SUMMARY_LABEL],this.workflowObj={isNew:!0,active:!0,regions:["All"],locations:["All"],systems:["All"],emailRecipients:[],emailNotes:"",uuid:"",name:"",description:"",status:"DRAFT",sms:[],webhooks:[],forms:{0:{valid:!1},1:{valid:!1},2:{valid:!1}},isConsentMsgSmsPopupAccepted:!1,isLoadConsentMsgSmsPopupApplicable:!0},this.levelsPassed=0}ngOnInit(){this.title=`New ${this.titleObj[this.otlrWrkflwSrvc.getType()]}`,this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(t=>{this.language=t,this.titleService.setTitle(`${this.titleObj[this.otlrWrkflwSrvc.getType()]} - ${this.language["Email Notifications"]} - ${this.language.Network_Operations} - ${this.language.Operations} - ${this.language.Operations} - ${this.language["Calix Cloud"]}`)}),this.titleService.setTitle(`${this.titleObj[this.otlrWrkflwSrvc.getType()]} - ${this.language["Email Notifications"]} - ${this.language.Network_Operations} - ${this.language.Operations} - ${this.language.Operations} - ${this.language["Calix Cloud"]}`);let t=this.route.snapshot.paramMap.get("id");console.log(this.route.snapshot.params),this.route.paramMap.subscribe(t=>{console.log(t.get("id")),console.log(t.get("type"))}),t&&this.getRecordById(t)}openModal(){const t=this.modalService.open(r.J);t.componentInstance.workflowObj=this.workflowObj,t.result.then(t=>{t&&(console.log(t),this.onTabChange(this.selectedTabIndex+1))}).catch(t=>{})}onTabChange(t,e=null){var o,n,i,s,l,r,a,c;if(t>this.selectedTabIndex){let e=!0;this.commonWorkflowService.setTabChange();for(let s=0;s<t;s++)if(!(null===(i=null===(n=null===(o=this.workflowObj)||void 0===o?void 0:o.forms)||void 0===n?void 0:n[s])||void 0===i?void 0:i.valid)){e=!1;break}if(!e)return;if(2==this.selectedTabIndex&&(null===(s=this.workflowObj)||void 0===s?void 0:s.isLoadConsentMsgSmsPopupApplicable)&&!(null===(l=this.workflowObj)||void 0===l?void 0:l.isConsentMsgSmsPopupAccepted)&&(null===(a=null===(r=this.workflowObj)||void 0===r?void 0:r.sms)||void 0===a?void 0:a.length))return void this.openModal();if(0==this.selectedTabIndex&&(null===(c=this.workflowObj)||void 0===c?void 0:c.isNew)){let e={name:this.workflowObj.name,description:this.workflowObj.description,type:this.otlrWrkflwSrvc.getType(),timeZone:this.dateUtils.getTImeZoneWithOffset()};this.create(e,t)}else this.update(t)}else this.updateTab(t)}closeAlert(){this.error=!1,this.errorInfo=""}validateForm(t){var e,o;(null===(o=null===(e=this.workflowObj)||void 0===e?void 0:e.forms)||void 0===o?void 0:o[this.selectedTabIndex])&&(this.workflowObj.forms[this.selectedTabIndex].valid=t)}getRecordById(t){this.loader=!0;let e=`${s.N.API_BASE_URL}health/config/notifications/${encodeURIComponent(t)}`;this.http.get(e).subscribe(t=>{var e,o;t&&Object.keys(t).length&&(this.setFormStatus(t),this.workflowObj=Object.assign(Object.assign({},this.workflowObj),t),this.workflowObj.isNew=!1,console.log(this.workflowObj),(null===(o=null===(e=this.workflowObj)||void 0===e?void 0:e.sms)||void 0===o?void 0:o.length)&&(this.workflowObj.isConsentMsgSmsPopupAccepted=!0,this.workflowObj.isLoadConsentMsgSmsPopupApplicable=!1)),this.loader=!1},t=>{console.log(t),this.pageErrorHandle(t)})}pageErrorHandle(t){this.errorInfo=401==t.status?this.language["Access Denied"]:this.commonOrgService.pageErrorHandle(t),this.error=!0,this.loader=!1}create(t,e){this.http.post(`${s.N.API_BASE_URL}health/config/notifications`,t,{responseType:"text"}).subscribe(t=>{console.log(t),this.setSuccessInfo("Successfully Saved"),this.workflowObj.isNew=!1,this.updateTab(e)},t=>{console.log(t),this.pageErrorHandle(t)})}update(t){var e,o,n,i,l,r,a,c,u,d,g;let f=`${s.N.API_BASE_URL}health/config/notifications/${encodeURIComponent(this.workflowObj.name)}`,p={name:this.workflowObj.name,description:this.workflowObj.description,status:(null===(e=this.workflowObj)||void 0===e?void 0:e.status)?null===(o=this.workflowObj)||void 0===o?void 0:o.status:"DRAFT",type:this.otlrWrkflwSrvc.getType(),timeZone:this.dateUtils.getTImeZoneWithOffset()};if(null===(n=this.workflowObj.regions)||void 0===n?void 0:n.length){let t=null===(i=this.workflowObj.regions)||void 0===i?void 0:i.indexOf("All");-1!==t&&(null===(l=this.workflowObj.regions)||void 0===l||l.splice(t,1))}if(null===(r=this.workflowObj.locations)||void 0===r?void 0:r.length){let t=null===(a=this.workflowObj.locations)||void 0===a?void 0:a.indexOf("All");-1!==t&&(null===(c=this.workflowObj.locations)||void 0===c||c.splice(t,1))}if(null===(u=this.workflowObj.systems)||void 0===u?void 0:u.length){let t=null===(d=this.workflowObj.systems)||void 0===d?void 0:d.indexOf("All");-1!==t&&(null===(g=this.workflowObj.systems)||void 0===g||g.splice(t,1))}1==this.selectedTabIndex?p=Object.assign(Object.assign({},p),{regions:this.workflowObj.regions,locations:this.workflowObj.locations,systems:this.workflowObj.systems}):2==this.selectedTabIndex&&(p=Object.assign(Object.assign({},p),{regions:this.workflowObj.regions,locations:this.workflowObj.locations,systems:this.workflowObj.systems,emailRecipients:this.workflowObj.emailRecipients,emailNotes:this.workflowObj.emailNotes,sms:this.workflowObj.sms,webhooks:this.workflowObj.webhooks})),this.http.put(f,p,{responseType:"text"}).subscribe(e=>{console.log(e),this.setSuccessInfo("Successfully Saved"),this.updateTab(t)},t=>{console.log(t),this.pageErrorHandle(t)})}deploy(t){let e=`${s.N.API_BASE_URL}health/config/notifications/${encodeURIComponent(this.workflowObj.name)}`,o={name:this.workflowObj.name,description:this.workflowObj.description,regions:this.workflowObj.regions,locations:this.workflowObj.locations,systems:this.workflowObj.systems,emailRecipients:this.workflowObj.emailRecipients,emailNotes:this.workflowObj.emailNotes,status:t,type:this.otlrWrkflwSrvc.getType(),sms:this.workflowObj.sms,webhooks:this.workflowObj.webhooks,timeZone:this.dateUtils.getTImeZoneWithOffset()};this.http.put(e,o,{responseType:"text"}).subscribe(e=>{console.log(e);let o=`${this.titleObj[this.otlrWrkflwSrvc.getType()]} Schedule successfully paused`;"RUN"===t&&(o=`${this.titleObj[this.otlrWrkflwSrvc.getType()]} Schedule successfully deployed`),this.setSuccessInfo(o),setTimeout(()=>{this.selectedTabIndex>2&&this.router.navigate(["/cco/operations/alarms/health-alarm-notifications"])},2e3)},t=>{console.log(t),this.pageErrorHandle(t)})}updateTab(t){this.activeTab=this.tabs[t],this.disableNextBtn=!1,this.selectedTabIndex=t,this.isTabChange=!this.isTabChange,this.levelsPassed<t&&(this.levelsPassed=t)}setSuccessInfo(t){this.success=!0,this.successInfo=t,setTimeout(()=>{this.success=!1},2e3)}setFormStatus(t){var e,o,n;(null==t?void 0:t.name)&&(this.workflowObj.forms[0].valid=!0,this.levelsPassed=1),(null==t?void 0:t.name)&&(this.workflowObj.forms[1].valid=!0,this.levelsPassed=2),((null==t?void 0:t.name)&&(null===(e=null==t?void 0:t.emailRecipients)||void 0===e?void 0:e.length)||(null===(o=null==t?void 0:t.sms)||void 0===o?void 0:o.length)||(null===(n=null==t?void 0:t.webhooks)||void 0===n?void 0:n.length))&&(this.workflowObj.forms[2].valid=!0,this.levelsPassed=3)}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(c.s),a.Y36(u.Dx),a.Y36(g),a.Y36(i.gz),a.Y36(f.v),a.Y36(p.eN),a.Y36(i.F0),a.Y36(h.Z),a.Y36(b.s),a.Y36(w.FF))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-outliers-workflow-wizward"]],decls:24,vars:13,consts:[["class","w-100 alert alert-danger fade show my-3",4,"ngIf"],["class","w-100 alert alert-success fade show my-3",4,"ngIf"],["id","outage-workflow",1,"outage-workflow"],[1,"d-flex","w-100","border-bottom","justify-content-between","align-items-center","pb-1"],[1,"col","px-0"],[1,"ccl-admin-title","pr-3"],[1,"col-auto","px-0","text-right"],["routerLink","/cco/operations/alarms/health-alarm-notifications",1,"close","cursor-pointer","mt-1"],[1,"stepper-main","mt-3","mb-3"],[1,"stepper-ui"],[4,"ngFor","ngForOf"],[1,"pos-action-btn"],["type","button","class","btn-arrow btn-arr-prev btn-grey mr-2 float-left",3,"disabled","ngClass","click",4,"ngIf"],["type","button","class","btn-default primary mr-2",3,"disabled","click",4,"ngIf"],["type","button","class","btn-default primary px-3 mr-2",3,"disabled","click",4,"ngIf"],["type","button","class","btn-default primary px-3",3,"disabled","click",4,"ngIf"],["class","loader",4,"ngIf"],[3,"workflowObj","isFormValid",4,"ngIf"],[3,"dynamicFields","dynamicFieldsObj","workflowObj","isFormValid",4,"ngIf"],[1,"w-100","alert","alert-danger","fade","show","my-3"],[1,"error-img"],["src","./assets/img/ic_error-36px.svg"],["type","button",1,"close",3,"click"],[1,"d-inline-flex",3,"innerHtml"],[1,"w-100","alert","alert-success","fade","show","my-3"],[1,"success-img"],["src","./assets/img/success-icon.svg"],[3,"title","ngClass","click"],["type","button",1,"btn-arrow","btn-arr-prev","btn-grey","mr-2","float-left",3,"disabled","ngClass","click"],["src","assets/img/ic_chevronleft_grey.svg"],["type","button",1,"btn-default","primary","mr-2",3,"disabled","click"],["src","assets/img/ic_chevron-r-w.svg"],["type","button",1,"btn-default","primary","px-3","mr-2",3,"disabled","click"],["type","button",1,"btn-default","primary","px-3",3,"disabled","click"],[1,"loader"],[1,"d-flex","justify-content-center"],[1,"spinner-border","text-primary"],[1,"sr-only"],[3,"workflowObj","isFormValid"],[3,"dynamicFields","dynamicFieldsObj","workflowObj","isFormValid"]],template:function(t,e){1&t&&(a.YNc(0,q,6,1,"div",0),a.YNc(1,I,6,1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a.TgZ(4,"div",4),a.TgZ(5,"div",5),a._uU(6),a.qZA(),a.qZA(),a.TgZ(7,"div",6),a.TgZ(8,"button",7),a._UZ(9,"span"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(10,"section",8),a.TgZ(11,"ul",9),a.YNc(12,N,4,7,"li",10),a.qZA(),a.TgZ(13,"div",11),a.YNc(14,L,3,5,"button",12),a.YNc(15,J,3,2,"button",13),a.YNc(16,U,2,2,"button",14),a.YNc(17,R,2,2,"button",15),a.qZA(),a.qZA(),a.YNc(18,Y,5,1,"div",16),a.TgZ(19,"div"),a.YNc(20,Q,1,1,"app-details",17),a.YNc(21,V,1,1,"app-system",17),a.YNc(22,$,1,3,"app-recepients",18),a.YNc(23,W,1,1,"app-summary",17),a.qZA(),a.qZA()),2&t&&(a.Q6J("ngIf",e.error),a.xp6(1),a.Q6J("ngIf",e.success),a.xp6(5),a.Oqu((null==e.workflowObj?null:e.workflowObj.name)||e.title),a.xp6(6),a.Q6J("ngForOf",e.tabs),a.xp6(2),a.Q6J("ngIf",e.selectedTabIndex>0),a.xp6(1),a.Q6J("ngIf",e.selectedTabIndex+1!==(null==e.tabs?null:e.tabs.length)),a.xp6(1),a.Q6J("ngIf",e.selectedTabIndex+1===(null==e.tabs?null:e.tabs.length)),a.xp6(1),a.Q6J("ngIf",e.selectedTabIndex+1===(null==e.tabs?null:e.tabs.length)),a.xp6(1),a.Q6J("ngIf",e.loader),a.xp6(2),a.Q6J("ngIf",e.activeTab===(null==e.outliersWorkflow?null:e.outliersWorkflow.DETAILS_LABEL)),a.xp6(1),a.Q6J("ngIf",e.activeTab===(null==e.outliersWorkflow?null:e.outliersWorkflow.SYSTEMS_LABEL)),a.xp6(1),a.Q6J("ngIf",e.activeTab===(null==e.outliersWorkflow?null:e.outliersWorkflow.RECEPIENTS_LABEL)),a.xp6(1),a.Q6J("ngIf",e.activeTab===(null==e.outliersWorkflow?null:e.outliersWorkflow.SUMMARY_LABEL)))},directives:[n.O5,i.rH,n.sg,n.mk,m.M,M,P.F,S.C],styles:['#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .stepper-main[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;position:relative}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .stepper[_ngcontent-%COMP%]{width:100%;display:flex;flex:0 0 100%;position:relative}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--1[_ngcontent-%COMP%], #outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--2[_ngcontent-%COMP%], #outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--3[_ngcontent-%COMP%], #outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--4[_ngcontent-%COMP%], #outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--5[_ngcontent-%COMP%]{width:calc(100% / 5);padding:5px 25px;background:#ebeaef!important;color:gray;text-align:center;cursor:pointer!important;border-radius:20px}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .stepper[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]:first-child{border-top-left-radius:20px;border-bottom-left-radius:20px}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--1[_ngcontent-%COMP%]{z-index:55!important}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--2[_ngcontent-%COMP%]{z-index:44!important;transform:translate(-20px)}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--3[_ngcontent-%COMP%]{z-index:33!important;transform:translate(-40px)}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--4[_ngcontent-%COMP%]{z-index:22!important;transform:translate(-60px)!important}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step--5[_ngcontent-%COMP%]{z-index:11!important;transform:translate(-80px)!important}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step-active[_ngcontent-%COMP%]{background:#0279ff!important;color:#fff!important;z-index:99!important;border-radius:20px!important}#outage-workflow.outage-workflow[_ngcontent-%COMP%]   .step-success[_ngcontent-%COMP%]{background:#82bf00!important;color:#fff!important;z-index:101!important;border-radius:20px!important}.outage-workflow[_ngcontent-%COMP%]{position:relative}.close-box[_ngcontent-%COMP%]{font-size:24px;font-weight:300;color:gray}.btn-arrow.btn-grey[_ngcontent-%COMP%]{border:1px solid #CCCCCC!important;background-color:#f8f8fa!important;color:#4c4c4c!important}.stepper-main[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;flex-direction:column;position:relative}.stepper-ui[_ngcontent-%COMP%]{display:flex;list-style:none;margin:0 0 10px;padding:0;overflow:hidden;width:100%}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:0 10px 0 30px;color:#1a1f22;position:relative;height:32px;border-top:1px solid #0279ff;border-bottom:1px solid #0279ff;border-right:0px!important;border-left:0px!important;outline:none!important}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:relative;z-index:2}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:after{content:"";width:30px;height:100%;background:transparent;position:absolute;top:0;right:-10px;transform:rotate(48deg);z-index:1;border:1px ridge transparent;border-top-color:#0279ff;border-right-color:#0279ff;border-top-right-radius:5px}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-current[_ngcontent-%COMP%], .stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-done[_ngcontent-%COMP%]{color:#fff}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-current[_ngcontent-%COMP%], .stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-current[_ngcontent-%COMP%]:after{background-color:#0279ff!important}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-done[_ngcontent-%COMP%]{background-color:#82bf00!important;border-color:#82bf00}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-done[_ngcontent-%COMP%]:after{background-color:#82bf00!important}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-done[_ngcontent-%COMP%]:disabled{background-color:#82bf00!important;border-color:#82bf00!important}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-done[_ngcontent-%COMP%]:after{border-top-color:#fff!important;border-right-color:#fff!important;border-style:solid}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-current[_ngcontent-%COMP%]:after{border-top-color:#0279ff!important;border-right-color:#0279ff!important;border-style:solid}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child   button[_ngcontent-%COMP%]{border-top-left-radius:30px;border-bottom-left-radius:30px}button[_ngcontent-%COMP%]:disabled{background:transparent!important;border-color:#0279ff!important;cursor:not-allowed;color:#4c4c4c}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#f5faff;color:#0279ff}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:after{background-color:#f5faff}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:before{content:"";position:absolute;right:0;top:-1px;width:20px;height:32px;background-color:transparent;border-top:1px solid #0279ff;border-bottom:1px solid #0279ff;z-index:9}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{color:#1a1f22}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled:after{background-color:#fff}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-current[_ngcontent-%COMP%]:disabled   span[_ngcontent-%COMP%], .stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-done[_ngcontent-%COMP%]:disabled   span[_ngcontent-%COMP%]{opacity:.8;color:#fff!important}.stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-current[_ngcontent-%COMP%]:before, .stepper-ui[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button.step-done[_ngcontent-%COMP%]:before{display:none}.btn-arr-nxt[_ngcontent-%COMP%]:disabled{background:#0279ff!important;border:1px solid #0279ff!important;cursor:not-allowed;opacity:.5;color:#81bcff}.pos-action-btn[_ngcontent-%COMP%]{position:absolute;right:0px;top:0px}']}),t})();const D=[{path:"",component:(()=>{class t{constructor(t,e){this.route=t,this.workflowService=e}ngOnInit(){var t;console.log(this.route.snapshot.params),this.workflowService.setType(null===(t=this.route.snapshot.params)||void 0===t?void 0:t.type)}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(i.gz),a.Y36(g))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-outliers-workflow"]],decls:1,vars:0,template:function(t,e){1&t&&a._UZ(0,"router-outlet")},directives:[i.lC],styles:[""]}),t})(),children:[{path:"add",component:B},{path:"edit/:id",component:B},{path:"",redirectTo:"add",pathMatch:"full"}]}];let H=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[i.Bz.forChild(D)],i.Bz]}),t})();var z=o(89043);let X=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[n.ez,O.UX,j.A0,H,z.R]]}),t})()},1570:function(t,e,o){o.d(e,{f:function(){return h}});var n=o(37716),i=o(7450),s=o(38583);function l(t,e){1&t&&(n.TgZ(0,"span"),n._uU(1,"-"),n.qZA())}function r(t,e){1&t&&n._UZ(0,"br")}function a(t,e){if(1&t&&(n.TgZ(0,"span"),n._uU(1),n.YNc(2,r,1,0,"br",1),n.qZA()),2&t){const t=e.$implicit,o=e.last;n.xp6(1),n.hij(" ",t,""),n.xp6(1),n.Q6J("ngIf",!o)}}function c(t,e){1&t&&(n.TgZ(0,"span"),n._uU(1,"-"),n.qZA())}function u(t,e){1&t&&n._UZ(0,"br")}function d(t,e){if(1&t&&(n.TgZ(0,"span"),n._uU(1),n.YNc(2,u,1,0,"br",1),n.qZA()),2&t){const t=e.$implicit,o=e.last;n.xp6(1),n.hij(" ",t,""),n.xp6(1),n.Q6J("ngIf",!o)}}function g(t,e){1&t&&(n.TgZ(0,"span"),n._uU(1,"-"),n.qZA())}function f(t,e){1&t&&n._UZ(0,"br")}function p(t,e){if(1&t&&(n.TgZ(0,"span",3),n._uU(1),n.YNc(2,f,1,0,"br",1),n.qZA()),2&t){const t=e.$implicit,o=e.last;n.xp6(1),n.hij(" ",t,""),n.xp6(1),n.Q6J("ngIf",!o)}}let h=(()=>{class t{constructor(t){this.translateService=t}set workflowObj(t){console.log(t),this._workflowObj=t}get workflowObj(){return this._workflowObj}ngOnInit(){this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(t=>{this.language=t})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(i.s))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-summary-recepients"]],inputs:{workflowObj:"workflowObj"},decls:26,vars:12,consts:[[1,"table"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"text-break"],["class","text-break",4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(n.TgZ(0,"table",0),n.TgZ(1,"tbody"),n.TgZ(2,"tr"),n.TgZ(3,"td"),n._uU(4),n.qZA(),n.TgZ(5,"td"),n.YNc(6,l,2,0,"span",1),n.YNc(7,a,3,2,"span",2),n.qZA(),n.qZA(),n.TgZ(8,"tr"),n.TgZ(9,"td"),n._uU(10),n.qZA(),n.TgZ(11,"td",3),n._uU(12),n.qZA(),n.qZA(),n.TgZ(13,"tr"),n.TgZ(14,"td"),n._uU(15),n.qZA(),n.TgZ(16,"td"),n.YNc(17,c,2,0,"span",1),n.YNc(18,d,3,2,"span",2),n.qZA(),n.qZA(),n.TgZ(19,"tr"),n.TgZ(20,"td"),n.TgZ(21,"span"),n._uU(22),n.qZA(),n.qZA(),n.TgZ(23,"td"),n.YNc(24,g,2,0,"span",1),n.YNc(25,p,3,2,"span",4),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&t&&(n.xp6(4),n.AsE("",e.language.Email," (",null!=e.workflowObj&&null!=e.workflowObj.emailRecipients&&e.workflowObj.emailRecipients.length?null==e.workflowObj||null==e.workflowObj.emailRecipients?null:e.workflowObj.emailRecipients.length:0,")"),n.xp6(2),n.Q6J("ngIf",!(null!=e.workflowObj&&null!=e.workflowObj.emailRecipients&&e.workflowObj.emailRecipients.length)),n.xp6(1),n.Q6J("ngForOf",null==e.workflowObj?null:e.workflowObj.emailRecipients),n.xp6(3),n.Oqu(e.language.Notes),n.xp6(2),n.hij(" ",null!=e.workflowObj&&e.workflowObj.emailNotes?null==e.workflowObj?null:e.workflowObj.emailNotes:"-"," "),n.xp6(3),n.hij("SMS (",null!=e.workflowObj&&null!=e.workflowObj.sms&&e.workflowObj.sms.length?null==e.workflowObj||null==e.workflowObj.sms?null:e.workflowObj.sms.length:0,")"),n.xp6(2),n.Q6J("ngIf",!(null!=e.workflowObj&&null!=e.workflowObj.sms&&e.workflowObj.sms.length)),n.xp6(1),n.Q6J("ngForOf",null==e.workflowObj?null:e.workflowObj.sms),n.xp6(4),n.hij("Webhook (",null!=e.workflowObj&&null!=e.workflowObj.webhooks&&e.workflowObj.webhooks.length?null==e.workflowObj||null==e.workflowObj.webhooks?null:e.workflowObj.webhooks.length:0,")"),n.xp6(2),n.Q6J("ngIf",!(null!=e.workflowObj&&null!=e.workflowObj.webhooks&&e.workflowObj.webhooks.length)),n.xp6(1),n.Q6J("ngForOf",null==e.workflowObj?null:e.workflowObj.webhooks))},directives:[s.O5,s.sg],styles:[""]}),t})()}}]);