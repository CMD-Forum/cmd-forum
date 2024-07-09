import { getAuth } from "@/app/(general)/lib/auth";
import { prisma } from "@/app/(general)/lib/db";

import ActiveSessions from "../../../../ui/components/settings/sessions";

export default async function SessionPage() {

    const session = await getAuth();

    const sessions = await prisma.session.findMany({
        where: {
            userId: session.user?.id
        },
    });

    // console.log(sessions);
    // const isArray = Array.isArray(sessions);
    // console.log(isArray);

    return (
        <>
            <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                <h1 className="header">Sessions</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Manage your account sessions.</p>   
            </div>

            <div className="flex flex-col lg:pb-12 px-4 mb-6">
                {/* @ts-ignore */}
                <ActiveSessions sessions={sessions} />
            </div>
        </>
    );
}