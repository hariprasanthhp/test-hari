import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FoundationSystemsComponent } from './foundation-systems.component';
import { MapComponent } from "../../shad/map/map.component";


const routes: Routes = [{
  path: '', component: FoundationSystemsComponent,
  children: [
    {
      path: '',
      redirectTo: 'foundation-manage',
      pathMatch: 'full',
    },
    { path: 'foundation-manage', loadChildren: () => import('./foundation-manage/foundation-manage.module').then(m => m.FoundationManageModule) },
    //{ path: 'foundation-geographic-view', loadChildren: () => import('./foundation-geographic-view/foundation-geographic-view.module').then(m => m.FoundationGeographicViewModule) }
    { path: 'foundation-geographic-view', component: MapComponent }
  ]
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationSystemsRoutingModule { }
