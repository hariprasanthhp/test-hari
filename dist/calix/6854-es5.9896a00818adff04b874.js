!function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(s=i.key,r=void 0,"symbol"==typeof(r=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(s,"string"))?r:String(r)),i)}var s,r}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[6854],{27107:function(t,i,s){s.d(i,{D:function(){return l}});var r,a=s(92340),o=s(37716),c=s(91841),l=((r=function(){function t(n){e(this,t),this.http=n}return n(t,[{key:"updateSettings",value:function(e,t){return this.http.put("".concat(a.N.FOUNDATION_BASE_URL,"subscriber-systems/org-config/delete-and-factory-reset?orgId=").concat(e),t)}},{key:"getSettings",value:function(e){return this.http.get("".concat(a.N.FOUNDATION_BASE_URL,"subscriber-systems/org-config/delete-and-factory-reset?orgId=").concat(e))}},{key:"updateIQSuitesConfigs",value:function(e,t){return this.http.put("".concat(a.N.FOUNDATION_BASE_URL,"subscriber-systems/org-config/iq-suites?orgId=").concat(e),t)}},{key:"getIQSuitesConfigs",value:function(e){return this.http.get("".concat(a.N.FOUNDATION_BASE_URL,"subscriber-systems/org-config/iq-suites?orgId=").concat(e))}}]),t}()).\u0275fac=function(e){return new(e||r)(o.LFG(c.eN))},r.\u0275prov=o.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r)},86854:function(t,i,s){s.r(i),s.d(i,{FoundationModule:function(){return y}});var r,a=s(38583),o=s(39895),c=s(5457),l=s(18202),u=s(96951),g=s(48705),d=s(46517),f=s(22098),h=s(99225),p=s(57556),m=s(37716),v=[{path:"",component:h.y,children:[{path:"block_page_template_list",component:l.t,data:{title:"Calix Cloud - Org Admin"}},{path:"block_page_template/:id",component:c.w,data:{title:"Calix Cloud - Org Admin"}},{path:"block_page_template",component:c.w,data:{title:"Calix Cloud - Org Admin"}},{path:"block_page_template_update/:id",component:u.U,data:{title:"Calix Cloud - Org Admin"}},{path:"whitelabel",component:f.e,data:{title:"Calix Cloud - Org Admin"}},{path:"whitelabel-create",component:g.x,data:{title:"Calix Cloud - Org Admin"}},{path:"whitelabel-update",component:d.E,data:{title:"Calix Cloud - Org Admin"}},{path:"system_settings",component:p.d,data:{title:"Calix Cloud - Org Admin"}},{path:"",redirectTo:"system_settings",pathMatch:"full"}]}],Z=((r=n(function t(){e(this,t)})).\u0275fac=function(e){return new(e||r)},r.\u0275mod=m.oAB({type:r}),r.\u0275inj=m.cJS({imports:[[o.Bz.forChild(v)],o.Bz]}),r),b=s(3679),y=function(){var t=n(function t(){e(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=m.oAB({type:t}),t.\u0275inj=m.cJS({imports:[[a.ez,Z,b.u5,b.UX]]}),t}()},57556:function(t,i,s){s.d(i,{d:function(){return y}});var r=s(3679),a=s(38048),o=(s(92340),s(37716)),c=s(7450),l=s(12664),u=s(49342),g=s(27107),d=s(39895),f=s(38583);function h(e,t){if(1&e&&(o.TgZ(0,"div",6),o.TgZ(1,"div",7),o.TgZ(2,"div",8),o.TgZ(3,"div",9),o.TgZ(4,"span",10),o._uU(5),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e){var n=o.oxw();o.xp6(5),o.Oqu(n.language.Loading)}}function p(e,t){if(1&e){var n=o.EpF();o.TgZ(0,"div",11),o.TgZ(1,"span",12),o._UZ(2,"img",13),o.qZA(),o.TgZ(3,"button",14),o.NdJ("click",function(){return o.CHM(n),o.oxw().closeAlert()}),o._UZ(4,"span"),o.qZA(),o._UZ(5,"div",15),o.qZA()}if(2&e){var i=o.oxw();o.xp6(5),o.Q6J("innerHtml",i.errorInfo,o.oJD)}}function m(e,t){if(1&e){var n=o.EpF();o.TgZ(0,"div",16),o.TgZ(1,"span",17),o._UZ(2,"img",18),o.qZA(),o.TgZ(3,"button",14),o.NdJ("click",function(){return o.CHM(n),o.oxw().closeAlert()}),o._UZ(4,"span"),o.qZA(),o._UZ(5,"div",15),o.qZA()}if(2&e){var i=o.oxw();o.xp6(5),o.Q6J("innerHtml",i.successInfo,o.oJD)}}function v(e,t){if(1&e){var n=o.EpF();o.TgZ(0,"div",25),o.TgZ(1,"div",37),o.TgZ(2,"button",38),o.NdJ("click",function(){return o.CHM(n),o.oxw(2).reset()}),o._uU(3),o.qZA(),o.TgZ(4,"button",39),o.NdJ("click",function(){return o.CHM(n),o.oxw(2).save()}),o._uU(5),o.qZA(),o.qZA(),o.qZA()}if(2&e){var i=o.oxw(2);o.xp6(3),o.Oqu(i.language.reset),o.xp6(2),o.Oqu(i.language.submit)}}function Z(e,t){if(1&e){var n=o.EpF();o.TgZ(0,"form",19),o.TgZ(1,"div",20),o.TgZ(2,"div",21),o.TgZ(3,"div",22),o.TgZ(4,"h4",23),o._uU(5),o.qZA(),o.qZA(),o.TgZ(6,"div",24),o.TgZ(7,"div",25),o.TgZ(8,"label",26),o._uU(9),o.qZA(),o.TgZ(10,"div",27),o.TgZ(11,"div",28),o.TgZ(12,"label",29),o.TgZ(13,"input",30),o.NdJ("change",function(){return o.CHM(n),o.oxw().changeDeletSubscriber()}),o.qZA(),o.TgZ(14,"span",31),o._UZ(15,"small"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(16,"div",25),o.TgZ(17,"label",26),o._uU(18),o.qZA(),o.TgZ(19,"div",27),o.TgZ(20,"div",28),o.TgZ(21,"label",32),o.TgZ(22,"input",33),o.NdJ("change",function(){return o.CHM(n),o.oxw().changeFactoryResetOnDelete()}),o.qZA(),o.TgZ(23,"span",31),o._UZ(24,"small"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(25,"div",25),o.TgZ(26,"label",26),o._uU(27),o.qZA(),o.TgZ(28,"div",27),o.TgZ(29,"div",28),o.TgZ(30,"label",34),o.TgZ(31,"input",35),o.NdJ("change",function(){return o.CHM(n),o.oxw().changeFactoryResetOnReplace()}),o.qZA(),o.TgZ(32,"span",31),o._UZ(33,"small"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.YNc(34,v,6,2,"div",36),o.qZA()}if(2&e){var i=o.oxw();o.Q6J("formGroup",i.settingsForm),o.xp6(5),o.Oqu(i.language.Settings?i.language.Settings:""),o.xp6(4),o.hij(" ",i.language["Delete all associated system(s) when deleting a subscriber"],""),o.xp6(9),o.hij(" ",i.language["Factory Reset when deleting a system"],""),o.xp6(9),o.hij(" ",i.language["Factory Reset when replacing a system"],""),o.xp6(7),o.Q6J("ngIf",i.showSaveButtons)}}var b,y=((b=function(){function t(n,i,s,r,a,o){var c=this;e(this,t),this.translateService=n,this.dialogService=i,this.ssoService=s,this.commonOrgService=r,this.service=a,this.router=o,this.showSaveButtons=!1,this.settings={deleteAssociatedSystems:!1,factoryResetOnDelete:!1,factoryResetOnRma:!1},this.hasWriteAccess=!1,this.ORG_ID=this.ssoService.getOrgId(),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(e){c.language=e})}return n(t,[{key:"ngOnInit",value:function(){this.ssoService.getScopes(),this.router.url.includes("cco-foundation")?this.ssoService.checFoundationScope(a.Nc.WRITE)&&(this.hasWriteAccess=!0):this.hasWriteAccess=!0,this.settingsForm=new r.cw({deleteAssociatedSystems:new r.NI(!1),factoryResetOnDelete:new r.NI(!1),factoryResetOnRma:new r.NI(!1)}),this.closeAlert(),this.getSettings()}},{key:"ngOnDestroy",value:function(){this.languageSubject&&this.languageSubject.unsubscribe(),this.getListSubs&&this.getListSubs.unsubscribe(),this.updateListSubs&&this.updateListSubs.unsubscribe()}},{key:"getSettings",value:function(){var e=this;this.loading=!0,this.showSaveButtons=!1,this.getListSubs=this.service.getSettings(this.ORG_ID).subscribe(function(t){t&&0!==Object.keys(t).length?(e.settings=t,e.loading=!1):e.settings={deleteAssociatedSystems:!1,factoryResetOnDelete:!1,factoryResetOnRma:!1},e.settingsForm.patchValue(e.settings)},function(t){e.pageErrorHandle(t),e.settings={deleteAssociatedSystems:!1,factoryResetOnDelete:!1,factoryResetOnRma:!1},e.settingsForm.patchValue(e.settings),e.loading=!1})}},{key:"changeDeletSubscriber",value:function(){this.changeForm()}},{key:"changeFactoryResetOnDelete",value:function(){this.changeForm()}},{key:"changeFactoryResetOnReplace",value:function(){this.changeForm()}},{key:"changeForm",value:function(){var e=JSON.stringify(this.settingsForm.value),t=JSON.stringify(this.settings);this.showSaveButtons=e!==t}},{key:"reset",value:function(){this.getSettings()}},{key:"save",value:function(){var e=this;this.loading=!0,this.updateListSubs=this.service.updateSettings(this.ORG_ID,this.settingsForm.value).subscribe(function(t){e.getSettings()},function(t){e.pageErrorHandle(t),e.loading=!1})}},{key:"pageErrorHandle",value:function(e){var t=this;this.errorInfo=401==e.status?this.language["Access Denied"]:this.commonOrgService.pageErrorHandle(e),setTimeout(function(){t.error=!0,t.loading=!1},500)}},{key:"closeAlert",value:function(){this.error=!1,this.success=!1}}]),t}()).\u0275fac=function(e){return new(e||b)(o.Y36(c.s),o.Y36(l.FF),o.Y36(a.t6),o.Y36(u.v),o.Y36(g.D),o.Y36(d.F0))},b.\u0275cmp=o.Xpm({type:b,selectors:[["app-system-delete-settings"]],decls:6,vars:4,consts:[[1,"loader-wrapper"],["class","loader-wrapper-info",4,"ngIf"],["class","w-100 alert alert-danger fade show",4,"ngIf"],["class","w-100 alert alert-success fade show",4,"ngIf"],[1,"container","sys-contain"],["class","ccl-form needs-validation",3,"formGroup",4,"ngIf"],[1,"loader-wrapper-info"],[1,"loader"],[1,"d-flex","justify-content-center"],[1,"spinner-border","text-primary"],[1,"sr-only"],[1,"w-100","alert","alert-danger","fade","show"],[1,"error-img"],["src","./assets/img/ic_error-36px.svg"],["type","button",1,"close",3,"click"],[1,"d-inline-flex",3,"innerHtml"],[1,"w-100","alert","alert-success","fade","show"],[1,"success-img"],["src","./assets/img/success-icon.svg"],[1,"ccl-form","needs-validation",3,"formGroup"],[1,"row"],[1,"col-md-10","col-md-4","col-sm-12","pr-5","pl-0"],[1,""],[1,"user-name"],[1,"ccl-form","mt-4","needs-validation","mt-3"],[1,"form-group","inline-input","row"],[1,"col-md-6","col-form-label"],[1,"col-md-6"],[1,"toggle-swtbtn","checkbox","switcher"],["for","delete_subscriber"],["type","checkbox","id","delete_subscriber","formControlName","deleteAssociatedSystems",3,"change"],[1,"enabled_button"],["for","factory_reset_delete"],["type","checkbox","id","factory_reset_delete","formControlName","factoryResetOnDelete",3,"change"],["for","factory_reset_repl"],["type","checkbox","id","factory_reset_repl","formControlName","factoryResetOnRma",3,"change"],["class","form-group inline-input row",4,"ngIf"],[1,"col-md-10","offset-md-2","text-right"],[1,"btn-default","primary","md-btn","mr-2",3,"click"],[1,"btn-default","primary","md-btn","px-0",3,"click"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.YNc(1,h,6,1,"div",1),o.YNc(2,p,6,1,"div",2),o.YNc(3,m,6,1,"div",3),o.TgZ(4,"div",4),o.YNc(5,Z,35,6,"form",5),o.qZA(),o.qZA()),2&e&&(o.xp6(1),o.Q6J("ngIf",t.loading),o.xp6(1),o.Q6J("ngIf",t.error),o.xp6(1),o.Q6J("ngIf",t.success),o.xp6(2),o.Q6J("ngIf",t.hasWriteAccess))},directives:[f.O5,r._Y,r.JL,r.sg,r.Wl,r.JJ,r.u],styles:[""]}),b)}}])}();