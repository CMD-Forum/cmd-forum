import Link from "next/link";
import SupportList from "../ui/components/support/support_list";

const support = async () => {

    return (

        <main className="flex min-h-screen flex-col w-full">

        <div className="error flex flex-col w-full">
  
              <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card">
  
                  <h1 className="header">Support</h1>
                  <p className="subtitle">What do you need help with?</p>   
  
              </div>
  
              <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
                <SupportList />  
              </div>
  
          </div>
  
      </main>

    ) 

};

export default support