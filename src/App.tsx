import NavBar from "./components/NavBar";
import HeroSection from "./components/pages/landing/HeroSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <main className="lg:flex lg:flex-col lg:gap-20 lg:px-10 lg:pt-15 lg:pb-30 xl:px-30">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
