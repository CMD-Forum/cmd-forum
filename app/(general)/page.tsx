import { Landing } from "./ui/components/home";

export default async function HomePage() {

  return (

    <main className="flex min-h-fit flex-col w-full">

      <div className="error flex flex-col w-full">

        <Landing />

      </div>

    </main>

  );

}
