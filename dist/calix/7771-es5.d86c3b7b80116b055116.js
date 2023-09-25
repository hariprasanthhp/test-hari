!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(n=i.key,r=void 0,"symbol"==typeof(r=function(t,e){if("object"!=typeof t||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var i=o.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(n,"string"))?r:String(r)),i)}var n,r}function o(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[7771],{17771:function(e,i,n){n.r(i),n.d(i,{FoundationReportsFinalModule:function(){return y}});var r=n(38583),a=n(37716),l=n(7450),c=n(38048),s=n(12664),d=n(39895),u=n(1963),f=n(96045),g=["GetStartedModal"];function p(t,e){if(1&t){var o=a.EpF();a.TgZ(0,"div",9),a.TgZ(1,"div",10),a._UZ(2,"div",11),a.TgZ(3,"div",12),a.TgZ(4,"span",13),a.NdJ("click",function(){return a.CHM(o),a.oxw().closeAllModal()}),a._UZ(5,"img",14),a.qZA(),a.qZA(),a.qZA(),a.TgZ(6,"div",15),a.TgZ(7,"div",16),a._UZ(8,"img",17),a.qZA(),a.TgZ(9,"div",18),a._uU(10,"Welcome to"),a._UZ(11,"br"),a._uU(12," Revenue EDGE Deployment Cloud "),a.qZA(),a.TgZ(13,"div",19),a._uU(14," Before you jump in, we'd like to walk you"),a._UZ(15,"br"),a._uU(16," through your system onboarding setup. "),a.qZA(),a.TgZ(17,"div",20),a.NdJ("click",function(){return a.CHM(o),a.oxw().goToInitialOnboarding()}),a.TgZ(18,"span",21),a._uU(19,"Let's get started"),a.qZA(),a.qZA(),a.qZA(),a.qZA()}}var h,v=((h=function(){function e(o,i,n,r,a,l){t(this,e),this.translateService=o,this.sso=i,this.modalService=n,this.router=r,this.home=a,this.api=l,this.language={},this.showInventoryReport=!1,this.showUnassociatedDevices=!1,this.showCallOutcome=!1,this.validateScopeStage=!1,this.ORG_ID=this.sso.getOrgId()}return o(e,[{key:"ngOnInit",value:function(){var t=this;this.HideModel=!!window.localStorage.getItem("HideModel"),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(e){t.language=e});var e=this.sso.getScopes();e["cloud.rbac.foundation.reports"]=e["cloud.rbac.foundation.reports"]?e["cloud.rbac.foundation.reports"]:[],e&&e["cloud.rbac.foundation.reports"]&&((-1!==e["cloud.rbac.foundation.reports"].indexOf("read")||-1!==e["cloud.rbac.foundation.reports"].indexOf("write"))&&(this.showInventoryReport=!0),this.showUnassociatedDevices=!0,this.showCallOutcome=!0),this.getHSI()}},{key:"getHSI",value:function(){var t=this;this.api.GetWorkflowGrid(this.ORG_ID).subscribe(function(e){0==e.length&&t.home.getHSI(t.ORG_ID).subscribe(function(e){e?t.dataAvailable=!0:t.HideModel||(t.modalRef=t.modalService.open(t.GetStartedModal,{size:"lg",centered:!0,backdrop:"static",keyboard:!1,windowClass:"custom-modal"}))},function(e){404!=e.status||t.HideModel?t.dataAvailable=!0:t.modalRef=t.modalService.open(t.GetStartedModal,{size:"lg",centered:!0,backdrop:"static",keyboard:!1,windowClass:"custom-modal"})})})}},{key:"goToInitialOnboarding",value:function(){this.modalService.dismissAll("closed"),this.router.navigate(["/cco-foundation/foundation-configuration/configuration-workflow/workflows"])}},{key:"closeAllModal",value:function(){this.HideModel=!0,window.localStorage.setItem("HideModel","true"),this.modalService.dismissAll()}}]),e}()).\u0275fac=function(t){return new(t||h)(a.Y36(l.s),a.Y36(c.t6),a.Y36(s.FF),a.Y36(d.F0),a.Y36(u.h),a.Y36(f.A))},h.\u0275cmp=a.Xpm({type:h,selectors:[["app-foundation-reports-final"]],viewQuery:function(t,e){var o;1&t&&a.Gf(g,7),2&t&&a.iGM(o=a.CRH())&&(e.GetStartedModal=o.first)},decls:11,vars:1,consts:[[1,"mb-4"],[1,"container"],[1,"row","align-items-center"],[1,"col-md-12","px-0"],[1,"cco-title"],[1,"row"],["class","col-md-12"],["GetStartedModal",""],[1,"col-sm-12","col-md-12","col-lg-12"],[1,"modal-content"],[1,"modal-header"],[1,"col-md-10"],[1,"col-md-2","text-right"],[1,"close-icon","pointer",3,"click"],["src","assets/img/close-icon.svg","alt",""],[1,"modal-body",2,"text-align","center","padding","42px 30px"],[1,""],["src","assets/img/calix-Cloud-logo.svg",2,"width","290px"],[1,"cco-title","mb-4"],[1,"cco-secondary-title","mb-4",2,"line-height","initial !important"],[1,"cco-secondary-title",2,"color","#0279ff !important",3,"click"],[1,"cursor-pointer"]],template:function(t,e){1&t&&(a.TgZ(0,"section",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a.TgZ(4,"div",4),a._uU(5),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(6,"div",5),a.YNc(7,p,20,0,"ng-template",6,7,a.W1O),a.TgZ(9,"div",8),a._UZ(10,"router-outlet"),a.qZA(),a.qZA()),2&t&&(a.xp6(5),a.Oqu(e.language.Reports))},directives:[d.lC],styles:[""]}),h),m=n(32964),b=n(17507),w=[{path:"",component:v,children:[{path:"inventory-report",component:m.g,data:{title:"Calix Cloud - Flow Configuration"}},{path:"unassociated-devices",component:b.k,data:{title:"Calix Cloud - Flow Configuration"}},{path:"",redirectTo:"inventory-report",pathMatch:"full"}]}],Z=function(){var e=o(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[d.Bz.forChild(w)],d.Bz]}),e}(),y=function(){var e=o(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[r.ez,Z]]}),e}()}}])}();