'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SCHOOLS, BOOKINGS, CONTACTS } from '@/lib/data';
import { formatCurrencyFull } from '@/lib/pricing';
import { 
  Building2, MapPin, GraduationCap, Phone, Mail, 
  ChevronRight, ArrowLeft, History, DollarSign,
  TrendingUp, CalendarDays, ExternalLink,
  Plus, Search, UserCircle2, ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import PageTransition from '@/components/layout/PageTransition';

export default function SchoolProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const school = SCHOOLS.find(s => s.id === id);
  const bookings = BOOKINGS.filter(b => b.schoolId === id);
  const contacts = CONTACTS.filter(c => c.schoolId === id);

  if (!school) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <AlertCircle size={48} className="mb-4" />
        <p className="text-xl font-bold uppercase tracking-widest">School Not Found</p>
        <button onClick={() => router.back()} className="mt-8 text-sky-500 font-black uppercase text-xs tracking-widest hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900 pb-20 overflow-visible">
        
        <header className="flex flex-col gap-6">
           <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:text-sky-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm w-fit">
              <ArrowLeft size={14} /> Back to Directory
           </button>
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="flex flex-col gap-1">
                 <h1 className="text-3xl lg:text-4xl font-bold tracking-tight leading-none uppercase mb-0">
                    {school.name}
                 </h1>
                 <p className="text-slate-500 font-medium text-base italic flex items-center gap-2 uppercase tracking-wide">
                    <MapPin size={16} className="text-sky-500" /> {school.district} District
                 </p>
              </div>
              <div className="flex gap-3 mb-1">
                 <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                    <ExternalLink size={14} /> Website
                 </button>
                 <Link href={`/bookings/new?schoolId=${school.id}`} className="flex items-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest shadow-lg shadow-sky-600/20 active:scale-95 transition-all">
                    <Plus size={16} /> Book Visit
                 </Link>
              </div>
           </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
           
           <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <StatCard 
                   label="Historical Revenue" 
                   value={formatCurrencyFull(school.totalRevenue)} 
                   icon={<DollarSign size={20} />} 
                   color="emerald" 
                 />
                 <StatCard 
                   label="Total Field Trips" 
                   value={bookings.length} 
                   icon={<History size={20} />} 
                   color="sky" 
                 />
                 <StatCard 
                   label="Status" 
                   value="ACTIVE" 
                   icon={<ShieldCheck size={20} />} 
                   color="slate" 
                 />
              </div>

              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-100 shadow-premium">
                 <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2 leading-none">
                    <CalendarDays size={14} className="text-sky-500" /> Operational History
                 </h3>
                 <div className="divide-y divide-slate-50">
                    {bookings.length > 0 ? bookings.map(booking => (
                      <div key={booking.id} className="py-6 flex justify-between items-center group first:pt-0">
                         <div className="flex items-center gap-5">
                            <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-400 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                               <span className="text-[8px] font-bold leading-none mb-1 uppercase tracking-tighter">AUG</span>
                               <span className="text-lg font-bold leading-none tabular-nums">{booking.programDate.split('-')[2]}</span>
                            </div>
                            <div>
                               <p className="font-bold text-slate-900 uppercase tracking-tight leading-none mb-1 text-sm italic group-hover:text-sky-600 transition-colors">{booking.lineItems[0]?.program?.name || 'Various'}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{booking.lineItems.reduce((acc, curr) => acc + curr.studentCount, 0)} Students</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="font-bold text-base text-slate-900 tabular-nums group-hover:text-sky-600 transition-colors">{formatCurrencyFull(booking.totalDue || 0)}</div>
                            <span className={`px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest border
                              ${booking.status === 'confirmed' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-slate-400 bg-slate-50 border-slate-200'}`}>
                              {booking.status}
                            </span>
                         </div>
                      </div>
                    )) : (
                      <div className="py-10 text-center text-slate-400 italic font-medium uppercase text-[10px] tracking-widest">
                         No trip history currently recorded.
                      </div>
                    )}
                 </div>
              </div>
           </div>

           <aside className="w-full lg:w-[360px] flex flex-col gap-8 shrink-0">
              <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-8 leading-none flex items-center gap-2 relative z-10">
                   <UserCircle2 size={14} className="text-sky-500" /> Registry Contacts
                </h3>
                <div className="space-y-4 relative z-10">
                   {contacts.map(contact => (
                     <div key={contact.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                        <p className="text-sm font-bold uppercase leading-none mb-1">{contact.name}</p>
                        <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mb-4">{contact.role}</p>
                        <div className="space-y-3">
                           <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 tracking-tight">
                              <Mail size={12} className="text-sky-500" /> {contact.email}
                           </div>
                           <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 tracking-tight">
                              <Phone size={12} className="text-sky-500" /> {contact.phone}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-premium flex flex-col gap-3">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-2 px-2 leading-none">District Logistics</h3>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-[10px] font-medium text-slate-500 leading-relaxed uppercase tracking-tight">
                   &ldquo;{school.notes || "Standard CSTL operational protocol applies. No special notes recorded for this institution."}&rdquo;
                </div>
              </div>
           </aside>

        </div>
      </div>
    </PageTransition>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const colors: any = {
    sky: 'text-sky-600 bg-sky-50 border-sky-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    slate: 'text-slate-600 bg-slate-50 border-slate-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium flex flex-col gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]} shadow-inner`}>
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold text-slate-900 leading-none tabular-nums mb-1 uppercase tracking-tight">{value}</div>
        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</div>
      </div>
    </div>
  );
}
