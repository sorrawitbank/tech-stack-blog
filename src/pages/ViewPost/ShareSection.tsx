import { useContext } from "react";
import { Copy, Facebook, Linkedin, Smile, Twitter } from "lucide-react";
import { ActionButton } from "@/components/common/Button";
import { PostContext } from "@/contexts/postContext";

function ShareSection() {
  const { post } = useContext(PostContext);
  if (post === null) return;

  return (
    <section
      id="share-section"
      aria-label="Share"
      className="flex flex-col gap-6 p-4 bg-brown-200 sm:px-12 md:px-6 md:rounded-2xl xl:flex-row xl:justify-between"
    >
      <ActionButton variant="secondary">
        <Smile />
        {post.likes}
      </ActionButton>
      <div className="flex gap-2 sm:justify-between md:flex-col md:justify-start md:gap-6 lg:flex-row lg:justify-between xl:justify-start xl:gap-3">
        <ActionButton variant="secondary" className="px-7 sm:px-10">
          <Copy />
          Copy link
        </ActionButton>
        <ul className="flex gap-2 sm:gap-3 md:justify-around lg:justify-start">
          <li className="p-2.5 text-white bg-brown-500 rounded-full cursor-pointer hover:bg-brown-400 active:bg-brown-600">
            <a>
              <Facebook className="size-7" />
            </a>
          </li>
          <li className="p-2.5 text-white bg-brown-500 rounded-full cursor-pointer hover:bg-brown-400 active:bg-brown-600">
            <a>
              <Linkedin className="size-7" />
            </a>
          </li>
          <li className="p-2.5 text-white bg-brown-500 rounded-full cursor-pointer hover:bg-brown-400 active:bg-brown-600">
            <a>
              <Twitter className="size-7" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ShareSection;
