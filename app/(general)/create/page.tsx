import { Metadata } from 'next';

import CreateTabs from "@/app/(general)/ui/components/tabs";
 
export const metadata: Metadata = {
  title: 'Create - CMD',
};

export default function CreatePage() {

    return (

        <>

            <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                <h1 className="header">Create</h1>
                <p className="subtitle">Submit a post or create a community, the choice is yours.</p>   
            </div>
            
            <div className="flex flex-col border-0 border-border p-6 md:pt-12 lg:pb-12 lg:p-12 lg:px-48">
                <CreateTabs />
            </div>        
        </>

    );

}