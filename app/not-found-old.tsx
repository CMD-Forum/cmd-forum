import Link from "next/link";
import { Navigation, Sidebar } from "./(general)/ui/navigation";

export default function NotFound() {

  return (

    <div>

      <Sidebar />

      <div className="flex w-full px-10 py-10 items-center justify-center min-h-screen mt-[-4rem]">
          <div className="error flex flex-col gap-4 justify-center w-full">
              <div className="flex flex-col text-center">
                  <h1 className="text-3xl font-sans font-bold antialiased w-full">Not Found</h1>
                  <p className="text-gray-300 font-bold antialiased w-full">Could not find requested resource</p>    
              </div>
              
              <div className="flex flex-row justify-center gap-2 w-full">
                  <Link className='navlink-full w-full' href='/'>Homepage</Link> 
                  <Link className='navlink w-full' href='/support'>Help</Link>   
              </div>
                
          </div>
      </div>      

    </div>

    



  );

}