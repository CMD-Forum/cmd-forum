import { redirect } from "next/navigation";

import { enableHomepage } from "@/flags";

import Dialog, { DialogSubtitle, DialogTitle } from "./ui/components/dialog/dialog";

export default async function HomePage() {

  const homepageEnabled = await enableHomepage();

  if ( homepageEnabled ) {
    return (
      <main className="flex min-h-fit flex-col w-full">
        <div className="error flex flex-col w-full">
          <div className="flex flex-col p-12 items-center">
            <p>Homepage</p>
            <Dialog 
              closeBtn={true} 
              closeBtnComponent={<button className={"navlink-full"}>Close</button>} 
              openBtn={true} 
              openBtnComponent={<button className={"navlink-full"}>Notice Dialog</button>}
            >
              <DialogTitle>This feature is unavailable.</DialogTitle>
              <DialogSubtitle>Sorry, this feature is currently unavailable.</DialogSubtitle>
            </Dialog>              
          </div>  
        </div>
      </main>
    );
  } else {
    return redirect("/posts");
  }

}
