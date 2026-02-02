import { useContext } from "react";
import { TriangleAlert } from "lucide-react";
import ArticleSection from "./ArticleSection";
import CommentSection from "./CommentSection";
import ShareSection from "./ShareSection";
import AuthorCard from "./components/AuthorCard";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import FullHeightMain from "@/layouts/FullHeightMain";
import StandardMain from "@/layouts/StandardMain";
import { NavigationButton } from "@/components/common/Button";
import { MediaQueryContext } from "@/contexts/MediaQueryContext";
import { PostContext } from "@/contexts/PostContext";
import { ScrollContext } from "@/contexts/ScrollContext";
import { cn } from "@/lib/utils";

function Main() {
  const { isLarge } = useContext(MediaQueryContext);
  const { post, isLoading, error } = useContext(PostContext);
  const { scrollDirection } = useContext(ScrollContext);

  if (isLoading)
    return (
      <FullHeightMain>
        <LoadingIndicator />
      </FullHeightMain>
    );

  if (error || post === null)
    return (
      <FullHeightMain className="flex-col gap-4 lg:gap-6">
        <TriangleAlert className="size-12 min-h-12 text-brown-600" />
        <h3 className="text-headline-3 text-center text-brown-600">
          {error || "Failed to fetch post"}
        </h3>
        <NavigationButton variant="primary" navigateTo="/">
          Go to Home page
        </NavigationButton>
      </FullHeightMain>
    );

  return (
    <StandardMain className="lg:items-center lg:gap-12">
      <img
        src={post.imgSrc}
        alt={post.imgAlt}
        className="aspect-375/184 w-full max-w-7xl max-h-150 text-brown-500 object-cover lg:aspect-1200/587 lg:rounded-2xl"
      />
      <div className="flex justify-between gap-8 xl:gap-20 2xl:gap-32">
        <div className="flex flex-col lg:gap-12">
          <ArticleSection />
          <ShareSection />
          <CommentSection />
        </div>
        {isLarge && (
          <AuthorCard
            className={cn(
              "sticky flex-1 min-w-[305px] h-fit 2xl:min-w-100",
              "transition-discrete duration-300 ease-in-out",
              scrollDirection === "down" ? "top-8" : "top-28"
            )}
          />
        )}
      </div>
    </StandardMain>
  );
}

export default Main;
