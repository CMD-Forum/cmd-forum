import Dropdown, { DropdownLink } from "../../components/dropdown/dropdown";

export default function ThemeTestingPage() {

    return (
        <main className="flex min-h-screen min-w-screen bg-white flex-col w-full">

            <div className="error flex flex-col w-full">

                <div className="flex flex-col border-b-1 border-border-light/25 p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-transparent mt-8 md:mt-0">
                    <h1 className="text-3xl font-inter font-bold antialiased !text-black">Theme Testing</h1>
                </div>

                <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm !text-black">Dropdown</p>    
                        <Dropdown headerText={"Dropdown"} headerClassName={"!border-1 !border-border"} accountHeading={false} headerIcon={null}>
                            <DropdownLink text='Item a' link={"/"} icon={null} />
                            <DropdownLink text='Item b' link={"/"} icon={null} />
                        </Dropdown>
                    </div>
                </div>

            </div>

        </main>
    );

}