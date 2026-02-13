import type { Post, PostApi } from "@/types/post";
import { parseISO } from "date-fns";
import { mapToComment } from "./comment";

export function toPost(postApi: PostApi): Post {
  return {
    id: postApi.id,
    author: postApi.author,
    image: postApi.image,
    imageAlt: postApi.imageAlt ?? "",
    categories: postApi.categories,
    title: postApi.title,
    description: postApi.description,
    content: postApi.content,
    status: postApi.status,
    createdAt: parseISO(postApi.createdAt),
    likes: postApi.likes ?? 0,
    comments: postApi.comments ? mapToComment(postApi.comments) : [],
  };
}

export function mapToPost(postApis: PostApi[]): Post[] {
  return postApis.map(toPost);
}
