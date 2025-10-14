"use client";
import Link from 'next/link';

export default function CTAButton() {
  return (
    <Link 
      href="/#contact" 
      className="ml-4 px-6 py-2 rounded-none font-medium text-white border-2 transition-all duration-300"
      style={{backgroundColor: '#ff5760', borderColor: '#ff5760'}}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#e4454d'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#ff5760'}
    >
      Get Started
    </Link>
  );
}