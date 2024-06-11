import {UserSimpleDTO} from "./User";

export interface Property{
  id: string;
  address: string;
  city: City;
  squareMeters: number;
  numberOfFloors: number;
  latitude: number;
  longitude: number;
  propertyStatus: PropertyStatus;
  owner: UserSimpleDTO | null;
  rejection: string | null;
}

export interface CreatePropertyDTO{
  address: string;
  cityID: string;
  squareMeters: number;
  numberOfFloors: number;
  latitude: number;
  longitude: number;
}

export enum PropertyStatus{
  APPROVED = "Approved", REJECTED = "Rejected", PENDING_APPROVAL = "Pending"
}
export interface City{
  id: string;
  name: string;
  country: Country;
}

export interface Country{
  id: string;
  name: string;
}
