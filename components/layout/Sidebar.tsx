'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Plus, 
  CalendarCheck, 
  Building2, 
  CalendarDays, 
  BarChart3, 
  FileText, 
  Settings,
  Microscope
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Bookings', icon: CalendarCheck, href: '/bookings' },
    { name: 'Schools', icon: Building2, href: '/schools' },
    { name: 'Calendar', icon: CalendarDays, href: '/calendar' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
    { name: 'Invoices', icon: FileText, href: '/invoices' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="flex items-center gap-2 mb-1">
          <Microscope className="text-sky-500" size={24} />
          <h1>CSTL</h1>
        </div>
        <p>Center for Science Teaching and Learning</p>
      </div>

      <div className="px-6 mb-8 flex transition-all">
        <Link href="/bookings/new" className="nav-cta w-full !py-3">
          <div className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full">
            <Plus size={14} strokeWidth={3} />
          </div>
          New Booking
        </Link>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
}
