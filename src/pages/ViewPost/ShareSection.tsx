import { useContext } from "react";
import { Copy, Facebook, Linkedin, Smile, Twitter } from "lucide-react";
import CreateAccountDialog from "./components/CreateAccountDialog";
import { ActionButton } from "@/components/common/Button";
import { PostContext } from "@/contexts/PostContext";
import sonner from "@/utils/sonner";

const handleCopyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  sonner({
    variant: "success",
    message: "Copied!",
    description: "This article has been copied to your clipboard",
  });
};

function ShareSection() {
  const { post } = useContext(PostContext);
  if (post === null) return;

  return (
    <section
      id="share-section"
      aria-label="Share"
      className="flex flex-col gap-6 p-4 bg-brown-200 sm:px-12 lg:rounded-2xl xl:flex-row xl:justify-between"
    >
      <CreateAccountDialog>
        <ActionButton variant="secondary">
          <Smile />
          {post.likes}
        </ActionButton>
      </CreateAccountDialog>
      <div className="flex gap-2 sm:justify-between lg:flex-row lg:justify-between xl:justify-start xl:gap-3">
        <ActionButton
          variant="secondary"
          onClick={handleCopyLink}
          className="px-7 sm:px-10"
        >
          <Copy />
          Copy link
        </ActionButton>
        <ul className="flex gap-2 sm:gap-3 md:justify-around lg:justify-start">
          <li className="p-2.5 text-white bg-brown-600 rounded-full cursor-pointer hover:bg-brown-400 active:bg-brown-500">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="size-7" />
            </a>
          </li>
          <li className="p-2.5 text-white bg-brown-600 rounded-full cursor-pointer hover:bg-brown-400 active:bg-brown-500">
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-7" />
            </a>
          </li>
          <li className="p-2.5 text-white bg-brown-600 rounded-full cursor-pointer hover:bg-brown-400 active:bg-brown-500">
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="size-7" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ShareSection;
