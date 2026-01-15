import type { ApiPost, Post } from "@/types/post";
import { parseISO } from "date-fns";

export function toPost(apiPost: ApiPost): Post {
  return {
    id: apiPost.id,
    imgSrc: apiPost.image,
    imgAlt: apiPost.imageAlt ?? "",
    category: apiPost.category,
    title: apiPost.title,
    description: apiPost.description,
    author: apiPost.author,
    date: parseISO(apiPost.date),
    likes: apiPost.likes,
    content: apiPost.content,
  };
}

export function mapToPost(apiPosts: ApiPost[]): Post[] {
  return apiPosts.map(toPost);
}
