"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[1501],{51501:function(e,t,i){i.r(t),i.d(t,{LocationsModule:function(){return d}});var n=i(38583),o=i(86640),c=i(39895),a=i(92340),r=i(37716),l=i(7450),s=i(38048);function u(e,t){if(1&e&&(r.TgZ(0,"li",6),r.TgZ(1,"a",7),r._uU(2),r.qZA(),r.qZA()),2&e){const e=r.oxw();r.xp6(2),r.hij(" ",e.language["Real Time"]," ")}}function p(e,t){if(1&e&&(r.TgZ(0,"li",6),r.TgZ(1,"a",8),r._uU(2),r.qZA(),r.qZA()),2&e){const e=r.oxw();r.xp6(2),r.hij(" ",e.language.TReports," ")}}const m=[{path:"",component:(()=>{class e{constructor(e,t){this.translateService=e,this.sso=t,this.menus={realtime:!1,report:!1}}ngOnInit(){this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(e=>{this.language=e});let e=this.sso.getScopes();if(a.N.VALIDATE_SCOPE&&window.location.pathname.indexOf("/cco/traffic/")>-1){let t=Object.keys(e);if(t)for(let e=0;e<t.length;e++)-1===t[e].indexOf("cloud.rbac.coc.traffic.location.realtime")?-1===t[e].indexOf("cloud.rbac.coc.traffic.location.report")||(this.menus.report=!0):this.menus.realtime=!0}else this.menus={realtime:!0,report:!0}}ngOnDestroy(){this.languageSubject&&this.languageSubject.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(l.s),r.Y36(s.t6))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-locations"]],decls:9,vars:2,consts:[[1,"container"],[1,"row"],[1,"col-sm-12","col-md-12","col-lg-1","p-0","ccl-tabs","mpr-0"],["id","netops-list-menu",1,"nav","flex-column","left-menu","tab-view-style"],["class","nav-item",4,"ngIf"],[1,"col-sm-12","col-md-12","col-lg-11"],[1,"nav-item"],["routerLink","/cco/traffic/locations/realtime","id","policies","routerLinkActive","active",1,"list-group-item","list-group-item-action"],["id","subNet","routerLink","/cco/traffic/locations/reports","routerLinkActive","active",1,"list-group-item","list-group-item-action"]],template:function(e,t){1&e&&(r.TgZ(0,"section"),r.TgZ(1,"div",0),r.TgZ(2,"div",1),r.TgZ(3,"div",2),r.TgZ(4,"ul",3),r.YNc(5,u,3,1,"li",4),r.YNc(6,p,3,1,"li",4),r.qZA(),r.qZA(),r.TgZ(7,"div",5),r._UZ(8,"router-outlet"),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&e&&(r.xp6(5),r.Q6J("ngIf",t.menus.realtime),r.xp6(1),r.Q6J("ngIf",t.menus.report))},directives:[n.O5,c.lC,c.yS,c.Od],styles:["@media screen and (min-width: 768px) and (max-width: 1140px){.mpr-0[_ngcontent-%COMP%]{padding-right:0!important}}"]}),e})(),children:[{path:"realtime",loadChildren:()=>Promise.all([i.e(1748),i.e(6628),i.e(1302),i.e(8156)]).then(i.bind(i,28156)).then(e=>e.RealtimeModule)},{path:"reports",loadChildren:()=>Promise.all([i.e(3363),i.e(1748),i.e(6922),i.e(472),i.e(3555)]).then(i.bind(i,43555)).then(e=>e.LocationReportsModule)},{path:"",redirectTo:"realtime",pathMatch:"full"}]}];let g=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[c.Bz.forChild(m)],c.Bz]}),e})(),d=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[n.ez,o.A0,g]]}),e})()}}]);