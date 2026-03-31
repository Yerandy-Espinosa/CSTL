'use client';

import React from 'react';
import { 
  getDashboardStats, 
  BOOKINGS, 
  getWeeklyBookingData,
  getTopPrograms
} from '@/lib/data';
import { 
  Calendar, ClipboardCheck, AlertCircle, TrendingUp, 
  Plus, Users, School as SchoolIcon, DollarSign,
  ChevronRight, ArrowUpRight, Play, Briefcase,
  Zap, MapPin,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import PageTransition from '@/components/layout/PageTransition';

export default function DashboardPage() {
  const stats = getDashboardStats();
  const weeklyData = getWeeklyBookingData();
  const topPrograms = getTopPrograms();

  const recentBookings = BOOKINGS.filter(b => b.status !== 'completed').slice(0, 4);

  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900 pb-20">
        
        <header className="page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-1">
            <h1>Center Overview</h1>
            <p>Welcome back. Operational systems are stable.</p>
          </div>
          <div className="flex gap-4 mb-2">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all shadow-sm hover:shadow-lg hover:bg-slate-50 active:scale-95">
                <DollarSign size={16} className="text-sky-500" /> Export Data
             </button>
             <Link href="/bookings/new" className="nav-cta !py-2.5">
                <div className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full">
                  <Plus size={14} strokeWidth={3} />
                </div>
                New Booking
             </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Scheduled Trips" 
            value={stats.upcomingTrips} 
            icon={<Calendar size={22} />} 
            color="sky" 
            badge="Active"
          />
          <StatCard 
            label="Pending Confirm" 
            value={stats.pendingConfirmations} 
            icon={<ClipboardCheck size={22} />} 
            color="amber" 
            badge="Unchecked"
          />
          <StatCard 
            label="Total Arrears" 
            value={`$${stats.outstandingBalance.toLocaleString()}`} 
            icon={<DollarSign size={22} />} 
            color="rose" 
            trend="+12% MoM"
          />
          <StatCard 
            label="School Partners" 
            value={stats.schoolsOnRecord} 
            icon={<SchoolIcon size={22} />} 
            color="emerald" 
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
             <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-premium overflow-visible">
              <div className="flex justify-between items-center mb-10">
                <h2 className="flex items-center gap-3 mb-0 uppercase tracking-tight leading-none">
                  <Zap size={24} className="text-sky-500 fill-sky-500/10" /> Upcoming Queue
                </h2>
                <Link href="/bookings" className="text-[10px] font-bold text-sky-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                   View Portfolio <ChevronRight size={12} />
                </Link>
              </div>
              
              <div className="flex flex-col gap-4">
                {recentBookings.map((booking, idx) => (
                  <div key={idx} className="group flex items-center justify-between p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all cursor-pointer shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-6 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-slate-900 flex flex-col items-center justify-center text-white shrink-0 shadow-lg group-hover:bg-sky-600 transition-colors">
                        <span className="text-[10px] font-bold uppercase opacity-60 leading-none mb-1">{booking.programDate.split('-')[1] === '08' ? 'AUG' : 'SEP'}</span>
                        <span className="text-xl font-bold leading-none">{booking.programDate.split('-')[2]}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 text-lg tracking-tight leading-tight mb-1 truncate">{booking.school?.name}</div>
                        <div className="text-[11px] font-medium text-slate-400 flex items-center gap-2">
                           <MapPin size={12} className="text-sky-500" /> Main Campus
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 shrink-0">
                       <div className="hidden sm:block text-right">
                          <div className="text-lg font-bold text-slate-900 tabular-nums leading-none mb-1">{booking.lineItems[0]?.studentCount}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Students</div>
                       </div>
                       <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border
                         ${booking.status === 'confirmed' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
                         {booking.status}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform"></div>
                  <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-500 mb-8 leading-none flex items-center gap-2">
                     <TrendingUp size={14} className="text-sky-500" /> Session Velocity
                  </h3>
                  <div className="flex items-end gap-3 h-32 mb-8 px-2">
                    {weeklyData.slice(-6).map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar h-full justify-end">
                        <div 
                          className="w-full bg-sky-500/10 group-hover/bar:bg-sky-500/80 rounded-t-lg rounded-b-sm transition-all relative overflow-hidden" 
                          style={{ height: `${Math.max((d.bookings / 6) * 100, 10)}%` }}
                        >
                           <div className="absolute inset-0 bg-gradient-to-t from-sky-600/20 to-transparent"></div>
                           <div className="absolute top-0 left-0 w-full h-1 bg-sky-400 group-hover/bar:bg-white transition-colors"></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 group-hover/bar:text-slate-300 uppercase tracking-tighter transition-colors">{d.week.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 italic">Historical booking frequency — Summer Peak.</p>
               </div>

               <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium">
                  <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-8 leading-none flex items-center gap-2">
                     <Zap size={14} className="text-sky-500" /> Operational Health
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-3">
                         <span className="text-slate-600">System Uptime</span>
                         <span className="text-sky-600">100%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 w-full shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-4 p-4 bg-sky-50/50 rounded-2xl border border-sky-100/50">
                       <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-sky-600 shadow-sm">
                          <Briefcase size={20} />
                       </div>
                        <p className="text-sm font-semibold text-sky-900 leading-tight">All records synced was verified at 14:30 EST today.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <aside className="w-full xl:w-[320px] flex flex-col gap-8 shrink-0">
             <div className="glass-card p-8 border border-slate-100 shadow-premium flex flex-col gap-6">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-2 px-2 leading-none">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                   <ActionButton icon={<AlertCircle size={20} />} label="Unpaid Balances" color="rose" href="/reports" />
                   <ActionButton icon={<FileText size={20} />} label="Open Invoices" color="sky" href="/invoices" />
                   <ActionButton icon={<SchoolIcon size={20} />} label="School Directory" color="emerald" href="/schools" />
                   <ActionButton icon={<TrendingUp size={20} />} label="Daily Snapshot" color="slate" href="/reports" />
                </div>
             </div>

             <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-125 transition-transform"></div>
                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2 leading-none">
                   <TrendingUp size={14} className="text-sky-500" /> Internal Intelligence
                </h3>
                <p className="text-xl font-semibold leading-snug mb-8 text-slate-100 tracking-tight">
                  &ldquo;School district participation from Garden City is up 12.4% this quarter, largely driven by Fossil Discovery program demand.&rdquo;
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sky-400 group-hover:translate-x-2 transition-transform">
                   View Analytics <ChevronRight size={14} />
                </div>
             </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}

function StatCard({ label, value, icon, color, trend, badge }: any) {
  const colors: any = {
    sky: 'text-sky-600 bg-sky-50 border-sky-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    rose: 'text-rose-600 bg-rose-50 border-rose-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    slate: 'text-slate-600 bg-slate-50 border-slate-100',
  };

   return (
    <div className="relative group glass-card p-8 border border-white/50 shadow-premium hover:shadow-xl transition-all overflow-visible flex flex-col justify-between min-h-[180px]">
      {badge && (
        <div className="absolute -top-3 right-6 px-3 py-1 bg-slate-900 rounded-full text-white text-[9px] font-bold uppercase tracking-widest shadow-lg z-20">
          {badge}
        </div>
      )}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${colors[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 ml-auto">
            {trend} <ArrowUpRight size={12} />
          </span>
        )}
      </div>
      <div>
        <div className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
          {value}
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
          {label}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, color, href }: any) {
  const colors: any = {
    sky: 'text-sky-500 bg-sky-50 group-hover:bg-sky-500 group-hover:text-white',
    amber: 'text-amber-500 bg-amber-50 group-hover:bg-amber-500 group-hover:text-white',
    rose: 'text-rose-500 bg-rose-50 group-hover:bg-rose-500 group-hover:text-white',
    emerald: 'text-emerald-500 bg-emerald-50 group-hover:bg-emerald-500 group-hover:text-white',
    slate: 'text-slate-500 bg-slate-50 group-hover:bg-slate-500 group-hover:text-white',
  };

  return (
    <Link href={href} className="group p-6 bg-slate-50 hover:bg-white rounded-3xl border border-slate-50 hover:border-slate-200 hover:shadow-lg transition-all flex flex-col items-center text-center gap-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${colors[color]}`}>
        {icon}
      </div>
      <span className="text-[9px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-widest leading-tight">
        {label}
      </span>
    </Link>
  );
}

function FileText({ size, className }: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}
