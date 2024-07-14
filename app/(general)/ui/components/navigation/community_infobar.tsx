"use client";

import { 
    CalendarDaysIcon,
    ChatBubbleBottomCenterTextIcon,
    PencilSquareIcon,
    ShieldCheckIcon,
    UserIcon
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import dayjs from "@/app/(general)/lib/dayjs";
import { useSession } from "@/app/(general)/lib/sessioncontext";

import ProfileImage from "../account/ProfileImage";
import { JoinCommunityButton } from "../button";
import MemberCount from "../community/memberCount";
import PostCount from "../community/postCount";
import Dialog from "../dialog/dialog";
import LargeDropdown from "../large_dropdown";

export default function CommunitySideInfobar({ community }: { community: any }) {

    const pathname = usePathname();
    const session = useSession();

    if (pathname.startsWith("/c/") || pathname.startsWith("/posts/")) {
        return (
            <>
                <nav className="hidden 2xl:flex sticky max-h-screen top-16" role="navigation">         
                    <div 
                        className={`bg-background p-4 hide-scrollbar overflow-x-hidden w-[300px] !max-h-fit`}
                        role="navigation"
                        aria-label="Infobar"
                    >
                        <div className="overflow-y-auto overflow-x-hidden">
                            <div className="flex gap-2 items-center">
                                <img src={community.image} className="w-7 h-7 rounded" alt={community.name} />
                                <h2 className="header-2 overflow-hidden whitespace-nowrap text-ellipsis">{community.name}</h2>    
                            </div>
                            <div className="markdown-body mb-1">
                                <Markdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>{community.description || "This community hasn't set any content for the sidebar."}</Markdown>
                            </div>

                            <div className="flex gap-1 mt-2 mb-2">
                                {session &&
                                    <JoinCommunityButton communityID={community.id} userID={session.user?.id} />
                                }
                                <Dialog>
                                    <Dialog.Trigger><button className="navlink !px-2"><ShieldCheckIcon className="w-5 h-5" /></button></Dialog.Trigger>
                                    <Dialog.Content>
                                        <Dialog.Title>Moderation Logs</Dialog.Title>
                                        <Dialog.Subtitle>c/{community.name}</Dialog.Subtitle>
                                        <Dialog.DialogBody>
                                            <LargeDropdown title={"Administration Logs"} description={"Records of all actions taken by the administrators."}>
                                                {/*<ModlogList communityId={community.id} />*/}
                                                <p>Sorry, this feature isn&apos;t implemented yet.</p>
                                            </LargeDropdown>
                                        </Dialog.DialogBody>
                                        <Dialog.ButtonContainer>
                                            <Dialog.CloseButton><button className="navlink-full">Close</button></Dialog.CloseButton>
                                        </Dialog.ButtonContainer>
                                    </Dialog.Content>
                                </Dialog>
                            </div>

                            <div className="markdown-body mb-2">
                                <h2 className="header-5 mt-1 mb-2">Info</h2>    
                            </div>
                            <div className='flex flex-row gap-3 items-center mt-2 mb-2'>
                                <div className='flex flex-row gap-3'>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <CalendarDaysIcon className='w-[20px] text-gray-300' />
                                        <p className='subtitle'>{community.createdAt.toLocaleDateString()}</p>  
                                    </div>
                                    
                                    <div className='flex flex-row gap-1 items-center'>
                                        <UserIcon className='w-[20px] text-gray-300' />
                                        <MemberCount communityID={community.id} />
                                    </div>

                                    <div className='flex flex-row gap-1 items-center'>
                                        <PencilSquareIcon className='w-[20px] text-gray-300' />
                                        <PostCount communityID={community.id} />
                                    </div>

                                    <div className='flex flex-row gap-1 items-center'>
                                        <ChatBubbleBottomCenterTextIcon className='w-[20px] text-gray-300' />
                                        <p className='subtitle'>---</p>
                                    </div>
                                </div>
                            </div>
                            <div className="markdown-body mb-2">
                                <h2 className="header-5 mt-1 mb-2">Rules</h2>    
                            </div>
                            {community.rules.length > 0 ?
                                community.rules.map((rule: string, index: number) =>
                                    <div key={index + 1} className="flex flex-col gap-1">
                                        <p className="subtitle">{index + 1}. {rule}</p>
                                    </div>                                    
                                )
                            :
                                <p>This community has no rules. Remember, the site rules still apply.</p>
                            }

                            <div className="mb-2" />

                            <div className="markdown-body mb-2">
                                <h2 className="header-5 mt-1 mb-2">Administrators</h2>    
                            </div>
                            {community.admins.length > 0 ?
                                community.admins.map((admin: any) => {
                                    return (
                                        <div key={admin.userId} className="hover:bg-card active:bg-card border-0 border-border p-3 rounded flex flex-col gap-1 w-full">
                                            <div className="flex gap-2">
                                                <ProfileImage user={admin.user} imgSize={"5"} />
                                                <Link href={`/user/${admin.user.username}`} className="transition-all subtitle hover:!text-white">{admin.user.username}</Link>                                        
                                            </div>
                                            <p>Since the {dayjs(admin.createdAt).format("Do [of] MMMM[,] YYYY")}.</p>
                                        </div>
                                    );
                                })
                            :
                                <p>This community has no administrators.</p>
                            }
                        </div>
                    </div>                     
                </nav>
            </>            
        );
    } else {
        // Non community pages have a generic infobar, so this one isn't shown.
        return null;
    }
}