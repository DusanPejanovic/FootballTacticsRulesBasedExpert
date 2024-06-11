import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../../services/device.service";
import {Device} from "../../model/Device";
import {PropertyService} from "../../services/property.service";
import {Property} from "../../model/Property";
import {MatDialog} from "@angular/material/dialog";
import {AddDeviceDialogComponent} from "../../components/dialog/add-device-dialog/add-device-dialog.component";

@Component({
  selector: 'app-property-devices-page',
  templateUrl: './property-devices-page.component.html',
  styleUrls: ['./property-devices-page.component.css']
})
export class PropertyDevicesPageComponent implements OnInit {
  propertyID: string = "";
  property!: Property;
  devices: Device[] = [];

  constructor(private route: ActivatedRoute,
              private propertyService: PropertyService,
              private deviceService: DeviceService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.propertyID = params["id"];
      this.propertyService.getProperty(this.propertyID).subscribe({
        next: value => {
          this.property = value;
        },
        error: err => {

        }
      })

      this.fetchDevices();
    });
  }

  fetchDevices() {
    this.deviceService.getDevicesForProperty(this.propertyID).subscribe({
      next: value => {
        this.devices = value;
      },
      error: err => {

      }
    })
  }

  openAddDeviceDialog() {
    const dialogRef = this.dialog.open(AddDeviceDialogComponent, {
      data: {
        propertyID: this.propertyID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.fetchDevices();
      }
    });
  }
}
