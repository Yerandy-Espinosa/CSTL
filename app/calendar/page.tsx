'use client';

import React, { useState } from 'react';
import { BOOKINGS } from '@/lib/data';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Search, Plus, Filter, Users, MapPin, Clock,
  CheckCircle2, AlertCircle, CalendarDays, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import PageTransition from '@/components/layout/PageTransition';

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date('2026-08-01'));
  
  // Simulation: Filter bookings for the selected month
  const monthBookings = BOOKINGS.filter(b => b.programDate.startsWith('2026-08'));

  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900 pb-20">
        <header className="page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-1">
            <h1>Operational Calendar</h1>
            <p>Strategic scheduling and resource allocation.</p>
          </div>
          <div className="flex gap-4 mb-2">
            <button className="btn-secondary">Day View</button>
            <button className="nav-cta">
              <Plus size={18} strokeWidth={3} /> New Entry
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           
           <div className="lg:col-span-9 flex flex-col gap-8">
              <div className="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden">
                 <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-6">
                       <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-600 hover:border-sky-600 hover:shadow-lg transition-all shadow-sm">
                          <ChevronLeft size={20} />
                       </button>
                       <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tighter tabular-nums leading-none mb-0">August 2026</h2>
                       <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-600 hover:border-sky-600 hover:shadow-lg transition-all shadow-sm">
                          <ChevronRight size={20} />
                       </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                          <div key={d} className="w-10 text-center text-[9px] font-black text-slate-300 uppercase tracking-widest">{d}</div>
                        ))}
                     </div>
                 </div>

                 <div className="p-4 sm:p-6 grid grid-cols-7 gap-3 sm:gap-4 bg-white">
                    {Array.from({ length: 31 }).map((_, i) => {
                       const dayNum = i + 1;
                       const dateStr = `2026-08-${dayNum.toString().padStart(2, '0')}`;
                       const dayBookings = monthBookings.filter(b => b.programDate === dateStr);
                       
                       return (
                         <div key={i} className={`min-h-[110px] sm:min-h-[150px] bg-white border rounded-2xl p-4 flex flex-col transition-all hover:bg-slate-50/50 hover:shadow-xl hover:border-sky-200 cursor-default group/day
                           ${dayBookings.length > 0 ? 'border-sky-100 ring-1 ring-sky-50 shadow-sm' : 'border-slate-100'}`}>
                            <div className="flex justify-between items-center mb-3">
                               <span className={`text-sm font-bold ${dayBookings.length > 0 ? 'text-sky-600' : 'text-slate-300'} group-hover/day:text-sky-600 transition-colors`}>{dayNum}</span>
                               {dayBookings.length > 0 && <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.6)] animate-pulse"></span>}
                            </div>
                            
                            <div className="space-y-2 flex-1 min-w-0">
                                {dayBookings.map(b => (
                                  <div key={b.id} className="p-2 rounded-lg bg-sky-50 border border-sky-100 text-[8px] font-black text-sky-700 truncate leading-none uppercase tracking-tight hover:bg-sky-600 hover:text-white transition-all transform hover:scale-[1.03] shadow-sm">
                                     {b.school?.name}
                                  </div>
                                ))}
                             </div>
                         </div>
                       );
                    })}
                 </div>
              </div>
           </div>

           <aside className="lg:col-span-3 flex flex-col gap-8">
              <div className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-8 leading-none flex items-center gap-2 relative z-10">
                   <AlertCircle size={14} className="text-rose-500" /> System Alerts
                </h3>
                <div className="space-y-8 relative z-10">
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                      <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mb-3 leading-none italic shadow-sm">Resource Cap Warning</p>
                      <p className="text-[12px] font-semibold text-slate-300 leading-relaxed tracking-tight">Aug 03 is at 340 students. Manual staff allocation required.</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                      <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mb-3 leading-none italic shadow-sm">Campus Status</p>
                      <p className="text-[12px] font-semibold text-slate-300 leading-relaxed tracking-tight">Main Exhibit Closure: <br/><span className="text-slate-500">Aug 15-16.</span></p>
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 border border-slate-100 shadow-premium flex flex-col gap-5">
                <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4 px-2 leading-none uppercase">Tools & Syncs</h3>
                <button className="w-full flex items-center justify-between px-6 py-5 bg-white border border-slate-200 rounded-2xl font-bold text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all group shadow-sm">
                   Connect Outlook
                   <ExternalLink size={16} className="text-slate-300 group-hover:text-sky-600 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between px-6 py-5 bg-white border border-slate-200 rounded-2xl font-bold text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all group shadow-sm">
                   Staff Scheduler
                   <Users size={16} className="text-slate-300 group-hover:text-sky-600 transition-colors" />
                </button>
             </div>
           </aside>

        </div>
      </div>
    </PageTransition>
  );
}
