"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[8592],{12610:function(t,e,n){n.d(e,{_:function(){return r}});var i=n(37716),a=n(91841);let r=(()=>{class t{constructor(t){this.http=t,this.VideoEnable={},this.dataEnable={}}getdataEnableData(t){return!!this.dataEnable.hasOwnProperty(t)&&this.dataEnable[t]}setdataEnableData(t,e,n=!1){n?this.dataEnable={}:this.dataEnable[t]=e}getdataEnableVideo(t){return!!this.VideoEnable.hasOwnProperty(t)&&this.VideoEnable[t]}setdataEnableVideo(t,e,n=!1){n?this.VideoEnable={}:this.VideoEnable[t]=e}setServicesData(t,e){var n,i,a,r,o,s,d,c,l,h,p,u,g,m,f,v,w,b;let x=(null===(a=null===(i=null===(n=null==t?void 0:t.subscriberInformation)||void 0===n?void 0:n.ont)||void 0===i?void 0:i.dataService)||void 0===a?void 0:a.serviceDefinitionName)?null===(s=null===(o=null===(r=null==t?void 0:t.subscriberInformation)||void 0===r?void 0:r.ont)||void 0===o?void 0:o.dataService)||void 0===s?void 0:s.serviceDefinitionName:"",C=(null===(l=null===(c=null===(d=null==t?void 0:t.subscriberInformation)||void 0===d?void 0:d.ont)||void 0===c?void 0:c.voiceService)||void 0===l?void 0:l.serviceDefinitionName)?null===(u=null===(p=null===(h=null==t?void 0:t.subscriberInformation)||void 0===h?void 0:h.ont)||void 0===p?void 0:p.voiceService)||void 0===u?void 0:u.serviceDefinitionName:"",D=(null===(f=null===(m=null===(g=null==t?void 0:t.subscriberInformation)||void 0===g?void 0:g.ont)||void 0===m?void 0:m.videoService)||void 0===f?void 0:f.serviceDefinitionName)?null===(b=null===(w=null===(v=null==t?void 0:t.subscriberInformation)||void 0===v?void 0:v.ont)||void 0===w?void 0:w.videoService)||void 0===b?void 0:b.serviceDefinitionName:"";return e&&"data"==e?`${x||""}`:e&&"voice"==e?`${C||""}`:e&&"video"==e?`${D||""}`:`${x||""}${C?(x?", ":"")+C:""}${D?(x||C?", ":"")+D:""}`}}return t.\u0275fac=function(e){return new(e||t)(i.LFG(a.eN))},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac}),t})()},47968:function(t,e,n){n.d(e,{G:function(){return s}});var i=n(26215),a=n(37716),r=n(38048),o=n(39895);let s=(()=>{class t{constructor(t,e){this.sso=t,this.router=e,this.prevStreamData={maxRate:[0,0],packet:[0,0]},this.data={upRateData:[],downRateData:[],packetUpData:[],packetDownData:[]},this.latestValues=new i.X({}),this.rateUpDeltaPerSec=0,this.rateDownDeltaPerSec=0,this.packetUpDeltaPerSec=0,this.packetDownDeltaPerSec=0}getData(){this.data={upRateData:[],downRateData:[],packetUpData:[],packetDownData:[]},this.prevStreamData={maxRate:[0,0],packet:[0,0]},this.rateUpDeltaPerSec=0,this.rateDownDeltaPerSec=0,this.packetUpDeltaPerSec=0,this.packetDownDeltaPerSec=0;for(let t=0;t<=300;t++)this.data.upRateData.push(0),this.data.downRateData.push(0),this.data.packetUpData.push(0),this.data.packetDownData.push(0);this.emitLatestValues()}getDelta(t,e){let n;return n=t<=0?e:t-e,n/15}emitLatestValues(){setInterval(()=>{this.data.upRateData.splice(0,1),this.data.downRateData.splice(0,1),this.data.packetUpData.splice(0,1),this.data.packetDownData.splice(0,1),this.data.upRateData.push(this.calculateNewValue(this.data.upRateData[299],this.rateUpDeltaPerSec)),this.data.downRateData.push(this.calculateNewValue(this.data.downRateData[299],this.rateDownDeltaPerSec)),this.data.packetUpData.push(this.calculateNewValue(this.data.packetUpData[299],this.packetUpDeltaPerSec)),this.data.packetDownData.push(this.calculateNewValue(this.data.packetDownData[299],this.packetDownDeltaPerSec)),this.latestValues.next(this.data)},1e3)}calculateNewValue(t,e){const n=(t+e).toFixed(2),i=parseInt(n);return i>=0?i:0}unsubscribeStream(){this.source&&(this.source.close(),this.source=null),this.data={upRateData:[],downRateData:[],packetUpData:[],packetDownData:[]},this.prevStreamData={maxRate:[0,0],packet:[0,0]},this.rateUpDeltaPerSec=0,this.rateDownDeltaPerSec=0,this.packetUpDeltaPerSec=0,this.packetDownDeltaPerSec=0}checkGetData(){this.source||this.getData()}}return t.\u0275fac=function(e){return new(e||t)(a.LFG(r.t6),a.LFG(o.F0))},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},90956:function(t,e,n){n.r(e),n.d(e,{AddServiceSystemModule:function(){return m}});var i=n(38583),a=n(39895),r=n(31128),o=n(70357),s=n(37716);const d=[{path:"",component:o.I,children:[{path:"add-details",component:r.U,data:{title:"Calix Cloud - Add Subscriber"}}]}];let c=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[a.Bz.forChild(d)],a.Bz]}),t})();var l=n(86640),h=n(23771),p=n(65681),u=n(3679),g=n(44466);let m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[i.ez,c,l.A0,u.u5,u.UX,h.T,p.m,g.m]]}),t})()},89044:function(t,e,n){n.d(e,{U:function(){return c}});var i=n(26215),a=n(40205),r=n(91841),o=n(92340),s=n(5304),d=n(37716);let c=(()=>{class t{constructor(t){this.httpClient=t,this.isDev=!1,this.flowDataSync=new i.X({flowDataTab:!0}),this.baseUrl=o.N.faAdminCorrelatorURL,this.correlator="correlator",this.flowEndpoint="flowendpoint";let e=new r.WM({"Content-Type":"application/json"});this.options={headers:e}}getCount(t){return this.httpClient.get(`${this.baseUrl}${this.flowEndpoint}/count?org-id=${t}`)}getLists(t,e,n){return null==e&&(e=0),null==n&&(n=10),this.httpClient.get(`${o.N.faAdminCorrelatorURL}flowendpoint?org-id=${t}&pagenumber=${e}&pagesize=${n}`)}getListsDev(t,e,n,i){return null==n&&(n=0),null==i&&(i=10),this.httpClient.get(`${o.N.faAdminCorrelatorURL}flowendpoint?org-id=${t}&pagenumber=${n}&pagesize=${i}&mappedby=${e}`)}AddIP(t){return this.httpClient.post(t,{},this.options)}EndpointDelete(t){return this.httpClient.delete(t)}NonAssignedEndpointDelete(t){return this.httpClient.delete(t)}getOrg(t){return this.httpClient.get(`${o.N.faAdminURL}organization?org-id=${t}`)}updateOrgPUT(t,e){return this.httpClient.put(`${o.N.faAdminURL}organization?org-id=${t}`,e,this.options)}updateOrgPatch(t,e){return this.httpClient.patch(`${o.N.faAdminURL}organization?org-id=${t}`,e,this.options)}createOrg(t,e){return this.httpClient.post(`${o.N.faAdminURL}organization?org-id=${t}`,e,this.options)}updateManagement(t,e){return this.httpClient.put(`${o.N.faAdminCorrelatorURL}assigned/subscriber?org-id=${t}`,e,this.options)}Export(t){return this.httpClient.post(`${o.N.faAdminCorrelatorURL}assigned/subscriber/export?org-id=${t}`,{})}getAssignedCount(t){return this.httpClient.get(`${o.N.faAdminCorrelatorURL}flowendpoint?org-id=${t}&mappedby=ASSIGNED&count=true`)}getAssigned(t,e){return this.httpClient.get(`${o.N.faAdminCorrelatorURL}flowendpoint?org-id=${t}&pagenumber=${e}&pagesize=1000&mappedby=ASSIGNED`)}importAssigned(t,e){return this.httpClient.post(`${o.N.faAdminCorrelatorURL}assigned/subscriber/import?org-id=${e}`,t)}getAggregatedGroups(t,e){return this.httpClient.get(`${o.N.faAdminCorrelatorURL}flowendpoint?org-id=${t}&pagenumber=0&pagesize=100&agggroup=${e}`)}add1MinuteAggregation(t,e){return this.httpClient.post(`${o.N.faAdminURL}organization/allow1minaggregation?enable=${e}&org-id=${t}`,{})}addUnmappedIdAggregation(t,e){return this.httpClient.post(`${o.N.faAdminURL}organization/allowunmapped?enable=${e}&org-id=${t}`,{})}getDelay(t){return this.httpClient.get(`${o.N.API_BASE_URL}flow-realtime/lateflows?orgId=${t}&tenant-id=0`).pipe((0,s.K)(this.handleError))}handleError(t){return(0,a._)(t)}getMappedcount(t){return this.httpClient.get(`${o.N.faAdminCorrelatorURL}flowendpoint/count?discovered=true&org-id=${t}`)}getUnmappedcount(t){return this.httpClient.get(`${o.N.faAdminCorrelatorURL}flowendpoint/unmapped/count?org-id=${t}&source=true`)}}return t.\u0275fac=function(e){return new(e||t)(d.LFG(r.eN))},t.\u0275prov=d.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},52727:function(t,e,n){n.d(e,{L:function(){return P}});var i=n(39895),a=n(79765),r=n(25917),o=n(54395),s=n(43190),d=n(5304),c=n(26877),l=n(92340),h=n(37716),p=n(30900),u=n(51071),g=n(91841),m=n(38048),f=n(38583),v=n(70792),w=n(3679);function b(t,e){if(1&t&&(h.TgZ(0,"div",9),h._uU(1),h.qZA()),2&t){const t=h.oxw(2);h.xp6(1),h.Oqu(t.language["Not found"])}}function x(t,e){if(1&t){const t=h.EpF();h.TgZ(0,"li",13),h.NdJ("click",function(){const e=h.CHM(t).$implicit;return h.oxw(4).gotoEndpoint(e)}),h._uU(1),h.qZA()}if(2&t){const t=e.$implicit;h.xp6(1),h.Oqu(t.endPointName?t.endPointName:t.name?t.name:t.ipAddress)}}function C(t,e){if(1&t&&(h.TgZ(0,"ul"),h.YNc(1,x,2,1,"li",12),h.qZA()),2&t){const t=h.oxw(3);h.xp6(1),h.Q6J("ngForOf",t.searchData)}}function D(t,e){if(1&t&&(h.TgZ(0,"div",10),h.YNc(1,C,2,1,"ul",11),h.qZA()),2&t){const t=h.oxw(2);h.xp6(1),h.Q6J("ngIf",t.searchData.length>0)}}function S(t,e){if(1&t){const t=h.EpF();h.TgZ(0,"div",1),h.YNc(1,b,2,1,"div",2),h._UZ(2,"app-favorite-endpoints",3),h.TgZ(3,"div",4),h.TgZ(4,"input",5),h.NdJ("ngModelChange",function(e){return h.CHM(t),h.oxw().searchText=e})("keyup",function(e){return h.CHM(t),h.oxw().searchByCharacters(e)})("keyup.enter",function(){return h.CHM(t),h.oxw().performSearch()}),h.qZA(),h.TgZ(5,"button",6),h.NdJ("click",function(){return h.CHM(t),h.oxw().performIconSearch()}),h._UZ(6,"img",7),h.qZA(),h.YNc(7,D,2,1,"div",8),h.qZA(),h.qZA()}if(2&t){const t=h.oxw();h.xp6(1),h.Q6J("ngIf",t.epSearchError),h.xp6(1),h.Q6J("pageType","Traffic")("showSensitiveInfo",t.showSensitiveInfo),h.xp6(2),h.s9C("placeholder",t.language["IP Address, End Points"]),h.Q6J("ngModel",t.searchText),h.xp6(1),h.Q6J("disabled",t.loading),h.xp6(2),h.Q6J("ngIf",t.searchText&&t.searchText.length>=2&&t.searchData.length>0)}}let P=(()=>{class t{constructor(t,e,n,r,o){this.router=t,this.customTranslateService=e,this.webSocketService=n,this.http=r,this.sso=o,this.pageAvailable=!1,this.endpointID="",this.subscriberName="",this.locationName="",this.regionName="",this.endPointName="",this.modelName="",this.IPAddress="",this.mappedBy="",this.lastUpdatedTime="",this.url="",this.endPointList=[],this.showEndpointSearch=!0,this.loading=!1,this.showHyperLink=!1,this.showSubscriber=!1,this.hasPageAccess=!1,this.searchData=[],this.epSearchError=!1,this.searchText="",this.searchText$=new a.xQ,window.location.pathname.includes("/realtime")||(this.showEndpointSearch=!1),this.showTextSubs=this.router.events.subscribe(t=>{t instanceof i.OD&&(this.showEndpointSearch=!!t.url.includes("/realtime"))})}ngOnInit(){this.ORG_ID=this.sso.getOrganizationID(this.router.url),this.language=this.customTranslateService.defualtLanguage,this.language&&(this.pageAvailable=!0),this.customTranslateService.selectedLanguage.subscribe(t=>{this.language=t}),this.doSearch()}get showSensitiveInfo(){return"true"==sessionStorage.getItem("showSensitiveInfo")}doSearch(){this.subscribers$=this.searchText$.pipe((0,o.b)(500),(0,s.w)(t=>this.mappedSearchEndPoint(t)),(0,s.w)(t=>404==t||0===t.length?this.unmappedSearchEndPoint(this.searchText):t)).subscribe(t=>{404!==t?(Array.isArray(t)?(this.searchData=t,this.getEndpointName(this.searchData),this.epSearchError=!1,this.webSocketService.isUnmapped=!0):(this.searchData.push(t),this.getEndpointName(this.searchData),this.epSearchError=!1,this.webSocketService.isUnmapped=!1),this.loading=!1):(this.epSearchError=!0,this.loading=!1)},t=>{this.epSearchError=!0,this.loading=!1})}searchByCharacters(t){const e=$(t.target).val().toString();e.length<2?this.epSearchError=!1:(13!==t.keyCode&&(this.loading=!0,this.epSearchError=!1),this.searchData=[],this.searchText$.next(e))}mappedSearchEndPoint(t){return this.url=`${l.N.faAdminCorrelatorURL}flowendpoint?org-id=${this.ORG_ID}&searchstring=${t}`,this.http.get(this.url).pipe((0,d.K)(t=>(0,r.of)(t.status)))}unmappedSearchEndPoint(t){return this.searchData=[],this.http.get(`${l.N.FA_API_BASE_URL}correlator/flowendpoint/unmapped?org-id=${this.ORG_ID}&ip=${t}`).pipe((0,d.K)(t=>(0,r.of)(t.status)))}performIconSearch(){if(0===this.searchData.length)this.performSearch();else{this.loading=!0;let t=!1;this.searchData.forEach(e=>{(this.searchText===e.ipAddress||this.searchText===e.name)&&(this.loading=!1,t=!0,this.gotoEndpoint(e))}),t||(this.loading=!1,this.gotoEndpoint(this.searchData[0]))}}performSearch(){const t=this.searchText;t.length<2||(this.loading=!0,this.searchText$.next(t))}gotoEndpoint(t){var e,n,i,a;let r=window.location.pathname.indexOf("/organization-admin/")>-1?"/organization-admin/flowAnalyze/traffic/endpoint/realtime":"/systemAdministration/flowAnalyze/traffic/endpoint/realtime";this.webSocketService.isUnmapped?(this.webSocketService.setEndpointValue(t.ipAddress),!this.epSearchError&&this.searchText&&!this.loading&&(window.sessionStorage.setItem("endpointName",null!==(a=null!==(i=t.endPointName)&&void 0!==i?i:t.name)&&void 0!==a?a:t.ipAddress),this.router.navigate([r],{queryParams:{id:t.ipAddress}}))):t.id&&null!==t.id&&(this.webSocketService.setEndpointValue(t.id),!this.epSearchError&&this.searchText&&!this.loading&&(window.sessionStorage.setItem("endpointName",null!==(n=null!==(e=t.endPointName)&&void 0!==e?e:t.name)&&void 0!==n?n:t.ipAddress),this.router.navigate([r],{queryParams:{id:t.id}})))}ngOnDestroy(){this.showTextSubs&&this.showTextSubs.unsubscribe()}getEndpointName(t){t&&t.length>0&&t.map(t=>{t.name||(t.name=t.ipAddress),this.showSensitiveInfo||(t.name=(0,c.C)(t.name)),t.name!==t.ipAddress&&!t.name.includes(t.ipAddress)&&(t.endPointName=t.name+"_"+t.ipAddress),t.name!==t.ipAddress&&t.name.includes(t.ipAddress)&&(t.endPointName=t.name),t.name===t.ipAddress&&(t.endPointName=t.name)})}}return t.\u0275fac=function(e){return new(e||t)(h.Y36(i.F0),h.Y36(p.d),h.Y36(u.i),h.Y36(g.eN),h.Y36(m.t6))},t.\u0275cmp=h.Xpm({type:t,selectors:[["app-input-box"]],decls:1,vars:1,consts:[["class","traffic-search-area d-flex align-items-end",4,"ngIf"],[1,"traffic-search-area","d-flex","align-items-end"],["class","invalid-msg","id","ep-search-error",4,"ngIf"],[1,"mb-2",3,"pageType","showSensitiveInfo"],[1,"d-inline-flex","align-items-center","justify-content-between","search-box-input"],["name","search","id","search","ng-reflect-name","search","autocomplete","off",1,"ng-pristine","ng-valid","ng-touched",3,"placeholder","ngModel","ngModelChange","keyup","keyup.enter"],[1,"search-box-icon",3,"disabled","click"],["id","searchSubscriberIcon","src","assets/img/ic_search_white.svg",1,"search-icon","primary"],["class","search-result-dropdown overflow-auto",4,"ngIf"],["id","ep-search-error",1,"invalid-msg"],[1,"search-result-dropdown","overflow-auto"],[4,"ngIf"],[3,"click",4,"ngFor","ngForOf"],[3,"click"]],template:function(t,e){1&t&&h.YNc(0,S,8,7,"div",0),2&t&&h.Q6J("ngIf",e.showEndpointSearch)},directives:[f.O5,v.w,w.Fj,w.JJ,w.On,f.sg],styles:[".undo-icon[_ngcontent-%COMP%]{background-color:#f8f8fa;padding:5px;color:#9e9e9e;border-radius:15px;margin:3px;font-size:13px;cursor:pointer}.current-issue-menu-container[_ngcontent-%COMP%]{display:flex;margin:20px 0;justify-self:start}.current-issue-menu-item[_ngcontent-%COMP%]{flex-grow:0}.current-issue-menu-item[_ngcontent-%COMP%] + .current-issue-menu-item[_ngcontent-%COMP%]{margin-left:1%}.btn-secondary[_ngcontent-%COMP%]{color:#5f6165!important;background-color:#f7f8fa!important;border-color:#888!important}.test-container[_ngcontent-%COMP%]{display:flex;width:100%}.item[_ngcontent-%COMP%]{flex-grow:1;border-left:3px solid #cdcdcd;padding-left:20px;width:calc(100% / 3)}.item[_ngcontent-%COMP%] + .item[_ngcontent-%COMP%]{margin-left:2%}.sub-menu-list-icon[_ngcontent-%COMP%]{background-color:#dee5ef;padding:2px 10px;border-radius:15px;font-size:10px;margin:10px}.network-trends-wrapper[_ngcontent-%COMP%]{display:flex;width:100%}.network-trends-item[_ngcontent-%COMP%]{flex-grow:1;width:calc(100% / 2)}.img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.network-trends-item[_ngcontent-%COMP%] + .network-trends-item[_ngcontent-%COMP%]{margin-left:5%}.sub-name[_ngcontent-%COMP%]{font-weight:300;font-size:42px;line-height:53px;color:1A1F22}.sub-account-details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{line-height:18px}.sub-account-details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:14px;line-height:18px;font-weight:400;padding:5px 0;width:20%}.sub-account-details[_ngcontent-%COMP%]{display:flex;width:100%}.sub-account-details-info[_ngcontent-%COMP%]{flex-grow:1;width:100%;padding-left:20px;cursor:pointer}.sub-account-details-info[_ngcontent-%COMP%] + .sub-account-details-info[_ngcontent-%COMP%]{margin-left:2%}.sub-info-details[_ngcontent-%COMP%]{color:#0054b2;font-weight:300;line-height:20px;font-size:18px;word-break:break-word}.errbtn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:24px;height:24px}.sub-account-details-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:14px;line-height:22px}.btn-default.btn-dft[_ngcontent-%COMP%]{border:1px solid #CCCCCC}.active[_ngcontent-%COMP%]   .text-primary[_ngcontent-%COMP%]{color:#fff!important}.sub-accounts-info[_ngcontent-%COMP%]{width:400px;display:block}.info-section-top[_ngcontent-%COMP%]{border:.5px solid black;background-color:#ddebe445}.traffic-search-area[_ngcontent-%COMP%]{justify-content:flex-end;text-align:right;position:absolute;top:-6px;right:0}.search-box-input[_ngcontent-%COMP%]{border-radius:26px;padding:0 0 0 15px;font-size:14px;font-weight:400;min-width:265px;color:#646363;border:1px solid #dfdfdf}.search-box-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%}.search-box-icon[_ngcontent-%COMP%]{width:42px;height:40px;background-color:#0279ff;padding:10px;border-radius:25px;cursor:pointer;border:none}.invalid-msg[_ngcontent-%COMP%]{color:#c70000;font-size:12px;width:100%;position:absolute;top:-20px;text-align:left;left:21px}@media screen and (max-width: 767px){.traffic-search-area[_ngcontent-%COMP%]{justify-content:flex-end;text-align:right;position:relative;top:0;margin-top:15px;right:0}}  .record-pop span.error-img{position:absolute;left:5px;top:10px}  .record-pop .alert{padding:15px 30px 15px 50px!important}  .record-pop .alert .close{right:8px!important;top:18px!important}.search-result-dropdown[_ngcontent-%COMP%]{position:absolute;top:45px;z-index:6;background:#fff;width:auto;left:auto;right:0;max-width:500px;min-width:260px;box-shadow:0 5px 15px #00000021;border:1px solid rgba(0,0,0,.15);border-radius:16px;padding:0 15px;text-align:left;max-height:200px}.search-result-dropdown[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-top:10px;cursor:pointer}"]}),t})()},10803:function(t,e,n){n.d(e,{M:function(){return a}});var i=n(37716);let a=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-dummy-component"]],decls:0,vars:0,template:function(t,e){},encapsulation:2}),t})()},18924:function(t,e,n){n.d(e,{e3:function(){return i}});class i{constructor(t,e){this.metadata=t||new a,this.records=e||(new r)[0]}}class a{constructor(t){this.totalHits=t||0}}class r{constructor(t,e,n,i,a,r,s,d,c){this.subscriberId=t||null,this.subscriberLocationId=e||null,this.orgId=n||null,this.account=i||null,this.name=a||null,this.phone=r||null,this.email=s||null,this.serviceAddress=d||null,this.devices=c||(new o)[0]}}class o{constructor(t,e,n,i,a,r,o,s,d,c,l,h,p){this.deviceId=t||null,this.dataModelName=e,this.ipAddress=n,this.macAddress=i,this.manufacturer=a,this.modelName=r,this.opMode=o,this.productFamily=s,this.registrationId=d,this.serialNumber=c,this.softwareVersion=l,this.wapGatewaySn=h,this._id=p}}},71502:function(t,e,n){n.d(e,{V:function(){return a}});var i=n(37716);let a=(()=>{class t{transform(t,e){var n,i,a,r;if(e&&"show"==e){let e=[],a="";return a+=`${t.serialNumber?t.serialNumber:t.registrationId?t.registrationId:t.macAddress?t.macAddress:t.deviceId} - `,e.push(t.pppUsername&&t.pppUsername.trim()?t.pppUsername:""),e.push(t.registrationId&&t.registrationId.trim()?t.registrationId:""),e.push(t.ipAddress&&t.ipAddress.trim()?t.ipAddress:""),e.push(t.manufacturer&&t.manufacturer.trim()?t.manufacturer:""),e.push(t.modelName&&t.modelName.trim()?t.modelName:(null===(n=null==t?void 0:t.ont)||void 0===n?void 0:n.modelName)?null===(i=null==t?void 0:t.ont)||void 0===i?void 0:i.modelName:""),(t.macAddress&&t.deviceId!==t.macAddress||t.serialNumber||t.registrationId)&&e.push(t.macAddress&&t.macAddress.trim()?t.macAddress:""),a+=e.filter(t=>t).join(" | "),a}{let e=[],n=t.deviceId;return t.deviceId===t.serialNumber&&t.registrationId&&t.registrationId.trim()?n+=` - ${t.registrationId} | `:t.deviceId===t.registrationId&&t.serialNumber&&t.serialNumber.trim()?n+=` - ${t.serialNumber} | `:n+=" - ",e.push(t.pppUsername&&t.pppUsername.trim()?t.pppUsername:""),e.push(t.ipAddress&&t.ipAddress.trim()?t.ipAddress:""),e.push(t.manufacturer&&t.manufacturer.trim()?t.manufacturer:""),e.push(t.modelName&&t.modelName.trim()?t.modelName:(null===(a=null==t?void 0:t.ont)||void 0===a?void 0:a.modelName)?null===(r=null==t?void 0:t.ont)||void 0===r?void 0:r.modelName:""),e.push(t.macAddress&&t.macAddress.trim()?t.macAddress:""),n+=e.filter(t=>t).join(" | "),n}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=i.Yjl({name:"sortDeviceData",type:t,pure:!0}),t})()},42313:function(t,e,n){n.d(e,{e:function(){return d}});var i=n(40205),a=n(5304),r=n(92340),o=n(37716),s=n(91841);let d=(()=>{class t{constructor(t){this.httpClient=t,this.baseURL=r.N.API_BASE_URL,this.threshold=this.baseURL+"health/config/thresholds"}getThresholds(){return this.httpClient.get(`${this.threshold}`).pipe((0,a.K)(this.handleError))}AddThresholds(t){return this.httpClient.post(this.threshold,t).pipe((0,a.K)(this.handleError))}updateThreshold(t){return this.httpClient.put(this.threshold,t).pipe((0,a.K)(this.handleError))}handleError(t){return(0,i._)(t)}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(s.eN))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);