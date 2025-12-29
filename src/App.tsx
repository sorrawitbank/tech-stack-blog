import NavBar from "./components/NavBar";
import HeroSection from "./components/pages/landing/HeroSection";

function App() {
  return (
    <>
      <NavBar />
      <main className="lg:flex lg:flex-col lg:gap-20 lg:px-30 lg:pt-15 lg:pb-30">
        <HeroSection />
      </main>
    </>
  );
}

export default App;
