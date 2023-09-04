import './globals.css'
import { Montserrat } from 'next/font/google'
import { Providers } from '@/app/providers'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: "Strimin",
    template: "%s | Strimin"
  },
  description: 'Strimin, CRM App for Streaming Re-sellers Client Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
