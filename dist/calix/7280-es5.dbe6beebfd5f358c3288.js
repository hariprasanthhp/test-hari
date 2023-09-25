!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(o=i.key,a=void 0,"symbol"==typeof(a=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"))?a:String(a)),i)}var o,a}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[7280],{17280:function(e,i,o){o.r(i),o.d(i,{PonUtilizationModule:function(){return Q}});var a=o(38583),r=o(39895),s=o(92340),l=o(79765),c=o(23771),u=o(37716),d=o(7450),g=o(43673),h=o(45834),p=o(38048),f=o(48483),m=o(51071),v=o(49342),b=o(56769),T=o(42313),Z=function(t){return{"inp-disabled":t}};function x(t,e){if(1&t&&(u.TgZ(0,"span",25),u._UZ(1,"img",26),u._uU(2," Show Thresholds"),u.qZA()),2&t){var n=u.oxw(2);u.ekj("disabled",!n.showTheshold),u.Q6J("ngClass",u.VKq(3,Z,!n.showTheshold))}}function O(t,e){if(1&t){var n=u.EpF();u.TgZ(0,"a",27),u.NdJ("click",function(){return u.CHM(n),u.oxw(2).navigateThreshold()}),u._uU(1,"Edit Threshold"),u.qZA()}}function C(t,e){if(1&t&&(u.TgZ(0,"section",6),u.TgZ(1,"div",7),u.TgZ(2,"div",8),u.TgZ(3,"div",9),u.TgZ(4,"div",10),u.TgZ(5,"span",11),u._uU(6),u.qZA(),u.TgZ(7,"div",12),u.TgZ(8,"h3",7),u._uU(9),u.qZA(),u.qZA(),u.qZA(),u.TgZ(10,"div",13),u.TgZ(11,"span",14),u._uU(12),u.qZA(),u.TgZ(13,"div",12),u.TgZ(14,"h3"),u._uU(15),u.qZA(),u.qZA(),u.TgZ(16,"div",15),u._uU(17),u.qZA(),u.qZA(),u.qZA(),u.TgZ(18,"div",16),u.YNc(19,x,3,5,"span",17),u.TgZ(20,"div",18),u.TgZ(21,"button",19),u._UZ(22,"span"),u.qZA(),u.TgZ(23,"p",20),u._uU(24,"Upstream or Downstream PON Capacity Utilization"),u.qZA(),u.TgZ(25,"table",21),u.TgZ(26,"tr"),u.TgZ(27,"td",22),u._uU(28,"Set Threshold:"),u.qZA(),u.TgZ(29,"td",23),u._uU(30),u.qZA(),u.qZA(),u.TgZ(31,"tr"),u.TgZ(32,"td",22),u._uU(33,"Clear Threshold:"),u.qZA(),u.TgZ(34,"td",23),u._uU(35),u.qZA(),u.qZA(),u.qZA(),u.YNc(36,O,2,0,"a",24),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t){var n=u.oxw();u.xp6(6),u.hij(" ",n.language.TOTAL_PONS,""),u.xp6(3),u.Oqu(n.ponCounts?n.ponCounts:0),u.xp6(3),u.Oqu(n.language["PON Capacity Hits"]),u.xp6(3),u.Oqu(n.PONCAPACITY?n.PONCAPACITY:0),u.xp6(2),u.hij(" ",n.language.Past_24_hours,""),u.xp6(2),u.Q6J("ngIf",n.hasShowAccess),u.xp6(11),u.hij("",n.convert_number(null==n.thresholdData?null:n.thresholdData.ponPortHiUtilThreshold),"%"),u.xp6(5),u.hij("",n.convert_number(null==n.thresholdData?null:n.thresholdData.ponPortHiUtilThresholdClear),"%"),u.xp6(1),u.Q6J("ngIf",n.hasWriteAccess)}}function y(t,e){if(1&t&&(u.TgZ(0,"li",34),u.TgZ(1,"a",35),u._uU(2),u.qZA(),u.qZA()),2&t){var n=u.oxw(2);u.xp6(2),u.Oqu(n.language["Real Time"])}}function A(t,e){if(1&t&&(u.TgZ(0,"li",36),u.TgZ(1,"a",37),u._uU(2),u.qZA(),u.qZA()),2&t){var n=u.oxw(2);u.xp6(2),u.Oqu(n.language.Reports)}}function w(t,e){if(1&t){var n=u.EpF();u.TgZ(0,"div",28),u.TgZ(1,"a",29),u.NdJ("click",function(){return u.CHM(n),u.oxw().toggleSideBar()}),u._UZ(2,"i",30),u.qZA(),u.TgZ(3,"ul",31),u.YNc(4,y,3,1,"li",32),u.YNc(5,A,3,1,"li",33),u.qZA(),u.qZA()}if(2&t){var i=u.oxw();u.Q6J("ngClass",i.isToggleSidebar?"d-none":"d-block"),u.xp6(2),u.Q6J("ngClass",i.isToggleSidebar?"fa-chevron-right":"fa-chevron-left"),u.xp6(2),u.Q6J("ngIf",i.menus.realtime),u.xp6(1),u.Q6J("ngIf",i.menus.report)}}function q(t,e){if(1&t){var n=u.EpF();u.TgZ(0,"a",38),u.NdJ("click",function(){return u.CHM(n),u.oxw().toggleSideBar()}),u._UZ(1,"i",30),u.qZA()}if(2&t){var i=u.oxw();u.Q6J("ngClass",i.isToggleSidebar?"SidebaCollapsedTrue":""),u.xp6(1),u.Q6J("ngClass",i.isToggleSidebar?"fa-chevron-right":"fa-chevron-left")}}var P,_=((P=function(){function e(n,i,o,a,r,s,c,u,d,g){t(this,e),this.translateService=n,this.nfainventoryservice=i,this.ccochatservice=o,this.sso=a,this.dateUtils=r,this.websocketService=s,this.commonOrgService=c,this.ShortnumberPipe=u,this.router=d,this.service=g,this.ponCounts=0,this.dtTrigger=new l.xQ,this.count=0,this.PONCAPACITY=0,this.menus=[],this.isToggleSidebar=!1,this.topONTs=!1}return n(e,[{key:"ngOnInit",value:function(){var t,e=this;this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(t){e.language=t}),this.getData();var n=this.sso.getScopes();if(-1!==(null===(t=null==n?void 0:n["cloud.rbac.coc.operations.health.monitoringthresholds"])||void 0===t?void 0:t.indexOf("write"))&&(this.hasWriteAccess=!0),(null==n?void 0:n["cloud.rbac.coc.operations.health.monitoringthresholds"])&&(this.hasShowAccess=!0),s.N.VALIDATE_SCOPE){var i=Object.keys(n);if(i)for(var o=0;o<i.length;o++)-1===i[o].indexOf("cloud.rbac.coc.health.pon.realtime")?-1===i[o].indexOf("cloud.rbac.coc.health.pon.report")||(this.menus.report=!0):this.menus.realtime=!0}else this.menus={realtime:!0,report:!0};this.totalcount=this.nfainventoryservice.GetPonCount("totalcount").subscribe(function(t){var n;e.ponCounts=null===(n=null==t?void 0:t.count)||void 0===n?void 0:n.toLocaleString()}),this.FromDate=Math.ceil((this.dateUtils.getStartUtcTimeByDaysseconds(0)-864e5)/1e3);var a=Math.ceil(this.dateUtils.getStartUtcTimeByDaysseconds(0)/1e3);this.ponutilizationchart=this.ccochatservice.Getutilizationthresholdexceededcount("tenant=0&granularity=15min&startTime=".concat(this.FromDate,"&endTime=").concat(a),"pon").subscribe(function(t){var n;t&&(Object.values(t).forEach(function(t){t.dsUtilExcCnt&&"undefined"!=t.dsUtilExcCnt&&(e.PONCAPACITY=e.PONCAPACITY+t.dsUtilExcCnt),t.usUtilExcCnt&&"undefined"!=t.usUtilExcCnt&&(e.PONCAPACITY=e.PONCAPACITY+t.usUtilExcCnt)}),e.PONCAPACITY=null===(n=e.PONCAPACITY)||void 0===n?void 0:n.toLocaleString())})}},{key:"convert_number",value:function(t){return t&&parseFloat((100*t).toPrecision(12))}},{key:"ngOnDestroy",value:function(){this.languageSubject&&this.languageSubject.unsubscribe(),this.dtsub&&this.dtsub.unsubscribe(),this.totalcount&&this.totalcount.unsubscribe(),this.quarantinedcount&&this.quarantinedcount.unsubscribe(),this.dtTrigger.unsubscribe()}},{key:"toggleSideBar",value:function(){this.isToggleSidebar=!this.isToggleSidebar,this.websocketService.shouldReflow=!0,this.sso.triggerToggle()}},{key:"getData",value:function(){var t=this;this.service.getThresholds().subscribe(function(e){t.loading=!1,e?(t.thresholdData=e,t.showTheshold=!0):t.showTheshold=!1},function(e){t.loading=!1})}},{key:"showPonModelOpen",value:function(){this.router.navigate(["/cco/health/pon-utilization/ONT"])}},{key:"rerender",value:function(){var t,e,n=this;null===(e=null===(t=this.datatableElement)||void 0===t?void 0:t.dtInstance)||void 0===e||e.then(function(t){var e;null==t||t.destroy(),null===(e=n.dtTrigger)||void 0===e||e.next()})}},{key:"close",value:function(){this.modalRef&&this.modalRef.close()}},{key:"ngAfterViewInit",value:function(){this.dtTrigger.next()}},{key:"GoBack",value:function(){this.topONTs=!1,this.ponCapacitytd=!0}},{key:"countconvert",value:function(t){return this.ShortnumberPipe.transform(t,!0,5)}},{key:"errorHandler",value:function(t){this.errormsg=401==t.status?this.language["Access Denied"]:this.commonOrgService.pageErrorHandle(t)}},{key:"navigateThreshold",value:function(){this.router.navigate(["/cco/operations/health/monitoring-thresholds"])}}]),e}()).\u0275fac=function(t){return new(t||P)(u.Y36(d.s),u.Y36(g.w),u.Y36(h.C),u.Y36(p.t6),u.Y36(f.s),u.Y36(m.i),u.Y36(v.v),u.Y36(b.J),u.Y36(r.F0),u.Y36(T.e))},P.\u0275cmp=u.Xpm({type:P,selectors:[["app-pon-utilization"]],viewQuery:function(t,e){var n;1&t&&u.Gf(c.G,5),2&t&&u.iGM(n=u.CRH())&&(e.datatableElement=n.first)},decls:8,vars:4,consts:[["class","my-3",4,"ngIf"],[1,"container"],[1,"row"],["class","col-md-2 pon-menu pl-0",3,"ngClass",4,"ngIf"],[1,"col-md-10","px-0","position-relative",3,"ngClass"],["class","sidebar-collapse",3,"ngClass","click",4,"ngIf"],[1,"my-3"],[1,""],[1,"d-flex","justify-content-between","align-items-center"],[1,"health-pon-menu-wrapper","col-8","p-0"],["id","PON-kpi-Total-PONs",1,"health-pon-menu-item","kbi-item"],["id","pendoCCOHealthTotalPONs",1,"menu-title"],[1,"d-flex","align-content-around","flex-wrap"],["id","PON-kpi-PON-Capacity-Hits",1,"health-pon-menu-item","kbi-item"],["id","pendoCCOHealthPONCapacityHits",1,"menu-title"],[1,"past-hours"],[1,"dropleft"],["class","primary dropdown-toggle cursor-pointer","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",3,"disabled","ngClass",4,"ngIf"],[1,"dropdown-menu","pop"],["type","button",1,"close"],[1,"title"],[1,"mb-4","ml-3"],[1,"text-right"],[1,"pl-3"],["class","text-decoration-none cursor-pointer",3,"click",4,"ngIf"],["data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"primary","dropdown-toggle","cursor-pointer",3,"ngClass"],["src","../../../../assets/img/ic_info.svg","alt","",1,"ic_info"],[1,"text-decoration-none","cursor-pointer",3,"click"],[1,"col-md-2","pon-menu","pl-0",3,"ngClass"],[1,"sidebar-collapse",3,"click"],[1,"fas",3,"ngClass"],["id","netops-list-menu",1,"nav","flex-column","left-menu","tab-view-style"],["class","nav-item","id","pon-Real-Time",4,"ngIf"],["class","nav-item","id","pon-Reports",4,"ngIf"],["id","pon-Real-Time",1,"nav-item"],["routerLink","/cco/health/pon-utilization/realtime","id","","routerLinkActive","active",1,"list-group-item","list-group-item-action"],["id","pon-Reports",1,"nav-item"],["id","","routerLink","/cco/health/pon-utilization/overview/basic","routerLinkActive","active",1,"list-group-item","list-group-item-action"],[1,"sidebar-collapse",3,"ngClass","click"]],template:function(t,e){1&t&&(u.YNc(0,C,37,9,"section",0),u.TgZ(1,"section"),u.TgZ(2,"div",1),u.TgZ(3,"div",2),u.YNc(4,w,6,4,"div",3),u.TgZ(5,"div",4),u.YNc(6,q,2,2,"a",5),u._UZ(7,"router-outlet"),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t&&(u.Q6J("ngIf",e.menus.realtime||e.menus.report),u.xp6(4),u.Q6J("ngIf",e.menus.realtime||e.menus.report),u.xp6(1),u.Q6J("ngClass",e.isToggleSidebar?"col-12 col-md-12":""),u.xp6(1),u.Q6J("ngIf",e.isToggleSidebar))},directives:[a.O5,a.mk,r.lC,r.yS,r.Od],styles:['@charset "UTF-8";.health-pon-menu-wrapper[_ngcontent-%COMP%]{display:flex;width:100%}input.inp-disabled[_ngcontent-%COMP%]:hover{cursor:not-allowed!important}.kbi-item[_ngcontent-%COMP%]{padding:0 12px!important;border-left:1px solid #EBEAEF!important}.health-pon-menu-item[_ngcontent-%COMP%] + .health-pon-menu-item[_ngcontent-%COMP%]{margin-left:2%}.current-issue-menu-container[_ngcontent-%COMP%]{display:flex;margin:20px 0;justify-self:start}.current-issue-menu-item[_ngcontent-%COMP%]{flex-grow:0}.current-issue-menu-item[_ngcontent-%COMP%] + .current-issue-menu-item[_ngcontent-%COMP%]{margin-left:1%}.btn-secondary[_ngcontent-%COMP%]{color:#5f6165!important;background-color:#f8f8fa!important;border-color:#f8f8fa!important;padding:3px \\200b 10px}.subscriber-trends-wrapper[_ngcontent-%COMP%]{display:flex;width:100%}.subscriber-trends-item[_ngcontent-%COMP%]{flex-grow:1;width:calc(100% / 3)}.subscriber-trends-item[_ngcontent-%COMP%] + .subscriber-trends-item[_ngcontent-%COMP%]{margin-left:5%}.all-icon[_ngcontent-%COMP%]{font-size:10px;color:#9c9c9c;line-height:31px}.health-pon-menu-wrapper[_ngcontent-%COMP%]   .health-pon-menu-item[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:30px!important;color:#0054b2!important;line-height:32px!important;font-weight:300}.health-pon-menu-wrapper[_ngcontent-%COMP%]   .health-pon-menu-item[_ngcontent-%COMP%]   .menu-title[_ngcontent-%COMP%]{color:#1a1f22;font-size:14px;line-height:16.4px}.cco-secondary-title[_ngcontent-%COMP%]{font-size:24px;font-style:normal;font-weight:400;line-height:30px;letter-spacing:0em;text-align:left;color:#1a1f22}@media screen and (max-width: 767px){.health-pon-menu-wrapper[_ngcontent-%COMP%]{display:block}.health-pon-menu-item[_ngcontent-%COMP%]{border-left:3px solid #cdcdcd!important}.health-pon-menu-item[_ngcontent-%COMP%] + .health-pon-menu-item[_ngcontent-%COMP%]{margin-left:0!important;margin-top:10px}}.past-hours[_ngcontent-%COMP%]{color:#9e9e9e;font-size:12px;font-weight:400;line-height:12px}.sidebar-collapse[_ngcontent-%COMP%]{position:absolute;top:130px;background:#fff;width:25px;height:25px;border:1px solid #d3d3d3;border-radius:50%;text-align:center;left:2px;cursor:pointer;z-index:9}.pon-menu[_ngcontent-%COMP%]   .sidebar-collapse[_ngcontent-%COMP%]{left:auto;right:4px}.SidebaCollapsedTrue[_ngcontent-%COMP%]{left:-30px}.health-pon-menu-item.kbi-item[_ngcontent-%COMP%]{min-width:170px}.after-dnone[_ngcontent-%COMP%]:after{display:none}table.border-bottom-none.no-footer[_ngcontent-%COMP%]{border-bottom:none!important}.ic_info[_ngcontent-%COMP%]{width:13px;height:13px}.pop[_ngcontent-%COMP%]{padding:22px 24px 26px 26px;width:475px;filter:drop-shadow(0px 5px 15px rgba(128,128,128,.25));fill:#fff;border-radius:10px;border:none;transform:translate(-101%,-50%)!important}.pop[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#000;font-size:15px;font-weight:600;line-height:24px}.dropleft[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:before{display:none!important}.pop[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-size:12px 12px}']}),P),k=o(12664),U=["showPonModel"];function M(t,e){if(1&t){var n=u.EpF();u.TgZ(0,"tr"),u.TgZ(1,"td"),u._uU(2),u.qZA(),u.TgZ(3,"td"),u.TgZ(4,"a",17),u.NdJ("click",function(){var t=u.CHM(n).$implicit;return u.oxw(2).showTopONTs(null==t?null:t.systemId,null==t?null:t.interface,null==t?null:t.system)}),u._uU(5),u.qZA(),u.qZA(),u.qZA()}if(2&t){var i=e.$implicit;u.xp6(2),u.Oqu(null==i?null:i.system),u.xp6(3),u.Oqu(null==i?null:i.interface)}}function S(t,e){if(1&t){var n=u.EpF();u.TgZ(0,"section",2),u.TgZ(1,"div",3),u.TgZ(2,"h2",4),u._uU(3),u.qZA(),u.TgZ(4,"button",5),u.NdJ("click",function(){return u.CHM(n),u.oxw().close()}),u._UZ(5,"span",6),u.qZA(),u.qZA(),u.TgZ(6,"div",7),u.TgZ(7,"table",8,9),u.TgZ(9,"thead",10),u.TgZ(10,"tr"),u.TgZ(11,"th"),u._uU(12),u.qZA(),u.TgZ(13,"th"),u._uU(14),u.qZA(),u.qZA(),u.qZA(),u.TgZ(15,"div",11),u.TgZ(16,"div",12),u.TgZ(17,"div",13),u.TgZ(18,"span",14),u._uU(19),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(20,"tbody",15),u.YNc(21,M,6,2,"tr",16),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&t){var i=u.oxw();u.Q6J("hidden",!i.ponCapacitytd),u.xp6(3),u.Oqu(i.language["PON Capacity Hits"]),u.xp6(4),u.Q6J("dtOptions",i.dtOptions)("dtTrigger",i.dtTrigger),u.xp6(5),u.Oqu(i.language.System),u.xp6(2),u.Oqu(i.language["Affected Interfaces"]),u.xp6(1),u.Q6J("hidden",!i.loading),u.xp6(4),u.Oqu(i.language.Loading),u.xp6(1),u.Q6J("hidden",!i.ponCapacitytd||i.loading),u.xp6(1),u.Q6J("ngForOf",i.affectedPorts)}}var N=["showTopONTs"];function Y(t,e){if(1&t&&(u.TgZ(0,"div",21),u.TgZ(1,"div",22),u.TgZ(2,"div",23),u.TgZ(3,"span",24),u._uU(4),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t){var n=u.oxw(3);u.xp6(4),u.Oqu(n.language.Loading)}}function I(t,e){if(1&t){var n=u.EpF();u.TgZ(0,"tr"),u.TgZ(1,"td",25),u.TgZ(2,"div",26),u.TgZ(3,"div",27),u.TgZ(4,"span",28),u._UZ(5,"img",29),u.qZA(),u.TgZ(6,"button",30),u.NdJ("click",function(){return u.CHM(n),u.oxw(3).error=!1}),u._UZ(7,"span"),u.qZA(),u._UZ(8,"div",31),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&t){var i=u.oxw(3);u.xp6(8),u.Q6J("innerHtml",i.errorInfo,u.oJD)}}function D(t,e){if(1&t&&(u.TgZ(0,"tr"),u.TgZ(1,"td"),u._uU(2),u.qZA(),u.TgZ(3,"td"),u._uU(4),u.qZA(),u.TgZ(5,"td"),u._uU(6),u.qZA(),u.TgZ(7,"td"),u._uU(8),u.qZA(),u.qZA()),2&t){var n=e.$implicit,i=u.oxw(3);u.xp6(2),u.Oqu(null==n?null:n.ontId),u.xp6(2),u.hij("",i.AddTotalRate(null==n||null==n.ontUpstreamUsage?null:n.ontUpstreamUsage.rate,null==n||null==n.ontDownstreamUsage?null:n.ontDownstreamUsage.rate)," "),u.xp6(2),u.hij(" ",(null==n||null==n.ontUpstreamUsage?null:n.ontUpstreamUsage.byteCount)+(null==n||null==n.ontDownstreamUsage?null:n.ontDownstreamUsage.byteCount),""),u.xp6(2),u.Oqu((null==n||null==n.ontUpstreamUsage?null:n.ontUpstreamUsage.packetCount)+(null==n||null==n.ontDownstreamUsage?null:n.ontDownstreamUsage.packetCount))}}function J(t,e){if(1&t){var n=u.EpF();u.TgZ(0,"section",3),u.TgZ(1,"div",4),u.TgZ(2,"div"),u.TgZ(3,"div",5),u.TgZ(4,"button",6),u.NdJ("click",function(){return u.CHM(n),u.oxw(2).GoBack()}),u._UZ(5,"img",7),u._uU(6),u.qZA(),u.TgZ(7,"button",8),u.NdJ("click",function(){return u.CHM(n),u.oxw(2).close()}),u._UZ(8,"span",9),u.qZA(),u.qZA(),u.TgZ(9,"h2",10),u._uU(10),u.qZA(),u.qZA(),u.qZA(),u.TgZ(11,"div",11),u.TgZ(12,"h3",12),u._uU(13),u.qZA(),u.TgZ(14,"p",13),u._uU(15),u.qZA(),u.TgZ(16,"table",14,15),u.TgZ(18,"thead",16),u.TgZ(19,"tr"),u.TgZ(20,"th",17),u._uU(21),u.qZA(),u.TgZ(22,"th"),u._uU(23),u.qZA(),u.TgZ(24,"th"),u._uU(25),u.qZA(),u.TgZ(26,"th"),u._uU(27),u.qZA(),u.qZA(),u.qZA(),u.YNc(28,Y,5,1,"div",18),u.TgZ(29,"tbody"),u.YNc(30,I,9,1,"tr",19),u.YNc(31,D,9,4,"tr",20),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&t){var i=u.oxw(2);u.xp6(6),u.hij(" ",i.language.back,""),u.xp6(4),u.AsE("",i.interface," (",i.name,")"),u.xp6(3),u.Oqu(i.language["Top 5 ONTs"]),u.xp6(2),u.Oqu(i.language["Ranking based on upstream usage"]),u.xp6(1),u.Q6J("dtOptions",i.dtOptionsONT)("dtTrigger",i.dtTrigger1),u.xp6(5),u.Oqu(i.language.ONT_ID),u.xp6(2),u.hij("",i.language.Rate," (bps)"),u.xp6(2),u.Oqu(i.language["Total Octets"]),u.xp6(2),u.Oqu(i.language["Total Packets"]),u.xp6(1),u.Q6J("ngIf",i.loading),u.xp6(2),u.Q6J("ngIf",i.error),u.xp6(1),u.Q6J("ngForOf",i.TopONt)}}function E(t,e){if(1&t&&u.YNc(0,J,32,14,"section",2),2&t){var n=u.oxw();u.Q6J("ngIf",n.topONTs)}}var j=[{path:"",component:_,children:[{path:"",redirectTo:"realtime",pathMatch:"full"},{path:"realtime",loadChildren:function(){return Promise.all([o.e(6628),o.e(5825)]).then(o.bind(o,15825)).then(function(t){return t.RealtimeModule})}},{path:"overview/basic",loadChildren:function(){return Promise.all([o.e(1291),o.e(9450)]).then(o.bind(o,9450)).then(function(t){return t.ReportsModule})}},{path:"overview",loadChildren:function(){return Promise.all([o.e(1291),o.e(6778)]).then(o.bind(o,56778)).then(function(t){return t.OverviewModule})}},{path:"ONT",component:function(){var e=function(){function e(n,i,o,a,r,s,c){t(this,e),this.translateService=n,this.ccochatservice=i,this.dateUtils=o,this.modalService=a,this.commonOrgService=r,this.ShortnumberPipe=s,this.router=c,this.dtTrigger=new l.xQ,this.dtTrigger1=new l.xQ,this.count=0,this.topONTs=!1,this.dtOptionsONT={info:!1,pageLength:10,lengthChange:!1,processing:!1,dom:"tipr",destroy:!0,columnDefs:[{targets:[0,1,2],orderable:!1}],order:[]},this.dtOptions={pagingType:"full_numbers",pageLength:10,lengthChange:!1,processing:!1,dom:"tipr",columnDefs:[{targets:[1],orderable:!1}],order:[0,"asc"]}}return n(e,[{key:"ngOnInit",value:function(){var t=this;this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(e){t.language=e}),this.FromDate=Math.ceil((this.dateUtils.getStartUtcTimeByDaysseconds(0)-864e5)/1e3),this.showPonModelOpen(this.showPonModel)}},{key:"ngOnDestroy",value:function(){this.languageSubject&&this.languageSubject.unsubscribe(),this.dtsub&&this.dtsub.unsubscribe(),this.totalcount&&this.totalcount.unsubscribe(),this.dtTrigger.unsubscribe(),this.dtTrigger1.unsubscribe()}},{key:"rerender",value:function(){var t,e,n=this;null===(e=null===(t=this.datatableElement)||void 0===t?void 0:t.dtInstance)||void 0===e||e.then(function(t){var e,i;null==t||t.destroy(),null===(e=n.dtTrigger)||void 0===e||e.next(),null===(i=n.dtTrigger1)||void 0===i||i.next()})}},{key:"close",value:function(){this.modalRef&&this.modalRef.close(),this.router.navigate(["/cco/health/pon-utilization/realtime"])}},{key:"showPonModelOpen",value:function(t){var e,n=this;this.ponCapacitytd=!0,this.loading=!0,0!==(null===(e=this.affectedPorts)||void 0===e?void 0:e.length)&&this.isTableLoaded&&this.rerender();var i=new Date;this.dateUtils.getUtCSecondsByDateObj(i,!0),this.dtsub=this.ccochatservice.GetAffectedPorts(this.FromDate,this.dateUtils.getUtCSecondsByDateObj(i,!0),"pon").subscribe(function(t){n.affectedPorts=t||[],n.isTableLoaded?n.rerender():(n.isTableLoaded=!0,n.dtTrigger.next()),n.loading=!1},function(t){n.loading=!1,n.errorHandler(t)}),this.modalRef=this.modalService.open(t,{centered:!0,backdrop:"static",windowClass:"vid-med-modal"})}},{key:"ngAfterViewInit",value:function(){this.dtTrigger.next()}},{key:"GoBack",value:function(){this.topONTs=!1,this.ponCapacitytd=!0}},{key:"countconvert",value:function(t){return this.ShortnumberPipe.transform(t,!0,5)}},{key:"showTopONTs",value:function(t,e,n){this.modalRef&&this.modalRef.close(),this.router.navigate(["/cco/health/pon-utilization/TopOnt"],{queryParams:{system:t,interface:e,name:n}})}},{key:"errorHandler",value:function(t){this.errormsg=401==t.status?this.language["Access Denied"]:this.commonOrgService.pageErrorHandle(t)}}]),e}();return e.\u0275fac=function(t){return new(t||e)(u.Y36(d.s),u.Y36(h.C),u.Y36(f.s),u.Y36(k.FF),u.Y36(v.v),u.Y36(b.J),u.Y36(r.F0))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-pon-kpi"]],viewQuery:function(t,e){var n;(1&t&&(u.Gf(U,7),u.Gf(c.G,5)),2&t)&&(u.iGM(n=u.CRH())&&(e.showPonModel=n.first),u.iGM(n=u.CRH())&&(e.datatableElement=n.first))},decls:2,vars:0,consts:[["class",""],["showPonModel",""],[1,"modal-content",3,"hidden"],[1,"modal-header","mb-3"],[1,"modal-title","eillips-text"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],["datatable","",1,"w-100",3,"dtOptions","dtTrigger"],["table1",""],[1,""],[1,"loader",3,"hidden"],[1,"d-flex","justify-content-center"],["role","",1,"spinner-border","text-primary"],[1,"sr-only"],[3,"hidden"],[4,"ngFor","ngForOf"],[1,"text-decoration-none","cursor-pointer",3,"click"]],template:function(t,e){1&t&&u.YNc(0,S,22,10,"ng-template",0,1,u.W1O)},directives:[c.G,a.sg],styles:[""]}),e}()},{path:"TopOnt",component:function(){var e=function(){function e(n,i,o,a,r,s,c,u){t(this,e),this.translateService=n,this.ccochatservice=i,this.dateUtils=o,this.modalService=a,this.commonOrgService=r,this.ShortnumberPipe=s,this.router=c,this.route=u,this.dtTrigger1=new l.xQ,this.count=0,this.topONTs=!1,this.dtOptionsONT={info:!1,pageLength:10,lengthChange:!1,processing:!1,dom:"tipr",destroy:!0,columnDefs:[{targets:[0,1,2],orderable:!1}],order:[]},this.dtOptions={pagingType:"full_numbers",pageLength:10,lengthChange:!1,processing:!1,dom:"tipr",columnDefs:[{targets:[1],orderable:!1}],order:[0,"asc"]}}return n(e,[{key:"ngOnInit",value:function(){var t=this;this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(function(e){t.language=e}),this.route.queryParams.subscribe(function(e){e.system&&(t.system=e.system),e.interface&&(t.interface=e.interface),e.name&&(t.name=e.name)}),this.FromDate=Math.ceil((this.dateUtils.getStartUtcTimeByDaysseconds(0)-864e5)/1e3),this.showTopONTsModel(this.showTopONTs)}},{key:"ngOnDestroy",value:function(){this.languageSubject&&this.languageSubject.unsubscribe(),this.dtsub&&this.dtsub.unsubscribe(),this.totalcount&&this.totalcount.unsubscribe(),this.dtTrigger1.unsubscribe()}},{key:"rerender",value:function(){var t,e,n=this;null===(e=null===(t=this.datatableElement)||void 0===t?void 0:t.dtInstance)||void 0===e||e.then(function(t){var e;null==t||t.destroy(),null===(e=n.dtTrigger1)||void 0===e||e.next()})}},{key:"close",value:function(){this.modalRef&&this.modalRef.close(),this.router.navigate(["/cco/health/pon-utilization/realtime"])}},{key:"ngAfterViewInit",value:function(){this.dtTrigger1.next()}},{key:"GoBack",value:function(){this.modalRef&&this.modalRef.close(),this.topONTs=!1,this.router.navigate(["/cco/health/pon-utilization/ONT"])}},{key:"countconvert",value:function(t){return this.ShortnumberPipe.transform(t,!0,5)}},{key:"AddTotalRate",value:function(t,e){var n=t.slice(-1);return"".concat((parseFloat(t)+parseFloat(e)).toFixed(3)).concat(n)}},{key:"showTopONTsModel",value:function(t){var e=this;this.loading=!0,this.topONTs=!0,this.ponCapacitytd=!1,this.ccochatservice.GetTop5ONTs(this.interface,this.system).subscribe(function(t){e.TopONt=t||[],e.tableFasn?e.rerender():(e.tableFasn=!0,e.dtTrigger1.next()),e.loading=!1},function(t){e.loading=!1,e.pageErrorHandle(t)}),this.modalRef=this.modalService.open(t,{centered:!0,backdrop:"static",windowClass:"vid-med-modal"})}},{key:"pageErrorHandle",value:function(t){this.error=!0,this.errorInfo=401==t.status?this.language["Access Denied"]:this.commonOrgService.pageErrorHandle(t)}}]),e}();return e.\u0275fac=function(t){return new(t||e)(u.Y36(d.s),u.Y36(h.C),u.Y36(f.s),u.Y36(k.FF),u.Y36(v.v),u.Y36(b.J),u.Y36(r.F0),u.Y36(r.gz))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-pon-fsan"]],viewQuery:function(t,e){var n;(1&t&&(u.Gf(N,7),u.Gf(c.G,5)),2&t)&&(u.iGM(n=u.CRH())&&(e.showTopONTs=n.first),u.iGM(n=u.CRH())&&(e.datatableElement=n.first))},decls:2,vars:0,consts:[["class",""],["showTopONTs",""],["class","modal-content",4,"ngIf"],[1,"modal-content"],[1,"modal-header","mb-3"],[1,"d-flex","justify-content-between","mb-3"],[1,"btn-default","btn-dft","mr-4",3,"click"],["src","assets/img/ic_chevronleft_grey.svg","alt",""],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-title"],[1,"modal-body"],[1,"user-name"],[1,"text-muted","f-size-16px","mb-2"],["datatable","",1,"w-100","border-bottom-none",3,"dtOptions","dtTrigger"],["table2",""],[1,""],[1,"after-dnone"],["class","loader",4,"ngIf"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"loader"],[1,"d-flex","justify-content-center"],["role","",1,"spinner-border","text-primary"],[1,"sr-only"],["colspan","4"],[1,"row"],[1,"w-100","alert","alert-danger","fade","show","my-3"],[1,"error-img"],["src","./assets/img/ic_error-36px.svg"],["type","button",1,"close",3,"click"],[1,"d-inline-flex",3,"innerHtml"]],template:function(t,e){1&t&&u.YNc(0,E,1,1,"ng-template",0,1,u.W1O)},directives:[a.O5,c.G,a.sg],styles:[""]}),e}()}]}],F=function(){var e=n(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[r.Bz.forChild(j)],r.Bz]}),e}(),H=o(94555),Q=function(){var e=n(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[a.ez,F,H.kx,c.T]]}),e}()}}])}();