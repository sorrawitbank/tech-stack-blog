import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

function Landing() {
  return (
    <>
      <Header />
      <main className="pt-12 sm:pt-20 lg:flex lg:flex-col lg:gap-20 lg:px-12 lg:pt-35 lg:pb-30 xl:px-30">
        <HeroSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}

export default Landing;
