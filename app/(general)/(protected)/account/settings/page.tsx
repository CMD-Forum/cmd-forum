import SettingsTabs from "@/app/(general)/ui/components/account/SettingsTabs";
import { auth } from "@/auth"

export default async function SettingsPage() {

    return (

        <div className="">

            <div className="flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <h1 className="header">Settings</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Popular posts recently</p>   

            </div>

            <div className="flex flex-col border-b-1 border-border p-6 md:pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <SettingsTabs />

            </div>

        </div>

    )

}