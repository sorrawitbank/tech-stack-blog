import { comments } from "@/data/comment";
import CommentItem from "./CommentItem";

function CommentList() {
  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          hasSeparator={index !== comments.length - 1}
        />
      ))}
    </div>
  );
}

export default CommentList;
