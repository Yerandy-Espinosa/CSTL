'use client';

import React, { useState } from 'react';
import { BOOKINGS, SCHOOLS } from '@/lib/data';
import { formatCurrencyFull } from '@/lib/pricing';
import { 
  Calendar, Search, Filter, Plus, ChevronRight, 
  MapPin, Clock, Users, ArrowUpRight, GraduationCap,
  CalendarDays, CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import Link from 'next/link';
import PageTransition from '@/components/layout/PageTransition';

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = BOOKINGS.filter(booking => {
    const matchesSearch = (booking.school?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (booking.school?.district || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.programDate).getTime() - new Date(a.programDate).getTime());

  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900 pb-20">
        <header className="page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-1">
            <h1>Field Trip Bookings</h1>
            <p>The central operational queue for all scheduled visits.</p>
          </div>
          <Link href="/bookings/new" className="nav-cta mb-1">
            <Plus size={18} strokeWidth={3} /> New Trip Booking
          </Link>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
            
            <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-premium focus-within:ring-4 focus-within:ring-sky-500/5 focus-within:border-sky-500 transition-all">
              <Search size={20} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by school or district..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-sm font-semibold bg-transparent placeholder:text-slate-300"
              />
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-100">
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Queue Size</span>
                 <span className="px-2 py-1 rounded-lg bg-slate-900 text-white text-[9px] font-bold leading-none">{filteredBookings.length}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['all', 'confirmed', 'pending', 'hold'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all
                    ${statusFilter === status 
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' 
                      : 'bg-white text-slate-400 hover:text-slate-800 border border-slate-200 shadow-sm'}`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100">
              <div className="divide-y divide-slate-50">
                {filteredBookings.length > 0 ? filteredBookings.map(booking => (
                  <div 
                    key={booking.id} 
                    className="p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between hover:bg-slate-50/80 transition-all cursor-pointer gap-6 group"
                  >
                    <div className="flex items-start gap-6 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-slate-900 flex flex-col items-center justify-center text-white shrink-0 shadow-xl group-hover:bg-sky-600 transition-all transform group-hover:scale-105">
                        <span className="text-[9px] font-bold uppercase opacity-60 leading-none mb-1 shadow-sm">AUG</span>
                        <span className="text-xl font-bold leading-none">{booking.programDate.split('-')[2]}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-lg tracking-tight leading-none group-hover:text-sky-600 transition-colors uppercase tabular-nums mb-0">
                            {booking.lineItems?.[0]?.program?.name || 'Various Programs'}
                          </h3>
                          <span className={`badge badge-dot badge-${booking.status} text-[9px] font-bold border border-current/10 shadow-sm`}>{booking.status}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-wide uppercase mb-4">
                           <GraduationCap size={14} className="text-sky-500" /> <span className="text-slate-600">{booking.school?.name}</span> 
                           <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                           <span className="text-slate-400">{booking.school?.district}</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                           <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white shadow-sm px-3 py-1.5 rounded-xl border border-slate-100">
                              <Users size={12} className="text-sky-500" /> {booking.lineItems?.[0]?.studentCount || 0} Pupils
                           </div>
                           <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white shadow-sm px-3 py-1.5 rounded-xl border border-slate-100">
                              <Clock size={12} className="text-sky-500" /> {booking.arrivalTime} Arrival
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 shrink-0 pr-2">
                      <div className="font-bold text-3xl text-slate-900 tracking-tight leading-none tabular-nums group-hover:text-sky-600 transition-colors">
                        {formatCurrencyFull(booking.totalDue || 0)}
                      </div>
                      <Link href={`/bookings/${booking.id}`} className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-sky-600 hover:border-sky-600 hover:shadow-xl transition-all shadow-sm" onClick={(e) => e.stopPropagation()}>
                         <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div className="p-32 text-center animate-fade-in-up">
                     <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                        <Calendar size={56} />
                     </div>
                     <p className="font-black text-slate-900 text-2xl tracking-tight mb-3 uppercase leading-none">No bookings found</p>
                     <p className="text-xs font-black text-slate-400 tracking-widest uppercase">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-[320px] flex flex-col gap-8 shrink-0">
             <div className="glass-card p-8 border border-slate-100 shadow-premium flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl"></div>
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-0 flex items-center gap-2 leading-none">
                  <Clock size={14} className="text-sky-500" /> Operational Context
                </h3>
                <div className="space-y-6 relative z-10">
                   <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900 shadow-2xl border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                         <AlertCircle size={18} className="text-sky-500" />
                      </div>
                      <div>
                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 leading-none shadow-sm text-sky-400">Resource Alert</p>
                         <p className="text-[11px] font-bold text-slate-300 leading-relaxed uppercase tracking-tight italic">August 3rd and 19th are currently at max student capacity (300+).</p>
                      </div>
                   </div>
                   
                   <div className="flex flex-col gap-4 pt-1">
                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm px-5">
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Holds</span>
                         <span className="font-bold text-rose-500 text-lg">3</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm px-5">
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Deposit</span>
                         <span className="font-bold text-amber-500 text-lg">12</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm px-5">
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Avg Size Trip</span>
                         <span className="font-bold text-sky-600 text-lg tracking-tight tabular-nums">~84</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group cursor-pointer active:scale-95 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform text-white"></div>
                <h3 className="font-bold text-[9px] uppercase tracking-widest text-slate-500 mb-6 leading-none">Internal Logistics</h3>
                <div className="flex flex-col gap-3 relative z-10">
                   <button className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-[9px] uppercase tracking-widest text-white border border-white/5 transition-all group/btn text-left shadow-premium">
                      Bulk Confirmation
                      <CheckCircle2 size={14} className="text-sky-500 group-hover/btn:scale-110 transition-transform" />
                   </button>
                   <button className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-[9px] uppercase tracking-widest text-white border border-white/5 transition-all group/btn text-left shadow-premium">
                      Daily Staff List
                      <Users size={14} className="text-sky-500 group-hover/btn:scale-110 transition-transform" />
                   </button>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
