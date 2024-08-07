import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const communities = [
    { id: "1", name: "general", image: "https://placehold.co/400", public: true, display_name: "General" },
    { id: "2", name: "meta", image: "https://placehold.co/400", public: true, display_name: "Meta" },
    { id: "3", name: "television", image: "https://placehold.co/400", public: true, display_name: "Television" },
    { id: "4", name: "movies", image: "https://placehold.co/400", public: true, display_name: "Movies" },
    { id: "5", name: "music", image: "https://placehold.co/400", public: true, display_name: "Music" },
    { id: "6", name: "history", image: "https://placehold.co/400", public: true, display_name: "History" },
  ];

  const users = [
    { id: "1", email: "johndoe@example.com", username: "username1", password_hash: "", name: "John Doe" },
    { id: "2", email: "janedoe@example.com", username: "username2", password_hash: "", name: "Jane Doe" },
    { id: "3", email: "user@testing.com", username: "Testing521", password_hash: "", name: "Testing521" },
    { id: "4", email: "hello@howareyou.com", username: "HowAreYou", password_hash: "", name: "HowAreYou" },
  ];

  const posts = [
    { communityId: "1", title: "Look at my code!", content: "**_Here's my code!_**", tagline: "Made some code today.", public: true, authorId: "1", imageurl: "/images/uploaded/code.png", imagealt: "My Code!", createdAt: new Date("January 1, 2024 03:24:00") },
    { communityId: "1", title: "The Cliffs of Moher", content: "# The Cliffs of Moher \n Here is the cliffs of moher! \n ## The Cliffs History \n Loreum Ipsum...", tagline: "Post Tagline 2", public: true, authorId: "2", imageurl: "https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", imagealt: "The Cliffs of Moher", createdAt: new Date("December 30, 2023 13:30:23") },
    { communityId: "3", title: "So, what did you think of last nights episode?", content: "I think it was great, how about you?", tagline: "It was great, I'd say.", public: true, authorId: "2", imageurl: null, imagealt: null, createdAt: new Date("5/11/26") },
    { communityId: "2", title: "Feature suggestion", content: "What if we implement this feature, using the code above?", tagline: "My new feature request.", public: true, authorId: "3", imageurl: "/images/uploaded/code.png", imagealt: "The code in question.", createdAt: new Date("December 1, 2022 06:54:44") },
    { communityId: "4", title: "I think \"Snakes on a Plane\" was just okay.", content: "# Hah, just kidding. \n It's actually great.", tagline: "Look inside.", public: true, authorId: "4", imageurl: null, imagealt: null, createdAt: new Date("December 23, 2023 12:32:43") },
    { communityId: "1", title: "This post is really old.", content: "This is just to test dates.", tagline: "For testing, of course.", public: true, authorId: "1", imageurl: null, imagealt: null, createdAt: new Date("December 17, 1995 03:24:00") },
  ];

  const newCommunities = await Promise.all(communities.map(community => prisma.community.create({ data: community })));
  const newUsers = await Promise.all(users.map(user => prisma.user.create({ data: user })));
  const newPosts = await Promise.all(posts.map(post => prisma.post.create({ data: post })));

  console.log(newCommunities, newUsers, newPosts);
}

main()

  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
