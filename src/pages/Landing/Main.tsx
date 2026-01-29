import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import StandardMain from "@/layouts/StandardMain";
import { CategoryProvider } from "@/contexts/CategoryContext";

function Main() {
  return (
    <StandardMain className="lg:gap-20">
      <HeroSection />
      <CategoryProvider>
        <BlogSection />
      </CategoryProvider>
    </StandardMain>
  );
}

export default Main;
