"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[3908],{93908:function(e,t,s){s.r(t),s.d(t,{AxosCallhomeModule:function(){return v}});var a=s(38583),o=s(39895),n=s(37716),l=s(7450),c=s(38048);function i(e,t){if(1&e&&(n.TgZ(0,"li",7),n.TgZ(1,"a",8),n._uU(2),n.qZA(),n.qZA()),2&e){const e=n.oxw();n.xp6(2),n.hij(" ",e.language.Systems," ")}}const r=function(e){return{active:e}};function m(e,t){if(1&e&&(n.TgZ(0,"li",7),n.TgZ(1,"a",9),n._uU(2),n.qZA(),n.qZA()),2&e){const e=n.oxw();n.xp6(1),n.Q6J("ngClass",n.VKq(2,r,e.activeMenus.callhome)),n.xp6(1),n.hij(" ",e.language["Call Home"]," ")}}let u=(()=>{class e{constructor(e,t){this.translateService=e,this.sso=t,this.menus={systems:!1,callhome:!1},this.activeMenus={callhome:!1}}ngOnInit(){this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(e=>{this.language=e}),this.setActiveMenu();let e=this.sso.getScopes();e["cloud.rbac.coc.operations.systemonboarding.axoscallhome"]?this.menus={systems:!0,callhome:!0}:(this.menus.systems=e["cloud.rbac.coc.operations.systemonboarding.axoscallhome.systems"],this.menus.callhome=e["cloud.rbac.coc.operations.systemonboarding.axoscallhome.callhome"])}setActiveMenu(){for(let e in this.activeMenus)this.activeMenus[e]=this.sso.isMenuActive(e)}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(l.s),n.Y36(c.t6))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-axos-callhome"]],decls:10,vars:2,consts:[[1,"container","mp-0"],[1,"row","mm-0"],[1,"m-center","col-sm-12","col-md-12","px-0","mb-4"],[1,"ccl-tabs"],["id","tabs",1,"nav","nav-tabs"],["class","nav-item",4,"ngIf"],[1,"col-12","px-0"],[1,"nav-item"],["data-toggle","tab","routerLink","/cco/operations/system-onboarding/axos-callhome/axos/list","routerLinkActive","active","aria-controls","alarms","aria-selected","true","id","SysOnboarding-AXOSSystems-Systems",1,"nav-link"],["data-toggle","tab","routerLink","/cco/operations/system-onboarding/axos-callhome/callhome/list","routerLinkActive","active","aria-controls","disconncted","aria-selected","true","id","SysOnboarding-AXOSSystems-CallHome",1,"nav-link","small",3,"ngClass"]],template:function(e,t){1&e&&(n.TgZ(0,"section"),n.TgZ(1,"div",0),n.TgZ(2,"div",1),n.TgZ(3,"div",2),n.TgZ(4,"div",3),n.TgZ(5,"ul",4),n.YNc(6,i,3,1,"li",5),n.YNc(7,m,3,4,"li",5),n.qZA(),n.qZA(),n.qZA(),n.TgZ(8,"div",6),n._UZ(9,"router-outlet"),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e&&(n.xp6(6),n.Q6J("ngIf",t.menus.systems),n.xp6(1),n.Q6J("ngIf",t.menus.callhome))},directives:[a.O5,o.lC,o.yS,o.Od,a.mk],styles:[""]}),e})();var h=s(38640),d=s(29513);const g=[{path:"",component:u,children:[{path:"axos/list",component:s(95541).U},{path:"callhome/list",component:h.s},{path:"callhome/add",component:d.Dc,data:{title:"Calix Cloud - Call Home"}},{path:"callhome/edit/:id",component:d.Dc,data:{title:"Calix Cloud - Call Home"}},{path:"",redirectTo:"axos/list",pathMatch:"full"}]}];let p=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[o.Bz.forChild(g)],o.Bz]}),e})(),v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[a.ez,p]]}),e})()}}]);