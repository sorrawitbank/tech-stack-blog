import type { User, UserApi } from "@/types/user";

export function toUser(userApi: UserApi): User {
  return {
    id: userApi.id,
    email: userApi.email,
    username: userApi.username,
    name: userApi.name,
    profilePic: userApi.profilePic ?? "",
    role: userApi.role,
  };
}
