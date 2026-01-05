import BlogCard from "./BlogCard";

function ArticleGrid() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-5 2xl:grid-cols-3">
      <BlogCard
        imgSrc="https://encrypted-tbn0.gstatic.com/imgSrcs?q=tbn:ANd9GcSqN6OzCzFdjdttXpUXGO-PgOTeg9grX_NRv2o0NOjC9NH1Upj9uETRLRl8WoW-ynpEvp8bd2LYjkx14IwCfgYRHesNpiawER5zAOBZ5Fo&s=10"
        imgAlt="cat"
        categories={["Data Sci", "General"]}
        title="Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do"
        description="Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines."
        author="Sorrawit A."
        date={new Date(2024, 8, 11)}
      />
      <BlogCard
        imgSrc="https://encrypted-tbn0.gstatic.com/imgSrcs?q=tbn:ANd9GcSqN6OzCzFdjdttXpUXGO-PgOTeg9grX_NRv2o0NOjC9NH1Upj9uETRLRl8WoW-ynpEvp8bd2LYjkx14IwCfgYRHesNpiawER5zAOBZ5Fo&s=10"
        imgAlt="cat"
        categories={["Software Dev"]}
        title="Unlocking Creativity: Simple Habits to Spark Inspiration Daily"
        description="Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines."
        author="Sorrawit A."
        date={new Date(2023, 10, 6)}
      />
      <BlogCard
        imgSrc="https://encrypted-tbn0.gstatic.com/imgSrcs?q=tbn:ANd9GcSqN6OzCzFdjdttXpUXGO-PgOTeg9grX_NRv2o0NOjC9NH1Upj9uETRLRl8WoW-ynpEvp8bd2LYjkx14IwCfgYRHesNpiawER5zAOBZ5Fo&s=10"
        imgAlt="cat"
        categories={["Software Dev"]}
        title="Finding Motivation: How to Stay Inspired Through Life's Challenges"
        description="Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines."
        author="Sorrawit A."
        date={new Date(2023, 10, 6)}
      />
      <BlogCard
        imgSrc="https://encrypted-tbn0.gstatic.com/imgSrcs?q=tbn:ANd9GcSqN6OzCzFdjdttXpUXGO-PgOTeg9grX_NRv2o0NOjC9NH1Upj9uETRLRl8WoW-ynpEvp8bd2LYjkx14IwCfgYRHesNpiawER5zAOBZ5Fo&s=10"
        imgAlt="cat"
        categories={["Software Dev"]}
        title="Unlocking Creativity: Simple Habits to Spark Inspiration Daily"
        description="Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines."
        author="Sorrawit A."
        date={new Date(2023, 11, 6)}
      />
      <BlogCard
        imgSrc="https://encrypted-tbn0.gstatic.com/imgSrcs?q=tbn:ANd9GcSqN6OzCzFdjdttXpUXGO-PgOTeg9grX_NRv2o0NOjC9NH1Upj9uETRLRl8WoW-ynpEvp8bd2LYjkx14IwCfgYRHesNpiawER5zAOBZ5Fo&s=10"
        imgAlt="cat"
        categories={["Software Dev"]}
        title="Unlocking Creativity: Simple Habits to Spark Inspiration Daily"
        description="Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines."
        author="Sorrawit A."
        date={new Date(2023, 10, 6)}
      />
      <BlogCard
        imgSrc="https://encrypted-tbn0.gstatic.com/imgSrcs?q=tbn:ANd9GcSqN6OzCzFdjdttXpUXGO-PgOTeg9grX_NRv2o0NOjC9NH1Upj9uETRLRl8WoW-ynpEvp8bd2LYjkx14IwCfgYRHesNpiawER5zAOBZ5Fo&s=10"
        imgAlt="cat"
        categories={["Software Dev"]}
        title="Unlocking Creativity: Simple Habits to Spark Inspiration Daily"
        description="Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines."
        author="Sorrawit A."
        date={new Date(2023, 10, 6)}
      />
    </div>
  );
}

export default ArticleGrid;
