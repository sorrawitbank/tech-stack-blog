import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import StandardMain from "@/layouts/StandardMain";

function Main() {
  return (
    <StandardMain className="lg:gap-20">
      <HeroSection />
      <BlogSection />
    </StandardMain>
  );
}

export default Main;
