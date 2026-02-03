import type { MemberPage } from "./MemberLayout";
import { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import { MediaQueryContext } from "@/contexts/MediaQueryContext";

function ProfileSection({ page }: { page: MemberPage }) {
  const { isLarge } = useContext(MediaQueryContext);
  return (
    <section
      aria-label="Profile"
      className="flex items-center gap-3 px-4 py-6 lg:p-0"
    >
      {/* //TODO: change it so that it can get user from database */}
      <img
        src="https://static.bangkokpost.com/media/content/20240913/c1_2865088.jpg"
        alt="Moodeng ja"
        className="size-10 text-brown-500 object-cover rounded-full lg:size-15"
      />
      <div className="flex items-center gap-4">
        <h3
          className={
            "flex-1 " +
            (isLarge ? "text-headline-3" : "text-headline-4") +
            " text-brown-400 line-clamp-1"
          }
        >
          Moodeng ja
        </h3>
        <Separator orientation="vertical" className="h-7! bg-brown-300" />
        <h3
          className={
            (isLarge ? "text-headline-3" : "text-headline-4") +
            " text-brown-600"
          }
        >
          {page === "profile" ? "Profile" : "Reset password"}
        </h3>
      </div>
    </section>
  );
}

export default ProfileSection;
