!function(){"use strict";function t(t,i){for(var o=0;o<i.length;o++){var n=i[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(e=n.key,r=void 0,"symbol"==typeof(r=function(t,i){if("object"!=typeof t||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,i||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===i?String:Number)(t)}(e,"string"))?r:String(r)),n)}var e,r}function i(i,o,n){return o&&t(i.prototype,o),n&&t(i,n),Object.defineProperty(i,"prototype",{writable:!1}),i}function o(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[3534],{72768:function(t,n,e){e.d(n,{I:function(){return c}});var r,a=e(37716),u=(e(3679),e(38583)),c=((r=i(function t(){o(this,t)})).\u0275fac=function(t){return new(t||r)},r.\u0275mod=a.oAB({type:r}),r.\u0275inj=a.cJS({imports:[[u.ez]]}),r)},33534:function(t,n,e){e.r(n),e.d(n,{FoundationConfigurationModule:function(){return O}});var r=e(38583),a=e(37716),u=e(7450),c=e(38048),l=e(39895),s=e(1963),d=e(12664),f=e(96045),g=["GetStartedModal"],h=function(){return["./configuration-settings"]};function p(t,i){if(1&t&&(a.TgZ(0,"li",12),a.TgZ(1,"a",13),a._uU(2),a.qZA(),a.qZA()),2&t){var o=a.oxw();a.xp6(1),a.Q6J("routerLink",a.DdM(2,h)),a.xp6(1),a.hij(" ",o.language.settings," ")}}var v=function(){return["./configuration-prerequisites"]};function m(t,i){if(1&t&&(a.TgZ(0,"li",12),a.TgZ(1,"a",13),a._uU(2),a.qZA(),a.qZA()),2&t){var o=a.oxw();a.xp6(1),a.Q6J("routerLink",a.DdM(2,v)),a.xp6(1),a.hij(" ",o.language["Workflow Prerequisites"]," ")}}var w=function(){return["./configuration-workflow"]};function Z(t,i){if(1&t&&(a.TgZ(0,"li",12),a.TgZ(1,"a",13),a._uU(2),a.qZA(),a.qZA()),2&t){var o=a.oxw();a.xp6(1),a.Q6J("routerLink",a.DdM(2,w)),a.xp6(1),a.hij(" ",o.language.Workflows," ")}}function b(t,i){if(1&t){var o=a.EpF();a.TgZ(0,"div",14),a.TgZ(1,"div",15),a._UZ(2,"div",16),a.TgZ(3,"div",17),a.TgZ(4,"span",18),a.NdJ("click",function(){return a.CHM(o),a.oxw().closeAllModal()}),a._UZ(5,"img",19),a.qZA(),a.qZA(),a.qZA(),a.TgZ(6,"div",20),a.TgZ(7,"div",21),a._UZ(8,"img",22),a.qZA(),a.TgZ(9,"div",23),a._uU(10,"Welcome to"),a._UZ(11,"br"),a._uU(12," Revenue EDGE Deployment Cloud "),a.qZA(),a.TgZ(13,"div",24),a._uU(14," Before you jump in, we'd like to walk you"),a._UZ(15,"br"),a._uU(16," through your system onboarding setup. "),a.qZA(),a.TgZ(17,"div",25),a.NdJ("click",function(){return a.CHM(o),a.oxw().goToInitialOnboarding()}),a.TgZ(18,"span",26),a._uU(19,"Let's get started"),a.qZA(),a.qZA(),a.qZA(),a.qZA()}}var k,A=((k=function(){function t(i,n,e,r,a,u){var c=this;o(this,t),this.translateService=i,this.sso=n,this.router=e,this.home=r,this.modalService=a,this.api=u,this.settingsShow=!1,this.workflowPreShow=!1,this.workflowsShow=!1,this.validateScopeStage=!1,this.ORG_ID=this.sso.getOrgId(),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(t){c.language=t})}return i(t,[{key:"ngOnInit",value:function(){this.HideModel=!!window.localStorage.getItem("HideModel");var t=this.sso.getScopes();t["cloud.rbac.foundation.configurations"]=t["cloud.rbac.foundation.configurations"]?t["cloud.rbac.foundation.configurations"]:[],t&&t["cloud.rbac.foundation.configurations"]&&((-1!==t["cloud.rbac.foundation.configurations"].indexOf("read")||-1!==t["cloud.rbac.foundation.configurations"].indexOf("write"))&&(this.settingsShow=!0),this.workflowPreShow=!0,this.workflowsShow=!0),(this.router.url.includes("cco-foundation/foundation-configuration/configuration-settings/subnet-configuration")||this.router.url.includes("cco-foundation/foundation-configuration/configuration-prerequisites/device-groups"))&&this.getHSI()}},{key:"getHSI",value:function(){var t=this;this.api.GetWorkflowGrid(this.ORG_ID).subscribe(function(i){0==i.length&&t.home.getHSI(t.ORG_ID).subscribe(function(i){i?t.dataAvailable=!0:t.HideModel||(t.modalRef=t.modalService.open(t.GetStartedModal,{size:"lg",centered:!0,backdrop:"static",keyboard:!1,windowClass:"custom-modal"}))},function(i){404!=i.status||t.HideModel?t.dataAvailable=!0:t.modalRef=t.modalService.open(t.GetStartedModal,{size:"lg",centered:!0,backdrop:"static",keyboard:!1,windowClass:"custom-modal"})})})}},{key:"goToInitialOnboarding",value:function(){this.modalService.dismissAll("closed"),this.router.navigate(["/cco-foundation/foundation-configuration/configuration-workflow/workflows"])}},{key:"closeAllModal",value:function(){this.HideModel=!0,window.localStorage.setItem("HideModel","true"),this.modalService.dismissAll()}}]),t}()).\u0275fac=function(t){return new(t||k)(a.Y36(u.s),a.Y36(c.t6),a.Y36(l.F0),a.Y36(s.h),a.Y36(d.FF),a.Y36(f.A))},k.\u0275cmp=a.Xpm({type:k,selectors:[["app-foundation-configuration"]],viewQuery:function(t,i){var o;1&t&&a.Gf(g,7),2&t&&a.iGM(o=a.CRH())&&(i.GetStartedModal=o.first)},decls:18,vars:4,consts:[[1,"mb-4"],[1,"container"],[1,"row","align-items-center"],[1,"col-md-12","px-0"],[1,"cco-title"],[1,"mb-3"],[1,"row","mt-4"],[1,"ccl-tabs","w-100"],["id","tabs",1,"nav","nav-tabs"],["class","nav-item",4,"ngIf"],["class","col-md-12"],["GetStartedModal",""],[1,"nav-item"],["href","javascript:void(0)","data-toggle","tab","routerLinkActive","active",1,"nav-link",3,"routerLink"],[1,"modal-content"],[1,"modal-header"],[1,"col-md-10"],[1,"col-md-2","text-right"],[1,"close-icon","pointer",3,"click"],["src","assets/img/close-icon.svg","alt",""],[1,"modal-body","pad-align"],[1,""],["src","assets/img/calix-Cloud-logo.svg",1,"w-290"],[1,"cco-title","mb-4"],[1,"cco-secondary-title","mb-4","line-height-ini"],[1,"cco-secondary-title","prime-imp",3,"click"],[1,"cursor-pointer"]],template:function(t,i){1&t&&(a.TgZ(0,"section",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a.TgZ(4,"div",4),a._uU(5),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(6,"section",5),a.TgZ(7,"div",1),a.TgZ(8,"div",6),a.TgZ(9,"div",3),a.TgZ(10,"div",7),a.TgZ(11,"ul",8),a.YNc(12,p,3,3,"li",9),a.YNc(13,m,3,3,"li",9),a.YNc(14,Z,3,3,"li",9),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.YNc(15,b,20,0,"ng-template",10,11,a.W1O),a._UZ(17,"router-outlet")),2&t&&(a.xp6(5),a.Oqu(i.language.configuration),a.xp6(7),a.Q6J("ngIf",i.settingsShow),a.xp6(1),a.Q6J("ngIf",i.workflowPreShow),a.xp6(1),a.Q6J("ngIf",i.workflowsShow))},directives:[r.O5,l.lC,l.yS,l.Od],styles:[".pad-align[_ngcontent-%COMP%]{text-align:center;padding:42px 30px}.w-290[_ngcontent-%COMP%]{width:290px}.line-height-ini[_ngcontent-%COMP%]{line-height:normal!important;line-height:initial!important}.prime-imp[_ngcontent-%COMP%]{color:#0279ff}"]}),k),S=e(18282),q=e(82395),y=[{path:"",component:A,children:[{path:"",redirectTo:"configuration-settings",pathMatch:"full"},{path:"configuration-settings",loadChildren:function(){return Promise.all([e.e(4144),e.e(7423),e.e(6556),e.e(5691),e.e(5592),e.e(8394)]).then(e.bind(e,27363)).then(function(t){return t.ConfigurationSettingsModule})}},{path:"configuration-prerequisites",loadChildren:function(){return Promise.all([e.e(8617),e.e(8274)]).then(e.bind(e,57071)).then(function(t){return t.ConfigurationPrerequisitesModule})}},{path:"configuration-workflow",loadChildren:function(){return Promise.all([e.e(1020),e.e(6556),e.e(878),e.e(1797),e.e(5276)]).then(e.bind(e,83348)).then(function(t){return t.ConfigurationWorkflowModule})}}]},{path:"software-images-list/software-images-form",component:S.P},{path:"device-groups-add",component:q.P},{path:"device-groups/:id",component:q.P,data:{title:"Calix Cloud - Flow Configuration"}},{path:"device-groups-workflow",component:q.P,data:{title:"Calix Cloud - Flow Configuration"}}],T=function(){var t=i(function t(){o(this,t)});return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[l.Bz.forChild(y)],l.Bz]}),t}(),C=e(23771),x=e(3679),M=e(86640),_=e(18638),P=e(72768),I=e(41099),O=function(){var t=i(function t(){o(this,t)});return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[T,d.IJ,r.ez,C.T,x.u5,x.UX,M.A0,_._8,P.I,I.rK]]}),t}()}}])}();