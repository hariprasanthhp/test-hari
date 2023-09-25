import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportSystemComponent } from './support-system.component';

const routes: Routes = [{ path: '', component: SupportSystemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportSystemRoutingModule { }
