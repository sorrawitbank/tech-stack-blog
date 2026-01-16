export interface Post {
  readonly id: number;
  imgSrc: string;
  imgAlt: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  likes: number;
  content: string;
}

export interface ApiPost {
  readonly id: number;
  image: string;
  imageAlt?: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  content: string;
}

export interface PostsResponse {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  posts: ApiPost[];
}
