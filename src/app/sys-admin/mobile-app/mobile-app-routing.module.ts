import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandiqCreateComponent } from './commandiq-create/commandiq-create.component';
import { CommandiqProCreateComponent } from './commandiq-pro-create/commandiq-pro-create.component';
import { CommandiqProUpdateComponent } from './commandiq-pro-update/commandiq-pro-update.component';
import { CommandiqProComponent } from './commandiq-pro/commandiq-pro.component';
import { CommandiqUpdateComponent } from './commandiq-update/commandiq-update.component';
import { CommandiqComponent } from './commandiq/commandiq.component';
import { MobileAppComponent } from './mobile-app.component';
import { SupportInformationComponent } from './support-information/support-information.component';

const routes: Routes = [
  {
    path: '',
    component: MobileAppComponent,
    children: [
      {
        path: "commandiq",
        component: CommandiqComponent
      },
      {
        path: "commandiq-create",
        component: CommandiqCreateComponent
      },
      {
        path: "commandiq-update",
        component: CommandiqUpdateComponent
      },
      {
        path: "commandWorx-create",
        component: CommandiqProCreateComponent
      },
      {
        path: "commandWorx-update",
        component: CommandiqProUpdateComponent
      },
      {
        path: "commandWorx",
        component: CommandiqProComponent
      },
      {
        path: "support-information",
        component: SupportInformationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileAppRoutingModule { }
