import {Component, OnInit} from '@angular/core';
import {SprinklerEvent, SprinklerSystem} from "../../model/Device";
import {DeviceService} from "../../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import {environment} from "../../../environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sprinkler-system-details-page',
  templateUrl: './sprinkler-system-details-page.component.html',
  styleUrls: ['./sprinkler-system-details-page.component.css']
})
export class SprinklerSystemDetailsPageComponent implements OnInit{
  sprinklerSystem?: SprinklerSystem;
  image: any;

  weekdaysDictionary: any = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  }
  fromTime: string | null = null;
  toTime: string | null = null;
  eventFormErrorMessage: string | null = null;

  private stompClient?: Stomp.Client;
  private isLoaded: boolean = false;

  displayedColumns: string[] = ['timestamp', 'event', 'agent'];
  dataSource: {event: SprinklerEvent, timestamp: Date}[] = [];

  filtersForm = new FormGroup({
    filter: new FormControl<string>("6", [Validators.required]),
    start: new FormControl<Date | null>({value: null, disabled: true}),
    end: new FormControl<Date | null>({value: null, disabled: true}),
    agent: new FormControl<string>("")
  });
  constructor(private deviceService: DeviceService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    const deviceID = this.route.snapshot.paramMap.get("id");
    if(deviceID == null) return;
    this.deviceService.getDevice(deviceID).subscribe({
      next: resp => {
        this.sprinklerSystem = resp as SprinklerSystem;
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
  turnSprinklersOnOff(){
    const deviceID = this.sprinklerSystem?.id;
    if(this.sprinklerSystem?.turnedOn){
      this.deviceService.turnOffSprinklers(deviceID!).subscribe();
    }else{
      this.deviceService.turnOnSprinklers(deviceID!).subscribe();
    }
  }

  private subscribeToSocket(){
    if(this.isLoaded){
      this.stompClient?.subscribe(`/device/${this.sprinklerSystem?.id}/status`, message => {
        const messagePayload: {turnedOn: boolean, agent: string, timestamp: string} = JSON.parse(message.body);
        this.sprinklerSystem!.turnedOn = messagePayload.turnedOn;
        if(this.liveUpdate){
          console.log(messagePayload);
          const sprinklerEvent: SprinklerEvent = {
            agent: messagePayload.agent,
            turnedOn: messagePayload.turnedOn,
            timestamp: messagePayload.timestamp
          }

          this.dataSource = [...this.dataSource, {event: sprinklerEvent, timestamp: new Date(sprinklerEvent.timestamp)}];
          setTimeout(() => {
            this.scrollToBottom();
          }, 100);

        }
      });
      this.stompClient?.subscribe(`/device/${this.sprinklerSystem?.id}/rules`, message => {
        this.sprinklerSystem!.rules = JSON.parse(message.body);
      });
    }
  }

  deleteSprinklerEvent(ruleID: string){
    this.deviceService.deleteSprinklerRule(ruleID).subscribe();
  }

  addSprinklerEvent(){
    if(this.fromTime == null || this.toTime == null){
      this.eventFormErrorMessage = "Invalid data";
      return;
    }

    let tokens = this.fromTime.split(":");
    const fromMinute: number = Number(tokens[0]) * 60 + Number(tokens[1]);

    tokens = this.toTime.split(":");
    const toMinute: number = Number(tokens[0]) * 60 + Number(tokens[1]);

    if(fromMinute >= toMinute){
      this.eventFormErrorMessage = "Invalid data";
      return;
    }
    const weekdays: number[] = [];
    for(let key in this.weekdaysDictionary){
      if(this.weekdaysDictionary[key]){
        weekdays.push(Number(key));
      }
    }
    if(weekdays.length == 0){
      this.eventFormErrorMessage = "Invalid data";
      return;
    }

    let newRule: any = {
      daysOfTheWeek: weekdays,
      fromMinute: fromMinute,
      toMinute: toMinute
    }

    this.eventFormErrorMessage = null;
    this.fromTime = null;
    this.toTime = null;
    for(let key in this.weekdaysDictionary){
      this.weekdaysDictionary[key] = false;
    }

    this.deviceService.createSprinklerRule(this.sprinklerSystem!.id, newRule).subscribe();

  }
  liveUpdate: boolean = false;
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

    let agent: string | null = this.filtersForm.get("agent")!.value;
    if(agent?.trim().length == 0){
      agent = null;
    }

    this.deviceService.getSprinklerEvents(this.sprinklerSystem!.id, from, to, agent).subscribe({
      next: resp => {
        console.log(resp);
        this.liveUpdate = isLiveUpdate;
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
    });

  }

}
