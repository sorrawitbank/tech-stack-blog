import type { PostApi, PostsParams, PostsResponse } from "@/types/post";
import axios from "axios";
import DEFAULT_CATEGORY_NAME from "@/constants/category";

interface FetchPostsParams extends PostsParams {
  controller?: AbortController;
}

const POSTS_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/posts`;

export async function fetchPosts(params: FetchPostsParams) {
  const response = await axios.get<PostsResponse>(POSTS_BASE_URL, {
    params: {
      page: params.page === 1 ? null : params.page,
      limit: params.limit === 6 ? null : params.limit,
      category:
        params.category === DEFAULT_CATEGORY_NAME ? null : params.category,
      keyword: params.keyword ? params.keyword : null,
    },
    signal: params.controller?.signal,
  });

  return response.data;
}

export async function fetchPostById(params: {
  postId: number;
  controller?: AbortController;
}) {
  const response = await axios.get<PostApi>(
    `${POSTS_BASE_URL}/${params.postId}`,
    {
      signal: params.controller?.signal,
    }
  );

  return response.data;
}

export async function fetchPostLike(params: {
  postId: number;
  controller?: AbortController;
}) {
  const response = await axios.get<Boolean>(
    `${POSTS_BASE_URL}/${params.postId}/like`,
    { signal: params.controller?.signal }
  );

  return response.data;
}

export async function likePost(postId: number) {
  await axios.put(`${POSTS_BASE_URL}/${postId}/like`);
}

export async function unlikePost(postId: number) {
  await axios.delete(`${POSTS_BASE_URL}/${postId}/unlike`);
}
