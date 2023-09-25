import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { OneMinuteAggregationComponent } from './one-minute-aggregation/one-minute-aggregation.component';
import { RealtimeDelayComponent } from './realtime-delay/realtime-delay.component';
import { UnmappedIpAggregationComponent } from './unmapped-ip-aggregation/unmapped-ip-aggregation.component';
import { FlowDataComponent } from './flow-data/flow-data.component';


const routes: Routes = [{
  path: '',
  component: ConfigurationComponent,
  children: [
    {
      path: 'realtime-delay', component: RealtimeDelayComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'one-minute-agggregation', component: OneMinuteAggregationComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    {
      path: 'flow-data', component: FlowDataComponent, data: { title: 'Calix Cloud - Flow Data' },
    },
    {
      path: 'unmapped-ip-aggregation', component: UnmappedIpAggregationComponent, data: { title: 'Calix Cloud - Flow Configuration' },
    },
    { path: '', redirectTo: 'realtime-delay', pathMatch: 'full', }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfigurationRoutingModule { }
