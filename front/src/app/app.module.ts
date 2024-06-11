import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from "@angular/material/icon";
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { NgOptimizedImage } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ImageCropperModule } from "ngx-image-cropper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TwoActionSnackbarComponent } from './components/two-action-snackbar/two-action-snackbar.component';
import { MatDialogModule } from "@angular/material/dialog";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { DefaultInterceptor } from "./security/default.interceptor";
import { DatePipe } from "@angular/common";
import { LogoComponent } from './components/logo/logo.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NgChartsModule } from "ng2-charts";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { DatePipePipe } from './utils/date-pipe.pipe';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    TwoActionSnackbarComponent,
    LoginPageComponent,
    LogoComponent,
    UserHomePageComponent,
    RegistrationPageComponent,
    DatePipePipe,
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
    DragDropModule,
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
