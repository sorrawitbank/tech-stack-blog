import { blogPosts } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

function BlogGrid() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-5 2xl:grid-cols-3">
      {blogPosts.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogGrid;
