!function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(i=r.key,o=void 0,"symbol"==typeof(o=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(i,"string"))?o:String(o)),r)}var i,o}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[8053],{98053:function(t,r,i){i.r(r),i.d(r,{NetworkModule:function(){return h}});var o=i(38583),a=i(39895),c=i(92340),u=i(37716),l=i(7450),s=i(38048);function f(e,t){if(1&e&&(u.TgZ(0,"li",6),u.TgZ(1,"a",7),u._uU(2),u.qZA(),u.qZA()),2&e){var n=u.oxw();u.xp6(2),u.hij(" ",n.language["Real Time"]," ")}}function p(e,t){if(1&e&&(u.TgZ(0,"li",6),u.TgZ(1,"a",8),u._uU(2),u.qZA(),u.qZA()),2&e){var n=u.oxw();u.xp6(2),u.hij(" ",n.language.TReports," ")}}var m,g=[{path:"",component:(m=function(){function t(n,r){e(this,t),this.translateService=n,this.sso=r,this.menus={realtime:!1,report:!1}}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(t){e.language=t});var t=this.sso.getScopes();if(c.N.VALIDATE_SCOPE){var n=Object.keys(t);if(n)for(var r=0;r<n.length;r++)-1===n[r].indexOf("cloud.rbac.coc.traffic.network.realtime")?-1===n[r].indexOf("cloud.rbac.coc.traffic.network.report")||(this.menus.report=!0):this.menus.realtime=!0}else this.menus={realtime:!0,report:!0}}},{key:"ngOnDestroy",value:function(){this.languageSubject&&this.languageSubject.unsubscribe()}}]),t}(),m.\u0275fac=function(e){return new(e||m)(u.Y36(l.s),u.Y36(s.t6))},m.\u0275cmp=u.Xpm({type:m,selectors:[["app-network"]],decls:9,vars:2,consts:[[1,"container"],[1,"row"],[1,"col-sm-12","col-md-12","col-lg-1","p-0","ccl-tabs","mpr-0"],["id","netops-list-menu",1,"nav","flex-column","left-menu","tab-view-style"],["class","nav-item",4,"ngIf"],[1,"col-12","col-md-12","col-lg-11"],[1,"nav-item"],["routerLink","/cco/traffic/network/realtime","id","policies","routerLinkActive","active",1,"list-group-item","list-group-item-action"],["id","subNet","routerLink","/cco/traffic/network/reports","routerLinkActive","active",1,"list-group-item","list-group-item-action"]],template:function(e,t){1&e&&(u.TgZ(0,"section"),u.TgZ(1,"div",0),u.TgZ(2,"div",1),u.TgZ(3,"div",2),u.TgZ(4,"ul",3),u.YNc(5,f,3,1,"li",4),u.YNc(6,p,3,1,"li",4),u.qZA(),u.qZA(),u.TgZ(7,"div",5),u._UZ(8,"router-outlet"),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&e&&(u.xp6(5),u.Q6J("ngIf",t.menus.realtime),u.xp6(1),u.Q6J("ngIf",t.menus.report))},directives:[o.O5,a.lC,a.yS,a.Od],styles:[""]}),m),children:[{path:"realtime",loadChildren:function(){return Promise.all([i.e(1748),i.e(6628),i.e(8592),i.e(628)]).then(i.bind(i,60628)).then(function(e){return e.RealtimeModule})}},{path:"reports",loadChildren:function(){return Promise.all([i.e(3363),i.e(1748),i.e(6922),i.e(472),i.e(3555),i.e(2146)]).then(i.bind(i,62146)).then(function(e){return e.NetworkReportsModule})}},{path:"",redirectTo:"realtime",pathMatch:"full"}]}],v=function(){var t=n(function t(){e(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[a.Bz.forChild(g)],a.Bz]}),t}(),h=function(){var t=n(function t(){e(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[o.ez,v]]}),t}()}}])}();