import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-admin-page',
  templateUrl: './add-admin-page.component.html',
  styleUrls: ['./add-admin-page.component.css']
})
export class AddAdminPageComponent {
  registerForm!: FormGroup;
  errorMessage: string = "";

  constructor(private adminService: AdminService, private router: Router, private snackBar: MatSnackBar) {
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

      this.adminService.createAdmin(formData).subscribe({
        next: () => {
          this.snackBar.open('Admin created.', 'Close', { duration: 3200 });
          this.registerForm.reset();
        },
        error: (error) => {
          this.snackBar.open('Admin creating failed.', 'Close', { duration: 3000 });
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
