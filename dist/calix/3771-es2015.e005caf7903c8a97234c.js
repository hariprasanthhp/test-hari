"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[3771],{33771:function(e,t,s){s.r(t),s.d(t,{OrgAccessModule:function(){return I}});var i=s(38583),a=s(39895),r=s(37716),n=s(81100),o=s(83249);let c=(()=>{class e{constructor(e){this.router=e}ngOnInit(){}reloadCurrentRoute(){let e=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([e])})}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(a.F0))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-org-access-header"]],decls:10,vars:0,consts:[[1,"row","my-3","px-0"],[1,"col-md-6"],["href","javascript:void(0)",3,"click"],["src","../../../assets/img/calix-Cloud-logo.svg"],[1,"d-flex","justify-content-end"],[1,"mx-3","pt-2"],[1,""]],template:function(e,t){1&e&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"a",2),r.NdJ("click",function(){return t.reloadCurrentRoute()}),r._UZ(3,"img",3),r.qZA(),r.qZA(),r.TgZ(4,"div",1),r.TgZ(5,"div",4),r.TgZ(6,"div",5),r._UZ(7,"app-grid"),r.qZA(),r.TgZ(8,"div",6),r._UZ(9,"app-dd-menu"),r.qZA(),r.qZA(),r.qZA(),r.qZA())},directives:[n.M,o.z],styles:[""]}),e})();var g=s(30900);let l=(()=>{class e{constructor(e){this.customTranslateService=e,this.pageAvailable=!1,this.language=this.customTranslateService.defualtLanguage,this.language&&(this.pageAvailable=!0),this.customTranslateService.selectedLanguage.subscribe(e=>{this.language=e})}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(g.d))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-org-access-side-menu"]],decls:5,vars:1,consts:[[1,""],[1,"nav","flex-column","left-menu"],[1,"nav-item"],[1,"list-group-item","list-group-item-action","active"]],template:function(e,t){1&e&&(r.TgZ(0,"div",0),r.TgZ(1,"ul",1),r.TgZ(2,"li",2),r.TgZ(3,"a",3),r._uU(4),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&e&&(r.xp6(4),r.Oqu(t.language.orgsList))},styles:[".left-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{border-left:inherit!important;border-right:inherit!important;border-top:inherit!important;word-break:break-word;padding-right:10px}"]}),e})();var d=s(93702);let u=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-org-access-layout"]],decls:9,vars:0,consts:[[1,"maximus","sys-admin-cont"],[1,"row"],[1,"col-md-2","col-sm-3","col-xs-12","pr-2"],[1,"col-md-10","col-sm-9","col-xs-12"],["scrollTopId",""]],template:function(e,t){1&e&&(r.TgZ(0,"div",0),r._UZ(1,"app-org-access-header"),r.TgZ(2,"div",1),r.TgZ(3,"div",2),r._UZ(4,"app-org-access-side-menu"),r.qZA(),r.TgZ(5,"div",3,4),r._UZ(7,"router-outlet"),r.qZA(),r.qZA(),r.qZA(),r._UZ(8,"app-admin-footer"))},directives:[c,l,a.lC,d.c],styles:[""]}),e})();var h=s(23771),p=s(79765),m=s(92340),T=s(91841),b=s(38048),Z=s(5826),f=s(49342),A=s(39075);function v(e,t){1&e&&(r.TgZ(0,"div",18),r.TgZ(1,"div",19),r.TgZ(2,"div",20),r.TgZ(3,"span",21),r._uU(4,"Loading..."),r.qZA(),r.qZA(),r.qZA(),r.qZA())}function q(e,t){if(1&e){const e=r.EpF();r.TgZ(0,"div",22),r.TgZ(1,"span",23),r._UZ(2,"img",24),r.qZA(),r.TgZ(3,"button",25),r.NdJ("click",function(){return r.CHM(e),r.oxw().closeAlert()}),r._UZ(4,"span"),r.qZA(),r._UZ(5,"div",26),r.qZA()}if(2&e){const e=r.oxw();r.xp6(5),r.Q6J("innerHtml",e.errorInfo,r.oJD)}}function C(e,t){if(1&e){const e=r.EpF();r.TgZ(0,"div",27),r.TgZ(1,"span",28),r._UZ(2,"img",29),r.qZA(),r.TgZ(3,"button",25),r.NdJ("click",function(){return r.CHM(e),r.oxw().closeAlert()}),r._UZ(4,"span"),r.qZA(),r._UZ(5,"div",30),r.qZA()}if(2&e){const e=r.oxw();r.xp6(5),r.Q6J("innerHtml",e.successInfo,r.oJD)}}function O(e,t){if(1&e){const e=r.EpF();r.TgZ(0,"tr",31),r.TgZ(1,"td"),r._uU(2),r.qZA(),r.TgZ(3,"td"),r._uU(4),r.qZA(),r.TgZ(5,"td"),r._uU(6),r.qZA(),r.TgZ(7,"td"),r._uU(8),r.qZA(),r.TgZ(9,"td",32),r.TgZ(10,"button",33),r.NdJ("click",function(){const t=r.CHM(e).$implicit;return r.oxw().gotoSecureAcccess(t.orgId)}),r.TgZ(11,"div",34),r.TgZ(12,"span"),r._UZ(13,"i",35),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()}if(2&e){const e=t.$implicit,s=r.oxw();r.s9C("id",e._id),r.xp6(2),r.hij(" ",e.orgName?e.orgName:""," "),r.xp6(2),r.hij(" ",e.orgId?e.orgId:""," "),r.xp6(2),r.hij(" ","Read and Write"==s.checkType(e.type)?s.language["Read and Write"]:s.language["Read only"]," "),r.xp6(2),r.hij(" ",s.checkExpiry(e)," "),r.xp6(2),r.s9C("title",s.language.secureAccess)}}const _=s(91704),x=[{path:"",component:u,children:[{path:"",component:(()=>{class e{constructor(e,t,s,i,a,r,n){this.http=e,this.router=t,this.customTranslateService=s,this.sso=i,this.service=a,this.commonOrgService=r,this.titleService=n,this.pageAvailable=!1,this.tableOptions={pagingType:"full_numbers",rowId:"id",lengthChange:!1,columnDefs:[{targets:[1,2,3,4],orderable:!1},{targets:[0],orderable:!0}],dom:"tipr",order:[0,"asc"],drawCallback:e=>{e.aoData.length<=e._iDisplayLength&&_(e.nTableWrapper).find(`#${e.sTableId}_last`).addClass("disabled")}},this.orgsTableData=[],this.dtTrigger=new p.xQ,this.isRerender=!1,this.loading=!0,this.apps={cmc:!1,csc:!1,cco:!1,foundation:!1,orgAdmin:!1,calixAdmin:!1},this.errorInfo="",this.successInfo="",this.searchClearable=!1,this.isCSCLoggedOut=!1,this.language=this.customTranslateService.defualtLanguage,this.language&&(this.pageAvailable=!0),this.translateSubscribe=this.customTranslateService.selectedLanguage.subscribe(e=>{this.language=e,this.titleService.setTitle(`${this.language["Secured Access Organizations"]} - ${"systemAdministration"===o?this.language["System Administration"]:this.language.administration} - ${this.language["Calix Cloud"]}`),this.dataAvailable=!1,this.loading=!0,this.isRerender=!0,this.setTableOptions("language")}),this.frTable=this.customTranslateService.fr;let o=this.sso.getRedirectModule(this.router.url);this.titleService.setTitle(`${this.language["Secured Access Organizations"]} - ${"systemAdministration"===o?this.language["System Administration"]:this.language.administration} - ${this.language["Calix Cloud"]}`)}ngOnInit(){this.isCSCLoggedOut=this.sso.isCscLoggedOut(),this.isCSCLoggedOut&&(this.loading=!0,this.sso.setCscLoggedOut(!1)),this.tableLanguageOptions(),this.getOrgsData()}ngOnDestroy(){this.dtTrigger.unsubscribe(),this.doSub&&this.doSub.unsubscribe(),this.dataSubscribe&&this.dataSubscribe.unsubscribe(),this.orgsDataSubscribe&&this.orgsDataSubscribe.unsubscribe(),this.translateSubscribe&&this.translateSubscribe.unsubscribe()}getOrgsData(){let e=`${m.N.CALIX_ADMIN_BASE_URL}org-access/username/${this.sso.getUsername()}`;this.dataSubscribe=this.http.get(e).subscribe(e=>{e&&(1==e.length&&"*"==e[0].orgId?this.getAllOrgsData(e[0]):(this.orgsTableData=e,this.setTableOptions(),this.renderTable(),this.loading=!1))},e=>{this.pageErrorHandle(e),this.setTableOptions(),this.renderTable(),this.loading=!1})}getAllOrgsData(e){let t=`${m.N.CALIX_ADMIN_BASE_URL}org-access/username/${this.sso.getUsername()}/_expand`;this.orgsDataSubscribe=this.http.get(t).subscribe(e=>{e&&(this.orgsTableData=e,this.setTableOptions(),this.renderTable(),setTimeout(()=>{this.loading=!1},1e3))},e=>{this.pageErrorHandle(e),this.setTableOptions(),this.renderTable(),this.loading=!1})}renderTable(){this.isRerender?(this.rerender(),this.isRerender=!1):this.dtTrigger.next()}rerender(){this.dtElement.dtInstance.then(e=>{e.destroy(),this.dtTrigger.next()})}setTableOptions(e){this.tableOptions={pagingType:"full_numbers",rowId:"id",lengthChange:!1,dom:"tipr",columnDefs:[{targets:[1,2,3,4],orderable:!1},{targets:[0],orderable:!0}],order:[0,"asc"],drawCallback:e=>{e.aoData.length<=e._iDisplayLength&&_(e.nTableWrapper).find(`#${e.sTableId}_last`).addClass("disabled")}},this.tableLanguageOptions(),e&&"language"==e?setTimeout(()=>{this.dataAvailable=!0,this.renderTable(),setTimeout(()=>{this.loading=!1},100)},100):setTimeout(()=>{this.dataAvailable=!0},500)}gotoSecureAcccess(e){this.loading=!0,this.doSub=this.sso.getAuthToken({client_secret:m.N.X_CALIX_SECURE_CLIENTID,orgId:e},"secure_access").subscribe(e=>{if(this.loading=!1,e.access_token){if(!e.entitlements.length&&"grantor_orgs"!==e.landingPage)return void this.showErrorMessage(this.language["Error: No Valid Entitlement"]);if(!this.checkAccessTime(e))return void this.showErrorMessage(this.language["Access Denied"]);this.sso.setSecureAccessStartTime(e.beginTime),this.sso.setSecureAccessEndTime(e.endTime),this.sso.setCSCLoggedIn(!1),this.sso.setLoginInfo(e),this.sso.setSecureAccess(!0),this.sso.setSecureAccessLoginData(e),this.showApps(),e.landingPage&&"grantor_orgs"==e.landingPage.toLowerCase()?this.router.navigate(["federated-dashboard"]):e.landingPage&&"cco"==e.landingPage.toLowerCase()&&this.apps.cco?this.router.navigate(["/cco"]):e.landingPage&&"cmc"==e.landingPage.toLowerCase()&&this.apps.cmc?this.router.navigate(["/marketing"]):e.landingPage&&("csc"==e.landingPage.toLowerCase()||"main page"==e.landingPage.toLowerCase())&&this.apps.csc?this.router.navigate(["/support"]):e.landingPage&&"DC"==e.landingPage.toLowerCase()&&this.apps.foundation?this.router.navigate(["/cco-foundation"]):this.gotoDP()}},e=>{this.loading=!0})}showApps(){this.apps=this.sso.showApps()}gotoDP(){let e=this.sso.getEntitlementsArr(),t=this.sso.getValidEntitlements(),s="";if(e)for(let i=0;i<e.length;i++)if(t[e[i]]){s=t[e[i]];break}this.router.navigate(s?[s]:["/no-entitlements"])}checkType(e){return this.service.checkType(e)}checkExpiry(e){return this.service.checkExpiryOrgAccess(e)}processAllOrgs(e,t){return e.forEach(e=>{e.beginTime=t.beginTime,e.endTime=t.endTime,e.orgId=e.id,e.orgName=e.name,e.type=t.type}),e}hideSearch(){setTimeout(()=>{_("#organizations-list .dataTables_wrapper .dataTables_filter").css("display","none"),_("#organizations-list .dataTables_wrapper .dataTables_length").css("display","none")},100)}search(e){this.searchClearable=!!e.length,this.dtElement.dtInstance.then(t=>{t.search(e).draw()})}onSearchClearing(e){this.searchClearable=!1,e.value="",this.dtElement.dtInstance.then(t=>{t.search(e.value).draw()})}checkAccessTime(e){if(!e.beginTime&&!e.endTime)return!1;let t=this.service.roundOffTimestamp(e.beginTime),s=(new Date).getTime();if(-1==e.endTime){if(s>=t)return!0}else{let i=this.service.roundOffTimestamp(e.endTime);if(s>=t&&s<i)return!0}return!1}tableLanguageOptions(){"fr"==this.language.fileLanguage?this.tableOptions.language=this.frTable:"es"==this.language.fileLanguage?this.tableOptions.language=this.customTranslateService.es:"de_DE"==this.language.fileLanguage?this.tableOptions.language=this.customTranslateService.de_DE:"en"==this.language.fileLanguage&&this.tableOptions.language&&delete this.tableOptions.language}closeAlert(){this.error=!1,this.success=!1}showErrorMessage(e){this.closeAlert(),this.errorInfo=e,this.error=!0,this.commonOrgService.pageScrollTop()}pageErrorHandle(e){this.errorInfo=401==e.status?this.language["Access Denied"]:this.commonOrgService.pageErrorHandle(e),this.closeAlert(),this.error=!0,this.commonOrgService.pageScrollTop()}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(T.eN),r.Y36(a.F0),r.Y36(g.d),r.Y36(b.t6),r.Y36(Z.q),r.Y36(f.v),r.Y36(A.Dx))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-org-access"]],viewQuery:function(e,t){if(1&e&&r.Gf(h.G,5),2&e){let e;r.iGM(e=r.CRH())&&(t.dtElement=e.first)}},decls:35,vars:15,consts:[[1,"container","position-relative","mh-65"],["class","loader",4,"ngIf"],["class","w-100 alert alert-danger  fade show",4,"ngIf"],["class","w-100 alert alert-success fade show",4,"ngIf"],[1,"row","my-3"],[1,"col-md-12"],[1,"ccl-title"],[1,"col-md-4","offset-md-8","pr-0"],[1,"text-right","flat-right"],[1,"row"],[1,"ccl-form"],["type","text","id","exampleInputEmail1","aria-describedby","emailHelp",1,"ccl-input",3,"placeholder","keyup","search"],["searchBar",""],[1,"clear-icon",3,"hidden","click"],["src","assets/img/close-icon.svg"],[1,"col-md-12",3,"hidden"],["id","org-secure-access","width","100%","datatable","",1,"row-border","hover","table-alter",3,"dtOptions","dtTrigger"],[3,"id",4,"ngFor","ngForOf"],[1,"loader"],[1,"d-flex","justify-content-center"],[1,"spinner-border","text-primary"],[1,"sr-only"],[1,"w-100","alert","alert-danger","fade","show"],[1,"error-img"],["src","./assets/img/ic_error-36px.svg"],["type","button",1,"close",3,"click"],[1,"d-inline-flex",3,"innerHtml"],[1,"w-100","alert","alert-success","fade","show"],[1,"success-img"],["src","./assets/img/success-icon.svg"],[3,"innerHtml"],[3,"id"],[1,"actions"],["id","org-detail-btn",3,"title","click"],[1,"org-profile-icon"],[1,"fas","fa-user"]],template:function(e,t){if(1&e){const e=r.EpF();r.TgZ(0,"div",0),r.YNc(1,v,5,0,"div",1),r.YNc(2,q,6,1,"div",2),r.YNc(3,C,6,1,"div",3),r.TgZ(4,"div",4),r.TgZ(5,"div",5),r.TgZ(6,"div",6),r._uU(7),r.qZA(),r.qZA(),r.qZA(),r.TgZ(8,"div",4),r.TgZ(9,"div",7),r.TgZ(10,"div",8),r.TgZ(11,"div",9),r.TgZ(12,"div",5),r.TgZ(13,"div",10),r.TgZ(14,"input",11,12),r.NdJ("keyup",function(e){return t.search(e.target.value)})("search",function(e){return t.search(e.target.value)}),r.qZA(),r.TgZ(16,"span",13),r.NdJ("click",function(){r.CHM(e);const s=r.MAs(15);return t.onSearchClearing(s)}),r._UZ(17,"img",14),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(18,"div",4),r.TgZ(19,"div",15),r.TgZ(20,"table",16),r.TgZ(21,"thead"),r.TgZ(22,"tr"),r.TgZ(23,"th"),r._uU(24),r.qZA(),r.TgZ(25,"th"),r._uU(26),r.qZA(),r.TgZ(27,"th"),r._uU(28),r.qZA(),r.TgZ(29,"th"),r._uU(30),r.qZA(),r.TgZ(31,"th"),r._uU(32),r.qZA(),r.qZA(),r.qZA(),r.TgZ(33,"tbody"),r.YNc(34,O,14,6,"tr",17),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()}2&e&&(r.xp6(1),r.Q6J("ngIf",t.loading),r.xp6(1),r.Q6J("ngIf",t.error),r.xp6(1),r.Q6J("ngIf",t.success),r.xp6(4),r.Oqu(t.language.secureAccessOrganizationList),r.xp6(7),r.s9C("placeholder",t.language.searchOrganizations),r.xp6(2),r.Q6J("hidden",!t.searchClearable),r.xp6(3),r.Q6J("hidden",!t.dataAvailable),r.xp6(1),r.Q6J("dtOptions",t.tableOptions)("dtTrigger",t.dtTrigger),r.xp6(4),r.Oqu(t.language.organizationName),r.xp6(2),r.Oqu(t.language.orgId),r.xp6(2),r.Oqu(t.language.accesstype),r.xp6(2),r.Oqu(t.language.duration),r.xp6(2),r.Oqu(t.language.Action),r.xp6(2),r.Q6J("ngForOf",t.orgsTableData))},directives:[i.O5,h.G,i.sg],styles:[".org-profile-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover{color:#ff8066}.clear-icon[_ngcontent-%COMP%]{position:absolute;right:30px;top:5px;cursor:pointer;width:12px}#org-detail-btn[_ngcontent-%COMP%]{background-color:transparent;font-size:13.5px;border:none}td.actions[_ngcontent-%COMP%]{white-space:nowrap}"]}),e})(),pathMatch:"full",data:{title:"Calix Cloud - Secure Access"}}]}];let w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[a.Bz.forChild(x)],a.Bz]}),e})();var S=s(23830),y=s(35555);let I=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[i.ez,w,h.T,S.o,y.SysAdminModule]]}),e})()}}]);