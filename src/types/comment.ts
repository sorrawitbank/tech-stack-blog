import type { User, UserApi } from "./user";

export interface Comment {
  readonly id: number;
  user: User;
  commentText: string;
  createdAt: Date;
}

export interface CommentApi {
  readonly id: number;
  user: UserApi;
  commentText: string;
  createdAt: string;
}
