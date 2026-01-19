import ArticleSection from "./ArticleSection";
import AuthorCard from "./components/AuthorCard";

function Main() {
  return (
    <main className="pt-12 sm:pt-20 lg:flex lg:flex-col lg:items-center lg:gap-12 lg:px-12 lg:pt-35 lg:pb-30 xl:px-30">
      <img
        src={
          "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/gsutzgam24abrvgee9r4.jpg"
        }
        alt="Cat"
        className="aspect-375/184 w-full max-w-7xl max-h-150 text-brown-500 object-cover lg:aspect-1200/587 lg:rounded-2xl"
      />
      <div className="md:px-12 md:pt-8 lg:p-0">
        <div className="flex justify-between gap-8 xl:gap-20">
          <ArticleSection />
          <div className="hidden flex-1 min-w-[305px] h-fit md:sticky md:block md:top-28 lg:p-0 2xl:min-w-100">
            <AuthorCard />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
