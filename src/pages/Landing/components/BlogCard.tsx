import type { Blog } from "@/data/blogPosts";
import { format } from "date-fns";

function BlogCard(props: { blog: Blog }) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <img
        src={props.blog.imgSrc}
        alt={props.blog.imgAlt}
        className=" aspect-343/212 text-brown-500 object-cover rounded-2xl md:aspect-59/36"
      />
      <div className="flex flex-col gap-2 lg:gap-3">
        <ul className="flex gap-2 sm:gap-3 md:gap-2 lg:gap-3">
          {props.blog.categories.map((category) => (
            <li
              key={category}
              className="h-full px-3 py-1 text-body-2 text-brand-green bg-brand-green-soft rounded-full"
            >
              {category}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <h4 className="text-headline-4 text-brown-600">{props.blog.title}</h4>
          <p className="text-body-2 text-brown-400 line-clamp-2">
            {props.blog.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/198432307"
            alt="Author"
            className="size-6 rounded-full"
          />
          <span className="text-body-2 text-brown-500">
            {props.blog.author}
          </span>
        </div>
        <div className="h-4.5 border-l border-brown-300" />
        <span className="text-body-2 text-brown-400">
          {format(props.blog.date, "dd MMMM yyyy")}
        </span>
      </div>
    </div>
  );
}

export default BlogCard;
