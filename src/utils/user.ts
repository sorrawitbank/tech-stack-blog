import type { Admin, AdminApi, User, UserApi } from "@/types/user";

export function toUser(userApi: UserApi): User {
  return {
    id: userApi.id,
    email: userApi.email,
    username: userApi.username,
    name: userApi.name,
    bio: userApi.bio ?? "",
    profilePic: userApi.profilePic ?? undefined,
    role: userApi.role,
  };
}

export function toAdmin(userApi: AdminApi): Admin {
  return {
    name: userApi.name || "Author name",
    bio: userApi.bio || "No bio yet",
    profilePic: userApi.profilePic ?? undefined,
  };
}
