"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[3534],{72768:function(t,i,o){o.d(i,{I:function(){return a}});var e=o(37716),n=(o(3679),o(38583));let a=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[n.ez]]}),t})()},33534:function(t,i,o){o.r(i),o.d(i,{FoundationConfigurationModule:function(){return I}});var e=o(38583),n=o(37716),a=o(7450),r=o(38048),s=o(39895),c=o(1963),l=o(12664),d=o(96045);const u=["GetStartedModal"],g=function(){return["./configuration-settings"]};function f(t,i){if(1&t&&(n.TgZ(0,"li",12),n.TgZ(1,"a",13),n._uU(2),n.qZA(),n.qZA()),2&t){const t=n.oxw();n.xp6(1),n.Q6J("routerLink",n.DdM(2,g)),n.xp6(1),n.hij(" ",t.language.settings," ")}}const h=function(){return["./configuration-prerequisites"]};function p(t,i){if(1&t&&(n.TgZ(0,"li",12),n.TgZ(1,"a",13),n._uU(2),n.qZA(),n.qZA()),2&t){const t=n.oxw();n.xp6(1),n.Q6J("routerLink",n.DdM(2,h)),n.xp6(1),n.hij(" ",t.language["Workflow Prerequisites"]," ")}}const m=function(){return["./configuration-workflow"]};function w(t,i){if(1&t&&(n.TgZ(0,"li",12),n.TgZ(1,"a",13),n._uU(2),n.qZA(),n.qZA()),2&t){const t=n.oxw();n.xp6(1),n.Q6J("routerLink",n.DdM(2,m)),n.xp6(1),n.hij(" ",t.language.Workflows," ")}}function Z(t,i){if(1&t){const t=n.EpF();n.TgZ(0,"div",14),n.TgZ(1,"div",15),n._UZ(2,"div",16),n.TgZ(3,"div",17),n.TgZ(4,"span",18),n.NdJ("click",function(){return n.CHM(t),n.oxw().closeAllModal()}),n._UZ(5,"img",19),n.qZA(),n.qZA(),n.qZA(),n.TgZ(6,"div",20),n.TgZ(7,"div",21),n._UZ(8,"img",22),n.qZA(),n.TgZ(9,"div",23),n._uU(10,"Welcome to"),n._UZ(11,"br"),n._uU(12," Revenue EDGE Deployment Cloud "),n.qZA(),n.TgZ(13,"div",24),n._uU(14," Before you jump in, we'd like to walk you"),n._UZ(15,"br"),n._uU(16," through your system onboarding setup. "),n.qZA(),n.TgZ(17,"div",25),n.NdJ("click",function(){return n.CHM(t),n.oxw().goToInitialOnboarding()}),n.TgZ(18,"span",26),n._uU(19,"Let's get started"),n.qZA(),n.qZA(),n.qZA(),n.qZA()}}let v=(()=>{class t{constructor(t,i,o,e,n,a){this.translateService=t,this.sso=i,this.router=o,this.home=e,this.modalService=n,this.api=a,this.settingsShow=!1,this.workflowPreShow=!1,this.workflowsShow=!1,this.validateScopeStage=!1,this.ORG_ID=this.sso.getOrgId(),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(t=>{this.language=t})}ngOnInit(){this.HideModel=!!window.localStorage.getItem("HideModel");let t=this.sso.getScopes();t["cloud.rbac.foundation.configurations"]=t["cloud.rbac.foundation.configurations"]?t["cloud.rbac.foundation.configurations"]:[],t&&t["cloud.rbac.foundation.configurations"]&&((-1!==t["cloud.rbac.foundation.configurations"].indexOf("read")||-1!==t["cloud.rbac.foundation.configurations"].indexOf("write"))&&(this.settingsShow=!0),this.workflowPreShow=!0,this.workflowsShow=!0),(this.router.url.includes("cco-foundation/foundation-configuration/configuration-settings/subnet-configuration")||this.router.url.includes("cco-foundation/foundation-configuration/configuration-prerequisites/device-groups"))&&this.getHSI()}getHSI(){this.api.GetWorkflowGrid(this.ORG_ID).subscribe(t=>{0==t.length&&this.home.getHSI(this.ORG_ID).subscribe(t=>{t?this.dataAvailable=!0:this.HideModel||(this.modalRef=this.modalService.open(this.GetStartedModal,{size:"lg",centered:!0,backdrop:"static",keyboard:!1,windowClass:"custom-modal"}))},t=>{404!=t.status||this.HideModel?this.dataAvailable=!0:this.modalRef=this.modalService.open(this.GetStartedModal,{size:"lg",centered:!0,backdrop:"static",keyboard:!1,windowClass:"custom-modal"})})})}goToInitialOnboarding(){this.modalService.dismissAll("closed"),this.router.navigate(["/cco-foundation/foundation-configuration/configuration-workflow/workflows"])}closeAllModal(){this.HideModel=!0,window.localStorage.setItem("HideModel","true"),this.modalService.dismissAll()}}return t.\u0275fac=function(i){return new(i||t)(n.Y36(a.s),n.Y36(r.t6),n.Y36(s.F0),n.Y36(c.h),n.Y36(l.FF),n.Y36(d.A))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-foundation-configuration"]],viewQuery:function(t,i){if(1&t&&n.Gf(u,7),2&t){let t;n.iGM(t=n.CRH())&&(i.GetStartedModal=t.first)}},decls:18,vars:4,consts:[[1,"mb-4"],[1,"container"],[1,"row","align-items-center"],[1,"col-md-12","px-0"],[1,"cco-title"],[1,"mb-3"],[1,"row","mt-4"],[1,"ccl-tabs","w-100"],["id","tabs",1,"nav","nav-tabs"],["class","nav-item",4,"ngIf"],["class","col-md-12"],["GetStartedModal",""],[1,"nav-item"],["href","javascript:void(0)","data-toggle","tab","routerLinkActive","active",1,"nav-link",3,"routerLink"],[1,"modal-content"],[1,"modal-header"],[1,"col-md-10"],[1,"col-md-2","text-right"],[1,"close-icon","pointer",3,"click"],["src","assets/img/close-icon.svg","alt",""],[1,"modal-body","pad-align"],[1,""],["src","assets/img/calix-Cloud-logo.svg",1,"w-290"],[1,"cco-title","mb-4"],[1,"cco-secondary-title","mb-4","line-height-ini"],[1,"cco-secondary-title","prime-imp",3,"click"],[1,"cursor-pointer"]],template:function(t,i){1&t&&(n.TgZ(0,"section",0),n.TgZ(1,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n.TgZ(4,"div",4),n._uU(5),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(6,"section",5),n.TgZ(7,"div",1),n.TgZ(8,"div",6),n.TgZ(9,"div",3),n.TgZ(10,"div",7),n.TgZ(11,"ul",8),n.YNc(12,f,3,3,"li",9),n.YNc(13,p,3,3,"li",9),n.YNc(14,w,3,3,"li",9),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.YNc(15,Z,20,0,"ng-template",10,11,n.W1O),n._UZ(17,"router-outlet")),2&t&&(n.xp6(5),n.Oqu(i.language.configuration),n.xp6(7),n.Q6J("ngIf",i.settingsShow),n.xp6(1),n.Q6J("ngIf",i.workflowPreShow),n.xp6(1),n.Q6J("ngIf",i.workflowsShow))},directives:[e.O5,s.lC,s.yS,s.Od],styles:[".pad-align[_ngcontent-%COMP%]{text-align:center;padding:42px 30px}.w-290[_ngcontent-%COMP%]{width:290px}.line-height-ini[_ngcontent-%COMP%]{line-height:normal!important;line-height:initial!important}.prime-imp[_ngcontent-%COMP%]{color:#0279ff}"]}),t})();var b=o(18282),A=o(82395);const S=[{path:"",component:v,children:[{path:"",redirectTo:"configuration-settings",pathMatch:"full"},{path:"configuration-settings",loadChildren:()=>Promise.all([o.e(4144),o.e(7423),o.e(6556),o.e(5691),o.e(5592),o.e(8394)]).then(o.bind(o,27363)).then(t=>t.ConfigurationSettingsModule)},{path:"configuration-prerequisites",loadChildren:()=>Promise.all([o.e(8617),o.e(8274)]).then(o.bind(o,57071)).then(t=>t.ConfigurationPrerequisitesModule)},{path:"configuration-workflow",loadChildren:()=>Promise.all([o.e(1020),o.e(6556),o.e(878),o.e(1797),o.e(5276)]).then(o.bind(o,83348)).then(t=>t.ConfigurationWorkflowModule)}]},{path:"software-images-list/software-images-form",component:b.P},{path:"device-groups-add",component:A.P},{path:"device-groups/:id",component:A.P,data:{title:"Calix Cloud - Flow Configuration"}},{path:"device-groups-workflow",component:A.P,data:{title:"Calix Cloud - Flow Configuration"}}];let k=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[s.Bz.forChild(S)],s.Bz]}),t})();var q=o(23771),T=o(3679),x=o(86640),C=o(18638),M=o(72768),_=o(41099);let I=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[k,l.IJ,e.ez,q.T,T.u5,T.UX,x.A0,C._8,M.I,_.rK]]}),t})()}}]);