import type { Post } from "@/types/post";
import { Link } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";
import statuses from "@/constants/status";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { cn } from "@/lib/utils";

interface Props {
  post: Post;
  index: number;
  setDeleteTitle: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (postId: number) => Promise<void>;
}

function ArticleList(props: Props) {
  const { isSmall, isXLarge } = useMediaQueryContext();

  const categoriesText = props.post.categories.join(", ");

  return (
    <li
      className={cn(
        "flex items-center gap-4 px-4 py-5 sm:px-6",
        props.index % 2 === 1 && "bg-brown-200"
      )}
    >
      <span className="flex-5 style-body-1 text-brown-500 line-clamp-1">
        {props.post.title}
      </span>
      {isXLarge && (
        <span className="flex-3 style-body-1 text-brown-500 line-clamp-1">
          {categoriesText}
        </span>
      )}
      {isSmall && (
        <span
          className={cn(
            "w-30 style-body-1 text-brown-500 line-clamp-1",
            statuses.find((status) => status.name === props.post.status)?.style
          )}
        >
          • {props.post.status}
        </span>
      )}
      <div className="flex gap-5 w-17">
        <Link
          to={`/admin/article/edit/${props.post.id}`}
          className="text-brown-400 transition-colors duration-200 hover:text-brown-500 active:text-brown-600"
        >
          <Edit2 />
        </Link>
        <button
          onClick={() => {
            props.setDeleteTitle(props.post.title);
            props.handleDelete(props.post.id);
          }}
          className="text-brown-400 transition-colors duration-200 cursor-pointer hover:text-brown-500 active:text-brown-600"
        >
          <Trash2 />
        </button>
      </div>
    </li>
  );
}

export default ArticleList;
