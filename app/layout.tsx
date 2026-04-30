import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { FavoritesProvider } from '@/lib/favorites';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Pokédex Lite — Explore the World of Pokémon',
  description: 'A beautiful, fast Pokédex built with Next.js. Search, filter, and discover all Pokémon.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#0f0f1e', color: 'white', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
        <AuthProvider>
          <FavoritesProvider>
            <Navbar />
            <main>{children}</main>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
