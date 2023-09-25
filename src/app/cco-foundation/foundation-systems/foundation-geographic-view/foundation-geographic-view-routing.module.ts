import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundationGeographicViewComponent } from './foundation-geographic-view.component';

const routes: Routes = [{ path: '', component: FoundationGeographicViewComponent }];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationGeographicViewRoutingModule { }
