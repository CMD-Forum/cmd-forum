import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const communities = [
    { name: "Community 1", image: "https://placehold.co/400", public: true, administrators: {"1": "James Doyle", "2": "Ciaran Doyle"} },
    { name: "Community 2", image: "https://placehold.co/400", public: false, administrators: {} },
    // Add more communities as needed
  ];

  const users = [
    { email: "user1@example.com", username: "username1", password: await hash("ilovecmd", 10), name: "User Name 1" },
    { email: "user2@example.com", username: "username2", password: await hash("ilovecmd2", 10), name: "User Name 2" },
    // Add more users as needed
  ];

  const posts = [
    { communityId: 1, title: "Post Title 1", content: "Post Content 1", tagline: "Post Tagline 1", public: true, authorId: 1 },
    { communityId: 2, title: "Post Title 2", content: "Post Content 2", tagline: "Post Tagline 2", public: false, authorId: 2 },
    // Add more posts as needed
  ];

  const newCommunities = await Promise.all(communities.map(community => prisma.community.create({ data: community })));
  const newUsers = await Promise.all(users.map(user => prisma.user.create({ data: user })));
  const newPosts = await Promise.all(posts.map(post => prisma.post.create({ data: post })));

  console.log(newCommunities, newUsers, newPosts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
