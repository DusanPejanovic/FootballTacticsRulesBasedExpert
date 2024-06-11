import {Component, OnInit} from '@angular/core';
import {VehicleGate, VehicleGateEvent} from "../../model/Device";
import * as Stomp from "stompjs";
import {DeviceService} from "../../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import * as SockJS from "sockjs-client";
import {environment} from "../../../environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-vehicle-gate-details-page',
  templateUrl: './vehicle-gate-details-page.component.html',
  styleUrls: ['./vehicle-gate-details-page.component.css']
})
export class VehicleGateDetailsPageComponent implements OnInit{
  gate?: VehicleGate;
  image: any;

  private stompClient?: Stomp.Client;
  private isLoaded: boolean = false;

  displayedColumns: string[] = ['timestamp', 'event', 'agent', 'action', 'plateNumber'];
  dataSource: {event: VehicleGateEvent, timestamp: Date}[] = [];

  plateNumber: string = "";

  liveUpdate: boolean = false;
  automaticEventType: boolean = false;

  filtersForm = new FormGroup({
    filter: new FormControl<string>("6", [Validators.required]),
    type: new FormControl<string | null>(null, [Validators.required]),
    start: new FormControl<Date | null>({value: null, disabled: true}),
    end: new FormControl<Date | null>({value: null, disabled: true}),
  });

  constructor(private deviceService: DeviceService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    const deviceID = this.route.snapshot.paramMap.get("id");
    if(deviceID == null) return;
    this.deviceService.getDevice(deviceID).subscribe({
      next: resp => {
        this.gate = resp as VehicleGate;
        this.deviceService.getDeviceImage(deviceID).then(imgData => {
          const objectURL: string = URL.createObjectURL(imgData);
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });

        this.initWebsocketConnection();
      }
    });
    this.filtersForm.get("filter")?.valueChanges.subscribe(value => {
      if(value != "custom"){
        this.filtersForm.get("start")?.disable();
        this.filtersForm.get("end")?.disable();
      }else{
        this.filtersForm.get("start")?.enable();
        this.filtersForm.get("end")?.enable();
      }
    });
  }
  private initWebsocketConnection(){
    const ws: WebSocket = new SockJS(environment.apiHost + 'socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.isLoaded = true;
      this.subscribeToSocket();
    });
  }
  private subscribeToSocket(){
    if(this.isLoaded){
      this.stompClient?.subscribe(`/device/${this.gate?.id}/opened`, message => {
        this.gate!.open = true;
        if(this.liveUpdate){
          const dto: {deviceID: string, timestamp: string, vehicle: any, agent: string} = JSON.parse(message.body);
          console.log(dto);
          const gateEvent: VehicleGateEvent = {
            automatic: dto.vehicle != null,
            event: "GateOpened",
            inside: dto.vehicle == null ? null : dto.vehicle.inside,
            plateNumber: dto.vehicle == null ? null : dto.vehicle.plateNumber,
            timestamp: dto.timestamp,
            agent: dto.agent
          }
          if(this.automaticEventType == (dto.vehicle != null)){
            this.dataSource = [...this.dataSource, {event: gateEvent, timestamp: new Date(gateEvent.timestamp)}];
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          }
        }
      });
      this.stompClient?.subscribe(`/device/${this.gate?.id}/closed`, message => {
        this.gate!.open = false;
        if(this.liveUpdate){
          const dto: {deviceID: string, timestamp: string, automatic: boolean, agent: string} = JSON.parse(message.body);
          console.log(dto);
          const gateEvent: VehicleGateEvent = {
            automatic: dto.automatic,
            event: "GateClosed",
            inside: null,
            plateNumber: null,
            timestamp: dto.timestamp,
            agent: dto.agent
          }
          if(this.automaticEventType == dto.automatic){
            this.dataSource = [...this.dataSource, {event: gateEvent, timestamp: new Date(gateEvent.timestamp)}];
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          }
        }
      });
      this.stompClient?.subscribe(`/device/${this.gate?.id}/mode`, message => {
        this.gate!.publicMode = message.body == "true";
      });
      this.stompClient?.subscribe(`/device/${this.gate?.id}/whitelist`, message => {
        this.gate!.whitelist = JSON.parse(message.body) as string[];
      });
    }
  }
  openCloseGate(){
    const deviceID = this.gate!.id;
    if(this.gate?.open){
      this.deviceService.gateClose(deviceID).subscribe();
    }else {
      this.deviceService.gateOpen(deviceID).subscribe();
    }
  }
  switchMode(){
    const deviceID = this.gate!.id;
    if(this.gate?.publicMode){
      this.deviceService.gatePublicModeOff(deviceID).subscribe();
    }else {
      this.deviceService.gatePublicModeOn(deviceID).subscribe();
    }
  }

  private scrollToBottom(){
    let element = document.getElementById("events-table");
    element!.scrollTop = element!.scrollHeight;
  }

  applyFilters(){
    if(this.filtersForm.invalid){
      return;
    }

    let from: Date | null = null;
    let to: Date | null = null;
    let isLiveUpdate: boolean = true;
    if(this.filtersForm.get("filter")?.value == "custom"){
      const startDate = this.filtersForm.get("start")?.value;
      const endDate = this.filtersForm.get("end")?.value;
      if(startDate == null || endDate == null){
        return;
      }
      from = startDate;
      to = endDate;
      isLiveUpdate = false;
    }else{
      const offset = parseInt(this.filtersForm.get("filter")?.value!);
      const now = new Date();
      const fromDate = new Date(now.getTime() - 60 * 60000 * offset);
      to = now;
      from = fromDate;
    }

    const automatic: boolean = this.filtersForm.get("type")?.value == "Automatic";

    this.deviceService.getVehicleGateEvents(this.gate!.id, from, to, automatic).subscribe({
      next: resp => {
        this.liveUpdate = isLiveUpdate;
        this.automaticEventType = automatic;
        this.dataSource = resp.map(event => {
          return {
            event: event,
            timestamp: new Date(event.timestamp)
          }
        }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    })
  }
  addPlateNumberToWhitelist(){
    if(this.plateNumber.trim().length == 0){
      return;
    }
    this.deviceService.updateWhitelist(this.gate!.id, {allowAccess: [this.plateNumber], revokeAccess: []}).subscribe();
    this.plateNumber = "";
  }
  removePlateNumber(plateNumber: string){
    this.deviceService.updateWhitelist(this.gate!.id, {allowAccess: [], revokeAccess: [plateNumber]}).subscribe();
  }

  protected readonly datePipe = DatePipe;
}
