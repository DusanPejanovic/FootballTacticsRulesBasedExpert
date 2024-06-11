import {Component, OnInit} from '@angular/core';
import {Property, PropertyStatus} from "../../model/Property";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit{
  properties: Property[] = [];

  constructor(private propertyService: PropertyService) {
  }
  ngOnInit(): void {
    this.propertyService.getPendingProperties().subscribe({
      next: value => {
        this.properties = value;
      },
      error: err => {

      }
    })
  }
  removeRequest(propertyID: string){
    this.properties = this.properties.filter(item => item.id != propertyID);
  }


}
