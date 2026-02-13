import type { Comment, CommentApi } from "@/types/comment";
import { parseISO } from "date-fns";

export function toComment(commentApi: CommentApi): Comment {
  return {
    id: commentApi.id,
    user: commentApi.user,
    commentText: commentApi.commentText,
    createdAt: parseISO(commentApi.createdAt),
  };
}

export function mapToComment(commentApis: CommentApi[]): Comment[] {
  return commentApis.map(toComment);
}
