import type { MemberPage } from "@/layouts/MemberLayout";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { cn } from "@/lib/utils";

function ProfileSection({ page }: { page: MemberPage }) {
  const { user } = useAuthContext();
  const { isLarge } = useMediaQueryContext();

  return (
    <section
      aria-label="Profile"
      className="flex items-center gap-3 px-4 py-6 lg:p-0"
    >
      <Avatar className="size-10 lg:size-15">
        <AvatarImage
          src={user!.profilePic}
          alt={user!.name}
          className="text-brown-500 object-cover"
        />
        <AvatarFallback className="bg-brown-400">
          <User className="size-3/5 text-white" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-4">
        <h3
          className={cn(
            "flex-1 text-brown-400 line-clamp-1",
            isLarge ? "style-headline-3" : "style-headline-4"
          )}
        >
          {user!.name}
        </h3>
        <Separator orientation="vertical" className="h-7! bg-brown-300" />
        <h3
          className={cn(
            "text-brown-600",
            isLarge ? "style-headline-3" : "style-headline-4"
          )}
        >
          {page === "profile" ? "Profile" : "Reset password"}
        </h3>
      </div>
    </section>
  );
}

export default ProfileSection;
