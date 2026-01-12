import NavBar from "./components/layouts/NavBar";
import HeroSection from "./components/pages/landing/HeroSection";
import ArticleSection from "./components/pages/landing/ArticleSection";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <>
      <NavBar />
      <main className="pt-12 sm:pt-20 lg:flex lg:flex-col lg:gap-20 lg:px-10 lg:pt-35 lg:pb-30 xl:px-30">
        <HeroSection />
        <ArticleSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
