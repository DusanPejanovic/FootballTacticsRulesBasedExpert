import {Component, OnInit} from '@angular/core';
import {Property, PropertyStatus} from "../../model/Property";
import {Router} from "@angular/router";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit{
  properties: Property[] = [];
  constructor(private router: Router, private propertyService: PropertyService) {
  }

  ngOnInit(): void {
    this.propertyService.getMyProperties().subscribe({
      next: value => {
        this.properties = value;
      },
      error: err => {

      }
    })
  }
  openCreatePropertyPage(): void{
    this.router.navigate(['create/property']);
  }

}
