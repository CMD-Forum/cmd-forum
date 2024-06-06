import { ProfileMainSkeleton } from "../../ui/skeletons/Account";
import { CardPostSkeleton } from "../../ui/skeletons/Post";

export default function Loading() {
    return (
        <main className="flex min-h-screen flex-col w-full">
            <div className="error flex flex-col w-full">
                <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                    <ProfileMainSkeleton />
                </div>
                <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6'>
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                    <CardPostSkeleton />
                </div>
            </div>
        </main>        
    );
}