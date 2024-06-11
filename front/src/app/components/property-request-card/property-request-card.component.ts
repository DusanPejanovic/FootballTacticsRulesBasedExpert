import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Property} from "../../model/Property";
import * as L from "leaflet";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TwoActionSnackbarComponent} from "../two-action-snackbar/two-action-snackbar.component";
import {MatDialog} from "@angular/material/dialog";
import {RejectPropertyDialogComponent} from "../reject-property-dialog/reject-property-dialog.component";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-property-request-card',
  templateUrl: './property-request-card.component.html',
  styleUrls: ['./property-request-card.component.css']
})
export class PropertyRequestCardComponent implements AfterViewInit{
  @Input() property? : Property;
  @Output() requestApproved = new EventEmitter<string>;
  @Output() requestRejected = new EventEmitter<string>;
  private map: any;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private propertyService: PropertyService) {
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -35],
      shadowSize: [41, 41]
    });
    this.map = L.map('map-' + this.property?.id, {
      center:[this.property!.latitude, this.property!.longitude],
      zoom:8,
    });
    const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          minZoom: 8,
          attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
    );
    tiles.addTo(this.map);

    const marker = L.marker([this.property!.latitude, this.property!.longitude]);
    marker.addTo(this.map);
  }

  approveRequest(){
    this.snackBar.openFromComponent(TwoActionSnackbarComponent, {
      duration: 0,
      panelClass: ['default-snackbar'],
      data: {
        message: "Are you sure you want to approve this request?",
        button1: "Yes",
        button2: "Cancel",
        callback1: () => {
          this.propertyService.approvePropertyRequest(this.property!.id).subscribe({
            next: value => {
              this.requestApproved.next(this.property!.id);
            },
            error: err => {

            }
          });
        },
        callback2: () => {

        }
      }
    });
  }
  rejectRequest(){
    const dialogRef = this.dialog.open(RejectPropertyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.propertyService.rejectPropertyRequest(this.property!.id, result).subscribe({
          next: value => {
            this.requestRejected.next(this.property!.id);
          },
          error: err => {

          }
        });
      }
    });
  }
}
