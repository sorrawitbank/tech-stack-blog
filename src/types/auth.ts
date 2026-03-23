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

export interface ResetPassword {
  oldPassword: string;
  newPassword: string;
}
