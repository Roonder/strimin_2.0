import { MobileMenu } from "@/components/menus/MobileMenu"
import { DesktopMenu } from "@/components/menus/DesktopMenu"

export default function RootLayout({children}) {
    return (
    <>
        <main className="h-screen w-full relative bg-slate-100 md:pl-[5rem] md:pr-[1rem] md:py-4">
            {children}
            <MobileMenu />
            <DesktopMenu />
        </main>
    </>
    )
}