import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Battery, Lamp, Measurement} from "../../model/Device";
import * as Stomp from "stompjs";
import {DeviceService} from "../../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {FormControl, FormGroup} from "@angular/forms";
import {BaseChartDirective} from "ng2-charts";
import * as SockJS from "sockjs-client";
import {environment} from "../../../environment";

@Component({
  selector: 'app-battery-details-page',
  templateUrl: './battery-details-page.component.html',
  styleUrls: ['./battery-details-page.component.css']
})
export class BatteryDetailsPageComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  battery?: Battery;

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
        label: "Battery Level [W]",
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
        this.battery = resp as Battery;
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
      this.stompClient?.subscribe(`/device/${this.battery?.id}/power_level`, message => {
        if (this.filtersForm.get("filter")?.value === "1") {
          if (message.body) {
            let measurement: Measurement = JSON.parse(message.body);
            this.updateChartData(measurement);
          }
        }
      });
    }
  }

  private updateChartData(newMeasurement: Measurement) {
    this.lineChartData.datasets.forEach((dataset) => {
      dataset.data.push(newMeasurement.measurement);
    });

    const timestamp: Date = new Date(newMeasurement.timestamp[0], newMeasurement.timestamp[1],
      newMeasurement.timestamp[2], newMeasurement.timestamp[3],
      newMeasurement.timestamp[4], newMeasurement.timestamp[5])
    this.lineChartData.labels?.push(timestamp.toString());

    this.chart?.chart?.update();
  }

  applyFilters() {
    if (this.filtersForm.get("filter")?.value == "custom") {
      const startDate = this.filtersForm.get("start")?.value;
      const endDate = this.filtersForm.get("end")?.value;
      if (startDate == null || endDate == null) {
        return;
      }
      this.fetchBatteryLevel(this.filtersForm.get("start")?.value!, this.filtersForm.get("end")?.value!);
    } else {
      const offset = parseInt(this.filtersForm.get("filter")?.value!);
      const now = new Date();
      const from = new Date(now.getTime() - 60 * 60000 * offset);
      this.fetchBatteryLevel(from, now);
    }
  }

  private fetchBatteryLevel(from: Date, to: Date) {
    this.deviceService.getBatteryLevel(this.battery?.id!, from, to).subscribe({
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
