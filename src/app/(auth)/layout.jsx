import Image from "next/image"

export default function RootLayout({ children, props }) {
  console.log(props)
    return (
      <main className="bg-gradient-radial from-neon-purple/70 to-neon-blue/70 backdrop-brightness-50 min-h-screen w-full py-4 px-6">

        <div className="relative h-[20vh] font-sans">
          <Image src="/strimin-logo-white.svg" alt="Strimin SVG Illustration" width={100} height={100} />
        </div>
        <section className="bg-white/20 backdrop-opacity-[30px] w-[90vw] md:w-full backdrop-blur-xl backdrop-invert p-4 min-h-[75vh] md:min-h-[50vh] md:self-center font-sans rounded shadow md:grid md:grid-cols-2 md:gap-4">
          <div className="hidden md:block bg-[url('/login_image.jpg')] h-[70vh] bg-cover bg-right bg-no-repeat rounded"></div>
            {children}
        </section>
      </main>
    )
  }