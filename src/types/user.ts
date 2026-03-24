export type Role = "user" | "admin";

export interface User {
  readonly id: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  profilePic: string | undefined;
  role: Role;
}

export interface UserApi {
  readonly id: string;
  email: string;
  username: string;
  name: string;
  bio: string | null;
  profilePic: string | null;
  role: Role;
}
