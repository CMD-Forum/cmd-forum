import { CardPost } from "../components/posts/post";
import { button } from "../variants";

export default function DeveloperPage() {

    return (

        <div className="p-6">
            <div className="flex flex-col">

                <h1 className="header">Developer Page</h1>
                <p className="text-gray-300 font-bold antialiased w-full">View the user interface of CMD/&gt;</p>   

            </div>

            <hr className="border-border facebookTheme:border-[#b3b3b3] mb-4 mt-4" />

            <h2 className="text-gray-300 font-bold antialiased w-full">Buttons</h2>              

            <div className="flex flex-col gap-2 mt-4">
                <button className={button({ type: 'normal' })}>normal</button>
                <button className={button({ type: 'ghost' })}>ghost</button>
                <button className={button({ type: 'full' })}>full</button>
                <button className={button({ type: 'destructive' })}>destructive</button>
                <button className={button({ type: 'success' })}>success</button>
                <button className={button({ type: 'sidebar' })}>sidebar</button>                
            </div>   

        </div>

    );

}