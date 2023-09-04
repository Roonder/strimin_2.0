"use client"
import { forwardRef, useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { computePosition } from "@floating-ui/react";
import { HiHome, HiUser, HiTv, HiEllipsisHorizontalCircle, HiMiniArrowRightOnRectangle, HiUserCircle} from "react-icons/hi2";
import Link from "next/link";
import { MobileMenuItem } from "@/components/utils/MobileMenuItem";

export const MobileMenu = forwardRef(({
    className = "",
    ...props
}, ref) => {

    return (
    <>
        <div ref={ref} id="menu" className="md:hidden fixed bg-slate-100 border border-gray-soft/70 shadow rounded-xl bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[90vw] z-10 flex justify-evenly px-2 py-3">
            <MobileMenuItem icon={<HiHome />} href="/dashboard" title="Dashboard"/>
            <MobileMenuItem icon={<HiUser />} href="/contacts" title="Contactos"/>
            <MobileMenuItem icon={<HiTv />} href="/accounts" title="Cuentas"/>
            <MobileMenuItem icon={<HiUserCircle />} href="/profile" title="Perfil"/>

        </div>
    </>
    )
});

MobileMenu.displayName = "MobileMenu";