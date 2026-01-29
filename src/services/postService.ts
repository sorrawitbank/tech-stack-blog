import type { PostApi, PostsParams, PostsResponse } from "@/types/post";
import axios from "axios";

interface FetchPostsParams extends PostsParams {
  controller: AbortController;
}

const BASE_URL = "https://blog-post-project-api.vercel.app/posts";

export async function fetchPosts({
  page,
  limit,
  category,
  keyword,
  controller,
}: FetchPostsParams) {
  const response = await axios.get<PostsResponse>(BASE_URL, {
    params: {
      page: page === 1 ? null : page,
      limit: limit === 6 ? null : limit,
      category: category === "Highlight" ? null : category,
      keyword: keyword ? keyword : null,
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
