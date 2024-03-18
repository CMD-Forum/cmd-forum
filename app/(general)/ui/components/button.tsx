import { MouseEventHandler } from "react";

export default function Button({ label, type, onClick, className = "navlink" }: { label: string, type: "navlink" | "navlink-full" | "navlink-ghost" | "navlink-destructive", onClick: MouseEventHandler<HTMLButtonElement>, className?: string }) {

    return (
        <button onClick={onClick} className={`${type} ${className}`}>
            { label }
        </button>
    );

}