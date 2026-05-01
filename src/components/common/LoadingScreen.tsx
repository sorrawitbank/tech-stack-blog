import { Spinner } from "../ui/spinner";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";

function LoadingScreen() {
  const { isMedium } = useMediaQueryContext();

  return (
    <main className="flex flex-col justify-center items-center gap-3 h-dvh w-vw text-brown-500 bg-brown-200">
      <Spinner className="size-12 md:size-16" />
      <h3 className={isMedium ? "style-headline-3" : "style-headline-4"}>
        Loading...
      </h3>
    </main>
  );
}

export default LoadingScreen;
