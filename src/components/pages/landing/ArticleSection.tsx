import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CategorySelector from "./components/CategorySelector";
import CategoryTab from "./components/CategoryTab";

const categories: string[] = [
  "Highlight",
  "Software Dev",
  "Data Sci",
  "General",
];

function ArticleSection() {
  return (
    <section id="articles-section" aria-labelledby="articles-title">
      <h3 id="articles-title" className="p-4 sm:px-12 text-headline-3">
        Latest articles
      </h3>
      <div className="flex flex-col gap-4 p-4 text-brown-400 bg-brown-200 sm:px-12 lg:flex-row lg:justify-between lg:items-center lg:gap-0 lg:px-6 lg:rounded-2xl">
        <div className="hidden lg:block">
          <CategoryTab categories={categories} />
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
          <p className="text-body-1">Category</p>
          <CategorySelector categories={categories} />
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
