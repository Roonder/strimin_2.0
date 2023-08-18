import Image from "next/image"

export default function RootLayout({ children }) {
    return (
      <main className="bg-gradient-radial from-neon-purple/70 to-neon-blue/70 backdrop-brightness-50 min-h-screen w-full py-4 px-6">

        <div className="relative h-[20vh] font-sans">
          <Image src="/strimin-logo-white.svg" alt="Strimin SVG Illustration" width={100} height={100} className=""/>
        </div>
        <section className="bg-white/20 backdrop-opacity-[30px] w-[90vw] backdrop-blur-xl backdrop-invert p-4 min-h-[75vh] font-sans rounded shadow">
          {children}
        </section>
      </main>
    )
  }