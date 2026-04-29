import type { CategoryBody } from "@/types/category";
import type { PostsResponse, PostsParams, PostApi } from "@/types/post";
import axios from "axios";
import DEFAULT_CATEGORY_NAME from "@/constants/category";

interface FetchPostsParams extends PostsParams {
  controller?: AbortController;
}

const ADMIN_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/admin`;

export async function fetchAdminPosts(params: FetchPostsParams) {
  const response = await axios.get<PostsResponse>(`${ADMIN_BASE_URL}/posts`, {
    params: {
      page: params.page === 1 ? null : params.page,
      limit: params.limit === 6 ? null : params.limit,
      category:
        params.category === DEFAULT_CATEGORY_NAME ? null : params.category,
      keyword: params.keyword ? params.keyword : null,
      statusId: params.statusId === 0 ? null : params.statusId,
    },
    signal: params.controller?.signal,
  });

  return response.data;
}

export async function fetchAdminPostById(params: {
  postId: number;
  controller?: AbortController;
}) {
  const response = await axios.get<PostApi>(
    `${ADMIN_BASE_URL}/posts/${params.postId}`,
    { signal: params.controller?.signal }
  );

  return response.data;
}

export async function createCategory(body: CategoryBody) {
  await axios.post(`${ADMIN_BASE_URL}/categories`, body);
}

export async function createPost(formData: FormData) {
  await axios.post(`${ADMIN_BASE_URL}/posts`, formData);
}

export async function updateAdminProfile(formData: FormData) {
  await axios.put(`${ADMIN_BASE_URL}/profile`, formData);
}

export async function updateCategory(categoryId: number, body: CategoryBody) {
  await axios.put(`${ADMIN_BASE_URL}/categories/${categoryId}`, body);
}

export async function updatePost(postId: number, formData: FormData) {
  await axios.put(`${ADMIN_BASE_URL}/posts/${postId}`, formData);
}

export async function deleteCategory(categoryId: number) {
  await axios.delete(`${ADMIN_BASE_URL}/categories/${categoryId}`);
}

export async function deletePost(postId: number) {
  await axios.delete(`${ADMIN_BASE_URL}/posts/${postId}`);
}
