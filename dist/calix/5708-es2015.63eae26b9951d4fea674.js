"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[5708],{15708:function(e,s,t){t.r(s),t.d(s,{MigrationsModule:function(){return p}});var a=t(38583),i=t(23771),n=t(39895),o=t(79765),c=t(37716),r=t(7450),l=t(38048);function u(e,s){if(1&e&&(c.TgZ(0,"div",3),c._uU(1),c.qZA()),2&e){const e=c.oxw();c.xp6(1),c.hij(" ",e.language["Access denied due to RBAC. Please consult your Organization Administrator for access."],"\n")}}function g(e,s){if(1&e&&(c.TgZ(0,"div",4),c.TgZ(1,"ul",5),c.TgZ(2,"li",6),c.TgZ(3,"a",7),c._uU(4),c.qZA(),c.qZA(),c.TgZ(5,"li",6),c.TgZ(6,"a",8),c._uU(7),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&e){const e=c.oxw();c.xp6(4),c.Oqu(e.language.Jobs),c.xp6(3),c.Oqu(e.language.Profiles)}}const h=[{path:"",component:(()=>{class e{constructor(e,s,t){this.translateService=e,this.router=s,this.sso=t,this.menus={},this.hasPageAccess=!0,this.toggled=new o.xQ,this.router.routeReuseStrategy.shouldReuseRoute=()=>!1}ngOnInit(){this.sso.getScopes()["cloud.rbac.coc.operations.configuration.axosmigration"]&&(this.hasScope=!0),this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(e=>{this.language=e}),this.hasScope?(this.sso.setPageAccess(!0),this.pageAcceesObs=this.sso.hasPageAccess$.subscribe(e=>{this.hasPageAccess=!!e.access})):this.sso.setPageAccess(!1)}ngOnDestroy(){var e,s;null===(e=this.pageAcceesObs)||void 0===e||e.unsubscribe(),null===(s=this.languageSubject)||void 0===s||s.unsubscribe()}}return e.\u0275fac=function(s){return new(s||e)(c.Y36(r.s),c.Y36(n.F0),c.Y36(l.t6))},e.\u0275cmp=c.Xpm({type:e,selectors:[["app-migrations"]],decls:4,vars:3,consts:[["role","alert","class","alert alert-warning",4,"ngIf"],["class","ccl-tabs mb-3",4,"ngIf"],[1,"col-sm-12","col-md-12","col-lg-12","p-0",3,"hidden"],["role","alert",1,"alert","alert-warning"],[1,"ccl-tabs","mb-3"],["id","tabs",1,"nav","nav-tabs"],[1,"nav-item"],["routerLink","/cco/operations/configuration/migrations/jobs","data-toggle","tab","routerLinkActive","active","id","CcoConfiguration-Migrations-Jobs",1,"nav-link","small"],["routerLink","/cco/operations/configuration/migrations/profiles","data-toggle","tab","routerLinkActive","active","id","CcoConfiguration-Migrations-Profiles",1,"nav-link","small"]],template:function(e,s){1&e&&(c.YNc(0,u,2,1,"div",0),c.YNc(1,g,8,2,"div",1),c.TgZ(2,"div",2),c._UZ(3,"router-outlet"),c.qZA()),2&e&&(c.Q6J("ngIf",!s.hasPageAccess),c.xp6(1),c.Q6J("ngIf",s.hasPageAccess&&s.hasScope),c.xp6(1),c.Q6J("hidden",!s.hasPageAccess))},directives:[a.O5,n.lC,n.yS,n.Od],styles:[""]}),e})(),children:[{path:"jobs",loadChildren:()=>t.e(725).then(t.bind(t,80725)).then(e=>e.JobsModule)},{path:"profiles",loadChildren:()=>t.e(5950).then(t.bind(t,15950)).then(e=>e.ProfilesModule)},{path:"migration-mapping",component:t(19467).A},{path:"",redirectTo:"jobs",pathMatch:"full"}]}];let d=(()=>{class e{}return e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[n.Bz.forChild(h)],n.Bz]}),e})(),p=(()=>{class e{}return e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[a.ez,d,i.T]]}),e})()}}]);