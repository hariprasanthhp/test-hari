import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrchestrationComponent } from './orchestration.component';

const routes: Routes = [{ path: '', component: OrchestrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrchestrationRoutingModule { }
