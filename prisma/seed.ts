import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  const communities = [

    { id: "1", name: "general", image: "https://placehold.co/400", public: true, display_name: "General", admin_ids: ["1, 2"] },
    { id: "2", name: "meta", image: "https://placehold.co/400", public: true, display_name: "Meta", admin_ids: ["2, 1"] },
    { id: "3", name: "television", image: "https://placehold.co/400", public: true, display_name: "Television", admin_ids: ["1"] },
    { id: "4", name: "movies", image: "https://placehold.co/400", public: true, display_name: "Movies", admin_ids: ["3, 4"] },
    { id: "5", name: "music", image: "https://placehold.co/400", public: true, display_name: "Music", admin_ids: ["4, 2"] },

  ];

  const users = [

    { id: "1", email: "johndoe@example.com", username: "username1", password: await hash("12345678", 10), name: "John Doe" },
    { id: "2", email: "janedoe@example.com", username: "username2", password: await hash("12345678", 10), name: "Jane Doe" },
    { id: "3", email: "user@testing.com", username: "Testing521", password: await hash("12345678", 10), name: "Testing521" },
    { id: "4", email: "hello@howareyou.com", username: "HowAreYou", password: await hash("12345678", 10), name: "HowAreYou" },

  ];

  const posts = [
    
    { communityId: "1", title: "Look at my code!", content: "**_Here's my code!_**", tagline: "Made some code today.", public: true, authorId: "1", imageurl: "/images/uploaded/code.png", imagealt: "My Code!", createdAt: new Date("1/1/24") },
    { communityId: "1", title: "The Cliffs of Moher", content: "# The Cliffs of Moher \n Here is the cliffs of moher! \n ## The Cliffs History \n Loreum Ipsum...", tagline: "Post Tagline 2", public: true, authorId: "2", imageurl: "https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", imagealt: "The Cliffs of Moher", createdAt: new Date("30/11/23") },
    { communityId: "3", title: "So, what did you think of last nights episode?", content: "I think it was great, how about you?", tagline: "It was great, I'd say.", public: true, authorId: "2", imageurl: null, imagealt: null, createdAt: new Date("5/11/23") },
    { communityId: "2", title: "Feature suggestion", content: "What if we implement this feature, using the code above?", tagline: "My new feature request.", public: true, authorId: "3", imageurl: "/images/uploaded/code.png", imagealt: "The code in question.", createdAt: new Date("1/12/23") },
    { communityId: "5", title: "I think \"Snakes on a Plane\" was just okay.", content: "# Hah, just kidding. \n It's actually great.", tagline: "Look inside.", public: true, authorId: "4", imageurl: null, imagealt: null, createdAt: new Date("21/12/23") },
  
  ];

  const posts_support = [
    
    { id: "firststart", title: "Welcome to CMD/>.", tagline: "If you're setting up CMD/>, please read this.", content: "", authorId: "0" },
  
  ];

  //@ts-ignore
  const newCommunities = await Promise.all(communities.map(community => prisma.community.create({ data: community })));
  const newUsers = await Promise.all(users.map(user => prisma.user.create({ data: user })));
  const newPosts = await Promise.all(posts.map(post => prisma.post.create({ data: post })));
  const newSupportPosts = await Promise.all(posts_support.map(post_support => prisma.support.create({ data: post_support })));

  console.log(newCommunities, newUsers, newPosts, newSupportPosts);
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
