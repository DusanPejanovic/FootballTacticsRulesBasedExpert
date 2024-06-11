import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-verified-mail-page',
  templateUrl: './verified-mail-page.component.html',
  styleUrls: ['./verified-mail-page.component.css']
})
export class VerifiedMailPageComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.verifyEmail(token);
      }
      else {
        console.log('Error: Token missing');
      }

    });
  }


  private verifyEmail(token: string) {
    this.userService.verifyEmail(token).subscribe({
      next: () => {
        console.log('Mail verifed');
      },
      error: () => {
        console.error('Verification failed');
      }
    });
  }



}
