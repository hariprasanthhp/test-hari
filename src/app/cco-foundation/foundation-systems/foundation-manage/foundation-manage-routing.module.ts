import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FoundationManageComponent } from './foundation-manage.component';
import { FoundationSystemListComponent } from './foundation-system-list/foundation-system-list.component';
import { FoundationAddSystemComponent } from './foundation-add-system/foundation-add-system.component';
import { SelectedSystemDetailsComponent } from './selected-system-details/selected-system-details.component';

const routes: Routes = [{
  path: '', component: FoundationManageComponent,
  children: [
    {
      path: '',
      redirectTo: 'foundation-system-list',
      pathMatch: 'full',
    },
    { path: 'foundation-system-list', component: FoundationSystemListComponent },
    { path: 'add-system', component: FoundationAddSystemComponent },
    { path: 'system-edit', component: FoundationAddSystemComponent },
    { path: 'system-details', component: SelectedSystemDetailsComponent },

  ]
}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationManageRoutingModule { }
