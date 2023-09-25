!function(){"use strict";function i(i,n){if(!(i instanceof n))throw new TypeError("Cannot call a class as a function")}function n(i,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(i,(e=o.key,r=void 0,"symbol"==typeof(r=function(i,n){if("object"!=typeof i||null===i)return i;var t=i[Symbol.toPrimitive];if(void 0!==t){var o=t.call(i,n||"default");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(i)}(e,"string"))?r:String(r)),o)}var e,r}function t(i,t,o){return t&&n(i.prototype,t),o&&n(i,o),Object.defineProperty(i,"prototype",{writable:!1}),i}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[5877],{95877:function(n,o,e){e.r(o),e.d(o,{CcoSubscriberOperationsModule:function(){return m}});var r=e(86640),c=e(38583),s=e(39895),a=e(92340),u=e(37716),l=e(7450),f=e(38048);function p(i,n){if(1&i&&(u.TgZ(0,"li",5),u.TgZ(1,"a",6),u._uU(2),u.qZA(),u.qZA()),2&i){var t=u.oxw();u.xp6(2),u.hij(" ",t.language.Operations," ")}}var g=function(i){return{active:i}};function h(i,n){if(1&i&&(u.TgZ(0,"li",5),u.TgZ(1,"a",7),u._uU(2),u.qZA(),u.qZA()),2&i){var t=u.oxw();u.xp6(1),u.Q6J("routerLink",t.configurationUrl)("ngClass",u.VKq(3,g,t.isConfigurationsActive)),u.xp6(1),u.hij(" ",t.language.Configurations," ")}}var d,b=[{path:"",component:(d=function(){function n(t,o,e){i(this,n),this.translateService=t,this.sso=o,this.router=e,this.scope=[],this.showOperations=!0,this.configurationUrl="/cco/operations/cco-subscriber-operations/configurations",this.isConfigurationsActive=!1,-1!==e.url.indexOf("/cco/operations/cco-subscriber-operations/configurations")&&(this.isConfigurationsActive=!0)}return t(n,[{key:"ngOnInit",value:function(){var i=this;this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(n){i.language=n});var n=this.sso.getScopes(),t=this.sso.getEntitlements();if(t[210]&&!t[102]&&(this.showOperations=!1),a.N.VALIDATE_SCOPE){var o=Object.keys(n);if(o)for(var e=0;e<o.length;e++)-1===o[e].indexOf("cloud.rbac.coc.operations.subscriber.operations")?-1===o[e].indexOf("cloud.rbac.coc.operations.subscriber.configurations")||(this.scope.configurationsAccess=!0):this.scope.operationsAccess=!0}else this.scope={subscriberprofileread:!0,operationsAccess:!0,configurationsAccess:!0};t[118]||t[120]||!this.scope.configurationsAccess?t[118]||t[120]||this.scope.configurationsAccess?n&&void 0!==n["cloud.rbac.csc.netops.config.site_scan"]&&-1!==n["cloud.rbac.csc.netops.config.site_scan"].indexOf("read")||!this.scope.configurationsAccess?n&&void 0!==n["cloud.rbac.csc.netops.config.site_scan"]&&-1!==n["cloud.rbac.csc.netops.config.site_scan"].indexOf("read")||this.scope.configurationsAccess||(this.configurationUrl="/cco"):this.configurationUrl="/cco/operations/cco-subscriber-operations/configurations/dial-plan":this.configurationUrl="/cco":this.configurationUrl="/cco/operations/cco-subscriber-operations/configurations/dial-plan"}}]),n}(),d.\u0275fac=function(i){return new(i||d)(u.Y36(l.s),u.Y36(f.t6),u.Y36(s.F0))},d.\u0275cmp=u.Xpm({type:d,selectors:[["app-cco-subscriber-operations"]],decls:7,vars:2,consts:[[1,"row"],[1,"col-sm-12","col-md-2","col-lg-2","pr-0","ccl-tabs"],["id","netops-list-menu",1,"nav","flex-column","left-menu","tab-view-style"],["class","nav-item",4,"ngIf"],[1,"col-sm-12","col-md-10","col-lg-10","pl-4"],[1,"nav-item"],["id","Operations","routerLink","/cco/operations/cco-subscriber-operations/operations","routerLinkActive","active",1,"list-group-item","list-group-item-action"],["id","Configurations",1,"list-group-item","list-group-item-action",3,"routerLink","ngClass"]],template:function(i,n){1&i&&(u.TgZ(0,"div",0),u.TgZ(1,"div",1),u.TgZ(2,"ul",2),u.YNc(3,p,3,1,"li",3),u.YNc(4,h,3,5,"li",3),u.qZA(),u.qZA(),u.TgZ(5,"div",4),u._UZ(6,"router-outlet"),u.qZA(),u.qZA()),2&i&&(u.xp6(3),u.Q6J("ngIf",n.scope.operationsAccess&&n.showOperations),u.xp6(1),u.Q6J("ngIf",n.scope.configurationsAccess))},directives:[c.O5,s.lC,s.yS,s.Od,c.mk],styles:[""]}),d),children:[{path:"operations",loadChildren:function(){return Promise.all([e.e(9551),e.e(1797),e.e(3505),e.e(52)]).then(e.bind(e,30052)).then(function(i){return i.OperationsModule})},canActivate:[e(91643).a]},{path:"configurations",loadChildren:function(){return e.e(8215).then(e.bind(e,88215)).then(function(i){return i.ConfigurationsModule})}},{path:"profiles",loadChildren:function(){return Promise.all([e.e(9551),e.e(7414)]).then(e.bind(e,79461)).then(function(i){return i.CcoSubscriberProfileModule})}},{path:"templates",loadChildren:function(){return e.e(8847).then(e.bind(e,98847)).then(function(i){return i.CcoSubscriberTemplatesModule})}},{path:"",redirectTo:"operations",pathMatch:"full"}]}],v=function(){var n=t(function n(){i(this,n)});return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=u.oAB({type:n}),n.\u0275inj=u.cJS({imports:[[s.Bz.forChild(b)],s.Bz]}),n}(),m=function(){var n=t(function n(){i(this,n)});return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=u.oAB({type:n}),n.\u0275inj=u.cJS({imports:[[c.ez,r.A0,v]]}),n}()}}])}();