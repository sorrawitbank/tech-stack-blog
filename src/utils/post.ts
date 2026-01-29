import type { Post, PostApi } from "@/types/post";
import { parseISO } from "date-fns";

export function toPost(postApi: PostApi): Post {
  return {
    id: postApi.id,
    imgSrc: postApi.image,
    imgAlt: postApi.imageAlt ?? "",
    category: postApi.category,
    title: postApi.title,
    description: postApi.description,
    author: postApi.author,
    date: parseISO(postApi.date),
    likes: postApi.likes,
    content: postApi.content,
  };
}

export function mapToPost(postApis: PostApi[]): Post[] {
  return postApis.map(toPost);
}
