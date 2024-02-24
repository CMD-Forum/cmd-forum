import Link from "next/link";

export const DropdownLink = ({ children, href }) => {
    return (
        <Link href={href} className={`w-fit bg-card p-4 rounded-md hover:bg-border`}>{ children }</Link>
    );
}