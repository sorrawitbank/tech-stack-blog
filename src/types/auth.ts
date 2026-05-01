export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterBody extends LoginBody {
  name: string;
  username: string;
}

export interface ResetPasswordBody {
  oldPassword: string;
  newPassword: string;
}
