import SettingsTabs from "@/app/(general)/ui/components/account/SettingsTabs";
import Banner from "@/app/(general)/ui/components/banner";

export default async function SettingsPage() {

    return (

        <>

            <Banner message={"Settings are currently unimplemented."} fixedAtTop={false} />

            <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card">

                <h1 className="header">Settings</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Manage your account settings</p>   

            </div>

            <div className="flex flex-col p-6 md:pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <SettingsTabs />

            </div>

        </>

    )

}