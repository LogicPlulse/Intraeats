// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';


// import { AppComponent } from './app.component';
// import { VendorFormComponent } from './vendor-form/vendor-form.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     VendorFormComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorOrderComponent } from './components/vendor-order/vendor-order.component';
import { MenuManagementComponent } from './components/menu-management/menu-management.component';

@NgModule({
  declarations: [AppComponent, VendorFormComponent, DashboardComponent, VendorOrderComponent, MenuManagementComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
