"use client"
import { forwardRef, useState, Fragment } from "react";
import { HiHome, HiUser, HiTv, HiEllipsisHorizontalCircle, HiMiniArrowRightOnRectangle, HiUserCircle} from "react-icons/hi2";
import Link from "next/link";
import { DesktopMenuItem } from "@/components/utils/DesktopMenuItem";

export const DesktopMenu = forwardRef(({
    className = "",
    ...props
}, ref) => {

    return (
    <>
        <div ref={ref} id="menu" className="hidden fixed bg-slate-100 border border-gray-soft/70 shadow rounded-xl inset-y-3 inset-x-3 transform min-w-fit max-w-[5vw] 2xl:max-w-[2vw] h-[35vh] z-10 md:flex md:flex-col justify-evenly px-2 py-3">
        <DesktopMenuItem icon={<HiHome />} href="/dashboard" title="Dashboard"/>
        <DesktopMenuItem icon={<HiUser />} href="/contacts" title="Contactos"/>
        <DesktopMenuItem icon={<HiTv />} href="/accounts" title="Cuentas"/>
        <DesktopMenuItem icon={<HiUserCircle />} href="/profile" title="Perfil"/>
        </div>
    </>
    )
});

DesktopMenu.displayName = "DesktopMenu";