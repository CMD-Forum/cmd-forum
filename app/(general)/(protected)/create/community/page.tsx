import { Metadata } from 'next';

import CreateCommunityForm from '@/app/(general)/ui/components/form/create_community';
 
export const metadata: Metadata = {
  title: 'Create Community',
};

export default function CreateCommunityPage() {
    return (
        <>
            <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                <h1 className="header">Create Community</h1> 
            </div>
            <div className="flex flex-col lg:pb-12 px-4 mb-6">
                <CreateCommunityForm />
            </div>        
        </>
    );
}