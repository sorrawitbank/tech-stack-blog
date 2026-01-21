import type { Comment } from "@/data/comment";
import { format } from "date-fns";
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
          <img
            src={props.comment.image}
            alt={props.comment.name}
            className="size-11 text-brown-500 object-cover rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-headline-4 text-brown-500">
              {props.comment.name}
            </span>
            <span className="text-body-3 text-brown-400">
              {format(props.comment.date, "dd MMMM yyyy 'at' kk:mm")}
            </span>
          </div>
        </div>
        <p className="text-body-1 text-brown-400">{props.comment.comment}</p>
      </article>
      {props.hasSeparator && <Separator className="bg-brown-300" />}
    </>
  );
}

export default CommentItem;
