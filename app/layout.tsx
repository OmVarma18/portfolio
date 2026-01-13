
import { generateMetadata as getMetadata } from '@/config/Meta';
import { ThemeProvider } from "@/components/common/ThemeProviders";
import ReactLenis from 'lenis/react';
import { ViewTransitions } from "next-view-transitions";
import Navbar from '@/components/common/NavBar';

import "./globals.css";
import Footer from '@/components/common/Footer';



export const metadata = getMetadata('/')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-hanken  antialiased `}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ReactLenis root>
              <Navbar />
              {children}
              <Footer />
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
