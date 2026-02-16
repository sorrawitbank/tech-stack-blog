import type { PostApi, PostsParams, PostsResponse } from "@/types/post";
import axios from "axios";

interface FetchPostsParams extends PostsParams {
  controller: AbortController;
}

const POSTS_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/posts`;

export async function fetchPosts(params: FetchPostsParams) {
  const response = await axios.get<PostsResponse>(POSTS_BASE_URL, {
    params: {
      page: params.page === 1 ? null : params.page,
      limit: params.limit === 6 ? null : params.limit,
      category: params.category === "Highlight" ? null : params.category,
      keyword: params.keyword ? params.keyword : null,
    },
    signal: params.controller.signal,
  });

  return response.data;
}

export async function fetchPostById(
  postId: number,
  controller: AbortController
) {
  const response = await axios.get<PostApi>(`${POSTS_BASE_URL}/${postId}`, {
    signal: controller.signal,
  });

  return response.data;
}
