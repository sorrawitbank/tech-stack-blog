export type Role = "user" | "admin";

export interface User {
  readonly id: string;
  email: string;
  username: string;
  name: string;
  profilePic: string;
  role: Role;
}

export interface UserApi {
  readonly id: string;
  email: string;
  username: string;
  name: string;
  profilePic?: string;
  role: Role;
}
