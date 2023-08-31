"use client"
import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileMenuItem = forwardRef(({
    className = "",
    icon,
    title,
    href,
}, ref) => {
    const path = usePathname();
    
    return (
        <Link
            href={href}
            className={`text-black-light text-3xl rounded-full p-2 ${path === href && "bg-gradient-to-bl from-neon-blue to-neon-pink shadow shadow-neon-blue scale-125 text-white" || ""} transition-all delay-75 ease-in`}
            aria-label={title}
        >
            {icon}
        </Link>
    )
});

MobileMenuItem.displayName = "MobileMenuItem";