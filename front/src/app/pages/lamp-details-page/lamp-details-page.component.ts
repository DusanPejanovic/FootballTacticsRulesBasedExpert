import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {Lamp} from "../../model/Device";
import {ActivatedRoute} from "@angular/router";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { ChartConfiguration, ChartOptions } from 'chart.js';
import {environment} from "../../../environment";
import {FormControl, FormGroup} from "@angular/forms";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-lamp-details-page',
  templateUrl: './lamp-details-page.component.html',
  styleUrls: ['./lamp-details-page.component.css']
})
export class LampDetailsPageComponent implements OnInit{

  lamp?: Lamp;

  private stompClient?: Stomp.Client;
  private isLoaded: boolean = false;


  filtersForm = new FormGroup({
    filter: new FormControl<string>("6"),
    start: new FormControl<Date | null>({value: null, disabled: true}),
    end: new FormControl<Date | null>({value: null, disabled: true}),
  });

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: "Brightness",
        fill: 'origin',
        backgroundColor: 'rgba(198, 172, 143, 0.8)',
        borderColor: 'rgba(94, 80, 63, 1)',
        pointBackgroundColor: 'rgba(19, 17, 16, 1)',
      }
    ],
    labels: []
  }
  public lineChartOptions: ChartOptions = {
    scales: {
      x: {
        display: false,
      }
    },
    responsive: true,
  };
  constructor(private deviceService: DeviceService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const deviceID = this.route.snapshot.paramMap.get("id");
    if(deviceID == null) return;
    this.deviceService.getDevice(deviceID).subscribe({
      next: resp => {
        this.lamp = resp as Lamp;
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
      this.stompClient?.subscribe(`/device/${this.lamp?.id}/status`, message => {
        this.lamp!.shining = message.body == "true";
      });
      this.stompClient?.subscribe(`/device/${this.lamp?.id}/mode`, message => {
        this.lamp!.automaticMode = message.body == "true";
      });
    }
  }
  switchMode(){
    const deviceID = this.lamp?.id;
    if(this.lamp?.automaticMode){
      this.deviceService.lampAutomaticModeOff(deviceID!).subscribe();
    }else{
      this.deviceService.lampAutomaticModeOn(deviceID!).subscribe();
    }
  }
  switchStatus(){
    const deviceID = this.lamp?.id;
    if(this.lamp?.shining){
      this.deviceService.turnOffLamp(deviceID!).subscribe();
    }else{
      this.deviceService.turnOnLamp(deviceID!).subscribe();
    }
  }

  private fetchLampBrightness(from: Date, to: Date){
    this.deviceService.getLampBrightness(this.lamp?.id!, from, to).subscribe({
      next: resp => {
        this.lineChartData.datasets.forEach(x => {
          x.data = [];
        });
        this.lineChartData.labels = [];
        resp.forEach(measurement => {
          this.lineChartData.datasets.forEach((x) => {
            x.data.push(measurement.measurement);
          });
          const timestamp: Date = new Date(measurement.timestamp[0],measurement.timestamp[1],
            measurement.timestamp[2],measurement.timestamp[3],
            measurement.timestamp[4],measurement.timestamp[5])
          this.lineChartData.labels?.push(timestamp.toString());
          console.log(timestamp.toString());
        });
        this.chart?.chart?.update();
      }
    });
  }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  applyFilters(){
    if(this.filtersForm.get("filter")?.value == "custom"){
      const startDate = this.filtersForm.get("start")?.value;
      const endDate = this.filtersForm.get("end")?.value;
      if(startDate == null || endDate == null){
        return;
      }
      this.fetchLampBrightness(this.filtersForm.get("start")?.value!, this.filtersForm.get("end")?.value!);
    }else{
      const offset = parseInt(this.filtersForm.get("filter")?.value!);
      const now = new Date();
      const from = new Date(now.getTime() - 60 * 60000 * offset);
      this.fetchLampBrightness(from, now);
    }
  }

  protected readonly undefined = undefined;
}
