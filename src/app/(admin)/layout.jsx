import { MobileMenu } from "@/components/menus/MobileMenu"

export default function RootLayout({children}) {
    return (
    <>
        <main className="h-screen w-full relative bg-slate-100">
            {children}
            <MobileMenu />
        </main>
    </>
    )
}