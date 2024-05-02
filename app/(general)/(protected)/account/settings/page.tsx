import SettingsTabs from "@/app/(general)/ui/components/account/SettingsTabs";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

export default async function SettingsPage() {

    return (

        <>

            <div className="flex flex-row w-full bg-border items-center justify-center p-2 subtitle fixed gap-2 z-[999]"><ExclamationTriangleIcon className="w-5 h-5"/> Settings are currently unimplemented.</div>

            <div className="flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <h1 className="header">Settings</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Manage your account settings</p>   

            </div>

            <div className="flex flex-col border-b-1 border-border p-6 md:pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <SettingsTabs />

            </div>

        </>

    )

}