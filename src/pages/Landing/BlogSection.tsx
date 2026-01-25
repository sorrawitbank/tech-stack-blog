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
        <div className="flex flex-col gap-4 p-4 text-brown-400 bg-brown-200 sm:px-12 lg:flex-row lg:justify-between lg:items-center lg:gap-0 lg:px-6 lg:rounded-2xl">
          <div className="hidden lg:block">
            <CategoryTab />
          </div>
          <SearchBox />
          <div className="flex flex-col gap-1 lg:hidden">
            <span className="text-body-1">Category</span>
            <CategorySelector />
          </div>
        </div>
      </div>
      <PostGrid />
    </section>
  );
}

export default BlogSection;
