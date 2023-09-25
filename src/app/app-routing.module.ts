import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, RouteReuseStrategy } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SubscriberOverviewComponent } from './subscriber-overview/subscriber-overview.component';
import { SampleTopologyComponent } from "./sample-topology/sample-topology.component";
import { LogoutComponent } from "./logout/logout.component";
import { BlockPageTemplateViewComponent } from './shad/block-page-template-view/block-page-template-view.component';
import { EntitelmentsComponent } from './entitelments/entitelments.component';
import { DemoTopologyComponent } from './support/support-overview/demo-topology/demo-topology.component';
import { MicrositePreviewComponent } from './microsite-preview/microsite-preview.component';
import { RedirectComponent } from './redirect/redirect.component';
import { CaptivePortalPreviewComponent } from './captive-portal-preview/captive-portal-preview.component';
import { FederatedDashboardComponent } from './federated-dashboard/federated-dashboard.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'redirect', component: RedirectComponent },
    { path: 'microsite_preview', component: MicrositePreviewComponent },
    { path: 'entitelments', component: EntitelmentsComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
    { path: 'topology', component: SampleTopologyComponent },
    { path: 'demo_topology', component: DemoTopologyComponent },
    { path: 'block_page_template_view', component: BlockPageTemplateViewComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'sub-overview', component: SubscriberOverviewComponent }
        ]

    },
    { path: 'shad', loadChildren: () => import('./shad/shad.module').then(m => m.ShadModule), canLoad: [AuthGuard] },
    { path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule), canLoad: [AuthGuard], canDeactivate: [AuthGuard], runGuardsAndResolvers: 'always' },
    { path: 'engagement', loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule), canLoad: [AuthGuard], canDeactivate: [AuthGuard], runGuardsAndResolvers: 'always' },

    {
        path: 'systemAdministration',
        loadChildren: () => import('../app/sys-admin/sys-admin.module')
            .then(m => m.SysAdminModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'organization-admin',
        loadChildren: () => import('../app/org-admin/org-admin.module')
            .then(m => m.OrgAdminModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'org-admins',
        loadChildren: () => import('../app/org-admins/org-admins.module')
            .then(m => m.OrgAdminsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'org-access',
        loadChildren: () => import('./org-access/org-access.module').then(m => m.OrgAccessModule),
        canActivate: [AuthGuard]
    },
    { path: 'cco-foundation', loadChildren: () => import('./cco-foundation/cco-foundation.module').then(m => m.CcoFoundationModule), canLoad: [AuthGuard], canDeactivate: [AuthGuard] },
    { path: 'cco', loadChildren: () => import('./cco/cco.module').then(m => m.CcoModule), canLoad: [AuthGuard], canDeactivate: [AuthGuard], runGuardsAndResolvers: 'always' },
    { path: 'customer-portal/preview', component: CaptivePortalPreviewComponent },
    { path: 'federated-dashboard', loadChildren: () => import('./federated-dashboard/federated-dashboard.module').then(m => m.FederatedDashboardModule) },
    { path: '**', component: LoginComponent },
];

const config: ExtraOptions = {
    //useHash: true,
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy'
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
