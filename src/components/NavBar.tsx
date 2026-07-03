"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 h-[68px] w-full bg-white/80 backdrop-blur-md border-b border-transparent transition-colors duration-200" id="navbar">
      <div className="mx-auto max-w-7xl px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <img 
            src="/logo-full.svg" 
            alt="DCDeploy" 
            className="h-8 w-auto transition-transform group-hover:scale-105" 
          />
        </Link>

        {/* Center Pill Navigation */}
        <nav className="hidden md:flex items-center bg-[#F1F5F9] border border-border-default rounded-full p-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-brand rounded-full shadow-[0_2px_8px_rgba(14,84,135,0.3)]'
                    : 'text-text-muted hover:text-brand'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="https://dash.dcdeploy.com" className="hidden sm:inline-flex text-[15px] font-medium text-text-body hover:text-brand transition-colors">
            Log In
          </Link>
          <Link href="https://dash.dcdeploy.com" className="inline-flex items-center justify-center bg-[#fcb817] text-[#0F172A] rounded-full px-5 py-2 font-semibold text-[15px] hover:bg-[#e5a515] transition-colors shadow-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
