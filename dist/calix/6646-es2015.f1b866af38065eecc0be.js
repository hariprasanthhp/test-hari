"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[6646,3807],{63807:function(t,e,r){r.d(e,{H:function(){return p}});var i=r(40205),s=r(5304),n=r(88002),a=r(92340),o=r(37716),l=r(91841),h=r(38048);let p=(()=>{class t{constructor(t,e){this.http=t,this.sso=e,this.baseUrl=`${a.N.COC_SERVICES_ACTIVATION_URL}/serviceDefinitions`,this.bandwidhtbaseUrl=`${a.N.COC_SERVICES_ACTIVATION_URL}/bandwidthTiers`,this.subscriberbaseUrl=`${a.N.COC_SERVICES_ACTIVATION_URL}/serviceTemplates`,this.ouibaseurl=`${a.N.COC_SERVICES_ACTIVATION_URL}/ouiMatchList`,this.multirangebaseurl=`${a.N.COC_SERVICES_ACTIVATION_URL}/multicastRange`,this.multicastvlansbaseurl=`${a.N.COC_SERVICES_ACTIVATION_URL}/multicastVlan`}getServiceTemplateType(t,e){const r=this.sso.getOrg(t);return this.http.get(`${a.N.COC_SERVICES_ACTIVATION_URL}/serviceTemplates/type?${r}type=${e}`).pipe((0,s.K)(this.handleError))}saveProfile(t,e,r){return"RG"!==r&&(e=Object.assign({},Object.fromEntries(Object.entries(e).filter(([t,e])=>!("smpDetails"!==t&&e&&"object"==typeof e))))),this.http.post(`${a.N.COC_SERVICE_MIGRATION_URL}/${"RG"==r?"rg":"ont"}/smp`,e).pipe((0,s.K)(this.handleError))}updateJobMig(t,e,r,i){return this.url="ONT"==i?`${a.N.COC_SERVICE_MIGRATION_URL}/ont/migrate/${t}?name=${e}`:`${a.N.COC_SERVICE_MIGRATION_URL}/migration/rg/migrate/${t}?name=${e}`,r&&(this.url=this.url+`&description=${r}`),this.http.put(this.url,"").pipe((0,s.K)(this.handleError))}saveJobMig(t,e,r,i){let n=`${a.N.COC_SERVICE_MIGRATION_URL}/ont/migrate?name=${r}`;return i&&(n+=`&description=${i}`),this.http.post(n,e).pipe((0,s.K)(this.handleError))}updateJobMigFou(t,e,r,i,n){let o=`${a.N.COC_SERVICE_MIGRATION_URL}/ont/migrate/${t}?name=${e}&migrationtype=${r}&systemGroup=${i}`;return n&&(o+=`&description=${n}`),this.http.put(o,"").pipe((0,s.K)(this.handleError))}saveJobMigFou(t,e,r,i,n,o){let l=`${a.N.COC_SERVICE_MIGRATION_URL}/ont/migrate?name=${r}&migrationtype=${i}&systemGroup=${n}`;return o&&(l+=`&description=${o}`),this.http.post(l,e).pipe((0,s.K)(this.handleError))}saveJobMigRG(t){return this.http.post(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/rg/migrate`,t).pipe((0,s.K)(this.handleError))}startMigration(t,e,r){return this.http.put(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/${t}/accept`,"").pipe((0,s.K)(this.handleError))}ExportMigration(t){return this.http.get(`${a.N.COC_SERVICE_MIGRATION_URL}/export/${t}`).pipe((0,s.K)(this.handleError))}AbortMigration(t,e,r){return this.http.put(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/${t}/abort`,"").pipe((0,s.K)(this.handleError))}DeleteMigration(t,e,r){return this.http.delete(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/${t}`).pipe((0,s.K)(this.handleError))}undoMigration(t,e,r){return this.http.put(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/${t}/revert`,"").pipe((0,s.K)(this.handleError))}UpdateProfile(t,e,r,i){return this.http.put(`${a.N.COC_SERVICE_MIGRATION_URL}/${"RG"==i?"rg":"ont"}/smp/${r}`,e).pipe((0,s.K)(this.handleError))}GetAllservices(t){return this.http.get(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/${t}/services?page=0&size=10`).pipe((0,s.K)(this.handleError))}GetAllsummary(t){return this.http.get(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/${t}`).pipe((0,s.K)(this.handleError))}GetAllProfile(t,e,r){return this.http.get(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/smps?page=${e}&size=10`).pipe((0,s.K)(this.handleError))}GetAllJob(t,e,r){return this.http.get(`${a.N.COC_SERVICE_MIGRATION_URL}/migration/all?page=${e}&size=10`).pipe((0,s.K)(this.handleError))}GetProfile(t,e){return this.http.get(`${a.N.COC_SERVICE_MIGRATION_URL}/${"RG"==e?"rg":"ont"}/smp/${t}`).pipe((0,s.K)(this.handleError))}DeleteProfile(t,e,r){return this.http.delete(`${a.N.COC_SERVICE_MIGRATION_URL}/${"RG"==r?"rg":"ont"}/smp/${t}`).pipe((0,s.K)(this.handleError))}getsubscriber(){return this.http.get(this.baseUrl).pipe((0,s.K)(this.handleError))}getOuiList(){return this.http.get(this.ouibaseurl).pipe((0,n.U)(t=>("object"==typeof t&&t.sort((t,e)=>(t.name||"").toString().localeCompare((e.name||"").toString(),"en",{numeric:!1})),t)),(0,s.K)(this.handleError))}getMultipleRange(){return this.http.get(this.multirangebaseurl).pipe((0,n.U)(t=>("object"==typeof t&&t.sort((t,e)=>(t.name||"").toString().localeCompare((e.name||"").toString(),"en",{numeric:!1})),t)),(0,s.K)(this.handleError))}getMultiplecastVlan(){return this.http.get(this.multicastvlansbaseurl).pipe((0,n.U)(t=>("object"==typeof t&&t.sort((t,e)=>(t.name||"").toString().localeCompare((e.name||"").toString(),"en",{numeric:!1})),t)),(0,s.K)(this.handleError))}getsubscriberDetail(t,e){switch(t=encodeURIComponent(t),e){case"Service Defintion":return this.http.get(`${this.baseUrl}?name=${t}`).pipe((0,s.K)(this.handleError));case"Subscriber":return this.http.get(`${this.subscriberbaseUrl}?name=${t}`).pipe((0,s.K)(this.handleError));case"Bandwidth tier":return this.http.get(`${this.bandwidhtbaseUrl}?name=${t}`).pipe((0,s.K)(this.handleError));case"ouiMatchList":return this.http.get(`${this.ouibaseurl}?name=${t}`).pipe((0,s.K)(this.handleError));case"Multicast Range":return this.http.get(`${this.multirangebaseurl}?name=${t}`).pipe((0,s.K)(this.handleError));case"Multicast VLAN":return this.http.get(`${this.multicastvlansbaseurl}?name=${t}`).pipe((0,s.K)(this.handleError))}}delsubscriber(t,e){switch(t=encodeURIComponent(t),e){case"Service Defintion":return this.http.delete(this.baseUrl+`/${t}`).pipe((0,s.K)(this.handleError));case"Subscriber":return this.http.delete(this.subscriberbaseUrl+`/${t}`).pipe((0,s.K)(this.handleError));case"Bandwidth tier":return this.http.delete(this.bandwidhtbaseUrl+`/${t}`).pipe((0,s.K)(this.handleError));case"ouiMatchList":return this.http.delete(this.ouibaseurl+`/${t}`).pipe((0,s.K)(this.handleError));case"Multicast Range":return this.http.delete(this.multirangebaseurl+`/${t}`).pipe((0,s.K)(this.handleError));case"Multicast VLAN":return this.http.delete(this.multicastvlansbaseurl+`/${t}`).pipe((0,s.K)(this.handleError))}}postdata(t,e){switch(e){case"service_Definition_Profile":return this.http.post(this.baseUrl,t).pipe((0,s.K)(this.handleError));case"subscriber_profile":return this.http.post(this.subscriberbaseUrl,t).pipe((0,s.K)(this.handleError));case"bandWidth_profile":return this.http.post(this.bandwidhtbaseUrl,t).pipe((0,s.K)(this.handleError));case"oui_profile":return this.http.post(this.ouibaseurl,t).pipe((0,s.K)(this.handleError));case"Multicast_Range_Profile":return this.http.post(this.multirangebaseurl,t).pipe((0,s.K)(this.handleError));case"Multicast_Vlan_Profile":return this.http.post(this.multicastvlansbaseurl,t).pipe((0,s.K)(this.handleError))}}putdata(t,e){switch(e){case"service_Definition_Profile":return this.http.put(this.baseUrl,t).pipe((0,s.K)(this.handleError));case"subscriber_profile":return this.http.put(this.subscriberbaseUrl,t).pipe((0,s.K)(this.handleError));case"bandWidth_profile":return this.http.put(this.bandwidhtbaseUrl,t).pipe((0,s.K)(this.handleError));case"oui_profile":return this.http.put(this.ouibaseurl,t).pipe((0,s.K)(this.handleError));case"Multicast_Range_Profile":return this.http.put(this.multirangebaseurl,t).pipe((0,s.K)(this.handleError));case"Multicast_Vlan_Profile":return this.http.put(this.multicastvlansbaseurl,t).pipe((0,s.K)(this.handleError))}}handleError(t){return(0,i._)(t)}getProfileList(t){const e=this.sso.getOrg(t);return this.http.get(`${a.N.SUPPORT_URL}/netops-config/configuration-profile?${e}`)}convert_to_kpbs(t,e="mbps"){switch(e){case"gbps":return 1e6*t;case"mbps":return 1e3*t;default:return t}}convert_kbps_to(t,e="mbps",r={start:{count:0}}){if(r.start.count>1)return t;switch(e){case"gbps":return t/1e6;case"mbps":return t/1e3;default:return t}}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(l.eN),o.LFG(h.t6))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},57578:function(t,e,r){r.r(e),r.d(e,{ServiceProfilesModule:function(){return $}});var i=r(38583),s=r(39895),n=r(79765),a=r(37716),o=r(7450),l=r(38048);function h(t,e){if(1&t&&(a.TgZ(0,"div",6),a._uU(1),a.qZA()),2&t){const t=a.oxw();a.xp6(1),a.hij(" ",t.language["Access denied due to RBAC. Please consult your Organization Administrator for access."]," ")}}function p(t,e){if(1&t&&(a.TgZ(0,"li",10),a.TgZ(1,"a",11),a._uU(2),a.qZA(),a.qZA()),2&t){const t=a.oxw(2);a.xp6(2),a.Oqu(t.language["ONT Services Profiles"])}}function u(t,e){if(1&t&&(a.TgZ(0,"li",10),a.TgZ(1,"a",12),a._uU(2),a.qZA(),a.qZA()),2&t){const t=a.oxw(2);a.xp6(2),a.hij(" ",t.language["RG Profiles"]," ")}}function c(t,e){if(1&t&&(a.TgZ(0,"li",10),a.TgZ(1,"a",13),a._uU(2),a.qZA(),a.qZA()),2&t){const t=a.oxw(2);a.xp6(2),a.hij(" ",t.language["RG Dial Plans"]," ")}}function g(t,e){if(1&t&&(a.TgZ(0,"div",7),a.TgZ(1,"ul",8),a.YNc(2,p,3,1,"li",9),a.YNc(3,u,3,1,"li",9),a.YNc(4,c,3,1,"li",9),a.qZA(),a.qZA()),2&t){const t=a.oxw();a.xp6(2),a.Q6J("ngIf",t.menus.serviceprofiles),a.xp6(1),a.Q6J("ngIf",t.menus.rgprofiles),a.xp6(1),a.Q6J("ngIf",t.menus.rgdialplans)}}let d=(()=>{class t{constructor(t,e,r){this.translateService=t,this.router=e,this.sso=r,this.menus={serviceprofiles:!1,rgprofiles:!1,rgdialplans:!1},this.hasPageAccess=!0,this.toggled=new n.xQ,this.router.routeReuseStrategy.shouldReuseRoute=()=>!1}ngOnInit(){var t,e;let r=this.sso.getScopes();r["cloud.rbac.coc.services.serviceprofiles"]?null===(t=Object.keys(this.menus))||void 0===t||t.forEach(t=>{this.menus[t]=!0}):null===(e=Object.keys(this.menus))||void 0===e||e.forEach(t=>{this.menus[t]=r[`cloud.rbac.coc.services.serviceprofiles.${t}`]}),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(t=>{this.language=t}),this.pageAcceesObs=this.sso.hasPageAccess$.subscribe(t=>{this.hasPageAccess=!!t.access})}ngOnDestroy(){this.pageAcceesObs&&this.pageAcceesObs.unsubscribe(),this.languageSubject.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(o.s),a.Y36(s.F0),a.Y36(l.t6))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-service-profiles"]],decls:7,vars:4,consts:[["role","alert","class","alert alert-warning",4,"ngIf"],[3,"hidden"],[1,"container","mp-0"],[1,"row","mm-0"],["class","col-12 col-md-2 pl-0 mpr-0",4,"ngIf"],[1,"col-12","col-md-10","padl","mp-0","mmt-3","pr-0","position-relative",3,"hidden"],["role","alert",1,"alert","alert-warning"],[1,"col-12","col-md-2","pl-0","mpr-0"],["id","netops-list-menu",1,"nav","flex-column","left-menu","tab-view-style","mbr-none"],["class","nav-item",4,"ngIf"],[1,"nav-item"],["routerLink","/cco/services/service-profiles/ONT-profile","routerLinkActive","active",1,"list-group-item","list-group-item-action"],["routerLink","/cco/services/service-profiles/profiles","routerLinkActive","active",1,"list-group-item","list-group-item-action"],["routerLink","/cco/services/service-profiles/dial-plan","routerLinkActive","active",1,"list-group-item","list-group-item-action"]],template:function(t,e){1&t&&(a.YNc(0,h,2,1,"div",0),a.TgZ(1,"section",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a.YNc(4,g,5,3,"div",4),a.TgZ(5,"div",5),a._UZ(6,"router-outlet"),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&t&&(a.Q6J("ngIf",!e.hasPageAccess),a.xp6(1),a.Q6J("hidden",!e.hasPageAccess),a.xp6(3),a.Q6J("ngIf",e.hasPageAccess),a.xp6(1),a.Q6J("hidden",!e.hasPageAccess))},directives:[i.O5,s.lC,s.yS,s.Od],styles:[""]}),t})();var m=r(86916),b=r(57434),C=r(27719),_=r(19718),E=r(82572),f=r(81940);const R=[{path:"",component:d,children:[{path:"ONT-profile",component:m.n},{path:"ONT-profile/add",component:b.D},{path:"ONT-profile/edit",component:b.D},{path:"profiles",component:C.N,data:{title:"Calix Cloud - Flow Configuration"}},{path:"profiles/profile-wizard",component:f.s,data:{title:"Calix Cloud - Flow Configuration"}},{path:"dial-plan",component:_.U,data:{title:"Calix Cloud - Flow Configuration"},children:[{path:"add",component:E.t,data:{title:"Calix Cloud - Flow Configuration"}},{path:":id",component:E.t,data:{title:"Calix Cloud - Flow Configuration"}}]}]}];let I=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[s.Bz.forChild(R)],s.Bz]}),t})(),$=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[i.ez,I]]}),t})()}}]);