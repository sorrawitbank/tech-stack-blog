import ReactMarkdown from "react-markdown";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { cn } from "@/lib/utils";

function HeroSection() {
  const { admin, isGetAdminLoading } = useAuthContext();
  const { isXLarge } = useMediaQueryContext();

  return (
    <section
      id="hero-section"
      aria-labelledby="hero-label"
      className="flex flex-col items-center gap-10 px-4 py-10 sm:px-12 md:px-20 lg:flex-row lg:gap-15 lg:p-0 2xl:px-12"
    >
      <div className="flex flex-col gap-4 text-center lg:flex-1 lg:text-right">
        <h1
          id="hero-label"
          className={cn(
            "text-brown-600",
            isXLarge ? "style-headline-1" : "style-headline-2"
          )}
        >
          Stay Informed,{isXLarge ? <br /> : " "}Stay Inspired
        </h1>
        <p className="style-body-1 text-brown-400">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>
      {isGetAdminLoading ? (
        <Skeleton className="w-full max-w-[500px] h-[470px] rounded-2xl lg:w-[calc(100%*386/1200)] lg:h-[400px] xl:h-[529px]" />
      ) : admin && admin.profilePic ? (
        <img
          src={admin.profilePic}
          alt="Author"
          className="w-full max-w-[500px] h-[470px] text-brown-500 object-cover rounded-2xl lg:w-[calc(100%*386/1200)] lg:h-[400px] xl:h-[529px]"
        />
      ) : (
        <div className="flex justify-center items-center w-full max-w-[500px] h-[470px] bg-brown-200 rounded-2xl lg:w-[calc(100%*386/1200)] lg:h-[400px] xl:h-[529px]">
          <User className="size-40 text-brown-400" />
        </div>
      )}
      <div className="flex flex-col gap-3 w-full lg:flex-1">
        <div className="flex flex-col gap-1">
          <span className="style-body-3 text-brown-400">- Author</span>
          {isGetAdminLoading ? (
            <Skeleton className="h-8 w-1/2" />
          ) : (
            <h3 className="style-headline-3 text-brown-500">{admin?.name}</h3>
          )}
        </div>
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
      </div>
    </section>
  );
}

export default HeroSection;
