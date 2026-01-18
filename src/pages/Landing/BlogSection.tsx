import { useState } from "react";
import { Search } from "lucide-react";
import CategorySelector from "./components/CategorySelector";
import CategoryTab from "./components/CategoryTab";
import PostGrid from "./components/PostGrid";
import { Input } from "@/components/ui/input";

const categories: string[] = ["Highlight", "Cat", "General", "Inspiration"];

function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Highlight");

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
            <CategoryTab
              categories={categories}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />
          </div>
          <div className="relative lg:w-[31.25%]">
            <Input
              type="search"
              placeholder="Search"
              className="h-12 text-body-1 bg-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-brown-600 pointer-events-none" />
          </div>
          <div className="flex flex-col gap-1 lg:hidden">
            <span className="text-body-1">Category</span>
            <CategorySelector
              categories={categories}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>
      <PostGrid selectedCategory={selectedCategory} />
    </section>
  );
}

export default BlogSection;
