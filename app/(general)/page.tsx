import { redirect } from "next/navigation";

export default async function HomePage() {
  /*
    return (
      <main className="flex min-h-fit flex-col w-full">
        <div className="error flex flex-col w-full">
          <div className="flex flex-col p-12 items-center">
            <p>Homepage</p>
          </div>  
        </div>
      </main>
    );
  */
 
  return redirect("/posts");

}
