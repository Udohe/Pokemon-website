import type { Metadata } from 'next';
import '../styles/globals.css'
import { AuthProvider } from '@/lib/auth';
import { FavoritesProvider } from '@/lib/favorites';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Pokédex Lite — Explore the World of Pokémon',
  description: 'A beautiful, fast Pokédex built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body style={{ background: '#0f0f1e', color: '#fff' }}>
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
