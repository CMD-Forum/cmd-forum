import { Metadata } from 'next';

import SettingsTabs from "@/app/(general)/ui/components/account/SettingsTabs";

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {

    return (
        <>
            <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                <h1 className="header">Settings</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Manage your account settings</p>   
            </div>

            <div className="flex flex-col lg:pb-12 px-4 mb-6">
                <SettingsTabs />
            </div>
        </>
    )
}