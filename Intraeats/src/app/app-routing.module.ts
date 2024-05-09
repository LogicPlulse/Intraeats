import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component'
import { VendorOrderComponent } from './components/vendor-order/vendor-order.component'
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendor-form', component: VendorFormComponent },
  { path: 'vendor-order', component: VendorOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
