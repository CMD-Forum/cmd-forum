import LargeDropdown from "../../components/large_dropdown";

export default function DevelopmentMessage() {

    return (
        <main className="flex min-h-screen flex-col w-full">

            <div className="error flex flex-col w-full">

                <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                    <h1 className="header">Development Message</h1>
                    <p className={`subtitle sm:hidden`}>Learn more about the development of Command.</p>
                </div>

                <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6 gap-4'>

                    <LargeDropdown 
                        title={"TBD"} 
                        description={"TBD"}
                    >
                        <p>TBD</p>
                    </LargeDropdown>

                    <LargeDropdown 
                        title={"TBD"} 
                        description={"TBD"}
                    >
                        <p>TBD</p> 
                    </LargeDropdown>

                </div>

            </div>

        </main>
    );

}