import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Property, PropertyStatus} from "../../model/Property";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit{
  @Input() property? : Property;
  image: any;
  constructor(private router: Router, private sanitizer: DomSanitizer, private propertyService: PropertyService) {
  }

  ngOnInit(): void {
    this.propertyService.getPropertyImage(this.property!.id).then(imgData => {
      const objectURL: string = URL.createObjectURL(imgData);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  openDetails(){
    this.router.navigate(['property/' + this.property?.id]);
  }

  showDevices() {
    this.router.navigate(['property/' + this.property?.id + '/devices']);
  }

  protected readonly PropertyStatus = PropertyStatus;
}
@Pipe({ name: 'enumToString' })
export class EnumToStringPipe implements PipeTransform {
  transform(value: any, enumType: any): string {
    return enumType[value];
  }
}
