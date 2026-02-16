import { MessageSquareMore } from "lucide-react";
import CommentItem from "./CommentItem";
import { usePostContext } from "@/contexts/PostContext";

function CommentList() {
  const { post } = usePostContext();

  if (post!.comments.length === 0)
    return (
      <div className="flex flex-col items-center gap-2">
        <MessageSquareMore className="size-10 text-brown-600" />
        <div className="flex flex-col gap-1">
          <h4 className="text-headline-4 text-center text-brown-600">
            No comments yet
          </h4>
          <p className="text-body-1 text-center text-brown-400">
            Be the first to comment!
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      {post!.comments.map((comment, index, array) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          hasSeparator={index !== array.length - 1}
        />
      ))}
    </div>
  );
}

export default CommentList;
