import Main from "./Main";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { PostProvider } from "@/contexts/postContext";

function ViewPost() {
  return (
    <>
      <Header />
      <PostProvider>
        <Main />
      </PostProvider>
      <Footer />
    </>
  );
}

export default ViewPost;
