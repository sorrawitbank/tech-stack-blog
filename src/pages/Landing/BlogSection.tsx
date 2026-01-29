import CategorySelector from "./components/CategorySelector";
import CategoryTab from "./components/CategoryTab";
import PostGrid from "./components/PostGrid";
import SearchBox from "./components/SearchBox";

function BlogSection() {
  return (
    <section
      id="blog-section"
      aria-labelledby="blog-label"
      className="flex flex-col lg:gap-12"
    >
      <div className="lg:flex lg:flex-col lg:gap-8">
        <h3
          id="blog-label"
          className="p-4 text-headline-3 text-brown-600 sm:px-12 lg:p-0"
        >
          Latest articles
        </h3>
        <div className="flex flex-col gap-4 p-4 bg-brown-200 sm:px-12 lg:flex-row lg:justify-between lg:items-center lg:px-6 lg:py-3.25 lg:rounded-2xl">
          <CategoryTab className="hidden lg:block" />
          <SearchBox />
          <CategorySelector className="lg:hidden" />
        </div>
      </div>
      <div className="relative flex flex-col items-center gap-12 px-4 pt-6 pb-13 sm:px-12 sm:pt-12 lg:gap-20 lg:p-0">
        <PostGrid />
      </div>
    </section>
  );
}

export default BlogSection;
