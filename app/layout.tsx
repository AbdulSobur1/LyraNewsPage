import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { inter, playfair } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LyraNews — Global News Platform",
    template: "%s — LyraNews",
  },
  description:
    "Your trusted source for breaking news, in-depth analysis, and global perspectives across politics, business, technology, and culture.",
  openGraph: {
    title: "LyraNews — Global News Platform",
    description:
      "Your trusted source for breaking news, in-depth analysis, and global perspectives.",
    siteName: "LyraNews",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent FOUC: set dark class immediately if no system/ stored pref */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-midnight text-text-primary antialiased">
        <ThemeProvider>
          <SessionProvider>
            <div id="app-root" className="flex min-h-screen flex-col">
              {children}
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
