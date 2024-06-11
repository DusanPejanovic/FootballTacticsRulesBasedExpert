import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {DeviceService} from "../../services/device.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-device-availability-form',
  templateUrl: './device-availability-form.component.html',
  styleUrls: ['./device-availability-form.component.css']
})
export class DeviceAvailabilityFormComponent implements OnInit{
  @Input() deviceID? : string;
  public chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: "Availability",
        fill: 'origin',
        backgroundColor: 'rgba(198, 172, 143, 0.8)',
        borderColor: 'rgba(94, 80, 63, 1)',
        pointBackgroundColor: 'rgba(19, 17, 16, 1)',
      }
    ],
    labels: []
  }
  public chartOptions: ChartOptions = {
    scales: {
      x: {
        display: false,
      },
      y:{
        min: 0,
        max: 1
      }
    },
    responsive: true,
  };

  filtersForm = new FormGroup({
    filter: new FormControl<string>("6", [Validators.required]),
    start: new FormControl<Date | null>({value: null, disabled: true}),
    end: new FormControl<Date | null>({value: null, disabled: true})
  });

  private offsetDict: any = {
    6: {start: "-7h", stop: "-0h", every: "1h", maxCount: 60},
    12: {start: "-13h", stop: "-0h", every: "1h",  maxCount: 60},
    24: {start: "-25h", stop: "-0h", every: "1h",  maxCount: 60},
    168: {start: "-8d", stop: "-0d", every: "1d",  maxCount: 1440},
    5040: {start: "-31d", stop: "-0d", every: "1d",  maxCount: 1440}
  }

  constructor(private deviceService: DeviceService) {
  }
  ngOnInit(): void {
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
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private daysAgo(date: Date) {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }
  applyFilters(){
    this.chart?.chart?.update();

    if(this.filtersForm.invalid){
      return;
    }

    let params: {start: string, stop: string, every: string, maxCount: number} | undefined;

    if(this.filtersForm.get("filter")?.value == "custom"){
      const startDate = this.filtersForm.get("start")?.value;
      const endDate = this.filtersForm.get("end")?.value;
      if(startDate == null || endDate == null){
        return;
      }
      let startDateAgo = this.daysAgo(startDate);
      let endDateAgo = this.daysAgo(endDate);
      let dif = startDateAgo - endDateAgo;
      if(dif > 31){
        return;
      }
      if(dif <= 2){
        const start = "-" + String(startDateAgo * 24) + "h";
        const stop = "-" + String(endDateAgo * 24) + "h";
        params = {
          every: "1h", maxCount: 3600, start: start, stop: stop

        }
      }else{
        const start = "-" + String(startDateAgo) + "d";
        const stop = "-" + String(endDateAgo) + "d";
        params = {
          every: "1d", maxCount: 1440, start: start, stop: stop
        }
      }
      console.log(params);
    }else{
      const offset = parseInt(this.filtersForm.get("filter")?.value!);
      params = this.offsetDict[offset];
    }

    this.deviceService.getDeviceAvailability(this.deviceID!, params!.start, params!.stop, params!.every, params!.maxCount).subscribe(resp => {
      console.log(resp);
      this.chartData.datasets.forEach(x => {
        x.data = [];
      });
      this.chartData.labels = [];

      resp.forEach(measurement => {
        this.chartData.datasets[0].data.push(measurement.availability);
        const date  = new Date(measurement.toMoment);
        const dateStr = date.toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        this.chartData.labels?.push(dateStr);
      });
      console.log(this.chartData);

      this.chart?.chart?.update();

    });

  }
}
