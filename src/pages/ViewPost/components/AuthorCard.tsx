import ReactMarkdown from "react-markdown";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function AuthorCard({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-5 p-6 bg-brown-200 rounded-2xl",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="size-11">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/198432307"
            alt="Author"
            className="text-brown-500 object-cover"
          />
          <AvatarFallback className="bg-brown-300">
            <User className="size-3/5 text-brown-400" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-body-3 text-brown-400">Author</span>
          <span className="text-headline-4 text-brown-500">Sorrawit A.</span>
        </div>
      </div>
      <Separator className="bg-brown-300" />
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
