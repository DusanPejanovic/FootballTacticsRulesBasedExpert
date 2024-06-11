import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-city';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  shouldShowNavigation(): boolean {
    let currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');

    if (!currentPath) {
      currentPath = this.router.url.split('?')[0];
    }

    return currentPath !== "/login" && currentPath !== "/registration" && currentPath !== '/verify-email';
  }
}
