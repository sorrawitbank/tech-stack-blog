import Narbar from "./layouts/Navbar";
import HeroSection from "./pages/Landing/HeroSection";
import ArticleSection from "./pages/Landing/ArticleSection";
import Footer from "./layouts/Footer";

function App() {
  return (
    <>
      <Narbar />
      <main className="pt-12 sm:pt-20 lg:flex lg:flex-col lg:gap-20 lg:px-12 lg:pt-35 lg:pb-30 xl:px-30">
        <HeroSection />
        <ArticleSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
