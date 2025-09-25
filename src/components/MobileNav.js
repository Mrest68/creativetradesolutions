"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label="Toggle menu"
        className="p-2 text-white bg-transparent rounded-none"
      >
        {open ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 z-50 bg-black/95 backdrop-blur-lg p-4 border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-auto safe-top">
          <nav className="flex flex-col gap-3">
            <Link href="/services" onClick={() => setOpen(false)} className="block px-4 py-3 text-white/90 rounded-md hover:bg-white/5">Services</Link>
            <Link href="/projects" onClick={() => setOpen(false)} className="block px-4 py-3 text-white/90 rounded-md hover:bg-white/5">Projects</Link>
            <Link href="/get-started" onClick={() => setOpen(false)} className="block px-4 py-3 text-white/90 rounded-md hover:bg-white/5">Pricing</Link>
            <Link href="/#contact" onClick={() => setOpen(false)} className="block px-4 py-3 text-white/90 rounded-md hover:bg-white/5">Contact</Link>
            <a href="tel:+19548708668" onClick={() => setOpen(false)} className="block px-4 py-3 text-white/90 rounded-md hover:bg-white/5">Call: +1 (954) 870-8668</a>
          </nav>
        </div>
      )}
    </div>
  );
}
