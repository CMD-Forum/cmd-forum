import SettingsTabs from "@/app/(general)/ui/components/account/SettingsTabs";

export default async function SettingsPage() {

    return (

        <>

            <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                <h1 className="header">Settings</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Manage your account settings</p>   
            </div>

            <div className="flex flex-col p-6 md:pt-12 lg:pb-12 lg:p-12 lg:px-48">
                <SettingsTabs />
            </div>

        </>

    )

}