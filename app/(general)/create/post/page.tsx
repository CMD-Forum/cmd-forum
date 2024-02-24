import CreatePostForm from "@/app/(general)/ui/components/form/create_post";
import { Suspense } from "react";

const page = () => {

    return ( 


        <div className="flex flex-col justify-center m-auto max-w-5xl">

            <CreatePostForm />
                        
        </div>

    );
    
}

export default page;