import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSearchPosts from "@/hooks/useSearchPosts";

function SearchBox() {
  const {
    value,
    posts,
    isOpen,
    handleChange,
    handleFocus,
    handleBlur,
    handleNavigate,
  } = useSearchPosts();

  return (
    <div className="relative lg:w-[31.25%]">
      <Popover modal={false} open={isOpen && posts.length !== 0}>
        <PopoverTrigger asChild>
          <Input
            id="search-posts"
            type="search"
            value={value}
            placeholder="Search"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="h-12 text-body-1 bg-white placeholder:text-brown-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="flex flex-col z-40 w-(--radix-popover-trigger-width) p-2 data-[side=bottom]:mt-1 data-[side=top]:flex-col-reverse data-[side=top]:mb-1"
        >
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handleNavigate(post.id)}
              className="p-2 rounded-sm cursor-pointer hover:bg-brown-200"
            >
              <span className="text-body-1 text-brown-600 line-clamp-2">
                {post.title}
              </span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-brown-600 pointer-events-none" />
    </div>
  );
}

export default SearchBox;
