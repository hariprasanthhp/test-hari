!function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(r=a.key,i=void 0,"symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(r,"string"))?i:String(i)),a)}var r,i}function n(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),Object.defineProperty(e,"prototype",{writable:!1}),e}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[2955],{12955:function(t,a,r){r.r(a),r.d(a,{FederatedDashboardModule:function(){return j}});var i,o=r(38583),s=r(39895),c=r(37716),l=r(81100),u=r(83249),g=((i=function(){function t(){e(this,t)}return n(t,[{key:"ngOnInit",value:function(){}}]),t}()).\u0275fac=function(e){return new(e||i)},i.\u0275cmp=c.Xpm({type:i,selectors:[["app-federated-dashboard-header"]],decls:9,vars:0,consts:[[1,"row","my-3","px-0"],[1,"col-md-6"],["src","../../../assets/img/calix-Cloud-logo.svg"],[1,"d-flex","justify-content-end"],[1,"mx-3","pt-2"],[1,""]],template:function(e,t){1&e&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c._UZ(2,"img",2),c.qZA(),c.TgZ(3,"div",1),c.TgZ(4,"div",3),c.TgZ(5,"div",4),c._UZ(6,"app-grid"),c.qZA(),c.TgZ(7,"div",5),c._UZ(8,"app-dd-menu"),c.qZA(),c.qZA(),c.qZA(),c.qZA())},directives:[l.M,u.z],styles:[""]}),i),d=r(7450),f=r(38048),h=function(){var t=function(){function t(n,a){e(this,t),this.translateService=n,this.sso=a}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.loginType=this.sso.getCscType(),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(t){e.language=t})}}]),t}();return t.\u0275fac=function(e){return new(e||t)(c.Y36(d.s),c.Y36(f.t6))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-federated-dashboard-footer"]],decls:13,vars:3,consts:[[1,"mt-4"],[1,"ftr-row","flex"],[1,"ftr-rht","flex"],[1,"flex","ftr-link"],["target","_blank","href","https://www.calix.com/pages/terms-of-use.html"],["target","_blank","href","https://www.calix.com/content/dam/calix/mycalix-misc/lib/cloud/rn/current/oc-rn.htm"],["target","_blank","href","https://www.calix.com/about-calix/contact-us.html"]],template:function(e,t){1&e&&(c.TgZ(0,"footer",0),c.TgZ(1,"div",1),c._UZ(2,"div"),c.TgZ(3,"div",2),c.TgZ(4,"div",3),c.TgZ(5,"a",4),c._uU(6),c.qZA(),c.TgZ(7,"a",5),c._uU(8),c.qZA(),c.TgZ(9,"a",6),c._uU(10),c.qZA(),c.TgZ(11,"p"),c._uU(12,"1.877.766.3500"),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&e&&(c.xp6(6),c.Oqu(t.language.Terms_and_Conditions),c.xp6(2),c.Oqu(t.language.About_Calix_Cloud),c.xp6(2),c.Oqu(t.language.Contact_Calix))},styles:[""]}),t}(),p=function(){var t=function(){function t(){e(this,t)}return n(t,[{key:"ngOnInit",value:function(){}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-federated-dashboard-layout"]],decls:4,vars:0,consts:[[1,"container"]],template:function(e,t){1&e&&(c.TgZ(0,"div",0),c._UZ(1,"app-federated-dashboard-header"),c._UZ(2,"router-outlet"),c._UZ(3,"app-federated-dashboard-footer"),c.qZA())},directives:[g,s.lC,h],styles:[""]}),t}(),v=r(91841),Z=r(3679),m=r(23771),b=r(79765),w=r(22759),A=r(25917),y=r(54395),T=r(87519),x=r(43190),C=r(5304),_=r(92340),q=r(49342),O=r(39075);function S(e,t){if(1&e&&(c.TgZ(0,"div",11),c.TgZ(1,"div",12),c.TgZ(2,"div",13),c.TgZ(3,"span",14),c._uU(4),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&e){var n=c.oxw();c.xp6(4),c.Oqu(n.language.Loading)}}function k(e,t){if(1&e){var n=c.EpF();c.TgZ(0,"div",15),c.TgZ(1,"span",16),c._UZ(2,"img",17),c.qZA(),c.TgZ(3,"button",18),c.NdJ("click",function(){return c.CHM(n),c.oxw().closeAlert()}),c._UZ(4,"span"),c.qZA(),c._UZ(5,"div",19),c.qZA()}if(2&e){var a=c.oxw();c.xp6(5),c.Q6J("innerHtml",a.errorInfo,c.oJD)}}function I(e,t){if(1&e&&(c.TgZ(0,"div",20),c._uU(1),c.qZA()),2&e){var n=c.oxw();c.xp6(1),c.hij(" ",n.language["Access denied due to RBAC. Please consult your Organization Administrator for access."]," ")}}function L(e,t){if(1&e){var n=c.EpF();c.TgZ(0,"i",21),c.NdJ("click",function(){return c.CHM(n),c.oxw().clearSearchInp()}),c.qZA()}}function E(e,t){if(1&e){var n=c.EpF();c.TgZ(0,"tr"),c.TgZ(1,"td",26),c.NdJ("click",function(){var e=c.CHM(n).$implicit;return c.oxw(2).gotoFederatedAcccess(e.grantor_org_id)}),c._uU(2),c.qZA(),c.qZA()}if(2&e){var a=t.$implicit;c.xp6(2),c.hij(" ",a.grantor_org_name," ")}}function U(e,t){if(1&e&&(c.TgZ(0,"tbody"),c.TgZ(1,"tr"),c.TgZ(2,"td",27),c._uU(3),c.qZA(),c.qZA(),c.qZA()),2&e){var n=c.oxw(2);c.xp6(3),c.Oqu(n.language["No matching records found"])}}function N(e,t){if(1&e&&(c.TgZ(0,"div",22),c.TgZ(1,"table",23),c.TgZ(2,"thead"),c.TgZ(3,"tr"),c.TgZ(4,"th"),c._uU(5),c.qZA(),c.qZA(),c.qZA(),c.TgZ(6,"tbody"),c.YNc(7,E,3,1,"tr",24),c.qZA(),c.YNc(8,U,4,1,"tbody",25),c._UZ(9,"tbody"),c.qZA(),c.qZA()),2&e){var n=c.oxw();c.xp6(1),c.Q6J("dtOptions",n.dtOptions),c.xp6(4),c.Oqu(n.language.Name),c.xp6(2),c.Q6J("ngForOf",n.orgsList),c.xp6(1),c.Q6J("ngIf",0==(null==n.orgsList?null:n.orgsList.length)||0===n.count||0===n.filterCount)}}var P=[{path:"",component:p,children:[{path:"",component:function(){var t=function(){function t(n,a,r,i,o,s,c){e(this,t),this.translateService=n,this.fb=a,this.sso=r,this.http=i,this.router=o,this.commonOrgService=s,this.titleService=c,this.searchOrg=new Z.NI(""),this.isSecureAccess=!1,this.dtOptions={},this.dtTrigger=new b.xQ,this.loading=!1,this.showTable=!1,this.hasScopeAccess=!0,this.orgsList=[],this.accountsForm=this.fb.group({org:[""]}),this.errorInfo="",this.successInfo="",this.count=0}return n(t,[{key:"ngOnInit",value:function(){var e=this;this.isSecureAccess=this.sso.isSecureAccess(),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(t){e.language=t,e.titleService.setTitle("".concat(e.language.Federated," - ").concat(e.language.Dashboards," - ").concat(e.language["Calix Cloud"]))}),this.titleService.setTitle("".concat(this.language.Federated," - ").concat(this.language.Dashboards," - ").concat(this.language["Calix Cloud"]));var t=this.sso.getLandingPage();"grantor_orgs"===(null==t?void 0:t.toLowerCase())?(this.listenSearch(),this.subscribeCount("")):this.router.navigate(["/login"])}},{key:"listenSearch",value:function(){var e=this;this.searchSub=(0,w.R)(document.getElementById("search-org"),"keyup").pipe((0,y.b)(200),(0,T.x)(),(0,x.w)(function(t){return e.orgsList=[],e.getCount(t.target.value)})).subscribe(function(t){(null==t?void 0:t["api-error"])||(e.filterCount=t,e.redraw())})}},{key:"getCount",value:function(e){var t=this;this.loading=!0;var n="".concat(_.N.API_BASE_URL,"grantor/orgs/_count");return e&&(n+="?filter=".concat(e)),this.http.get(n).pipe((0,C.K)(function(e){return e["api-error"]=!0,t.showErrorMessage(t.commonOrgService.pageErrorHandle(e)),(0,A.of)(e)}))}},{key:"subscribeCount",value:function(e){var t=this;this.getCount(e).subscribe(function(n){(null==n?void 0:n["api-error"])||(t.count=n,t.filterCount=n,t.initLoad?t.redraw():t.getData(e))})}},{key:"getData",value:function(e){var t=this;this.showTable=!0,this.dtOptions={pagingType:"full_numbers",pageLength:10,serverSide:!0,processing:!1,lengthChange:!1,ordering:!1,dom:"tipr",ajax:function(e,n){t.http.get("".concat(_.N.API_BASE_URL,"/grantor/orgs?offset=").concat(e.start,"&size=").concat(e.length,"&filter=").concat(e.search.value)).subscribe(function(e){t.orgsList=e||[],t.loading=!1,n({recordsTotal:t.count?t.count:0,recordsFiltered:null!=t.filterCount?t.filterCount:t.count,data:[]})},function(e){t.loading=!1,t.showErrorMessage(t.commonOrgService.pageErrorHandle(e)),n({recordsTotal:t.count?t.count:0,recordsFiltered:null!=t.filterCount?t.filterCount:t.count,data:[]})},function(){t.initLoad=!0,t.loading=!1})},drawCallback:function(e){}},this.tableLanguageOptions()}},{key:"ngOnDestroy",value:function(){}},{key:"tableLanguageOptions",value:function(){"de_DE"==this.language.fileLanguage?this.dtOptions.language=this.translateService.de_DE:"fr"==this.language.fileLanguage?this.dtOptions.language=this.translateService.fr:"es"==this.language.fileLanguage?this.dtOptions.language=this.translateService.es:"en"==this.language.fileLanguage&&this.dtOptions.language&&delete this.dtOptions.language}},{key:"gotoFederatedAcccess",value:function(e){var t=this;this.loading=!0;var n=new v.WM;n=(n=n.append("X-Calix-ClientID",_.N.X_CALIX_CLIENTID)).append("Content-Type","application/x-www-form-urlencoded");var a="client_secret=".concat(_.N.X_CALIX_SECURE_CLIENTID,"&orgid=").concat(e,"&access_token=").concat(this.sso.getAccessToken());this.doSub=this.http.post("".concat(_.N.API_BASE_URL,"grantor/changeorg"),a,{headers:n}).subscribe(function(e){var n;if(t.loading=!1,e.access_token){if(!(null===(n=null==e?void 0:e.entitlements)||void 0===n?void 0:n.length))return void t.showErrorMessage(t.language["Error: No Valid Entitlement"]);var a=t.sso.showApps(e),r=Object.keys(a),i=!1;if(null==r||r.forEach(function(e){a[e]&&(i=!0)}),!i)return void t.showErrorMessage(t.language["Error: No Valid Entitlement"]);t.sso.setCSCLoggedIn(!1),t.sso.setLoginInfo(e),t.sso.setFederatedLogin(!0),e.landingPage&&"cco"==e.landingPage.toLowerCase()&&a.cco?t.router.navigate(["/cco"]):e.landingPage&&"cmc"==e.landingPage.toLowerCase()&&a.cmc?t.router.navigate(["/engagement"]):e.landingPage&&("csc"==e.landingPage.toLowerCase()||"main page"==e.landingPage.toLowerCase())&&a.csc?t.router.navigate(["/support"]):e.landingPage&&"DC"==e.landingPage.toLowerCase()&&a.foundation?t.router.navigate(["/cco-foundation"]):t.gotoDP()}},function(e){t.loading=!1})}},{key:"gotoDP",value:function(){this.router.navigate([this.sso.getDefaultRoute()])}},{key:"closeAlert",value:function(){this.error=!1,this.success=!1}},{key:"showErrorMessage",value:function(e){this.closeAlert(),this.errorInfo=e,this.error=!0,this.loading=!1}},{key:"clearSearchInp",value:function(){this.searchOrg.setValue(""),this.subscribeCount("")}},{key:"redraw",value:function(){var e,t,n=this;null===(t=null===(e=this.dtElement)||void 0===e?void 0:e.dtInstance)||void 0===t||t.then(function(e){e.search(n.searchOrg.value).draw()})}}]),t}();return t.\u0275fac=function(e){return new(e||t)(c.Y36(d.s),c.Y36(Z.qu),c.Y36(f.t6),c.Y36(v.eN),c.Y36(s.F0),c.Y36(q.v),c.Y36(O.Dx))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-federated-dashboard"]],viewQuery:function(e,t){var n;(1&e&&c.Gf(m.G,5),2&e)&&(c.iGM(n=c.CRH())&&(t.dtElement=n.first))},decls:14,vars:8,consts:[[1,"row"],["class","loader",4,"ngIf"],["class","w-100 alert alert-danger  fade show",4,"ngIf"],[1,"col-md-12"],[1,"sub-imp-title","d-flex","justify-content-between"],[1,""],["role","alert","class","alert alert-warning",4,"ngIf"],[1,"col-md-3","smy-2","ccl-form","mt-4","position-relative","px-0"],["id","search-org",1,"ccl-input",3,"placeholder","formControl"],["class","search-close fas fa-times",3,"click",4,"ngIf"],["class","sub-imp-table",4,"ngIf"],[1,"loader"],[1,"d-flex","justify-content-center"],[1,"spinner-border","text-primary"],[1,"sr-only"],[1,"w-100","alert","alert-danger","fade","show"],[1,"error-img"],["src","./assets/img/ic_error-36px.svg"],["type","button",1,"close",3,"click"],[1,"d-inline-flex",3,"innerHtml"],["role","alert",1,"alert","alert-warning"],[1,"search-close","fas","fa-times",3,"click"],[1,"sub-imp-table"],["datatable","",1,"table","table-borderless","w-100",3,"dtOptions"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"pointer","blue",3,"click"],["colspan","5",1,"no-data-available"]],template:function(e,t){1&e&&(c.TgZ(0,"div",0),c.YNc(1,S,5,1,"div",1),c.YNc(2,k,6,1,"div",2),c.TgZ(3,"div",3),c.TgZ(4,"div",4),c.TgZ(5,"div",5),c._uU(6),c.qZA(),c.qZA(),c.qZA(),c.YNc(7,I,2,1,"div",6),c.qZA(),c.TgZ(8,"div",0),c.TgZ(9,"div",3),c.TgZ(10,"div",7),c._UZ(11,"input",8),c.YNc(12,L,1,0,"i",9),c.qZA(),c.YNc(13,N,10,4,"div",10),c.qZA(),c.qZA()),2&e&&(c.xp6(1),c.Q6J("ngIf",t.loading),c.xp6(1),c.Q6J("ngIf",t.error),c.xp6(4),c.Oqu(t.language.selectAnOrganization),c.xp6(1),c.Q6J("ngIf",!t.hasScopeAccess),c.xp6(4),c.s9C("placeholder",t.language["Search Orgs"]),c.Q6J("formControl",t.searchOrg),c.xp6(1),c.Q6J("ngIf",null==t.searchOrg?null:t.searchOrg.value),c.xp6(1),c.Q6J("ngIf",t.showTable))},directives:[o.O5,Z.Fj,Z.JJ,Z.oH,m.G,o.sg],styles:[".blue[_ngcontent-%COMP%]{color:#00f!important}.search-close[_ngcontent-%COMP%]{position:absolute;right:15px;top:10px;color:#cdcdcd;cursor:pointer}  table.dataTable td.dataTables_empty{display:none}"]}),t}(),pathMatch:"full",data:{title:"Calix Cloud - Federated Dashboard"}}]}],D=function(){var t=n(function t(){e(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[s.Bz.forChild(P)],s.Bz]}),t}(),F=r(23830),J=r(86640),j=function(){var t=n(function t(){e(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[o.ez,D,F.o,J.A0,m.T,Z.u5,Z.UX]]}),t}()}}])}();