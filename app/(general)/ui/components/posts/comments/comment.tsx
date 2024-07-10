import { 
    ArchiveBoxXMarkIcon, 
    ArrowUturnLeftIcon, 
    EllipsisVerticalIcon, 
    PencilSquareIcon, 
    ShareIcon 
} from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from "next/link";
import { useState } from "react";

import { useSession } from "@/app/(general)/lib/sessioncontext";
import { PostCommentType } from "@/types/types";

import ProfileImage from "../../account/ProfileImage";
import Dialog from "../../dialog/dialog";
import Menu from "../../menu/menu";

dayjs.extend(relativeTime);

export function PostComment({ comment }: { comment: PostCommentType }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const session = useSession();

    return (
        <>
            <Dialog.Controlled isOpen={deleteDialogOpen} setIsOpen={setDeleteDialogOpen}>
                <Dialog.Content>
                    <Dialog.Title>Delete this comment? (Unimplemented)</Dialog.Title>
                    <Dialog.Subtitle>This action cannot be reversed, choose wisely.</Dialog.Subtitle>
                    <Dialog.ButtonContainer>
                        <Dialog.CloseButton><button className='navlink'>Close</button></Dialog.CloseButton>
                        <button className='navlink-destructive' disabled>Delete</button>
                    </Dialog.ButtonContainer>
                </Dialog.Content>
            </Dialog.Controlled>
            <div className="bg-transparent hover:bg-card active:bg-card hover:cursor-pointer h-fit rounded-lg p-4 transition-all border-l-1 border-border rounded-l-none">
                <div className="flex gap-2 mb-1 items-center">
                    <div className="flex gap-2 items-center">
                        {/* @ts-ignore */}
                        <ProfileImage user={comment.user} imgSize="5" alt={`Profile Image of ${comment.user.username}`} />
                        <Link href={`/user/${comment.user.username}`} className="subtitle hover:underline" aria-label={comment.user.username}>{comment.user.username}</Link>                    
                    </div>
                    <p className='subtitle !text-xs'>•</p> 
                    <p>{dayjs(comment.createdAt).fromNow()}</p>
                    { comment.edited &&
                        <div className="flex gap-2 items-center">
                            <p className='!text-xs'>•</p> 
                            <PencilSquareIcon className="w-5 h-5 text-gray-300" aria-label="This comment has been edited." />
                        </div>
                    }
                </div>
                <p>{comment.content}</p>
                <div className="flex flex-row mt-3 gap-2">
                    <button className="navlink small !text-gray-300 hover:!text-white transition-all"><ArrowUturnLeftIcon className="w-4 h-4" />Reply</button>
                    { session.user?.id === comment.userId && 
                        <button className="navlink small !text-gray-300 hover:!text-white transition-all"><PencilSquareIcon className="w-4 h-4" />Edit</button>
                    }
                    <Menu defaultPlacement="bottom">
                        <Menu.Trigger><button className="navlink small !text-gray-300 hover:!text-white transition-all !px-1"><EllipsisVerticalIcon className="w-4 h-4" /></button></Menu.Trigger>
                        <Menu.Content>
                        {/* @ts-ignore */}
                        <Menu.Link text={comment.user.username} icon={<ProfileImage user={comment.user} imgSize={"5"} />} link={`/user/${comment.user.username}`}></Menu.Link>
                            <hr className='mt-1 !mb-1'/>
                            <Menu.Share icon={<ShareIcon />} text={comment.content} title={"Command"} url={`${process.env.NEXT_PUBLIC_CURRENT_URL}comments/${comment.id}`} />
                            { session.user?.id === comment.userId 
                            ?
                                <Menu.Button icon={<ArchiveBoxXMarkIcon />} text={"Delete"} onClick={() => setDeleteDialogOpen(true)} destructive={true} />
                            :
                                null
                            }
                        </Menu.Content>
                    </Menu>
                </div>
            </div>        
        </>
    )
}