import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import AuthorCard from "./components/AuthorCard";
import CategoryTag from "@/components/common/CategoryTag";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { usePostContext } from "@/contexts/PostContext";
import { cn } from "@/lib/utils";

function ArticleSection() {
  const { post } = usePostContext();
  const { isLarge, isXLarge } = useMediaQueryContext();

  return (
    <section
      id="article-section"
      aria-labelledby="article-label"
      className="flex flex-col gap-6 px-4 pt-6 pb-10 sm:px-12 sm:pt-8 lg:p-0"
    >
      <div className="flex flex-col gap-4">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {post!.categories.map((category) => (
            <CategoryTag key={category}>{category}</CategoryTag>
          ))}
          <span className="style-body-1 text-brown-400">
            {format(post!.createdAt, "dd MMMM yyyy")}
          </span>
        </ul>
        <h2
          id="article-label"
          className={cn(
            "text-brown-600",
            isXLarge ? "style-headline-2" : "style-headline-3"
          )}
        >
          {post!.title}
        </h2>
      </div>
      <div className="markdown text-brown-500">
        <ReactMarkdown>{post!.description}</ReactMarkdown>
        <ReactMarkdown>{post!.content}</ReactMarkdown>
      </div>
      {!isLarge && <AuthorCard />}
    </section>
  );
}

export default ArticleSection;
