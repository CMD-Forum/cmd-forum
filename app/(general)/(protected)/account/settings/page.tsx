import SettingsTabs from "@/app/(general)/ui/components/account/SettingsTabs";
import { auth } from "@/auth"

export default async function SettingsPage() {

    const session = await auth();

    return (

        <div className="flex md:flex-row flex-col p-6">

            <SettingsTabs />

        </div>

    )

}