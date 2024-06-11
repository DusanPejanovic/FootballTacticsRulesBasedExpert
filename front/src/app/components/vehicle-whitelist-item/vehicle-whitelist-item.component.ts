import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-vehicle-whitelist-item',
  templateUrl: './vehicle-whitelist-item.component.html',
  styleUrls: ['./vehicle-whitelist-item.component.css']
})
export class VehicleWhitelistItemComponent {

  @Input() plateNumber?: string;

  @Output() itemDeleted = new EventEmitter<string>();

  deleteItem(){
    this.itemDeleted.emit(this.plateNumber);
  }
}
