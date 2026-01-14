
import { generateMetadata as getMetadata } from '@/config/Meta';
import { ThemeProvider } from "@/components/common/ThemeProviders";
import ReactLenis from 'lenis/react';
import { ViewTransitions } from "next-view-transitions";
import Navbar from '@/components/common/NavBar';

import "./globals.css";
import Footer from '@/components/common/Footer';



import { getPublishedBlogPosts } from '@/lib/blog';
import { projects } from '@/config/Project';

import { TooltipProvider } from "@/components/ui/tooltip";

import PageTransition from '@/components/common/PageTransition';
import PageTracker from '@/components/common/PageTracker';
import { Toaster } from "@/components/ui/sonner";
import { Quote } from '@/components/common/Quote';

export const metadata = getMetadata('/')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getPublishedBlogPosts();

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-hanken  antialiased `}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TooltipProvider>
              <ReactLenis root>
                <PageTracker />
                <Navbar projects={projects} posts={posts} />
                <PageTransition>
                  {children}
                </PageTransition>
                <Quote />
                <Footer />
                <Toaster position="top-right" />
              </ReactLenis>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
