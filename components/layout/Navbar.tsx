'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';

const NAV_LINKS = [
  { href: '/', label: 'Pokédex' },
  { href: '/compare', label: '⚔️ Compare' },
  { href: '/favorites', label: '❤️ Favorites' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="sticky top-0 z-40 px-4 py-3"
        style={{
          background: 'rgba(15,15,30,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="#E53935" stroke="#0f0f1e" strokeWidth="4"/>
                <path d="M2 50 Q2 22 22 10 Q38 2 50 2 L50 98 Q22 98 6 80 Q2 70 2 50Z" fill="#B71C1C"/>
                <rect x="2" y="46" width="96" height="8" fill="#0f0f1e"/>
                <circle cx="50" cy="50" r="14" fill="#0f0f1e"/>
                <circle cx="50" cy="50" r="9" fill="white"/>
                <circle cx="50" cy="50" r="5" fill="#E0E0E0"/>
              </svg>
            </div>
            <span className="text-white font-black text-lg tracking-tight group-hover:text-red-400 transition-colors">
              Pokédex <span className="text-white/30 font-light text-base">Lite</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-2 rounded-xl text-sm transition-colors"
                  style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.5)' }}
                >
                  {isActive && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.08)' }} />
                  )}
                  <span className="relative z-10">{label}</span>
                  {href === '/favorites' && favorites.size > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: '#E53935', color: 'white' }}>
                      {favorites.size}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block relative">
              {user ? (
                <>
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors hover:bg-white/10">
                    {user.avatar
                      ? <img src={user.avatar} alt={user.username} className="w-7 h-7 rounded-full" />
                      : <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">{user.username[0].toUpperCase()}</div>
                    }
                    <span className="text-white text-sm max-w-[100px] truncate">{user.username}</span>
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)}/>
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden z-20"
                          style={{ background: '#1a1a3e', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}
                        >
                          <div className="p-3 border-b border-white/5">
                            <p className="text-white text-sm font-semibold truncate">{user.username}</p>
                            <p className="text-white/40 text-xs truncate">{user.email}</p>
                            {user.provider && user.provider !== 'credentials' && (
                              <span className="mt-1 inline-block text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40 capitalize">via {user.provider}</span>
                            )}
                          </div>
                          <Link href="/favorites" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                            ❤️ My Favorites
                            {favorites.size > 0 && <span className="ml-auto text-xs text-white/40">{favorites.size}</span>}
                          </Link>
                          <button onClick={() => { logout(); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors">
                            Sign out
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/auth/login" className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all">Sign in</Link>
                  <Link href="/auth/signup" className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: '#E53935' }}>Sign up</Link>
                </div>
              )}
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/10 transition-colors">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="w-5 h-0.5 bg-white block rounded-full origin-center"/>
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} className="w-5 h-0.5 bg-white block rounded-full"/>
              <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="w-5 h-0.5 bg-white block rounded-full origin-center"/>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}/>
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-72 md:hidden flex flex-col"
              style={{ background: '#1a1a3e', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/6">
                <span className="text-white font-black text-lg">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/60">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={href} href={href}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors"
                      style={{ background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent', color: isActive ? 'white' : 'rgba(255,255,255,0.6)' }}>
                      {label}
                      {href === '/favorites' && favorites.size > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: '#E53935', color: 'white' }}>{favorites.size}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="p-4 border-t border-white/6">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-2 py-2">
                      {user.avatar
                        ? <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full"/>
                        : <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">{user.username[0].toUpperCase()}</div>
                      }
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{user.username}</p>
                        <p className="text-white/40 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={logout} className="w-full py-2.5 rounded-xl text-sm text-red-400 font-medium transition-colors hover:bg-red-500/10" style={{ border: '1px solid rgba(229,57,53,0.2)' }}>
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/login" className="block w-full py-2.5 rounded-xl text-sm text-center text-white/70 font-medium" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>Sign in</Link>
                    <Link href="/auth/signup" className="block w-full py-2.5 rounded-xl text-sm text-center text-white font-bold hover:opacity-90" style={{ background: '#E53935' }}>Create account</Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
