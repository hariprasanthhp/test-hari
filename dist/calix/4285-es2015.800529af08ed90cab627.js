"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[4285],{54285:function(t,i,s){s.r(i),s.d(i,{IssuesModule:function(){return j}});var a=s(38583),e=s(18638),n=s(39895),r=s(92340),o=s(79765),c=s(46797),l=s(88002),u=s(37716),h=s(7450),g=s(38048),m=s(91841),d=s(49342),p=s(3679),A=s(48483),f=s(21693);function Z(t,i){if(1&t&&(u.TgZ(0,"div",11),u._uU(1),u.qZA()),2&t){const t=u.oxw();u.xp6(1),u.hij(" ",t.language["Access denied due to RBAC. Please consult your Organization Administrator for access."]," ")}}function v(t,i){if(1&t&&(u.TgZ(0,"section",12),u.TgZ(1,"div",13),u.TgZ(2,"div",14),u.TgZ(3,"div",15),u.TgZ(4,"span",16),u._uU(5),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(5),u.Oqu(t.language.Issues)}}function b(t,i){if(1&t&&(u.TgZ(0,"div",29),u.TgZ(1,"span",20),u._uU(2),u.qZA(),u.TgZ(3,"div",21),u.TgZ(4,"span",22),u._uU(5),u.qZA(),u.qZA(),u.qZA()),2&t){const t=u.oxw(2);u.xp6(2),u.Oqu(t.language.total_events),u.xp6(3),u.Oqu(t.totalEvents?t.totalEvents:0)}}function D(t,i){if(1&t&&(u.TgZ(0,"section"),u.TgZ(1,"div",14),u.TgZ(2,"div",17),u.TgZ(3,"div",18),u.TgZ(4,"div",19),u.TgZ(5,"span",20),u._uU(6),u.qZA(),u.TgZ(7,"div",21),u.TgZ(8,"span",22),u._uU(9),u.qZA(),u.qZA(),u.qZA(),u.TgZ(10,"div",23),u.TgZ(11,"span",20),u._uU(12),u.qZA(),u.TgZ(13,"div",21),u.TgZ(14,"span",22),u._uU(15),u.qZA(),u.qZA(),u.qZA(),u.TgZ(16,"div",24),u.TgZ(17,"span",20),u._uU(18),u.qZA(),u.TgZ(19,"div",21),u.TgZ(20,"span",22),u._uU(21),u.qZA(),u.qZA(),u.qZA(),u.TgZ(22,"div",25),u.TgZ(23,"span",20),u._uU(24),u.qZA(),u.TgZ(25,"div",21),u.TgZ(26,"span",22),u._uU(27),u.qZA(),u.qZA(),u.qZA(),u.TgZ(28,"div",26),u.TgZ(29,"span",20),u._uU(30),u.qZA(),u.TgZ(31,"div",21),u.TgZ(32,"span",22),u._uU(33),u.qZA(),u.qZA(),u.qZA(),u.TgZ(34,"div",27),u.TgZ(35,"span",20),u._uU(36),u.qZA(),u.TgZ(37,"div",21),u.TgZ(38,"span",22),u._uU(39),u.qZA(),u.qZA(),u.qZA(),u.YNc(40,b,6,2,"div",28),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(6),u.Oqu(t.language.total_alarms),u.xp6(3),u.hij("",t.totalAlarms?t.totalAlarms:0," "),u.xp6(3),u.Oqu(t.language["Critical Alarms"]),u.xp6(3),u.hij("",t.criticalAlarms?t.criticalAlarms:0," "),u.xp6(3),u.Oqu(t.language["Major Alarms"]),u.xp6(3),u.hij(" ",t.majorAlarms?t.majorAlarms:0," "),u.xp6(3),u.Oqu(t.language["Minor Alarms"]),u.xp6(3),u.hij("",t.minorAlarms?t.minorAlarms:0," "),u.xp6(3),u.Oqu(t.language["Warning Alarms"]),u.xp6(3),u.hij("",t.countData&&t.countData.warning?t.countData.warning:0," "),u.xp6(3),u.Oqu(t.language["Info Alarms"]),u.xp6(3),u.Oqu(t.countData&&t.countData.info?t.countData.info:0),u.xp6(1),u.Q6J("ngIf",t.urls.includes("/cco/issues/health/history-reports")||t.urls.includes("/cco/issues/device/history-reports")||t.urls.includes("/cco/issues/connectivity/history-reports"))}}function T(t,i){if(1&t&&(u.TgZ(0,"li",30),u.TgZ(1,"a",31),u._uU(2),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(2),u.hij(" ",t.language.Alarms," ")}}function x(t,i){if(1&t&&(u.TgZ(0,"li",30),u.TgZ(1,"a",32),u._uU(2),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(2),u.hij(" ",t.language["Cloud Health"]," ")}}function _(t,i){if(1&t&&(u.TgZ(0,"li",30),u.TgZ(1,"a",33),u._uU(2),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(2),u.hij(" ",t.language["Cloud Connectivity"]," ")}}const C=[{path:"",component:(()=>{class t{constructor(t,i,s,a,e,n,c,l){this.translateService=t,this.router=i,this.sso=s,this.http=a,this.commonOrgService=e,this.fb=n,this.dateUtilsService=c,this.issueService=l,this.baseUrl=`${r.N.API_BASE_URL}analytics-engine/`,this.last24hours=!1,this.reportRanges=[{label:"1",value:"1"},{label:"2",value:"2k"},{label:"3",value:"3"},{label:"4",value:"4"}],this.isToggleSidebar=!1,this.menus={realtime:!1,active:!1,historical:!1,cloud:!1,connect:!1,issues:!1},this.hasPageAccess=!0,this.toggled=new o.xQ,this.filtersForm=this.fb.group({startDate:[""],endDate:[""],alarmType:[""],region:[""],location:[""],system:[""],fsan:[""],severity:[""],category:[""],eventName:[""],customCategory:[""],cco_ack:"all"}),this.loading=!0,this.urls=this.router.url,this.totalAlarms_cleared=0,this.router.routeReuseStrategy.shouldReuseRoute=()=>!1}ngOnInit(){let t=this.sso.getScopes();if(r.N.VALIDATE_SCOPE){let i=Object.keys(t);if(i)for(let t=0;t<i.length;t++)-1===i[t].indexOf("cloud.rbac.coc.issues.current")?-1===i[t].indexOf("cloud.rbac.coc.issues.report.activealarm")?-1===i[t].indexOf("cloud.rbac.coc.issues.report.historyalarm")?-1===i[t].indexOf("cloud.rbac.coc.issues.current")?-1===i[t].indexOf("cloud.rbac.coc.issues.current")||(this.menus.connect=!0):this.menus.cloud=!0:(this.menus.realtime=!0,this.menus.historical=!0):(console.log("Scope"),this.menus.realtime=!0,this.menus.active=!0):(this.menus.realtime=!0,this.menus.connect=!0,this.menus.cloud=!0)}else this.menus={realtime:!0,active:!0,historical:!0,cloud:!0,connect:!0,issues:!0};this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(t=>{this.language=t}),this.pageAcceesObs=this.sso.hasPageAccess$.subscribe(t=>{t.access?(console.log("Issue Access"),this.hasPageAccess=!0):(console.log("No issue access"),this.hasPageAccess=!1)}),this.urls.includes("/cco/issues/device/realtime/current-issues")||this.urls.includes("/cco/issues/cloud-health/realtime/current-issues")||this.urls.includes("/cco/issues/connectivity/realtime/current-issues")?(this.timerSubscription=(0,c.H)(0,15e3).pipe((0,l.U)(()=>{this.alarmsCount()})).subscribe(),console.log(this.timerSubscription)):(this.urls.includes("/cco/issues/device/active-reports")||this.urls.includes("/cco/issues/device/history-reports"))&&(this.countSubscription=this.issueService.filterCount$.subscribe(t=>{this.dateParam=t,this.alarmsCounts()}))}ngOnDestroy(){this.pageAcceesObs&&this.pageAcceesObs.unsubscribe(),this.languageSubject.unsubscribe(),this.timerSubscription&&this.timerSubscription.unsubscribe(),this.countSubscription&&this.countSubscription.unsubscribe()}toggleSideBar(){this.isToggleSidebar=!this.isToggleSidebar,this.sso.triggerToggle()}alarmsCounts(){this.urls.includes("/cco/issues/device/active-reports")&&setTimeout(()=>{this.countSubscribe=this.http.get(`${this.baseUrl}alarmCount?reportType=ACTIVE${this.dateParam}`).subscribe(t=>{this.countData=t&&t.alarm&&t.alarm.raised?t.alarm.raised:{},this.criticalAlarms=this.countData.critical?this.countData.critical.toLocaleString():"0",this.majorAlarms=this.countData.major?this.countData.major.toLocaleString():"0",this.minorAlarms=this.countData.minor?this.countData.minor.toLocaleString():"0",this.totalAlarms=this.countData.critical+this.countData.major+this.countData.minor+this.countData.warning+this.countData.info,this.totalAlarms=this.totalAlarms?this.totalAlarms.toLocaleString():"0",this.countData&&this.countData.info&&(this.countData.info=this.countData.info.toLocaleString()),this.countData&&this.countData.warning&&(this.countData.warning=this.countData.warning.toLocaleString()),this.loading=!1},t=>{this.pageErrorHandle(t),this.criticalAlarms="0",this.majorAlarms="0",this.minorAlarms="0",this.totalAlarms="0",this.loading=!1})},3e3),this.urls.includes("/cco/issues/device/history-reports")&&setTimeout(()=>{this.countSubscribe=this.http.get(`${this.baseUrl}alarmCount?reportType=HISTORY${this.dateParam}`).subscribe(t=>{this.clearedCountData=t&&t.alarm&&t.alarm.cleared?t.alarm.cleared:{},this.countData=t&&t.alarm&&t.alarm.raised?t.alarm.raised:{},this.eventCountData=t&&t.event&&t.event.count?t.event.count:"0",this.criticalAlarms=this.countData.critical?this.countData.critical.toLocaleString():"0",this.majorAlarms=this.countData.major?this.countData.major.toLocaleString():"0",this.minorAlarms=this.countData.minor?this.countData.minor.toLocaleString():"0",this.totalAlarms=this.countData.critical+this.countData.major+this.countData.minor+this.countData.warning+this.countData.info,this.totalAlarms_cleared=this.clearedCountData.critical+this.clearedCountData.major+this.clearedCountData.minor+this.clearedCountData.warning+this.clearedCountData.info,this.totalAlarms=this.totalAlarms?this.totalAlarms.toLocaleString():"0",this.totalEvents=this.eventCountData?this.eventCountData.toLocaleString():"0",this.warningData=this.countData&&this.countData.warning?this.countData.warning:"0",this.warningAlarms=this.warningData?this.warningData.toLocaleString():"0",this.countData&&this.countData.info&&(this.countData.info=this.countData.info.toLocaleString()),this.countData&&this.countData.warning&&(this.countData.warning=this.countData.warning.toLocaleString()),this.loading=!1},t=>{this.pageErrorHandle(t),this.criticalAlarms="0",this.majorAlarms="0",this.minorAlarms="0",this.totalAlarms="0",this.loading=!1})},3e3)}alarmsCount(){(this.urls.includes("/cco/issues/cloud-health/realtime/current-issues")||this.urls.includes("/cco/issues/device/realtime/current-issues")||this.urls.includes("/cco/issues/connectivity/realtime/current-issues"))&&(this.countSubscribe=this.http.get(`${r.N.API_BASE_URL}analytics-engine/alarmCount?reportType=REALTIME`).subscribe(t=>{this.countData=t&&t.alarm&&t.alarm.raised?t.alarm.raised:{},this.criticalAlarms=this.countData.critical?this.countData.critical.toLocaleString():"0",this.majorAlarms=this.countData.major?this.countData.major.toLocaleString():"0",this.minorAlarms=this.countData.minor?this.countData.minor.toLocaleString():"0",this.totalAlarms=this.countData.critical+this.countData.major+this.countData.minor+this.countData.warning+this.countData.info,this.totalAlarms=this.totalAlarms?this.totalAlarms.toLocaleString():"0",this.countData&&this.countData.info&&(this.countData.info=this.countData.info.toLocaleString()),this.countData&&this.countData.warning&&(this.countData.warning=this.countData.warning.toLocaleString()),this.loading=!1},t=>{this.pageErrorHandle(t),this.criticalAlarms="0",this.majorAlarms="0",this.minorAlarms="0",this.totalAlarms="0",this.loading=!1}))}pageErrorHandle(t){this.errorInfo=401==t.status?this.language["Access Denied"]:this.commonOrgService.pageErrorHandle(t),this.error=!0,this.loading=!1}}return t.\u0275fac=function(i){return new(i||t)(u.Y36(h.s),u.Y36(n.F0),u.Y36(g.t6),u.Y36(m.eN),u.Y36(d.v),u.Y36(p.qu),u.Y36(A.s),u.Y36(f.v))},t.\u0275cmp=u.Xpm({type:t,selectors:[["app-issues"]],decls:14,vars:7,consts:[["role","alert","class","alert alert-warning",4,"ngIf"],["class","mb-4",4,"ngIf"],[4,"ngIf"],[3,"hidden"],[1,"container","mp-0"],[1,"row","mm-0"],[1,"m-center","col-sm-12","col-md-12","px-0","mb-4"],[1,"ccl-tabs"],["id","tabs",1,"nav","nav-tabs"],["class","nav-item",4,"ngIf"],["id","current-issue-table",1,"col-12","px-0"],["role","alert",1,"alert","alert-warning"],[1,"mb-4"],[1,"container"],[1,"row"],[1,"col-12","col-md-2","px-0","mobile-center"],[1,"cco-title"],[1,"col-md-12"],[1,"test-container"],["id","current-issues-Total-alarms",1,"item"],[1,"stats-label"],[1,"d-flex","align-content-around","flex-wrap"],[1,"stats-value"],["id","current-issues-critical-alarms",1,"item"],["id","current-issues-major-alarms",1,"item"],["id","current-issues-minor-alarms",1,"item"],["id","current-issues-warning-alarms",1,"item"],["id","current-issues-info-alarms",1,"item"],["class","item","id","historical-reports-Total-Events",4,"ngIf"],["id","historical-reports-Total-Events",1,"item"],[1,"nav-item"],["data-toggle","tab","routerLink","./device","routerLinkActive","active","aria-controls","alarms","aria-selected","true",1,"nav-link"],["data-toggle","tab","routerLink","./cloud-health","routerLinkActive","active","aria-controls","disconncted","aria-selected","true",1,"nav-link","small"],["data-toggle","tab","routerLink","./connectivity","routerLinkActive","active","aria-controls","disconncted","aria-selected","true",1,"nav-link","small"]],template:function(t,i){1&t&&(u.YNc(0,Z,2,1,"div",0),u.YNc(1,v,6,1,"section",1),u.YNc(2,D,41,13,"section",2),u.TgZ(3,"section",3),u.TgZ(4,"div",4),u.TgZ(5,"div",5),u.TgZ(6,"div",6),u.TgZ(7,"div",7),u.TgZ(8,"ul",8),u.YNc(9,T,3,1,"li",9),u.YNc(10,x,3,1,"li",9),u.YNc(11,_,3,1,"li",9),u.qZA(),u.qZA(),u.qZA(),u.TgZ(12,"div",10),u._UZ(13,"router-outlet"),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t&&(u.Q6J("ngIf",!i.hasPageAccess),u.xp6(1),u.Q6J("ngIf",i.hasPageAccess),u.xp6(1),u.Q6J("ngIf",i.hasPageAccess),u.xp6(1),u.Q6J("hidden",!i.hasPageAccess),u.xp6(6),u.Q6J("ngIf",i.menus.realtime),u.xp6(1),u.Q6J("ngIf",i.menus.cloud),u.xp6(1),u.Q6J("ngIf",i.menus.connect))},directives:[a.O5,n.lC,n.yS,n.Od],styles:[".red[_ngcontent-%COMP%]{color:#c70000}.issue-left-menu[_ngcontent-%COMP%]{width:100%}.issue-right-content[_ngcontent-%COMP%]{width:100%;border-left:1px solid #dedede;padding:10px}.current-issue-menu-container[_ngcontent-%COMP%]{display:flex;margin:20px 0;justify-self:start}.current-issue-menu-item[_ngcontent-%COMP%]{flex-grow:0}.current-issue-menu-item[_ngcontent-%COMP%] + .current-issue-menu-item[_ngcontent-%COMP%]{margin-left:1%}.btn-secondary[_ngcontent-%COMP%]{color:#5f6165!important;background-color:#f7f8fa!important;border-color:#888!important}.current-issues-table[_ngcontent-%COMP%]{width:100%}.current-issues-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.current-issues-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{font-size:14px}.current-issues-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]{font-size:14px}@media screen and (max-width: 767px){.cco-title[_ngcontent-%COMP%]{font-size:42px;line-height:60px;font-weight:300;margin:0}.mobile-center[_ngcontent-%COMP%]{text-align:center}.mp-0[_ngcontent-%COMP%]{padding:0!important}.mm-0[_ngcontent-%COMP%]{margin:0!important}.mpr-0[_ngcontent-%COMP%]{padding-right:0!important}.mbr-none[_ngcontent-%COMP%]{border-right:none!important}.mmt-3[_ngcontent-%COMP%]{margin-top:15px!important}#netops-list-menu[_ngcontent-%COMP%]   li.nav-item[_ngcontent-%COMP%]{margin-right:0!important}#netops-list-menu[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{text-align:center}}.padl[_ngcontent-%COMP%]{padding-left:32px}.sidebar-collapse[_ngcontent-%COMP%]{position:absolute;top:170px;background:#fff;width:25px;height:25px;border:1px solid #d3d3d3;border-radius:50%;text-align:center;left:-12px;cursor:pointer}.test-container[_ngcontent-%COMP%]{display:flex;width:100%;margin-bottom:24px}.item[_ngcontent-%COMP%]{flex-grow:1;border-left:1px solid #EBEAEF;padding-left:12px;width:calc(100% / 4)}.item[_ngcontent-%COMP%] + .item[_ngcontent-%COMP%]{margin-left:2%}"]}),t})(),children:[{path:"device/realtime/current-issues",redirectTo:"/cco/alerts/system/realtime/current-issues",pathMatch:"full"},{path:"device/active-reports",redirectTo:"/cco/alerts/system/active-reports",pathMatch:"full"},{path:"device/history-reports",redirectTo:"/cco/alerts/system/history-reports",pathMatch:"full"},{path:"cloud-health/realtime/current-issues",redirectTo:"/cco/alerts/health/realtime/current-issues",pathMatch:"full"},{path:"connectivity/realtime/current-issues",redirectTo:"/cco/alerts/connectivity/realtime/current-issues",pathMatch:"full"},{path:"",redirectTo:"device/realtime/current-issues",pathMatch:"full"}]}];let q=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[n.Bz.forChild(C)],n.Bz]}),t})();var O=s(86640),S=s(94555),w=s(25317),P=s(23771),M=s(77750),y=s(44466);let j=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[a.ez,q,p.u5,O.A0,S.kx,w.l,e._8,P.T,p.UX,M.r,y.m]]}),t})()}}]);