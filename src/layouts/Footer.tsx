import { Linkedin, Github } from "lucide-react";
import { NavigationButton } from "@/components/common/Button";

function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 px-4 py-10 bg-brown-200 sm:flex-row sm:justify-between sm:gap-0 sm:px-12 sm:py-15 xl:px-30">
      <div className="flex gap-6">
        <span className="text-body-1 text-brown-500">Get in touch</span>
        <div className="flex gap-4">
          <a className="text-brown-500 hover:text-brown-400 active:text-brown-600">
            <Linkedin />
          </a>
          <a
            href="https://github.com/sorrawitbank"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown-500 hover:text-brown-400 active:text-brown-600"
          >
            <Github />
          </a>
        </div>
      </div>
      <NavigationButton variant="text">Home page</NavigationButton>
    </footer>
  );
}

export default Footer;
