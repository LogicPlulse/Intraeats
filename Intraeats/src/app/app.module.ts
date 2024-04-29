// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
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
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [AppComponent, VendorFormComponent, AddUserComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}