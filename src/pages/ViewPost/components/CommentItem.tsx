import type { Comment } from "@/types/comment";
import { format } from "date-fns";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Props {
  comment: Comment;
  hasSeparator: boolean;
}

function CommentItem(props: Props) {
  return (
    <>
      <article className="flex flex-col gap-4 lg:gap-6">
        <div className="flex items-center gap-3">
          <Avatar className="size-11">
            <AvatarImage
              src={props.comment.user.profilePic}
              alt={props.comment.user.name}
              className="text-brown-500 object-cover"
            />
            <AvatarFallback className="bg-brown-300">
              <User className="size-3/5 text-brown-400" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-headline-4 text-brown-500">
              {props.comment.user.name}
            </span>
            <span className="text-body-3 text-brown-400">
              {format(props.comment.createdAt, "dd MMMM yyyy 'at' kk:mm")}
            </span>
          </div>
        </div>
        <p className="text-body-1 text-brown-400">
          {props.comment.commentText}
        </p>
      </article>
      {props.hasSeparator && <Separator className="bg-brown-300" />}
    </>
  );
}

export default CommentItem;
