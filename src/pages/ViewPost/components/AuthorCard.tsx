import ReactMarkdown from "react-markdown";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

function AuthorCard({ className }: { className?: string }) {
  const { admin, isGetAdminLoading } = useAuthContext();

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
            src={admin?.profilePic}
            alt="Author"
            className="text-brown-500 object-cover"
          />
          <AvatarFallback className="bg-brown-300">
            <User className="size-3/5 text-brown-400" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="style-body-3 text-brown-400">Author</span>
          {isGetAdminLoading ? (
            <Skeleton className="h-7 w-40" />
          ) : (
            <h4 className="style-headline-4 text-brown-500">{admin?.name}</h4>
          )}
        </div>
      </div>
      <Separator className="bg-brown-300" />
      {isGetAdminLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <div className="markdown text-brown-400">
          <ReactMarkdown>{admin?.bio}</ReactMarkdown>
        </div>
      )}
    </article>
  );
}

export default AuthorCard;
