import { useMediaQueryContext } from "@/contexts/MediaQueryContext";

function ArticleHeader() {
  const { isSmall, isXLarge } = useMediaQueryContext();

  return (
    <header className="flex items-center gap-4 px-4 py-3 bg-brown-100 shadow-[0px_2px_12px_0px_rgb(0_0_0_/0.1)] sm:px-6">
      <span className="flex-5 style-body-1 text-brown-400">Article title</span>
      {isXLarge && (
        <span className="flex-3 style-body-1 text-brown-400">Category</span>
      )}
      {isSmall && (
        <span className="w-30 style-body-1 text-brown-400">Status</span>
      )}
      <div className="w-17" />
    </header>
  );
}

export default ArticleHeader;
