import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomePageComponent } from "./pages/user-home-page/user-home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegistrationPageComponent } from "./pages/registration-page/registration-page.component";


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'home', component: UserHomePageComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
