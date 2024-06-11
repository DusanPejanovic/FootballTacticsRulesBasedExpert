import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  registerForm!: FormGroup;
  errorMessage: string = "";

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      profilePicture: new FormControl(null)
    });
  }

  private setErrorMessage() {
    const nameControl = this.registerForm.get('name');
    const surnameControl = this.registerForm.get('surname');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');

    if (nameControl?.errors?.['required']) {
      this.errorMessage = 'Name is required';
    } else if (surnameControl?.errors?.['required']) {
      this.errorMessage = 'Surname is required';
    } else if (emailControl?.errors?.['required']) {
      this.errorMessage = 'Email is required';
    } else if (emailControl?.errors?.['pattern']) {
      this.errorMessage = 'Invalid email format';
    } else if (passwordControl?.errors?.['required']) {
      this.errorMessage = 'Password is required';
    } else if (passwordControl?.errors?.['minlength']) {
      this.errorMessage = 'Password must be at least 6 characters long';
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.createRegistrationData();

      this.userService.registerUser(formData).subscribe({
        next: () => {
          this.snackBar.open('Email sent. Please verify it.', 'Close', { duration: 3200 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);

          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
        }
      });

    } else {
      this.setErrorMessage();
    }
  }



  private createRegistrationData() {
    const formData = new FormData();
    Object.keys(this.registerForm.controls).forEach(key => {
      if (key === 'profilePicture') {
        const file = this.registerForm.get(key)?.value;
        if (file) formData.append('img', file, file.name);
      } else {
        const value = this.registerForm.get(key)?.value;
        if (value) formData.append(key, value);
      }
    });

    return formData;
  }


  onProfilePictureChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);

    this.registerForm.get('profilePicture')?.setValue(file);
  }
}
