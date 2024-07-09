import { Metadata } from 'next';

import CreateTabs from "@/app/(general)/ui/components/tabs";
 
export const metadata: Metadata = {
  title: 'Create Post',
};

export default function CreatePostPage() {
    return (
        <>
            <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                <h1 className="header">Create Post</h1>
            </div>
            <div className="flex flex-col lg:pb-12 px-4 mb-6">
                <CreateTabs />
            </div>        
        </>
    );
}