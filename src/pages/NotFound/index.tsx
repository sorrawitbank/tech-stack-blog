import Main from "./Main";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col overflow-hidden h-dvh pt-12 sm:pt-20">
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default NotFound;
