import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import { VendorOrderComponent } from './components/vendor-order/vendor-order.component';
import { SettingsComponent } from './components/settings/settings.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to register page
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendor-form', component: VendorFormComponent },
  { path: 'vendor-order', component: VendorOrderComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'profile', component: ProfileComponent }, // Optional, if ProfileComponent is not needed
  { path: '**', redirectTo: '/login' } // Fallback route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
