import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'S.H.A.D.O.W',
  description: 'AI-assisted media credibility analysis',
  icons: {
    icon: '/images/shadow.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
