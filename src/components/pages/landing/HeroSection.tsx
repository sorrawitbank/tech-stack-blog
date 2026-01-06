function HeroSection() {
  return (
    <section
      id="hero-section"
      aria-labelledby="hero-title"
      className="flex flex-col items-center gap-10 px-4 py-10 sm:px-12 md:px-20 lg:flex-row lg:gap-15 lg:p-0 2xl:px-12"
    >
      <div className="flex flex-col gap-4 text-center lg:flex-1 lg:text-right">
        <h1
          id="hero-title"
          className="text-headline-2 text-brown-600 xl:text-headline-1"
        >
          Stay Informed,
          <span className="inline xl:hidden"> </span>
          <span className="hidden xl:inline">
            <br />
          </span>
          Stay Inspired
        </h1>
        <p className="text-body-1 text-brown-400">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>
      <img
        src="https://avatars.githubusercontent.com/u/198432307"
        alt="author image"
        className="w-full max-w-[500px] h-[470px] text-brown-500 object-cover rounded-2xl lg:w-[calc(100%*386/1200)] lg:h-[400px] xl:h-[529px]"
      />
      <div className="flex flex-col gap-3 lg:flex-1">
        <div className="flex flex-col gap-1">
          <span className="text-body-3 text-brown-400">- Author</span>
          <span className="text-headline-3 text-brown-500">Sorrawit A.</span>
        </div>
        <p className="text-body-1 text-brown-400">
          I am passionate about data science and modern web development. I enjoy
          sharing practical insights, lessons learned, and experiences from
          building real-world projects across different technology stacks.
          <br />
          <br />
          When I’m not coding, I spend time exploring new tools, experimenting
          with ideas, and continuously learning to improve both my technical
          skills and problem-solving mindset.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
