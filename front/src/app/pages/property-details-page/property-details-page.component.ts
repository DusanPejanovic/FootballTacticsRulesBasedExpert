import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Property, PropertyStatus} from "../../model/Property";
import * as L from "leaflet";
import 'leaflet-routing-machine';
import {PropertyService} from "../../services/property.service";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup} from "@angular/forms";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import * as SockJS from "sockjs-client";
import {environment} from "../../../environment";
import * as Stomp from "stompjs";
import {Measurement} from "../../model/Device";

@Component({
  selector: 'app-property-details-page',
  templateUrl: './property-details-page.component.html',
  styleUrls: ['./property-details-page.component.css']
})
export class PropertyDetailsPageComponent implements AfterViewInit, OnInit {
  property?: Property;
  map: any;
  image: any;

  private stompClient?: Stomp.Client;
  private isLoaded: boolean = false;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  filtersForm = new FormGroup({
    filter: new FormControl<string>("6"),
    start: new FormControl<Date | null>({value: null, disabled: true}),
    end: new FormControl<Date | null>({value: null, disabled: true}),
  });

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: "Power Draw",
        fill: 'origin'
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

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  private shouldLoadMapEvent: Subject<void> = new Subject<void>();
  private mapLoadingProgress: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params["id"];
      this.propertyService.getProperty(id).subscribe({
        next: value => {
          this.property = value;
          this.shouldLoadMapEvent.next();
          this.propertyService.getPropertyImage(this.property!.id).then(imgData => {
            const objectURL: string = URL.createObjectURL(imgData);
            this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });

          this.initWebsocketConnection();
        },
        error: err => {

        }
      })
    });

    this.shouldLoadMapEvent.subscribe(() => {
      this.mapLoadingProgress++;
      if (this.mapLoadingProgress == 2) {
        this.loadMap();
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
      this.stompClient?.subscribe(`/device/${this.property?.id}/power_drain`, message => {
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

  private loadMap() {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -35],
      shadowSize: [41, 41]
    });
    this.map = L.map('map', {
      center: [this.property!.latitude, this.property!.longitude],
      zoom: 15,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 11,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    const marker = L.marker([this.property!.latitude, this.property!.longitude]);
    marker.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.shouldLoadMapEvent.next();
  }

  applyFilters() {
    if (this.filtersForm.get("filter")?.value == "custom") {
      const startDate = this.filtersForm.get("start")?.value;
      const endDate = this.filtersForm.get("end")?.value;
      if (startDate == null || endDate == null) {
        return;
      }
      this.fetchPowerDraw(this.filtersForm.get("start")?.value!, this.filtersForm.get("end")?.value!);
    } else {
      const offset = parseInt(this.filtersForm.get("filter")?.value!);
      const now = new Date();
      const from = new Date(now.getTime() - 60 * 60000 * offset);
      this.fetchPowerDraw(from, now);
    }
  }

  private fetchPowerDraw(from: Date, to: Date) {
    this.propertyService.getPropertyPowerDraw(this.property?.id!, from, to).subscribe({
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
        });
        this.chart?.chart?.update();
      }
    });
  }

  protected readonly PropertyStatus = PropertyStatus;
}
