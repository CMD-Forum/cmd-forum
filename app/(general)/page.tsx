import { redirect } from "next/navigation";

import { enableHomepage } from "@/flags";

export default async function HomePage() {

  const homepageEnabled = await enableHomepage();

  if ( homepageEnabled ) {
    return (
      <main className="flex min-h-fit flex-col w-full">
        <div className="error flex flex-col w-full">
          <div className="flex flex-col p-12 items-center">
            <p>Homepage</p>
          </div>  
        </div>
      </main>
    );
  } else {
    return redirect("/posts");
  }

}
