export default function SettingsPage() {

    return (

        <div>

            <div className="flex flex-col mb-4">

                <h1 className="header">Settings</h1>
                <p className="text-gray-300 font-bold antialiased w-full">Your account settings.</p>   

            </div>


            <div className='mb-4'>

                <h2 className='header mb-3 !text-2xl'>Account Details</h2>

                <div className='border-[1px] border-zinc-900 rounded-md'>

                    <div className='flex gap-2 items-center border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] p-4'>

                        <div className='flex flex-col'>
                            
                            <h3 className='font-bold text-sm'>Change account name</h3>    
                            <p className='text-sm'>Name can be changed once every 30 days.</p>

                        </div>
                        
                        <div className='flex flex-row ml-auto w-fit'>

                            <button className='navlink'>Change Name</button>

                        </div>

                    </div>

                    <div className='flex gap-2 items-center border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] p-4'>

                        <div className='flex flex-col'>
    
                            <h3 className='font-bold text-sm'>Delete your account</h3>    
                            <p className='text-sm'>This action cannot be reversed, be sure you want to do it.</p>

                        </div>

                        <div className='flex flex-row ml-auto w-fit'>

                            <button className='navlink'>Delete Account</button>

                        </div>

                    </div>

                </div>

            </div>



            <div className='mb-4'>

                <h2 className='header mb-3 !text-2xl'>Danger Zone</h2>

                <div className='border-[1px] border-zinc-900 rounded-md'>

                    <div className='flex gap-2 items-center border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] p-4'>

                        <div className='flex flex-col'>
                            
                            <h3 className='font-bold text-sm'>Change account visibility</h3>    
                            <p className='text-sm'>Change if others can view your account and your posts.</p>

                        </div>
                        
                        <div className='flex flex-row ml-auto w-fit'>

                            <button className='navlink-destructive'>Change Visibility</button>

                        </div>

                    </div>

                    <div className='flex gap-2 items-center border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] p-4'>

                        <div className='flex flex-col'>
    
                            <h3 className='font-bold text-sm'>Delete your account</h3>    
                            <p className='text-sm'>This action cannot be reversed, be sure you want to do it.</p>

                        </div>

                        <div className='flex flex-row ml-auto w-fit'>

                            <button className='navlink-destructive'>Delete Account</button>

                        </div>

                    </div>

                </div>

            </div>
            

        </div>

    )

}