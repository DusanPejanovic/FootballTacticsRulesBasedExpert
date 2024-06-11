import {Component, Input, OnInit} from '@angular/core';
import {Device, DeviceTypeLabels} from "../../model/Device";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent implements OnInit {
  @Input() device? : Device;
  image: any;

  constructor(private router: Router, private sanitizer: DomSanitizer, private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.deviceService.getDeviceImage(this.device!.id).then(imgData => {
      const objectURL: string = URL.createObjectURL(imgData);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  openDeviceDetailsPage(){
    const deviceType: string = this.device!.type.toLowerCase();
    this.router.navigate([`/device/${deviceType}/${this.device!.id}`]);
  }

  getDeviceTypeLabel(): string {
    if (this.device?.type == undefined) {
      return "";
    }

    return DeviceTypeLabels[this.device?.type];
}

}
