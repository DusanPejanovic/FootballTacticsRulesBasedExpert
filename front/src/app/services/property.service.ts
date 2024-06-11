import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Property} from "../model/Property";
import {environment} from "../../environment";
import {Measurement} from "../model/Device";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private http: HttpClient) {
  }

  createProperty(property: FormData): Observable<Property> {
    return this.http.post<Property>(`${environment.apiHost}property`, property);
  }

  getMyProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiHost}property/my-properties`);
  }

  getProperty(propertyID: string): Observable<Property> {
    return this.http.get<Property>(`${environment.apiHost}property/${propertyID}`);
  }

  getPendingProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiHost}property/pending`);
  }

  approvePropertyRequest(propertyID: string): Observable<Property> {
    return this.http.put<Property>(`${environment.apiHost}property/${propertyID}/approve`, {});
  }

  rejectPropertyRequest(propertyID: string, rejection: string): Observable<Property> {
    return this.http.put<Property>(`${environment.apiHost}property/${propertyID}/reject`, {message: rejection});
  }

  getPropertyImage(propertyID: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(`${environment.apiHost}property/${propertyID}/image`, {observe: 'response', responseType: 'blob'})
        .subscribe(resp => {
          resolve(resp.body);
        });
    });
  }

  getPropertyPowerDraw(propertyID: string, from: Date, to: Date): Observable<Measurement[]> {
    const options = {params: new HttpParams().set('from', from.toISOString()).set('to', to.toISOString())};
    return this.http.get<Measurement[]>(`${environment.apiHost}property/${propertyID}/power-draw`, options)
  }
}
