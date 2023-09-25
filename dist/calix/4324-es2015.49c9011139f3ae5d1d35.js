"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[4324],{84324:function(e,t,n){n.r(t),n.d(t,{EndpointsModule:function(){return q}});var i=n(38583),a=n(39895),r=n(92340),o=n(37716),s=n(7450),c=n(51071),l=n(38048);function u(e,t){if(1&e&&(o.TgZ(0,"div",2),o._uU(1),o.qZA()),2&e){const e=o.oxw();o.xp6(1),o.hij(" ",e.language["Access denied due to RBAC. Please consult your Organization Administrator for access."]," ")}}const d=function(){return["/cco/traffic/endpoints/reports"]},p=function(e){return{id:e}};function g(e,t){if(1&e&&(o.TgZ(0,"li",11),o.TgZ(1,"a",12),o.NdJ("Click",function(e){return e.preventDefault()}),o._uU(2),o.qZA(),o.qZA()),2&e){const e=o.oxw(2);o.Q6J("routerLink",o.DdM(3,d))("queryParams",o.VKq(4,p,e.endpointID)),o.xp6(2),o.hij(" ",e.language.Reports,"")}}const f=function(){return["/cco/traffic/endpoints/realtime"]};function m(e,t){if(1&e&&(o.TgZ(0,"section",3),o.TgZ(1,"div",4),o.TgZ(2,"div",5),o.TgZ(3,"ul",6),o.TgZ(4,"li",7),o.TgZ(5,"a",8),o.NdJ("Click",function(e){return e.preventDefault()}),o._uU(6),o.qZA(),o.qZA(),o.YNc(7,g,3,6,"li",9),o.qZA(),o.qZA(),o.TgZ(8,"div",10),o._UZ(9,"router-outlet"),o.qZA(),o.qZA(),o.qZA()),2&e){const e=o.oxw();o.xp6(5),o.Q6J("routerLink",o.DdM(4,f))("queryParams",o.VKq(5,p,e.endpointID)),o.xp6(1),o.Oqu(e.language["Real Time"]),o.xp6(1),o.Q6J("ngIf",!e.webSocketService.isUnmapped)}}const h=[{path:"",component:(()=>{class e{constructor(e,t,n,i,a){this.translateService=e,this.activatedRoute=t,this.router=n,this.webSocketService=i,this.sso=a,this.menus={network:!1,location:!1,applications:!1},this.endpointID=this.activatedRoute.snapshot.queryParamMap.get("id"),this.webSocketService.previousURL=""}ngOnInit(){this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(e=>{this.language=e});let e=this.sso.getScopes();if(r.N.VALIDATE_SCOPE){let t=Object.keys(e);if(t)for(let e=0;e<t.length;e++)-1===t[e].indexOf("cloud.rbac.coc.traffic.network")?-1===t[e].indexOf("cloud.rbac.coc.traffic.location")?-1===t[e].indexOf("cloud.rbac.coc.traffic.applications")||(this.menus.applications=!0):this.menus.location=!0:this.menus.network=!0}else this.menus={network:!0,location:!0,applications:!0}}ngOnDestroy(){this.languageSubject&&this.languageSubject.unsubscribe(),sessionStorage.getItem("aggregate_Endpoint_Id")&&sessionStorage.removeItem("aggregate_Endpoint_Id")}goToRealtime(){this.router.navigate(["/cco/traffic/endpoints/realtime"],{queryParams:{id:this.endpointID}})}goToReports(){this.router.navigate(["/cco/traffic/endpoints/reports"],{queryParams:{id:this.endpointID}})}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(s.s),o.Y36(a.gz),o.Y36(a.F0),o.Y36(c.i),o.Y36(l.t6))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-endpoints"]],decls:2,vars:2,consts:[["role","alert","class","alert alert-warning",4,"ngIf"],["class","m-2",4,"ngIf"],["role","alert",1,"alert","alert-warning"],[1,"m-2"],[1,"row"],[1,"col-md-12","my-2","ccl-tabs"],["id","tabs",1,"nav","nav-tabs"],[1,"nav-item"],["data-toggle","tab","id","realtime","routerLinkActive","active",1,"nav-link","small",3,"routerLink","queryParams","Click"],["class","nav-item",3,"routerLink","queryParams",4,"ngIf"],[1,"col-md-12","pl-0"],[1,"nav-item",3,"routerLink","queryParams"],["id","reports","data-toggle","tab","routerLinkActive","active",1,"nav-link","small",3,"Click"]],template:function(e,t){1&e&&(o.YNc(0,u,2,1,"div",0),o.YNc(1,m,10,7,"section",1)),2&e&&(o.Q6J("ngIf",!t.menus.network&&!t.menus.location&&!t.menus.applications),o.xp6(1),o.Q6J("ngIf",t.menus.network||t.menus.location||t.menus.applications))},directives:[i.O5,a.yS,a.Od,a.lC,a.rH],styles:[".active[_ngcontent-%COMP%]   .text-primary[_ngcontent-%COMP%]{color:#fff!important}.icon-round[_ngcontent-%COMP%]{width:32px;height:32px;background:#0279FF;border-radius:100%;text-align:center;line-height:26px}"]}),e})(),children:[{path:"realtime",loadChildren:()=>Promise.all([n.e(6628),n.e(8592),n.e(2465)]).then(n.bind(n,92465)).then(e=>e.RealtimeModule)},{path:"reports",loadChildren:()=>Promise.all([n.e(3363),n.e(6922),n.e(4954),n.e(9270)]).then(n.bind(n,9270)).then(e=>e.ReportsModule)},{path:"",redirectTo:"realtime",pathMatch:"full"}]}];let v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[a.Bz.forChild(h)],a.Bz]}),e})();var k=n(25317),b=n(86640);let q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[i.ez,v,k.l,b.A0]]}),e})()}}]);