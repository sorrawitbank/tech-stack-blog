import type { PostApi, PostsParams, PostsResponse } from "@/types/post";
import axios from "axios";

const BASE_URL = "https://blog-post-project-api.vercel.app/posts/";

export async function fetchPosts(params: PostsParams) {
  const response = await axios.get<PostsResponse>(BASE_URL, {
    params: {
      page: params.page,
      limit: params.limit,
      category: params.category,
      keyword: params.keyword,
    },
  });

  return response.data;
}

export async function fetchPostById(postId: number) {
  const response = await axios.get<PostApi>(`${BASE_URL}${postId}`);

  return response.data;
}
