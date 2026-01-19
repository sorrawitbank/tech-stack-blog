import ReactMarkdown from "react-markdown";
import AuthorCard from "./components/AuthorCard";
import CategoryTag from "@/components/common/CategoryTag";

const post = {
  id: 2,
  image:
    "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/gsutzgam24abrvgee9r4.jpg",
  category: "Cat",
  title: "The Secret Language of Cats: Decoding Feline Communication",
  description:
    "Unravel the mysteries of cat communication and learn how to better understand your feline friend's needs and desires.",
  author: "Thompson P.",
  date: "11 September 2024",
  likes: 123,
  content:
    "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let’s dive into the unique traits, behaviors, and quirks that make cats endlessly fascinating. \n\nI love cat.\n\n# Hello Cat. Here some good\n\n## 1. Vocal Communications\n\nExplore the various meows, purrs, and other vocalizations cats use to express themselves.\n\n## 2. Body Language\n\nLearn to read your cat's posture, tail position, and ear movements to understand their mood and intentions.\n\n## 3. Scent Marking\n\nDiscover why cats use scent to communicate and mark their territory.\n\n## 4. Facial Expressions\n\nUnderstand the subtle facial cues cats use to convey emotions and intentions.\n\n## 5. Interspecies Communication\n\nLearn how cats have adapted their communication methods to interact with humans and other animals.\n- List 404\n- Slow Blinks: Cats often use slow blinking as a way to express trust and affection. If your cat slow blinks at you, try returning the gesture to strengthen your bond.",
};

function ArticleSection() {
  return (
    <section
      id="article-section"
      aria-labelledby="article-label"
      className="flex flex-col gap-6 px-4 pt-6 pb-10 sm:px-12 sm:pt-8 md:p-0"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <CategoryTag>{post.category}</CategoryTag>
          <span className="text-body-1 text-brown-400">{post.date}</span>
        </div>
        <h2 id="article-label" className="text-headline-3 text-brown-600 xl:text-headline-2">
          {post.title}
        </h2>
      </div>
      <div className="markdown text-brown-500">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <div className="sm:px-16 md:hidden">
        <AuthorCard />
      </div>
    </section>
  );
}

export default ArticleSection;
