import ReactMarkdown from "react-markdown";

function AuthorCard() {
  return (
    <article className="flex flex-col gap-5 p-6 bg-brown-200 rounded-2xl">
      <div className="flex items-center gap-3">
        <img
          src="https://avatars.githubusercontent.com/u/198432307"
          alt="Author"
          className="size-11 text-brown-500 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-body-3 text-brown-400">Author</span>
          <span className="text-headline-4 text-brown-500">Sorrawit A.</span>
        </div>
      </div>
      <hr className="border-t border-brown-300" />
      <div className="markdown text-brown-400">
        <ReactMarkdown>
          {
            "I am passionate about data science and modern web development. I enjoy sharing practical insights, lessons learned, and experiences from building real-world projects across different technology stacks.\n\nWhen I’m not coding, I spend time exploring new tools, experimenting with ideas, and continuously learning to improve both my technical skills and problem-solving mindset."
          }
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default AuthorCard;
