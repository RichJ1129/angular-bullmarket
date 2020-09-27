import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealestateComponent } from './realestate.component';

const routes: Routes = [{ path: '', component: RealestateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealestateRoutingModule { }
