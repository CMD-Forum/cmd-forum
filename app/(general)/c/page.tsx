import { CommunityList } from "../ui/components/community/community_list";

export default function CommunityPage() {

    return (
        <div className="">
            <div className="flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <h1 className="header">Community</h1>
                <p className="subtitle">Find a community for any topic.</p>   

            </div>      

            <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
              <CommunityList />  
            </div>

        </div>

    );

}