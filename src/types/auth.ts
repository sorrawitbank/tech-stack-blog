export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterData extends LoginData {
  name: string;
  username: string;
}
