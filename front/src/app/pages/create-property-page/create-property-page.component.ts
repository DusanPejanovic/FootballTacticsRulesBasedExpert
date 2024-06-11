import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {LeafletMouseEvent} from "leaflet";
import {City, Country, CreatePropertyDTO} from "../../model/Property";
import {LocationService} from "../../services/location.service";
import * as L from "leaflet";
import {PropertyService} from "../../services/property.service";
import {Observable, startWith, map} from "rxjs";

@Component({
  selector: 'app-create-property-page',
  templateUrl: './create-property-page.component.html',
  styleUrls: ['./create-property-page.component.css']
})
export class CreatePropertyPageComponent implements AfterViewInit, OnInit{
  form: FormGroup;
  imgChangeEvt: any = undefined;
  croppedImage: any = undefined;
  countries: Country[] = [];
  cities: City[] = [];
  filteredCountries?: Observable<Country[]> = new Observable<Country[]>();
  filteredCities?: Observable<Country[]> = new Observable<Country[]>();
  selectedCountry: Country | null = null;
  selectedCity: City | null = null;
  constructor(private router: Router, private snackBar:MatSnackBar,
              private locationService: LocationService,
              private propertyService: PropertyService,){
    this.form = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      numOfFloors: new FormControl(null, [Validators.required]),
      latitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required])
    });
  }
  ngOnInit(): void {
    this.locationService.getCountries().subscribe({
      next: value => {
        this.countries = value;
      },
      error: err => {

      }
    });
    this.filteredCountries = this.form.get("country")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value || '')),
    );
    this.filteredCities = this.form.get("city")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value || '')),
    );
  }
  onSelectCountry(country: Country){
    this.selectedCountry = country;
    this.form.get('country')?.setValue(country.name);
    this.locationService.getCities(country.id).subscribe({
      next: value => {
        this.cities = value;
      },
      error: err => {

      }
    })
  }
  onSelectCity(city: City){
    this.selectedCity = city;
    this.form.get('city')?.setValue(city.name);
  }
  private _filterCountries(value: string): Country[] {
    let filterValue: any;
    try {
      filterValue = value.toLowerCase();
    }
    catch (e){
      return [];
    }
    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }
  private _filterCities(value: string): City[] {
    let filterValue: any;
    try {
      filterValue = value.toLowerCase();
    }
    catch (e){
      return [];
    }
    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  onFileChange(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList?.length == 1){
      this.imgChangeEvt = event;
    }
    else {
      this.imgChangeEvt = undefined;
      this.croppedImage = undefined;
    }

  }
  cropImg(e: ImageCroppedEvent) {
    this.croppedImage = e.blob;
  }
  submit():void{
    if(this.selectedCity == null){
      this.form.get("city")?.setErrors({invalidCityName: true});
      return;
    }
    const formData = new FormData();
    formData.append('img', this.croppedImage, 'propertyImg.png');
    const property:CreatePropertyDTO = {
      address: this.form.controls["address"].value,
      cityID: this.selectedCity?.id!,
      latitude: this.form.controls["latitude"].value,
      longitude: this.form.controls["longitude"].value,
      numberOfFloors: this.form.controls["numOfFloors"].value,
      squareMeters: this.form.controls["area"].value
    }
    console.log(property);
    formData.append('data', new Blob([JSON.stringify(property)], {type: "application/json"}));
    this.propertyService.createProperty(formData).subscribe({
      next: value => {
        this.snackBar.open("Property created", "Ok");
        this.router.navigate(["/home"]);
      },
      error: err => {

      }
    })
    // this.venueService.createVenue(formData).subscribe(resp => {
    //   console.log(resp);
    //   this.snackBar.open("Venue created", "Ok");
    //   this.router.navigate(["/my-venues"]);
    // });
  }

  private map: any;
  private locationMarker?: L.Marker;
  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -35],
      shadowSize: [41, 41]
    });
    this.map = L.map('map', {
      center:[45, 20],
      zoom:5,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.map.on('click', (e:LeafletMouseEvent) => {
      if(this.locationMarker){
        this.map?.removeControl(this.locationMarker);
      }
      this.locationMarker = L.marker(e.latlng).addTo(this.map!);
      this.form.patchValue({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      })
    });
    L.DomUtil.addClass(this.map._container, 'map-cursor');
  }
}
