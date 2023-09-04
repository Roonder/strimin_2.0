"use client"
import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

export const DesktopMenuItem = forwardRef(({
    className = "",
    icon,
    title,
    href,
}, ref) => {
    const path = usePathname();
    
    return (
        <Tooltip content={title} showArrow={true} placement="right">
            <Link
                href={href}
                className={`text-black-light text-3xl rounded-full p-2 ${path === href && "bg-gradient-to-bl from-neon-blue to-neon-pink shadow shadow-neon-blue scale-105 text-white" || ""} transition-all delay-75 ease-in`}
                aria-label={title}
            >
                {icon}
            </Link>
        </Tooltip>
    )
});

DesktopMenuItem.displayName = "DesktopMenuItem";