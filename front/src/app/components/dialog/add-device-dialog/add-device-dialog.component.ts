import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  CreateDeviceDTO,
  CreateSolarPanelSystemDTO,
  DeviceType,
  DeviceTypeLabels,
  PowerType,
  PowerTypeLabels,
  SolarPanel, SolarPanelDTO
} from "../../../model/Device";
import {DeviceService} from "../../../services/device.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-add-device-dialog',
  templateUrl: './add-device-dialog.component.html',
  styleUrls: ['./add-device-dialog.component.css']
})
export class AddDeviceDialogComponent implements OnInit {
  protected readonly DeviceType = DeviceType;
  deviceTypes = Object.values(DeviceType);
  PowerTypes = Object.values(PowerType);

  form: FormGroup;
  imgChangeEvt: any = undefined;
  croppedImage: any = undefined;
  inputs: Map<string, string[]> = new Map();
  previousSelection: string = "";

  panelInput: SolarPanelDTO = {surface: 0, efficiency: 0};
  panels: SolarPanelDTO[] = [];
  displayedColumns: string[] = ['surface', 'efficiency'];
  dataSource = new MatTableDataSource(this.panels);

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    public dialogRef: MatDialogRef<AddDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { propertyID: string }
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      powerType: new FormControl(null, [Validators.required]),
      energyConsumption: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')])
    })
  }

  ngOnInit(): void {
    this.inputs.set(DeviceType.AIR_CONDITIONER, ["minTemp", "maxTemp"]);
    this.inputs.set(DeviceType.HOME_BATTERY, ["size"]);
    this.inputs.set(DeviceType.ELECTRIC_VEHICLE_CHARGER, ["chargingPower", "numberOfInputs"]);

    this.form.get('type')?.valueChanges.subscribe(value => {
      this.updateFormControls(value);
    });
  }

  getDeviceTypeLabel(deviceType: string): string {
    return DeviceTypeLabels[deviceType];
  }

  getPowerTypeLabels(powerType: string): string {
    return PowerTypeLabels[powerType];
  }

  updateFormControls(selection: string) {
    this.panels = [];

    // Remove previous inputs from the form
    //
    if (this.inputs.has(this.previousSelection)) {
      for (let input of this.inputs.get(this.previousSelection)!) {
        this.form.removeControl(input);
      }
    }

    // Add new inputs to the form
    //
    if (this.inputs.has(selection)) {
      for (let input of this.inputs.get(selection)!) {
        this.form.addControl(input, this.fb.control(null, [Validators.required, Validators.pattern('^[0-9]+$')]));
      }
    }

    this.previousSelection = selection;
  }

  addPanel() {
    if (this.panelInput.surface > 0 && this.panelInput.efficiency > 0 && this.panelInput.efficiency < 100) {
      this.panels.push(this.panelInput);
      this.panelInput = {surface: 0, efficiency: 0};
      this.dataSource.data = this.panels;
    }
  }

  onFileChange(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length == 1) {
      this.imgChangeEvt = event;
    } else {
      this.imgChangeEvt = undefined;
      this.croppedImage = undefined;
    }

  }

  cropImg(e: ImageCroppedEvent) {
    this.croppedImage = e.blob;
  }

  getAdditionalProperties(deviceType: DeviceType): { [key: string]: string } {
    let additionalProperties: { [key: string]: string } = {};
    switch (deviceType) {
      case DeviceType.AMBIENT_CONDITIONS_SENSOR: {
        break;
      }
      case DeviceType.AIR_CONDITIONER: {
        additionalProperties['minTemp'] = this.form.get('minTemp')?.value;
        additionalProperties['maxTemp'] = this.form.get('maxTemp')?.value;
        break;
      }
      case DeviceType.WASHING_MACHINE: {
        additionalProperties['mode'] = this.form.get('mode')?.value;
        break;
      }
      case DeviceType.HOME_BATTERY: {
        additionalProperties['size'] = this.form.get('size')?.value;
        break;
      }
      case DeviceType.ELECTRIC_VEHICLE_CHARGER: {
        additionalProperties['chargingPower'] = this.form.get('chargingPower')?.value;
        additionalProperties['numberOfInputs'] = this.form.get('numberOfInputs')?.value;
        additionalProperties['chargingLimit'] = this.form.get('chargingLimit')?.value;
        break;
      }
    }

    return additionalProperties;
  }

  submit(): void {
    let deviceType: DeviceType = this.form.get('type')?.value;
    let additionalProperties = this.getAdditionalProperties(deviceType);
    const createDeviceDTO: CreateDeviceDTO = {
      name: this.form.get('name')?.value,
      type: deviceType,
      powerType: this.form.get('powerType')?.value,
      energyConsumption: this.form.get('energyConsumption')?.value,
      additionalProperties: additionalProperties
    };

    if (createDeviceDTO.type == DeviceType.SOLAR_PANEL_SYSTEM) {
      this.createSolarPanelSystem(createDeviceDTO);
    }
    else {
      const formData = new FormData();
      formData.append('img', this.croppedImage, 'propertyImg.png');
      formData.append('data', new Blob([JSON.stringify(createDeviceDTO)], {type: "application/json"}));
      this.deviceService.createDevice(formData, this.data.propertyID).subscribe({
        next: value => {
          this.dialogRef.close(true);
        },
        error: err => {
          window.alert("NEUSPESAN");
        }
      })
    }
  }

  createSolarPanelSystem(createDeviceDTO: CreateDeviceDTO) {
    const createSolarPanelSystemDTO: CreateSolarPanelSystemDTO = {
      ...createDeviceDTO,
      panels: this.panels
    }

    console.log(createSolarPanelSystemDTO)

    const formData = new FormData();
    formData.append('img', this.croppedImage, 'propertyImg.png');
    formData.append('data', new Blob([JSON.stringify(createSolarPanelSystemDTO)], {type: "application/json"}));
    this.deviceService.createSolarPanelSystem(formData, this.data.propertyID).subscribe({
      next: value => {
        this.dialogRef.close(true);
      },
      error: err => {
        window.alert("NEUSPESAN");
      }
    })
  }
}
