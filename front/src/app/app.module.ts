import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from "@angular/material/icon";
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { EnumToStringPipe, PropertyCardComponent } from './components/property-card/property-card.component';
import { NgOptimizedImage } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { PropertyDetailsPageComponent } from './pages/property-details-page/property-details-page.component';
import { CreatePropertyPageComponent } from './pages/create-property-page/create-property-page.component';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ImageCropperModule } from "ngx-image-cropper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { PropertyRequestCardComponent } from './components/property-request-card/property-request-card.component';
import { TwoActionSnackbarComponent } from './components/two-action-snackbar/two-action-snackbar.component';
import { RejectPropertyDialogComponent } from './components/reject-property-dialog/reject-property-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { DefaultInterceptor } from "./security/default.interceptor";
import { DatePipe } from "@angular/common";
import { LogoComponent } from './components/logo/logo.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { VerifiedMailPageComponent } from './pages/verified-mail-page/verified-mail-page.component';
import { AddAdminPageComponent } from './pages/add-admin-page/add-admin-page.component';
import { PropertyDevicesPageComponent } from './pages/property-devices-page/property-devices-page.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { AddDeviceDialogComponent } from './components/dialog/add-device-dialog/add-device-dialog.component';
import { LampDetailsPageComponent } from './pages/lamp-details-page/lamp-details-page.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgChartsModule} from "ng2-charts";
import { VehicleGateDetailsPageComponent } from './pages/vehicle-gate-details-page/vehicle-gate-details-page.component';
import { VehicleWhitelistItemComponent } from './components/vehicle-whitelist-item/vehicle-whitelist-item.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import { DatePipePipe } from './utils/date-pipe.pipe';
import {BatteryDetailsPageComponent} from "./pages/battery-details-page/battery-details-page.component";
import { SolarPanelSystemDetailsPageComponent } from './pages/solar-panel-system-details-page/solar-panel-system-details-page.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SprinklerSystemDetailsPageComponent } from './pages/sprinkler-system-details-page/sprinkler-system-details-page.component';
import { SprinklerRuleCardComponent } from './components/sprinkler-rule-card/sprinkler-rule-card.component';
import { DeviceAvailabilityFormComponent } from './components/device-availability-form/device-availability-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserHomePageComponent,
    PropertyCardComponent,
    PropertyDetailsPageComponent,
    CreatePropertyPageComponent,
    AdminHomePageComponent,
    PropertyRequestCardComponent,
    TwoActionSnackbarComponent,
    RejectPropertyDialogComponent,
    LoginPageComponent,
    LogoComponent,
    EnumToStringPipe,
    RegistrationPageComponent,
    VerifiedMailPageComponent,
    AddAdminPageComponent,
    PropertyDevicesPageComponent,
    DeviceCardComponent,
    AddDeviceDialogComponent,
    LampDetailsPageComponent,
    VehicleGateDetailsPageComponent,
    VehicleWhitelistItemComponent,
    DatePipePipe,
    BatteryDetailsPageComponent,
    SolarPanelSystemDetailsPageComponent,
    SprinklerSystemDetailsPageComponent,
    SprinklerRuleCardComponent,
    DeviceAvailabilityFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    NgOptimizedImage,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ImageCropperModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    NgChartsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatTableModule,
    MatAutocompleteModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: DefaultInterceptor,
    multi: true
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
