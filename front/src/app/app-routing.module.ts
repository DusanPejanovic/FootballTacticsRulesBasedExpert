import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserHomePageComponent} from "./pages/user-home-page/user-home-page.component";
import {PropertyDetailsPageComponent} from "./pages/property-details-page/property-details-page.component";
import {CreatePropertyPageComponent} from "./pages/create-property-page/create-property-page.component";
import {AdminHomePageComponent} from "./pages/admin-home-page/admin-home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {VerifiedMailPageComponent} from "./pages/verified-mail-page/verified-mail-page.component";
import {AddAdminPageComponent} from "./pages/add-admin-page/add-admin-page.component";
import {PropertyDevicesPageComponent} from "./pages/property-devices-page/property-devices-page.component";
import {LampDetailsPageComponent} from "./pages/lamp-details-page/lamp-details-page.component";
import {VehicleGateDetailsPageComponent} from "./pages/vehicle-gate-details-page/vehicle-gate-details-page.component";
import {BatteryDetailsPageComponent} from "./pages/battery-details-page/battery-details-page.component";
import {
  SolarPanelSystemDetailsPageComponent
} from "./pages/solar-panel-system-details-page/solar-panel-system-details-page.component";
import {
  SprinklerSystemDetailsPageComponent
} from "./pages/sprinkler-system-details-page/sprinkler-system-details-page.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'verify-email', component: VerifiedMailPageComponent},
  {path: 'super-admin/add-admin', component: AddAdminPageComponent},
  {path: 'home', component: UserHomePageComponent},
  {path: 'admin/home', component: AdminHomePageComponent},
  {path: 'property/:id', component: PropertyDetailsPageComponent},
  {path: 'property/:id/devices', component: PropertyDevicesPageComponent},
  {path: 'create/property', component: CreatePropertyPageComponent},
  {path: 'device/home_battery/:id', component: BatteryDetailsPageComponent},
  {path: 'device/solar_panel_system/:id', component: SolarPanelSystemDetailsPageComponent},
  {path: 'device/lamp/:id', component: LampDetailsPageComponent},
  {path: 'device/vehicle_gate/:id', component: VehicleGateDetailsPageComponent},
  {path: 'device/sprinkler_system/:id', component: SprinklerSystemDetailsPageComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
