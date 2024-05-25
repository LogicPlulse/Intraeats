import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorOrderComponent } from './components/vendor-order/vendor-order.component';
import { MenuManagementComponent } from './components/menu-management/menu-management.component';
import { SettingsComponent } from './components/settings/settings.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, VendorFormComponent, DashboardComponent, VendorOrderComponent, MenuManagementComponent, SettingsComponent, RegisterComponent,
    LoginComponent,],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, JwtModule.forRoot({
    config: {
      tokenGetter,
      allowedDomains: ['localhost:4200'],
      disallowedRoutes: ['localhost:4200/api/auth/']
    }
  })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
