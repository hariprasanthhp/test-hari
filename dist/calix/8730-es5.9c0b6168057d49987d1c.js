!function(){"use strict";function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(a=i.key,r=void 0,"symbol"==typeof(r=function(t,n){if("object"!=typeof t||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,n||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(a,"string"))?r:String(r)),i)}var a,r}function e(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[8730],{88730:function(n,i,a){a.r(i),a.d(i,{ReportsModule:function(){return y}});var r=a(38583),o=a(39895),u=a(37716),p=a(30900),l=function(){return["active"]};function c(t,n){if(1&t&&(u.TgZ(0,"li",7),u.TgZ(1,"a",8),u._uU(2),u.qZA(),u.qZA()),2&t){var e=n.$implicit;u.xp6(1),u.s9C("id",e.title),u.s9C("routerLink",e.link),u.Q6J("routerLinkActive",u.DdM(4,l)),u.xp6(1),u.Oqu(e.title)}}function s(t,n){if(1&t&&(u.TgZ(0,"div",4),u.TgZ(1,"ul",5),u.YNc(2,c,3,5,"li",6),u.qZA(),u.qZA()),2&t){var e=u.oxw();u.xp6(2),u.Q6J("ngForOf",e.menus)}}var f,g=((f=function(){function n(e){t(this,n),this.customTranslateService=e,this.pageAvailable=!1}return e(n,[{key:"ngOnInit",value:function(){var t=this;this.language=this.customTranslateService.defualtLanguage,this.language&&(this.pageAvailable=!0),this.customTranslateService.selectedLanguage.subscribe(function(n){t.language=n,t.menus[0].title=t.language["Mapped Endpoint List"],t.menus[1].title=t.language["Endpoint Count by Mapper"],t.menus[2].title=t.language["Unmapped IPs"]}),this.menus=[{title:this.language["Mapped Endpoint List"],link:"mapped-endpoint-list"},{title:this.language["Endpoint Count by Mapper"],link:"endpoint-count-bymapper"},{title:this.language["Unmapped IPs"],link:"unmapped-ips"}]}}]),n}()).\u0275fac=function(t){return new(t||f)(u.Y36(p.d))},f.\u0275cmp=u.Xpm({type:f,selectors:[["app-reports"]],decls:5,vars:1,consts:[[1,"row","my-2"],[1,"col-md-8"],["class","flow-config-sub-tab",4,"ngIf"],[1,"position-relative"],[1,"flow-config-sub-tab"],[1,"nav"],["class","nav-item",4,"ngFor","ngForOf"],[1,"nav-item"],[1,"nav-link",3,"id","routerLink","routerLinkActive"]],template:function(t,n){1&t&&(u.TgZ(0,"div",0),u.TgZ(1,"div",1),u.YNc(2,s,3,1,"div",2),u.qZA(),u.qZA(),u.TgZ(3,"div",3),u._UZ(4,"router-outlet"),u.qZA()),2&t&&(u.xp6(2),u.Q6J("ngIf",n.pageAvailable))},directives:[r.O5,o.lC,r.sg,o.yS,o.Od],styles:[""]}),f),d=a(56587),m=a(65355),v=a(17259),h=[{path:"",component:g,children:[{path:"mapped-endpoint-list",component:d.K},{path:"endpoint-count-bymapper",component:m.V},{path:"unmapped-ips",component:v.k},{path:"",redirectTo:"mapped-endpoint-list",pathMatch:"full"}]}],b=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=u.oAB({type:n}),n.\u0275inj=u.cJS({imports:[[r.ez,o.Bz.forChild(h)],o.Bz]}),n}(),y=function(){var n=e(function n(){t(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=u.oAB({type:n}),n.\u0275inj=u.cJS({imports:[[r.ez,b]]}),n}()}}])}();