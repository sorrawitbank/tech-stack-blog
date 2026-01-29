import type { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CategoryTag from "@/components/common/CategoryTag";
import { Separator } from "@/components/ui/separator";

function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <article className="flex flex-col gap-4 lg:gap-6">
      <img
        src={post.imgSrc}
        alt={post.imgAlt}
        onClick={handleNavigate}
        className="aspect-343/212 text-brown-500 object-cover rounded-2xl hover:cursor-pointer hover:shadow-[0px_0px_12px_4px_rgb(0_0_0_/0.2)] md:aspect-59/36"
      />
      <div className="flex flex-col gap-2 lg:gap-3">
        <CategoryTag>{post.category}</CategoryTag>
        <div className="flex flex-col gap-2">
          <h4
            onClick={handleNavigate}
            className="text-headline-4 text-brown-600 hover:text-brown-500 hover:underline hover:underline-offset-2 hover:cursor-pointer active:text-brown-600"
          >
            {post.title}
          </h4>
          <p className="text-body-2 text-brown-400 line-clamp-2">
            {post.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/198432307"
            alt="Author"
            className="size-6 text-brown-500 object-cover rounded-full"
          />
          <span className="text-body-2 text-brown-500">{post.author}</span>
        </div>
        <Separator orientation="vertical" className="h-4.5! bg-brown-300" />
        <span className="text-body-2 text-brown-400">
          {format(post.date, "dd MMMM yyyy")}
        </span>
      </div>
    </article>
  );
}

export default PostCard;
