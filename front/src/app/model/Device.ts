export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  powerType: PowerType;
  energyConsumption: number;
  status: DeviceStatus;
}

export interface Lamp extends Device{
  shining: boolean;
  automaticMode: boolean;
}

export interface Battery extends Device{
  size: number;
}

export interface VehicleGate extends Device{
  open: boolean;
  publicMode: boolean;
  whitelist: string[];
}

export interface SprinklerRule{
  id: string;
  daysOfTheWeek: number[];
  fromMinute: number;
  toMinute: number;
}
export interface SprinklerSystem extends Device{
  turnedOn: boolean;
  rules: SprinklerRule[];
}

export interface SolarPanelDTO {
  surface: number;
  efficiency: number;
}

export interface SolarPanel {
  id: string;
  surface: number;
  efficiency: number;
}

export interface SolarPanelSystem extends Device {
  solarPanels: SolarPanel[]
  active: boolean
}

export interface CreateDeviceDTO{
  name: string;
  type: DeviceType;
  powerType: PowerType;
  energyConsumption: number;
  additionalProperties: { [key: string]: string };
}

export interface CreateSolarPanelSystemDTO extends CreateDeviceDTO{
  panels: SolarPanelDTO[];
}

export interface Measurement{
  measurement: number;
  timestamp: number[]; // year, month, day, hour, minute, second
}
export interface VehicleGateEvent{
  timestamp: string;
  event: string;
  automatic: boolean;
  plateNumber: string | null;
  inside: string | null;
  agent: string | null;
}

export interface SprinklerEvent {
  timestamp: string;
  turnedOn: boolean;
  agent: string;
}

export interface DeviceAvailability{
  toMoment: string,
  availability: number
}
export enum WashingMachineMode {
  SLOW = "Slow",
  Fast = "Fast",
}

export enum DeviceType{
  AMBIENT_CONDITIONS_SENSOR = "AMBIENT_CONDITIONS_SENSOR",
  AIR_CONDITIONER = "AIR_CONDITIONER",
  WASHING_MACHINE = "WASHING_MACHINE",
  LAMP = "LAMP",
  VEHICLE_GATE = "VEHICLE_GATE",
  SPRINKLER_SYSTEM = "SPRINKLER_SYSTEM",
  SOLAR_PANEL_SYSTEM = "SOLAR_PANEL_SYSTEM",
  HOME_BATTERY = "HOME_BATTERY",
  ELECTRIC_VEHICLE_CHARGER = "ELECTRIC_VEHICLE_CHARGER"
}

export const DeviceTypeLabels: { [key: string]: string } = {
  AMBIENT_CONDITIONS_SENSOR: "Ambient Conditions Sensor",
  AIR_CONDITIONER: "Air Conditioner",
  WASHING_MACHINE: "Washing Machine",
  LAMP: "Lamp",
  VEHICLE_GATE: "Vehicle Gate",
  SPRINKLER_SYSTEM: "Sprinkler System",
  SOLAR_PANEL_SYSTEM: "Solar Panel System",
  HOME_BATTERY: "Home Battery",
  ELECTRIC_VEHICLE_CHARGER: "Electric Vehicle Charger",
};


export enum DeviceStatus{
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE"
}

export const DeviceStatusLabels: { [key: string]: string } = {
  ONLINE: "Online",
  OFFLINE: "Offline"
};

export enum PowerType {
  BATTERY = "BATTERY",
  ELECTRIC = "ELECTRIC"
}

export const PowerTypeLabels: { [key: string]: string } = {
  BATTERY: "Battery",
  ELECTRIC: "Electric"
};
