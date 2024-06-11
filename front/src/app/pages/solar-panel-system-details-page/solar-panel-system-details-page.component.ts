import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DeviceStatus, SolarPanelSystem} from "../../model/Device";
import {FormControl, FormGroup} from "@angular/forms";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {DeviceService} from "../../services/device.service";
import {ActivatedRoute} from "@angular/router";
import * as SockJS from "sockjs-client";
import {environment} from "../../../environment";
import * as Stomp from "stompjs";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-solar-panel-system-details-page',
  templateUrl: './solar-panel-system-details-page.component.html',
  styleUrls: ['./solar-panel-system-details-page.component.css']
})
export class SolarPanelSystemDetailsPageComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  solarPanelSystem?: SolarPanelSystem;

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
        label: "Generated Power [W]",
        fill: 'origin',
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)'
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

  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const deviceID = this.route.snapshot.paramMap.get("id");
    if (deviceID == null) return;
    this.deviceService.getDevice(deviceID).subscribe({
      next: resp => {
        this.solarPanelSystem = resp as SolarPanelSystem;
        console.log(this.solarPanelSystem)
        this.initWebsocketConnection();
      }
    });

    this.filtersForm.get("filter")?.valueChanges.subscribe(value => {
      if (value != "custom") {
        this.filtersForm.get("start")?.disable();
        this.filtersForm.get("end")?.disable();
      } else {
        this.filtersForm.get("start")?.enable();
        this.filtersForm.get("end")?.enable();
      }
    });
  }

  private initWebsocketConnection() {
    const ws: WebSocket = new SockJS(environment.apiHost + 'socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.isLoaded = true;
      this.subscribeToSocket();
    });
  }

  private subscribeToSocket() {
    if (this.isLoaded) {
      this.stompClient?.subscribe(`/device/${this.solarPanelSystem?.id}/status`, message => {
        this.solarPanelSystem!.active = message.body == "true";
      });
    }
  }

  switchStatus() {
    const deviceID = this.solarPanelSystem?.id;
    if (this.solarPanelSystem?.active) {
      this.deviceService.turnOffSolarPanelSystem(deviceID!).subscribe();
    } else {
      this.deviceService.turnOnSolarPanelSystem(deviceID!).subscribe();
    }
  }

  applyFilters() {
    if (this.filtersForm.get("filter")?.value == "custom") {
      const startDate = this.filtersForm.get("start")?.value;
      const endDate = this.filtersForm.get("end")?.value;
      if (startDate == null || endDate == null) {
        return;
      }
      this.fetchPowerGenerated(this.filtersForm.get("start")?.value!, this.filtersForm.get("end")?.value!);
    } else {
      const offset = parseInt(this.filtersForm.get("filter")?.value!);
      const now = new Date();
      const from = new Date(now.getTime() - 60 * 60000 * offset);
      this.fetchPowerGenerated(from, now);
    }
  }

  private fetchPowerGenerated(from: Date, to: Date) {
    this.deviceService.getPowerGeneratedForPanelSystem(this.solarPanelSystem?.id!, from, to).subscribe({
      next: resp => {
        this.lineChartData.datasets.forEach(x => {
          x.data = [];
        });
        this.lineChartData.labels = [];
        resp.forEach(measurement => {
          this.lineChartData.datasets.forEach((x) => {
            x.data.push(measurement.measurement);
          });
          const timestamp: Date = new Date(measurement.timestamp[0], measurement.timestamp[1],
            measurement.timestamp[2], measurement.timestamp[3],
            measurement.timestamp[4], measurement.timestamp[5])
          this.lineChartData.labels?.push(timestamp.toString());
          console.log(timestamp.toString());
        });
        this.chart?.chart?.update();
      }
    });
  }
}
