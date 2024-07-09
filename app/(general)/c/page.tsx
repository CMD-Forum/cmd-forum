import { Metadata } from 'next';

import { CommunityList } from "../ui/components/community/community_list";
 
export const metadata: Metadata = {
  title: 'Community',
};

export default function CommunityPage() {
    return (
        <div>
            <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                <h1 className="header">Community</h1>
                <p className="subtitle">Find a community for any topic.</p>   
            </div>      

            <div className='flex flex-col lg:pb-12 lg:px-4 mb-6'>
              <CommunityList />  
            </div>
        </div>
    );
}