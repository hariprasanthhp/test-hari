!function(){"use strict";function t(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}function o(t,o){for(var e=0;e<o.length;e++){var i=o[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(n=i.key,a=void 0,"symbol"==typeof(a=function(t,o){if("object"!=typeof t||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,o||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===o?String:Number)(t)}(n,"string"))?a:String(a)),i)}var n,a}function e(t,e,i){return e&&o(t.prototype,e),i&&o(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[52],{30052:function(o,i,n){n.r(i),n.d(i,{OperationsModule:function(){return N}});var a,r=n(38583),l=n(39895),u=n(46529),c=n(37894),s=n(82395),f=n(42237),p=n(81940),g=n(27719),d=n(13909),v=n(83505),w=n(81797),C=n(93231),m=n(85611),k=n(94334),b=n(42996),h=n(57434),T=n(86916),Z=n(92340),q=n(37716),x=n(7450),A=n(38048),y=function(t){return[t]},O=[{path:"",component:(a=function(){function o(e,i,n){t(this,o),this.translateService=e,this.router=i,this.sso=n,this.isDev="".concat(Z.N.API_BASE).indexOf("/dev.api.calix.ai")>-1}return e(o,[{key:"ngOnInit",value:function(){var t=this;this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(o){t.language=o})}},{key:"ngOnDestroy",value:function(){this.languageSubject.unsubscribe()}}]),o}(),a.\u0275fac=function(t){return new(t||a)(q.Y36(x.s),q.Y36(l.F0),q.Y36(A.t6))},a.\u0275cmp=q.Xpm({type:a,selectors:[["app-operations"]],decls:24,vars:16,consts:[[1,"ccl-tabs",3,"ngClass"],["id","tabs",1,"nav","nav-tabs","sub-tab"],[1,"nav-item"],["routerLink","/cco/operations/cco-subscriber-operations/operations/devices-groups","id","deviceGroupTabId","routerLinkActive","active","data-toggle","tab",1,"nav-link",3,"Click"],["data-toggle","tab","routerLink","/cco/operations/cco-subscriber-operations/operations/ONT-profile","id","profileONTTabId","routerLinkActive","active",1,"nav-link","small",3,"Click"],["routerLink","/cco/operations/cco-subscriber-operations/operations/profiles","data-toggle","tab","id","profileTabId","routerLinkActive","active",1,"nav-link","small",3,"Click"],["routerLink","/cco/operations/cco-subscriber-operations/operations/configuration-files-list","id","configFileTabId","data-toggle","tab",1,"nav-link",3,"ngClass","Click"],["routerLink","/cco/operations/cco-subscriber-operations/operations/software-images-list","id","swImgTabId","data-toggle","tab",1,"nav-link",3,"ngClass","Click"],["data-toggle","tab","routerLink","/cco/operations/cco-subscriber-operations/operations/workflows","id","workflowsTabId","routerLinkActive","active",1,"nav-link","small",3,"Click"],["data-toggle","tab","routerLink","/cco/operations/cco-subscriber-operations/operations/performance-testing","id","performanceTestingTabId","routerLinkActive","active",1,"nav-link","small",3,"Click"]],template:function(t,o){1&t&&(q.TgZ(0,"div",0),q.TgZ(1,"ul",1),q.TgZ(2,"li",2),q.TgZ(3,"a",3),q.NdJ("Click",function(t){return t.preventDefault()}),q._uU(4),q.qZA(),q.qZA(),q.TgZ(5,"li",2),q.TgZ(6,"a",4),q.NdJ("Click",function(t){return t.preventDefault()}),q._uU(7),q.qZA(),q.qZA(),q.TgZ(8,"li",2),q.TgZ(9,"a",5),q.NdJ("Click",function(t){return t.preventDefault()}),q._uU(10),q.qZA(),q.qZA(),q.TgZ(11,"li",2),q.TgZ(12,"a",6),q.NdJ("Click",function(t){return t.preventDefault()}),q._uU(13),q.qZA(),q.qZA(),q.TgZ(14,"li",2),q.TgZ(15,"a",7),q.NdJ("Click",function(t){return t.preventDefault()}),q._uU(16),q.qZA(),q.qZA(),q.TgZ(17,"li",2),q.TgZ(18,"a",8),q.NdJ("Click",function(t){return t.preventDefault()}),q._uU(19),q.qZA(),q.qZA(),q.TgZ(20,"li",2),q.TgZ(21,"a",9),q.NdJ("Click",function(t){return t.preventDefault()}),q._uU(22),q.qZA(),q.qZA(),q.qZA(),q.qZA(),q._UZ(23,"router-outlet")),2&t&&(q.Q6J("ngClass",q.VKq(10,y,o.router.url.includes("/operations/workflows")?"mb-3":"")),q.xp6(4),q.Oqu(o.language.Device_groups),q.xp6(3),q.Oqu(o.language["ONT Services Profiles"]),q.xp6(3),q.Oqu(o.language["RG Profiles"]),q.xp6(2),q.Q6J("ngClass",q.VKq(12,y,o.router.url.includes("configuration-files-list")||o.router.url.includes("configuration-files-form")?"active":"")),q.xp6(1),q.Oqu(o.language.Config_Files),q.xp6(2),q.Q6J("ngClass",q.VKq(14,y,o.router.url.includes("software-images-list")||o.router.url.includes("software-images-form")?"active":"")),q.xp6(1),q.Oqu(o.language.Software_Images),q.xp6(3),q.Oqu(o.language.Work_Flows),q.xp6(3),q.Oqu(o.language.Performance_Testing))},directives:[r.mk,l.yS,l.Od,l.lC],styles:[""]}),a),children:[{path:"devices-groups",component:s.P,data:{title:"Calix Cloud - Flow Configuration"}},{path:"profiles",component:g.N,data:{title:"Calix Cloud - Flow Configuration"}},{path:"profiles/profile-wizard",component:p.s,data:{title:"Calix Cloud - Flow Configuration"}},{path:"software-images-list",component:d.v,data:{title:"Calix Cloud - Flow Configuration"}},{path:"workflows",component:m.n,data:{title:"Calix Cloud - Flow Configuration"}},{path:"workflows/workflow-wizard",component:C.M,data:{title:"Calix Cloud - Flow Configuration"}},{path:"workflows/workflow-alarm-wizard",component:v.d,data:{title:"Calix Cloud - Flow Configuration"}},{path:"workflows/official-workflow-wizard",component:w.f,data:{title:"Calix Cloud - Flow Configuration"}},{path:"performance-testing",component:f.d,data:{title:"Calix Cloud - Flow Configuration"}},{path:"performance-testing/:id",component:f.d,data:{title:"Calix Cloud - Flow Configuration"}},{path:"configuration-files-list",component:c.s,data:{title:"Calix Cloud - Flow Configuration"}},{path:"configuration-files-form",component:u.f,data:{title:"Calix Cloud - Flow Configuration"}},{path:"workflows/workflow-status",component:b.c},{path:"workflows/workflow-details",component:k.m},{path:"",redirectTo:"devices-groups",pathMatch:"full"},{path:"ONT-profile",component:T.n},{path:"ONT-profile/add",component:h.D},{path:"ONT-profile/edit",component:h.D}]}],F=function(){var o=e(function o(){t(this,o)});return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=q.oAB({type:o}),o.\u0275inj=q.cJS({imports:[[l.Bz.forChild(O)],l.Bz]}),o}(),N=function(){var o=e(function o(){t(this,o)});return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=q.oAB({type:o}),o.\u0275inj=q.cJS({imports:[[r.ez,F]]}),o}()}}])}();