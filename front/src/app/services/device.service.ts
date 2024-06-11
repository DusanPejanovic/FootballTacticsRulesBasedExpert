import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment";
import {
  CreateDeviceDTO,
  Device,
  DeviceAvailability,
  Measurement,
  SprinklerEvent,
  VehicleGateEvent
} from "../model/Device";
import {Property} from "../model/Property";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private http: HttpClient) {
  }

  getDevicesForProperty(propertyID: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${environment.apiHost}device/property/${propertyID}`);
  }

  getDeviceImage(deviceId: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(`${environment.apiHost}device/${deviceId}/image`, {observe: 'response', responseType: 'blob'})
        .subscribe(resp => {
          resolve(resp.body);
        });
    });
  }

  createDevice(device: FormData, propertyID: string): Observable<CreateDeviceDTO> {
    return this.http.post<CreateDeviceDTO>(`${environment.apiHost}device/create-device/${propertyID}`, device);
  }

  createSolarPanelSystem(device: FormData, propertyID: string): Observable<CreateDeviceDTO> {
    return this.http.post<CreateDeviceDTO>(`${environment.apiHost}device/create-solar-panel-system/${propertyID}`, device);
  }

  turnOffSolarPanelSystem(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/solar-panel-system/${deviceID}/turn/off`, {});
  }

  turnOnSolarPanelSystem(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/solar-panel-system/${deviceID}/turn/on`, {});
  }

  getPowerGeneratedForPanelSystem(deviceID: string, from: Date, to: Date): Observable<Measurement[]> {
    const options = {params: new HttpParams().set('from', from.toISOString()).set('to', to.toISOString())};
    return this.http.get<Measurement[]>(`${environment.apiHost}device/solar-panel-system/${deviceID}/power`, options)
  }

  getDevice(deviceID: string): Observable<Device> {
    return this.http.get<Device>(`${environment.apiHost}device/${deviceID}`);
  }

  getBatteryLevel(deviceID: string, from: Date, to: Date): Observable<Measurement[]> {
    const options = {params: new HttpParams().set('from', from.toISOString()).set('to', to.toISOString())};
    return this.http.get<Measurement[]>(`${environment.apiHost}device/home-battery/${deviceID}/level`, options)
  }

  turnOffLamp(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/lamp/${deviceID}/turn/off`, {});
  }

  turnOnLamp(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/lamp/${deviceID}/turn/on`, {});
  }

  turnOffSprinklers(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/sprinklers/${deviceID}/turn/off`, {});
  }

  turnOnSprinklers(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/sprinklers/${deviceID}/turn/on`, {});
  }
  createSprinklerRule(deviceID: string, rule: {daysOfTheWeek: number[], fromMinute: number; toMinute: number; }): Observable<void>{
    return this.http.post<void>(`${environment.apiHost}device/sprinklers/${deviceID}/rule`, rule);
  }
  deleteSprinklerRule(ruleID: string): Observable<void>{
    return this.http.delete<void>(`${environment.apiHost}device/sprinklers/rule/${ruleID}`);
  }
  lampAutomaticModeOff(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/lamp/${deviceID}/automatic/off`, {});
  }

  lampAutomaticModeOn(deviceID: string): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}device/lamp/${deviceID}/automatic/on`, {});
  }

  getLampBrightness(deviceID: string, from: Date, to: Date): Observable<Measurement[]> {
    const options = {params: new HttpParams().set('from', from.toISOString()).set('to', to.toISOString())};
    return this.http.get<Measurement[]>(`${environment.apiHost}device/lamp/${deviceID}/brightness`, options)
  }
  gatePublicModeOn(deviceID: string): Observable<void>{
    return this.http.put<void>(`${environment.apiHost}device/gate/${deviceID}/public/on`, {});
  }
  gatePublicModeOff(deviceID: string): Observable<void>{
    return this.http.put<void>(`${environment.apiHost}device/gate/${deviceID}/public/off`, {});
  }
  gateOpen(deviceID: string): Observable<void>{
    return this.http.put<void>(`${environment.apiHost}device/gate/${deviceID}/open`, {});
  }
  gateClose(deviceID: string): Observable<void>{
    return this.http.put<void>(`${environment.apiHost}device/gate/${deviceID}/close`, {});
  }
  updateWhitelist(deviceID: string, changes: {allowAccess:string[], revokeAccess:string[]}): Observable<void>{
    return this.http.put<void>(`${environment.apiHost}device/gate/${deviceID}/whitelist`, changes);
  }
  getVehicleGateEvents(deviceID: string, from: Date, to: Date, automatic: boolean): Observable<VehicleGateEvent[]>{
    const options = {params: new HttpParams()
        .set('from', from.toISOString())
        .set('to', to.toISOString())
        .set('automatic', automatic)};
    return this.http.get<VehicleGateEvent[]>(`${environment.apiHost}device/gate/${deviceID}/events`, options)
  }

  getSprinklerEvents(deviceID: string, from: Date, to: Date, agent: string | null): Observable<SprinklerEvent[]>{
    let options;
    if(agent == null){
      options = {params: new HttpParams()
          .set('from', from.toISOString())
          .set('to', to.toISOString())};
    }else{
      options = {params: new HttpParams()
          .set('from', from.toISOString())
          .set('agent', agent)
          .set('to', to.toISOString())};
    }
    return this.http.get<SprinklerEvent[]>(`${environment.apiHost}device/sprinklers/${deviceID}/events`, options)
  }

  getDeviceAvailability(deviceID: string, from: string, to: string, every: string, maxCount: number): Observable<DeviceAvailability[]>{
    const options = {params: new HttpParams()
        .set('from', from)
        .set('to', to)
        .set('every', every)
        .set('maxCount', maxCount)
    };
    return this.http.get<DeviceAvailability[]>(`${environment.apiHost}device/${deviceID}/availability`, options);
  }
}
