import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City, Country, Property} from "../model/Property";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiHost}country/all`);
  }

  getCities(countryID: string): Observable<City[]>{
    return this.http.get<City[]>(`${environment.apiHost}country/${countryID}/cities`);
  }
}
