export interface Comment {
  readonly id: number;
  name: string;
  image: string;
  date: string;
  comment: string;
}

export const comments: Comment[] = [
  {
    id: 1,
    name: "Jacob Lash",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg",
    date: "2024-09-11T11:50:00.000Z",
    comment:
      "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
  },
  {
    id: 2,
    name: "Ahri",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg",
    date: "2024-08-11T23:42:00.000Z",
    comment:
      "Such a great read! I've always wondered why my cat slow blinks at me—now I know it’s her way of showing trust!",
  },
  {
    id: 3,
    name: "Mimi mama",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg",
    date: "2024-07-11T01:23:00.000Z",
    comment:
      "This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!",
  },
];
