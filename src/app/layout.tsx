import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Generador de imágenes con Dall-E 2',
   description: 'Generador de imágenes con Dall-E 2 - Genera imágenes a partir de texto en español o inglés',
   keywords: "generador de imágenes, dall-e 2, developers in action",
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
         <body className={inter.className}>{children}</body>
      </html>
   )
}
