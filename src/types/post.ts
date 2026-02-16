import type { Comment, CommentApi } from "./comment";
import type { User, UserApi } from "./user";

export interface Post {
  readonly id: number;
  author: User;
  image: string;
  imageAlt: string;
  categories: string[];
  title: string;
  description: string;
  content: string;
  status: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
}

export interface PostApi {
  readonly id: number;
  author: UserApi;
  image: string;
  imageAlt?: string;
  categories: string[];
  title: string;
  description: string;
  content: string;
  status: string;
  createdAt: string;
  likes?: number;
  comments?: CommentApi[];
}

export interface PostsParams {
  page: number;
  limit: number;
  category: string;
  keyword: string;
}

export interface PostsResponse {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  posts: PostApi[];
}
