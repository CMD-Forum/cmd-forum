import { Metadata } from 'next';

import { CommunityList } from "../ui/components/community/community_list";
 
export const metadata: Metadata = {
  title: 'Community - CMD',
};

export default function CommunityPage() {
    return (
        <div>
            <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                <h1 className="header">Community</h1>
                <p className="subtitle">Find a community for any topic.</p>   
            </div>      

            <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
              <CommunityList />  
            </div>
        </div>
    );
}