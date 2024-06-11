
export interface UserSimpleDTO {
  id: string;
  email: string;
  name: string;
  surname: string;
}
export interface LoginCredentials {
  login: string,
  password: string
}

export interface AccessTokenResponse {
  accessToken: string,
  refreshToken: string
}

export enum UserType {
  ADMIN = "ADMIN", SUPER_ADMIN = "SUPER_ADMIN", STANDARD_USER = "STANDARD_USER"
}

export interface Principal {
  id: string,
  role: UserType,
  email: string
}
