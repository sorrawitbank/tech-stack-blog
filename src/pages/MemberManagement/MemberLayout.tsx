import { Link } from "react-router-dom";
import { RotateCw, User } from "lucide-react";
import ProfileSection from "./ProfileSection";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import Header from "@/layouts/Header";
import { cn } from "@/lib/utils";

export type MemberPage = "profile" | "reset-password";

interface Props {
  page: MemberPage;
  children?: React.ReactNode;
}

function MemberLayout(props: Props) {
  const { isMedium } = useMediaQueryContext();

  return (
    <>
      <Header />
      <div className="md:flex md:justify-center">
        <div className="max-w-211 pt-12 sm:pt-20 md:flex md:flex-col md:min-w-186 lg:gap-7.5 lg:w-[calc(100%*397/720)] lg:pt-30 xl:pt-35">
          {isMedium && <ProfileSection page={props.page} />}
          <div className="md:flex md:gap-12">
            <aside className="md:w-49">
              <nav>
                <ul className="flex md:flex-col">
                  <li className="cursor-pointer">
                    <Link
                      to="/profile"
                      className={cn(
                        "flex gap-3 px-4 py-3",
                        props.page === "profile"
                          ? "text-brown-500"
                          : "text-brown-400"
                      )}
                    >
                      <User />
                      <span className="text-body-1">Profile</span>
                    </Link>
                  </li>
                  <li className="cursor-pointer">
                    <Link
                      to="/reset-password"
                      className={cn(
                        "flex items-center gap-3 px-4 py-3",
                        props.page === "reset-password"
                          ? "text-brown-500"
                          : "text-brown-400"
                      )}
                    >
                      <RotateCw className="size-5.5 rotate-135" />
                      <span className="text-body-1">Reset password</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
            {!isMedium && <ProfileSection page={props.page} />}
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberLayout;
