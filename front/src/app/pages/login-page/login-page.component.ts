import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { AccessTokenResponse, LoginCredentials, UserType } from "../../model/User";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  errorMessage: string = "";
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.userService.clearToken();

  }

  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.login();
  }

  private hasEmailErrorMessage(): boolean {
    const emailErrors = this.authForm.get("email")?.errors;

    if (emailErrors) {
      this.emailError = true;
      if (emailErrors["required"]) {
        this.errorMessage = "Email is required";
        return true;
      }
      if (emailErrors["email"]) {
        this.errorMessage = "Email is not in correct format"
        return true;
      }
    }
    return false;
  }
  private hasPasswordErrorMessage(): boolean {
    const passwordErrors = this.authForm.get("pass")?.errors;

    if (passwordErrors) {
      this.passwordError = true;
      if (passwordErrors["required"]) {
        this.errorMessage = "Password is required";
        return true;
      }
    }
    return false;
  }

  login() {
    this.emailError = false;
    this.passwordError = false;
    this.errorMessage = "";
    if (this.hasEmailErrorMessage() || this.hasPasswordErrorMessage()) {
      return;
    }
    let credentials: LoginCredentials = {
      login: this.authForm.controls["email"].value,
      password: this.authForm.controls["pass"].value
    };

    this.userService.loginUser(credentials).subscribe({
      next: (resp: AccessTokenResponse) => {

        this.userService.setToken(resp);
        this.userService.loadUser();
        this.userService.user.subscribe(user => {
          console.log(user);

          this.router.navigate(["/home"])

        });
      },
      error: (error) => {
        this.authForm.get('pass')?.setValue(null);
        console.log(error.error.message);

        this.errorMessage = "Wrong password or username";
      }
    });
  }
}
