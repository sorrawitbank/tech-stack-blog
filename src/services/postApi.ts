import type { PostApi, PostsParams, PostsResponse } from "@/types/post";
import axios from "axios";

const BASE_URL = "https://blog-post-project-api.vercel.app/posts";

export async function fetchPosts(
  params: PostsParams,
  controller: AbortController
) {
  const response = await axios.get<PostsResponse>(BASE_URL, {
    params: {
      page: params.page === 1 ? null : params.page,
      limit: params.limit === 6 ? null : params.limit,
      category: params.category === "Highlight" ? null : params.category,
      keyword: params.keyword ? params.keyword : null,
    },
    signal: controller.signal,
  });

  return response.data;
}

export async function fetchPostById(
  postId: number,
  controller: AbortController
) {
  const response = await axios.get<PostApi>(`${BASE_URL}/${postId}`, {
    signal: controller.signal,
  });

  return response.data;
}
