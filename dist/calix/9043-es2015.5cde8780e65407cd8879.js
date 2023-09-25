"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[9043],{9128:function(e,n,t){t.d(n,{q:function(){return r},Z:function(){return l}});var o=t(79765),i=t(37716);function r(e){var n;return(null==e?void 0:e.value)?(null===(n=null==e?void 0:e.value)||void 0===n?void 0:n.trim())&&/^[A-Za-z0-9 ]+$/.test(null==e?void 0:e.value)?null:{invalidName:!0}:{required:!0}}let l=(()=>{class e{constructor(){this.tabChanged$=new o.xQ}setTabChange(){this.tabChanged$.next(!0)}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=i.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},27946:function(e,n,t){t.d(n,{M:function(){return p}});var o=t(37716),i=t(3679),r=t(9128),l=t(7450),s=t(38583);function a(e,n){if(1&e&&(o.TgZ(0,"div",15),o.TgZ(1,"div",16),o.TgZ(2,"div",17),o.TgZ(3,"div",18),o.TgZ(4,"div",19),o.TgZ(5,"span",20),o._uU(6),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e){const e=o.oxw();o.xp6(6),o.Oqu(e.language.Loading)}}function c(e,n){if(1&e&&(o.TgZ(0,"div",23),o._uU(1),o.qZA()),2&e){const e=o.oxw(2);o.xp6(1),o.hij(" ",e.language["This field is required."]," ")}}function d(e,n){1&e&&(o.TgZ(0,"div",23),o._uU(1," Please fill out this field, 1-50 characters including letters, numbers and spaces only "),o.qZA())}function m(e,n){1&e&&(o.TgZ(0,"div",23),o._uU(1," Please fill out this field, 1-50 characters including letters, numbers and spaces only "),o.qZA())}function u(e,n){if(1&e&&(o.TgZ(0,"div",21),o.YNc(1,c,2,1,"div",22),o.YNc(2,d,2,0,"div",22),o.YNc(3,m,2,0,"div",22),o.qZA()),2&e){const e=o.oxw();o.xp6(1),o.Q6J("ngIf",null==e.formControls||null==e.formControls.name||null==e.formControls.name.errors?null:e.formControls.name.errors.required),o.xp6(1),o.Q6J("ngIf",null==e.formControls||null==e.formControls.name||null==e.formControls.name.errors?null:e.formControls.name.errors.invalidName),o.xp6(1),o.Q6J("ngIf",!(null!=e.formControls&&null!=e.formControls.name&&null!=e.formControls.name.errors&&e.formControls.name.errors.invalidName)&&(null==e.formControls||null==e.formControls.name||null==e.formControls.name.errors?null:e.formControls.name.errors.maxlength))}}let p=(()=>{class e{constructor(e,n,t){this.translateService=e,this.fb=n,this.commonWorkflowService=t,this.loading=!1,this.detailsForm=this.fb.group({description:"",name:["",[i.kI.required,i.kI.maxLength(50),r.q]]}),this.submitted=!1,this.isFormValid=new o.vpe}set workflowObj(e){console.log(e),(null==e?void 0:e.name)&&(document.getElementById("name").readOnly=!0),this._workflowObj=e,this.patchValue()}get workflowObj(){return this._workflowObj}ngOnInit(){var e,n;this.tabSub=this.commonWorkflowService.tabChanged$.subscribe(e=>{this.submitted=!0}),this.formSub=this.detailsForm.valueChanges.subscribe(e=>{this.prepareDetailsFormData(e),this.isFormValid.emit(this.detailsForm.valid)}),this.detailsForm.patchValue({name:null===(e=this.workflowObj)||void 0===e?void 0:e.name,description:null===(n=this.workflowObj)||void 0===n?void 0:n.description}),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(e=>{this.language=e})}get formControls(){return this.detailsForm.controls}prepareDetailsFormData(e){this._workflowObj.name=null==e?void 0:e.name,this._workflowObj.description=null==e?void 0:e.description}patchValue(){var e,n;this.detailsForm.patchValue({name:null===(e=this.workflowObj)||void 0===e?void 0:e.name,description:null===(n=this.workflowObj)||void 0===n?void 0:n.description})}ngOnDestroy(){var e,n;null===(e=this.formSub)||void 0===e||e.unsubscribe(),null===(n=this.tabSub)||void 0===n||n.unsubscribe()}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(l.s),o.Y36(i.qu),o.Y36(r.Z))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-details"]],inputs:{workflowObj:"workflowObj"},outputs:{isFormValid:"isFormValid"},decls:23,vars:9,consts:[[1,"container"],["class","row mb-3",4,"ngIf"],[1,"row",3,"formGroup"],[1,"col-md-4","px-0"],[1,"ccl-form","mb-3"],["for","notification_name"],[1,"error"],["formControlName","name","id","name",3,"placeholder"],["class","errorMessage",4,"ngIf"],[1,"form-group","ccl-form"],["for","description"],["id","description","formControlName","description","rows","3","minlength","0","maxlength","200",1,"form-control",3,"placeholder"],["id","the-count",1,"text-right"],["id","current"],["id","maximum"],[1,"row","mb-3"],[1,"col-md-12"],[1,"loader","mt-5"],[1,"d-flex","justify-content-center"],[1,"spinner-border","text-primary"],[1,"sr-only"],[1,"errorMessage"],["class","mt-1",4,"ngIf"],[1,"mt-1"]],template:function(e,n){1&e&&(o.TgZ(0,"section"),o.TgZ(1,"div",0),o.YNc(2,a,7,1,"div",1),o.TgZ(3,"div",2),o.TgZ(4,"div",3),o.TgZ(5,"div",4),o.TgZ(6,"label",5),o._uU(7),o.TgZ(8,"span",6),o._uU(9,"*"),o.qZA(),o.qZA(),o._UZ(10,"input",7),o.YNc(11,u,4,3,"div",8),o.qZA(),o.TgZ(12,"div",9),o.TgZ(13,"label",10),o._uU(14),o.TgZ(15,"small"),o._uU(16),o.qZA(),o.qZA(),o._UZ(17,"textarea",11),o.TgZ(18,"div",12),o.TgZ(19,"span",13),o._uU(20),o.qZA(),o.TgZ(21,"span",14),o._uU(22,"/200"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.xp6(2),o.Q6J("ngIf",n.loading),o.xp6(1),o.Q6J("formGroup",n.detailsForm),o.xp6(4),o.hij("",n.language.Name," "),o.xp6(3),o.s9C("placeholder",n.language.Name),o.xp6(1),o.Q6J("ngIf",(null==n.formControls||null==n.formControls.name?null:n.formControls.name.invalid)&&((null==n.formControls||null==n.formControls.name?null:n.formControls.name.dirty)||(null==n.formControls||null==n.formControls.name?null:n.formControls.name.touched)||n.submitted)),o.xp6(3),o.Oqu(n.language.description),o.xp6(2),o.hij(" (",n.language.Optional,")"),o.xp6(1),o.s9C("placeholder",n.language.Decription),o.xp6(3),o.hij(" ",null==n.detailsForm.get("description").value?null:n.detailsForm.get("description").value.length,""))},directives:[s.O5,i.JL,i.sg,i.Fj,i.JJ,i.u,i.wO,i.nD],styles:["input[_ngcontent-%COMP%]:-moz-read-only{cursor:no-drop}input[_ngcontent-%COMP%]:read-only{cursor:no-drop}"]}),e})()},67236:function(e,n,t){t.d(n,{F:function(){return k}});var o=t(37716),i=t(3679),r=t(23815),l=t(7450),s=t(12664),a=t(9128),c=t(38583);const d=["mail_recepients"];function m(e,n){if(1&e){const e=o.EpF();o.TgZ(0,"div",17),o.TgZ(1,"span",18),o._UZ(2,"img",19),o.qZA(),o.TgZ(3,"button",20),o.NdJ("click",function(){return o.CHM(e),o.oxw().submitted=!1}),o._UZ(4,"span"),o.qZA(),o._UZ(5,"div",21),o.qZA()}if(2&e){const e=o.oxw();o.xp6(5),o.Q6J("innerHtml",e.language[e.errorMessage]||e.errorMessage,o.oJD)}}function u(e,n){if(1&e){const e=o.EpF();o.TgZ(0,"div",22),o._uU(1),o.TgZ(2,"span",23),o.NdJ("click",function(){const n=o.CHM(e).index,t=o.oxw();return t.removeData(t.dynamicFieldsObj.emailRecipients,n)}),o._UZ(3,"i",24),o.qZA(),o.qZA()}if(2&e){const e=n.$implicit;o.xp6(1),o.hij(" ",e," ")}}function p(e,n){if(1&e&&(o.TgZ(0,"div",27),o._uU(1),o.qZA()),2&e){const e=o.oxw(2);o.xp6(1),o.hij(" ",e.language["This field is required."]," ")}}function f(e,n){if(1&e&&(o.TgZ(0,"div",27),o._uU(1),o.qZA()),2&e){const e=o.oxw(2);o.xp6(1),o.hij(" ",e.language["Please enter a valid email address"]," ")}}function g(e,n){if(1&e&&(o.TgZ(0,"div",25),o.YNc(1,p,2,1,"div",26),o.YNc(2,f,2,1,"div",26),o.qZA()),2&e){const e=o.oxw();o.xp6(1),o.Q6J("ngIf",!(null!=e.workflowObj&&null!=e.workflowObj[e.dynamicFieldsObj.emailRecipients]&&e.workflowObj[e.dynamicFieldsObj.emailRecipients].length)&&(null==e.formControls||null==e.formControls[e.dynamicFieldsObj.emailRecipients]||null==e.formControls[e.dynamicFieldsObj.emailRecipients].errors?null:e.formControls[e.dynamicFieldsObj.emailRecipients].errors.required)),o.xp6(1),o.Q6J("ngIf",null==e.formControls||null==e.formControls[e.dynamicFieldsObj.emailRecipients]||null==e.formControls[e.dynamicFieldsObj.emailRecipients].errors?null:e.formControls[e.dynamicFieldsObj.emailRecipients].errors.invalidEmail)}}function b(e,n){if(1&e){const e=o.EpF();o.TgZ(0,"div",22),o._uU(1),o.TgZ(2,"span",23),o.NdJ("click",function(){const n=o.CHM(e).index,t=o.oxw();return t.removeData(t.dynamicFieldsObj.sms,n)}),o._UZ(3,"i",24),o.qZA(),o.qZA()}if(2&e){const e=n.$implicit;o.xp6(1),o.hij(" ",e," ")}}function h(e,n){if(1&e&&(o.TgZ(0,"div",27),o._uU(1),o.qZA()),2&e){const e=o.oxw(2);o.xp6(1),o.hij(" ",e.language["This field is required."]," ")}}function w(e,n){1&e&&(o.TgZ(0,"div",27),o._uU(1," Please enter valid Phone Number "),o.qZA())}function O(e,n){if(1&e&&(o.TgZ(0,"div",25),o.YNc(1,h,2,1,"div",26),o.YNc(2,w,2,0,"div",26),o.qZA()),2&e){const e=o.oxw();o.xp6(1),o.Q6J("ngIf",!(null!=e.workflowObj&&null!=e.workflowObj[e.dynamicFieldsObj.sms]&&e.workflowObj[e.dynamicFieldsObj.sms].length)&&(null==e.formControls||null==e.formControls[e.dynamicFieldsObj.sms]||null==e.formControls[e.dynamicFieldsObj.sms].errors?null:e.formControls[e.dynamicFieldsObj.sms].errors.required)),o.xp6(1),o.Q6J("ngIf",null==e.formControls||null==e.formControls[e.dynamicFieldsObj.sms]||null==e.formControls[e.dynamicFieldsObj.sms].errors?null:e.formControls[e.dynamicFieldsObj.sms].errors.pattern)}}function v(e,n){if(1&e){const e=o.EpF();o.TgZ(0,"div",22),o._uU(1),o.TgZ(2,"span",23),o.NdJ("click",function(){const n=o.CHM(e).index,t=o.oxw();return t.removeData(t.dynamicFieldsObj.webhooks,n)}),o._UZ(3,"i",24),o.qZA(),o.qZA()}if(2&e){const e=n.$implicit;o.xp6(1),o.hij(" ",e," ")}}function C(e,n){if(1&e&&(o.TgZ(0,"div",27),o._uU(1),o.qZA()),2&e){const e=o.oxw(2);o.xp6(1),o.hij(" ",e.language["This field is required."]," ")}}function x(e,n){1&e&&(o.TgZ(0,"div",27),o._uU(1," Please enter a valid URL "),o.qZA())}function y(e,n){if(1&e&&(o.TgZ(0,"div",25),o.YNc(1,C,2,1,"div",26),o.YNc(2,x,2,0,"div",26),o.qZA()),2&e){const e=o.oxw();o.xp6(1),o.Q6J("ngIf",!(null!=e.workflowObj&&null!=e.workflowObj[e.dynamicFieldsObj.webhooks]&&e.workflowObj[e.dynamicFieldsObj.webhooks].length)&&(null==e.formControls||null==e.formControls[e.dynamicFieldsObj.webhooks]||null==e.formControls[e.dynamicFieldsObj.webhooks].errors?null:e.formControls[e.dynamicFieldsObj.webhooks].errors.required)),o.xp6(1),o.Q6J("ngIf",null==e.formControls||null==e.formControls[e.dynamicFieldsObj.webhooks]||null==e.formControls[e.dynamicFieldsObj.webhooks].errors?null:e.formControls[e.dynamicFieldsObj.webhooks].errors.pattern)}}let k=(()=>{class e{constructor(e,n,t){this.translateService=e,this.dialogService=n,this.commonWorkflowService=t,this.isFormValid=new o.vpe,this.dynamicFieldsObj={},this.errorMessage="At least one recipient must be entered",this.phoneRegx=/^\+[-0-9]*$/}set workflowObj(e){console.log(e),this._workflowObj=e}get workflowObj(){return this._workflowObj}ngOnInit(){this.tabSub=this.commonWorkflowService.tabChanged$.subscribe(e=>{this.submitted=!0}),this.emitFormStatus(),this.recepientForm=this.prepareForm(),this.addValidators();let e=this,n=r.pickBy(this.workflowObj,function(n,t){return t===e.dynamicFieldsObj.emailNotes});console.log(n),this.recepientForm.patchValue(n),this.formSub=this.recepientForm.valueChanges.subscribe(e=>{this.workflowObj[this.dynamicFieldsObj.emailNotes]=e[this.dynamicFieldsObj.emailNotes],this.emitFormStatus()}),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(e=>{this.language=e})}get formControls(){return this.recepientForm.controls}onCustomPasteClick(e,n){n.preventDefault()}removeData(e,n){var t,o,i;null===(o=null===(t=this.workflowObj)||void 0===t?void 0:t[e])||void 0===o||o.splice(n,1),this.workflowObj[e]=[...null===(i=this.workflowObj)||void 0===i?void 0:i[e]],this.emitFormStatus()}makeList(e,n){console.log(e),this.validEmail=!0;let t="",o="";n?(t=n,o=n,this.recepientForm.get(e).setValue("")):(t=this.recepientForm.get(e).value,o=this.recepientForm.get(e).value);let i=[];o=o.trim(),o=o.replace(/,/g," "),o=o.replace(/,\s+/g," "),o=o.replace(/\n/g," "),o=o.replace(/\s\s+/g," ");let r="";if(e===this.dynamicFieldsObj.emailRecipients?r=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/i:e===this.dynamicFieldsObj.webhooks?r=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/:e===this.dynamicFieldsObj.sms&&(r=this.phoneRegx),null==o?void 0:o.length){if(this.recepientForm.get(e).setValue(""),Array.prototype.push.apply(i,o.split(" ")),i=i.filter(e=>e),i&&i.length){i=this.getUniqueArr(i);let n=[];i.forEach(t=>{!this.workflowObj[e].includes(t)&&r.test(null==t?void 0:t.trim())&&n.push(t.trim())}),this.workflowObj[e]=[...this.workflowObj[e],...n],this.emitFormStatus(),console.log(this.workflowObj)}}else o&&""!=o&&this.emitFormStatus()}pasteMakeList(e,n){n.preventDefault();let t=(n.clipboardData||window.clipboardData).getData("text");this.makeList(e,t)}getUniqueArr(e=[]){var n=[];return $.each(e,function(e,t){-1===$.inArray(t,n)&&n.push(t)}),n}clearSearch(){}validateEmail(e){return e&&/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/i.test(e)}prepareForm(){var e;const n={};return null===(e=this.dynamicFields)||void 0===e||e.forEach(e=>{n[e.key]=e.required?new i.NI(""):new i.NI}),new i.cw(n)}ngOnDestroy(){var e,n;null===(e=this.formSub)||void 0===e||e.unsubscribe(),null===(n=this.tabSub)||void 0===n||n.unsubscribe()}addValidators(){var e,n,t;null===(e=this.recepientForm.controls[this.dynamicFieldsObj.emailRecipients])||void 0===e||e.addValidators([j.bind(this)]),null===(n=this.recepientForm.controls[this.dynamicFieldsObj.webhooks])||void 0===n||n.addValidators([i.kI.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),null===(t=this.recepientForm.controls[this.dynamicFieldsObj.sms])||void 0===t||t.addValidators([i.kI.pattern(this.phoneRegx)])}emitFormStatus(){var e,n,t,o,i,r;(null===(n=null===(e=this.workflowObj)||void 0===e?void 0:e[this.dynamicFieldsObj.emailRecipients])||void 0===n?void 0:n.length)||(null===(o=null===(t=this.workflowObj)||void 0===t?void 0:t[this.dynamicFieldsObj.sms])||void 0===o?void 0:o.length)||(null===(r=null===(i=this.workflowObj)||void 0===i?void 0:i[this.dynamicFieldsObj.webhooks])||void 0===r?void 0:r.length)?(this.isFormValid.emit(!0),this.errorMessage=""):(this.isFormValid.emit(!1),this.errorMessage="At least one recipient must be entered")}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(l.s),o.Y36(s.FF),o.Y36(a.Z))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-recepients"]],viewQuery:function(e,n){if(1&e&&o.Gf(d,7),2&e){let e;o.iGM(e=o.CRH())&&(n.mail_recepients=e.first)}},inputs:{dynamicFields:"dynamicFields",dynamicFieldsObj:"dynamicFieldsObj",workflowObj:"workflowObj"},outputs:{isFormValid:"isFormValid"},decls:37,vars:16,consts:[["class","w-100 alert alert-danger fade show my-3",4,"ngIf"],[1,"row",3,"formGroup"],[1,"col-md-6"],[1,"cco-secondary-title","border-bottom","pb-2"],[1,"form-group","mt-3"],["for","recipients"],[1,"custom-paste-input",3,"click"],["class","custom-paste-list",4,"ngFor","ngForOf"],["autocomplete","off","id","mail_recepients","name","emailRecipients","type","text","aria-required","true","aria-describedby","mail_recepients-error",1,"w-100",3,"formControlName","placeholder","keyup.enter","paste","keyup.Space","blur"],["mail_recepients",""],["class","errorMessage",4,"ngIf"],[1,"form-group"],["for","emailNotes"],["placeholder","Add a note","minlength","0","maxlength","200","id","emailNotes","rows","3",1,"form-control",2,"border-radius","22px 22px 2px 22px",3,"formControlName"],[1,"text-right"],["autocomplete","off","name","sms","type","text","placeholder","Add phone number(s) (for example: +9999999999)",1,"w-100",3,"formControlName","keyup.enter","paste","keyup.Space","blur"],["autocomplete","off","name","webhooks","type","text","placeholder","Add webhook URL(s)",1,"w-100",3,"formControlName","keyup.enter","paste","keyup.Space","blur"],[1,"w-100","alert","alert-danger","fade","show","my-3"],[1,"error-img"],["src","./assets/img/ic_error-36px.svg"],["type","button",1,"close",3,"click"],[1,"d-inline-flex",3,"innerHtml"],[1,"custom-paste-list"],["data-key","",1,"remove-input-btn","primary",3,"click"],[1,"fa","fa-times"],[1,"errorMessage"],["class","mt-1",4,"ngIf"],[1,"mt-1"]],template:function(e,n){1&e&&(o.TgZ(0,"section"),o.YNc(1,m,6,1,"div",0),o.TgZ(2,"div",1),o.TgZ(3,"div",2),o.TgZ(4,"div",3),o._uU(5,"Send Notifications To"),o.qZA(),o.TgZ(6,"div",4),o.TgZ(7,"label",5),o._uU(8),o.qZA(),o.TgZ(9,"div",6),o.NdJ("click",function(e){return n.onCustomPasteClick(n.dynamicFieldsObj.emailRecipients,e)}),o.YNc(10,u,4,1,"div",7),o.TgZ(11,"input",8,9),o.NdJ("keyup.enter",function(){return n.makeList(n.dynamicFieldsObj.emailRecipients)})("paste",function(e){return n.pasteMakeList(n.dynamicFieldsObj.emailRecipients,e)})("keyup.Space",function(){return n.makeList(n.dynamicFieldsObj.emailRecipients)})("blur",function(){return n.makeList(n.dynamicFieldsObj.emailRecipients)}),o.qZA(),o.qZA(),o.YNc(13,g,3,2,"div",10),o.qZA(),o.TgZ(14,"div",11),o.TgZ(15,"label",12),o._uU(16),o.qZA(),o._UZ(17,"textarea",13),o.TgZ(18,"div",14),o.TgZ(19,"span"),o._uU(20),o.qZA(),o.TgZ(21,"span"),o._uU(22,"/200"),o.qZA(),o.qZA(),o.qZA(),o.TgZ(23,"div",4),o.TgZ(24,"label",5),o._uU(25,"Phone Number "),o.qZA(),o.TgZ(26,"div",6),o.NdJ("click",function(e){return n.onCustomPasteClick(n.dynamicFieldsObj.sms,e)}),o.YNc(27,b,4,1,"div",7),o.TgZ(28,"input",15),o.NdJ("keyup.enter",function(){return n.makeList(n.dynamicFieldsObj.sms)})("paste",function(e){return n.pasteMakeList(n.dynamicFieldsObj.sms,e)})("keyup.Space",function(){return n.makeList(n.dynamicFieldsObj.sms)})("blur",function(){return n.makeList(n.dynamicFieldsObj.sms)}),o.qZA(),o.qZA(),o.YNc(29,O,3,2,"div",10),o.qZA(),o.TgZ(30,"div",4),o.TgZ(31,"label",5),o._uU(32,"Webhook "),o.qZA(),o.TgZ(33,"div",6),o.NdJ("click",function(e){return n.onCustomPasteClick(n.dynamicFieldsObj.webhooks,e)}),o.YNc(34,v,4,1,"div",7),o.TgZ(35,"input",16),o.NdJ("keyup.enter",function(){return n.makeList(n.dynamicFieldsObj.webhooks)})("paste",function(e){return n.pasteMakeList(n.dynamicFieldsObj.webhooks,e)})("keyup.Space",function(){return n.makeList(n.dynamicFieldsObj.webhooks)})("blur",function(){return n.makeList(n.dynamicFieldsObj.webhooks)}),o.qZA(),o.qZA(),o.YNc(36,y,3,2,"div",10),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.xp6(1),o.Q6J("ngIf",n.errorMessage&&n.submitted),o.xp6(1),o.Q6J("formGroup",n.recepientForm),o.xp6(6),o.hij("",n.language.Email," "),o.xp6(2),o.Q6J("ngForOf",null==n.workflowObj?null:n.workflowObj[n.dynamicFieldsObj.emailRecipients]),o.xp6(1),o.s9C("placeholder",n.language["Add email address(es)"]),o.Q6J("formControlName",n.dynamicFieldsObj.emailRecipients),o.xp6(2),o.Q6J("ngIf",((null==n.formControls||null==n.formControls[n.dynamicFieldsObj.emailRecipients]?null:n.formControls[n.dynamicFieldsObj.emailRecipients].invalid)||(null==n.formControls||null==n.formControls[n.dynamicFieldsObj.emailRecipients]||null==n.formControls[n.dynamicFieldsObj.emailRecipients].errors?null:n.formControls[n.dynamicFieldsObj.emailRecipients].errors.invalidEmail))&&((null==n.formControls||null==n.formControls[n.dynamicFieldsObj.emailRecipients]?null:n.formControls[n.dynamicFieldsObj.emailRecipients].dirty)||(null==n.formControls||null==n.formControls[n.dynamicFieldsObj.emailRecipients]?null:n.formControls[n.dynamicFieldsObj.emailRecipients].touched)||n.submitted)),o.xp6(3),o.Oqu(n.language["Email Notes"]),o.xp6(1),o.Q6J("formControlName",n.dynamicFieldsObj.emailNotes),o.xp6(3),o.Oqu(null!=n.recepientForm.get(n.dynamicFieldsObj.emailNotes).value&&n.recepientForm.get(n.dynamicFieldsObj.emailNotes).value.length?null==n.recepientForm.get(n.dynamicFieldsObj.emailNotes).value?null:n.recepientForm.get(n.dynamicFieldsObj.emailNotes).value.length:0),o.xp6(7),o.Q6J("ngForOf",null==n.workflowObj?null:n.workflowObj[n.dynamicFieldsObj.sms]),o.xp6(1),o.Q6J("formControlName",n.dynamicFieldsObj.sms),o.xp6(1),o.Q6J("ngIf",(null==n.formControls||null==n.formControls[n.dynamicFieldsObj.sms]?null:n.formControls[n.dynamicFieldsObj.sms].invalid)&&((null==n.formControls||null==n.formControls[n.dynamicFieldsObj.sms]?null:n.formControls[n.dynamicFieldsObj.sms].dirty)||(null==n.formControls||null==n.formControls[n.dynamicFieldsObj.sms]?null:n.formControls[n.dynamicFieldsObj.sms].touched)||n.submitted)),o.xp6(5),o.Q6J("ngForOf",null==n.workflowObj?null:n.workflowObj[n.dynamicFieldsObj.webhooks]),o.xp6(1),o.Q6J("formControlName",n.dynamicFieldsObj.webhooks),o.xp6(1),o.Q6J("ngIf",(null==n.formControls||null==n.formControls[n.dynamicFieldsObj.webhooks]?null:n.formControls[n.dynamicFieldsObj.webhooks].invalid)&&((null==n.formControls||null==n.formControls[n.dynamicFieldsObj.webhooks]?null:n.formControls[n.dynamicFieldsObj.webhooks].dirty)||(null==n.formControls||null==n.formControls[n.dynamicFieldsObj.webhooks]?null:n.formControls[n.dynamicFieldsObj.webhooks].touched)||n.submitted)))},directives:[c.O5,i.JL,i.sg,c.sg,i.Fj,i.JJ,i.u,i.wO,i.nD],styles:[".heading-4[_ngcontent-%COMP%]{font-size:24px;font-style:normal;font-weight:400;line-height:30px;letter-spacing:0em;text-align:left;border-bottom:1px solid #CCCCCC;padding-bottom:5px;margin-bottom:16px}.info-text[_ngcontent-%COMP%]{font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:0em;text-align:left}.info-text[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{font-weight:600!important}.exclusions-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.exclusions-item[_ngcontent-%COMP%]{flex-grow:1;margin-bottom:3%}.exclusions-item[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:0}.exclusions-item[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%]{width:80px!important}.exclusions-item[_ngcontent-%COMP%]   .p-calendar[_ngcontent-%COMP%]{width:80%!important}.exclusions-item[_ngcontent-%COMP%] + .exclusions-item[_ngcontent-%COMP%]{text-align:center}.mail-tags[_ngcontent-%COMP%]{border:1px solid transparent;background-color:#f8f8fa;min-height:89px!important;border-radius:12px 22px 2px}.mail-tags[_ngcontent-%COMP%]     .ng2-tag-input__text-input{border:1px solid transparent;background-color:#f8f8fa}.mail-tags[_ngcontent-%COMP%]     .ng2-tag-input--focused{color:#495057;background-color:#fff;border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem #007bff40;border:none!important}.mail-tags[_ngcontent-%COMP%]     .ng2-tag-input__text-input:focus{background-color:transparent}.mail-tags[_ngcontent-%COMP%]     tag{background-color:#ebeaef!important;margin-left:10px!important;border-radius:5px!important}.mail-tags[_ngcontent-%COMP%]     .ng2-tag-input{border:unset;min-height:89px!important}.schedule-container[_ngcontent-%COMP%]{display:flex}.schedule-container[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%] + .item[_ngcontent-%COMP%]{margin-left:10px}.schedule-container[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{flex:0 28%;margin-bottom:2%}.week-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.week-container[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]{width:35px;height:35px;color:#4c4c4c;background-color:#f8f8fa;text-align:center;line-height:35px;border-radius:50%;margin-bottom:2%}.week-container[_ngcontent-%COMP%]   .select-day[_ngcontent-%COMP%]{width:35px;height:35px;color:#fff;background-color:#0279ff;text-align:center;line-height:35px;border-radius:50%;margin-bottom:2%}.week-container[_ngcontent-%COMP%]   .week-circle[_ngcontent-%COMP%]{padding:4px}.month-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.month-container[_ngcontent-%COMP%]   .month-info[_ngcontent-%COMP%] + .month-info[_ngcontent-%COMP%]{margin-left:10px}.month-container[_ngcontent-%COMP%]   .month-info[_ngcontent-%COMP%]{flex:0 28%;margin-bottom:2%}.diable-div[_ngcontent-%COMP%]{pointer-events:none;opacity:.5}.timezone[_ngcontent-%COMP%]{width:205px}  .p-component::-webkit-input-placeholder{opacity:.6}.custom-paste-input[_ngcontent-%COMP%]{width:100%;min-height:86px;max-height:100px;line-height:inherit;border-radius:16px 16px 0!important;background:#f8f8fa;padding:0 15px;font-size:14px;font-weight:400;color:#646363;border:1px solid transparent;cursor:text;display:flex;flex-direction:row;flex-wrap:wrap;overflow:auto}.custom-paste-input[_ngcontent-%COMP%]   .custom-paste-list[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;height:29px;padding:3px 2px 0;font-size:14px;background-color:#e4e4e4;border:1px solid #aaa;border-radius:4px;cursor:default;margin:3px}.custom-paste-input[_ngcontent-%COMP%]   .custom-paste-list[_ngcontent-%COMP%]   .remove-input-btn[_ngcontent-%COMP%]{color:#7e8c94;float:right;margin-right:5px;margin-left:5px;cursor:pointer}.custom-paste-input[_ngcontent-%COMP%]   .custom-paste-list[_ngcontent-%COMP%]   .remove-input-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#7e8c94}.custom-paste-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{height:29px!important;background:#f8f8fa;width:-moz-fit-content;width:fit-content;border:none}.custom-paste-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border:none!important}.note-clear[_ngcontent-%COMP%]{padding:10px 0 0 16px}.width-100[_ngcontent-%COMP%]{max-width:110px}.clear-div[_ngcontent-%COMP%]{padding-left:20px}.form-check-input[_ngcontent-%COMP%]{cursor:pointer}.privacymodal[_ngcontent-%COMP%]{padding:40px 64px}"]}),e})();function j(e){return(null==e?void 0:e.value)?this.validateEmail(e.value)?null:{invalidEmail:!0}:null}},2792:function(e,n,t){t.d(n,{J:function(){return l}});var o=t(37716),i=t(7450),r=t(12664);let l=(()=>{class e{constructor(e,n){this.translateService=e,this.modal=n}set workflowObj(e){this._workflowObj=e}get workflowObj(){return this._workflowObj}ngOnInit(){this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(e=>{this.language=e})}confirmConsent(){this.workflowObj.isConsentMsgSmsPopupAccepted=!0,this.passBack()}passBack(){this.modal.close(this.workflowObj)}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(i.s),o.Y36(r.Kz))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-sms-consent"]],inputs:{workflowObj:"workflowObj"},decls:19,vars:1,consts:[[1,"modal-header","consent-modal-header","d-block"],["id","showInfoModal",1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body","add-device-model"],[1,"consent-modal"],[1,"my-2"],["href","https://www.calix.com/pages/privacy-policy.html","target","_blank"],[1,"btn-default","primary","px-3",3,"click"],["type","button","data-dismiss","modal",1,"btn-default","transparant","px-3","m-2",3,"click"]],template:function(e,n){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"h5",1),o._uU(2,"Consent to Receive Notifications"),o.qZA(),o.TgZ(3,"button",2),o.NdJ("click",function(){return n.modal.dismiss("Cross click")}),o._UZ(4,"span",3),o.qZA(),o.qZA(),o.TgZ(5,"div",4),o.TgZ(6,"div",5),o._uU(7," By providing your cellular\xa0or\xa0mobile telephone number, you expressly consent to receiving calls, messages, including auto-dialed and pre-recorded message calls, and SMS messages (including text messages) from Calix\xa0on your employer\u2019s behalf\xa0to receive report alert notifications (message frequency varies). "),o._UZ(8,"br"),o._UZ(9,"br"),o._uU(10," You certify and represent that the cellular or mobile telephone number that you have provided to us is\xa0your\xa0contact number\xa0or the contact number belongs to a network operator from your organization who has consented to receive these alert notifications as a part of their responsibilities.\xa0Message and data rates may apply. "),o._UZ(11,"br"),o.TgZ(12,"div",6),o.TgZ(13,"a",7),o._uU(14,"Calix Privacy Policy"),o.qZA(),o.qZA(),o.TgZ(15,"button",8),o.NdJ("click",function(){return n.confirmConsent()}),o._uU(16," Confirm Consent "),o.qZA(),o.TgZ(17,"button",9),o.NdJ("click",function(){return n.modal.dismiss("Cross click")}),o._uU(18),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.xp6(18),o.hij(" ",n.language.Cancel," "))},styles:[".consent-modal[_ngcontent-%COMP%]{padding:24px 32px}.consent-modal-header[_ngcontent-%COMP%]{padding:14px 32px 0!important}"]}),e})()},89043:function(e,n,t){t.d(n,{R:function(){return s}});var o=t(38583),i=(t(27946),t(67236),t(3679)),r=t(86640),l=(t(1570),t(2792),t(37716));let s=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[o.ez,r.A0,i.UX]]}),e})()}}]);