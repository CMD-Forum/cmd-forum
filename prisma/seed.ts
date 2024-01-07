import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  const communities = [

    { name: "general", image: "https://placehold.co/400", public: true, display_name: "General" },
    { name: "meta", image: "https://placehold.co/400", public: true, display_name: "Meta" },
    { name: "television", image: "https://placehold.co/400", public: true, display_name: "Television" },
    { name: "movies", image: "https://placehold.co/400", public: true, display_name: "Movies" },
    { name: "music", image: "https://placehold.co/400", public: true, display_name: "Music" },

  ];

  const users = [

    { email: "johndoe@example.com", username: "username1", password: await hash("12345678", 10), name: "John Doe" },
    { email: "janedoe@example.com", username: "username2", password: await hash("12345678", 10), name: "Jane Doe" },

  ];

  const posts = [
    
    { communityId: 1, title: "Look at my code!", content: "**_Here's my code!_**", tagline: "Made some code today.", public: true, authorId: 1, imageurl: "/images/uploaded/code.png", imagealt: "My Code!", },
    { communityId: 2, title: "The Cliffs of Moher", content: "# The Cliffs of Moher \n Here is the cliffs of moher! \n ## The Cliffs History \n Loreum Ipsum...", tagline: "Post Tagline 2", public: true, authorId: 2, imageurl: "https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", imagealt: "The Cliffs of Moher" },
    { communityId: 3, title: "So, what did you think of last nights episode?", content: "I think it was great, how about you?", tagline: "It was great, I'd say.", public: true, authorId: 2, imageurl: "", imagealt: "", },
    { communityId: 2, title: "Followup to my code post.", content: "## Well, I think it was great. \n Yeah, you're wrong and I'm right.", tagline: "I'm right about it.", public: true, authorId: 1, imageurl: "/images/uploaded/code.png", imagealt: "I was right!", },
    { communityId: 2, title: "I think \"Snakes on a Plane\" was just okay.", content: "# Hah, just kidding. \n It's actually great.", tagline: "Look inside.", public: true, authorId: 2, imageurl: "", imagealt: "", },
  
  ];

  //@ts-ignore
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
