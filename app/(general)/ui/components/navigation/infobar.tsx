"use client";

import { usePathname } from "next/navigation";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export default function Infobar() {

    const markdown = `# Command
    \nWelcome to Command. If this is your first time here, [signup](/signup) to get started. 
    \n ## Rules
    \n 1. Please don't spam.
    \n 2. Be respectful.
    \n 3. Nothing illegal, please
    \n ## Contributing
    \n If you want to contribute or fork Command, visit the GitHub repository [here](https://github.com/CMD-Forum/cmd-forum).`

    const pathname = usePathname();

    if (pathname.startsWith("/c/") || pathname.startsWith("/posts/")) {
        // Communitys have their own infobar, so this one isn't shown.
        return null;
    } else {
        return (
            <>
                <nav className="hidden 2xl:flex sticky max-h-screen top-16" role="navigation">         
                    <div 
                        className={`bg-background p-4 hide-scrollbar overflow-x-hidden w-[300px] h-screen`}
                        role="navigation"
                        aria-label="Infobar"
                    >
                        <div className="overflow-y-auto overflow-x-hidden">
                            <div className="markdown-body">
                                <Markdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>{markdown}</Markdown>    
                            </div>
                        </div>
                    </div>                     
                </nav>
            </>
        );
    }
}