'use client';

import React, { useState } from 'react';
import { SCHOOLS } from '@/lib/data';
import { 
  Building2, Search, Filter, Plus, ChevronRight, 
  MapPin, GraduationCap, Phone, Mail, Globe,
  ShieldCheck, AlertCircle, ListFilter, DollarSign, FileText
} from 'lucide-react';
import Link from 'next/navigation';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/layout/PageTransition';

export default function SchoolsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');

  const districts = ['all', ...Array.from(new Set(SCHOOLS.map(s => s.district)))];

  const filteredSchools = SCHOOLS.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          school.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || school.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900 pb-20">
        <header className="page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-1">
            <h1>School Directory</h1>
            <p>The authoritative register of CSTL partner institutions.</p>
          </div>
          <button className="nav-cta mb-1">
            <Plus size={18} strokeWidth={3} /> Register New School
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-premium focus-within:ring-4 focus-within:ring-sky-500/5 focus-within:border-sky-500 transition-all">
              <Search size={20} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by school name, district, or ZIP..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-sm font-semibold bg-transparent placeholder:text-slate-300"
              />
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-100">
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Database Size</span>
                 <span className="px-2 py-1 rounded-lg bg-slate-900 text-white text-[9px] font-bold leading-none">{filteredSchools.length}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {districts.map(district => (
                <button
                  key={district}
                  onClick={() => setDistrictFilter(district)}
                  className={`px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all
                    ${districtFilter === district 
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' 
                      : 'bg-white text-slate-400 hover:text-slate-800 border border-slate-200 shadow-sm'}`}
                >
                  {district}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
              {filteredSchools.map(school => (
                <div 
                  key={school.id} 
                  onClick={() => router.push(`/schools/${school.id}`)}
                  className="bg-white rounded-3xl p-10 border border-slate-100 shadow-premium hover:border-sky-500/30 hover:shadow-2xl transition-all cursor-pointer group flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-inner group-hover:bg-sky-600 group-hover:text-white transition-all transform group-hover:scale-110">
                      <GraduationCap size={28} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
                       Partner
                    </span>
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors tracking-tight leading-tight mb-2 tabular-nums">{school.name}</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                       <MapPin size={14} className="text-sky-500" /> {school.district}
                    </p>
                    
                    <div className="space-y-4 pt-8 border-t border-slate-50">
                       <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                            <Phone size={14} className="text-slate-400" />
                          </div>
                          (516) 555-0199
                       </div>
                       <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest truncate">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                            <Mail size={14} className="text-slate-400" />
                          </div>
                          office@school.edu
                       </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between items-center bg-slate-50/50 p-5 rounded-2xl border border-slate-100 group-hover:bg-sky-50 group-hover:border-sky-100 transition-all">
                     <span className="text-[10px] font-black text-slate-400 group-hover:text-sky-600 uppercase tracking-widest">Profile Analytics</span>
                     <ChevronRight size={18} className="text-slate-300 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

           <aside className="w-full lg:w-[320px] flex flex-col gap-8 shrink-0">
              <div className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
                 <h3 className="font-bold text-[10px] uppercase tracking-widest text-sky-400 mb-8 leading-none flex items-center gap-2 relative z-10">
                    <ShieldCheck size={14} className="text-sky-500" /> Registry Insights
                 </h3>
                 <div className="space-y-10 relative z-10">
                      <div>
                         <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-3 leading-none opacity-100">Global Coverage</p>
                         <p className="text-4xl font-black text-white tracking-tight leading-none mb-3 tabular-nums">94% <span className="text-[10px] font-bold text-sky-400/60 ml-2">LI Index</span></p>
                         <p className="text-[11px] font-semibold text-slate-100 border-l-2 border-sky-400 pl-4 tracking-tight leading-relaxed">Participation from Top Districts.</p>
                      </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                          <p className="text-[9px] font-bold text-slate-100 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">New '26 <Plus size={8}/></p>
                          <p className="text-2xl font-bold text-white leading-none">12</p>
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                          <p className="text-[9px] font-bold text-slate-100 uppercase tracking-widest mb-1.5">Waitlist</p>
                          <p className="text-2xl font-bold text-rose-500 leading-none">3</p>
                       </div>
                    </div>
                    <button className="btn-secondary w-full">
                       Download Roster
                    </button>
                 </div>
              </div>
 
              <div className="glass-card p-10 border border-slate-100 shadow-premium flex flex-col gap-6">
                 <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-2 px-2 leading-none flex items-center gap-2">
                    <ListFilter size={14} className="text-sky-500" /> Advanced Filter
                 </h3>
                 <div className="space-y-4">
                    <button className="w-full flex items-center justify-between px-6 py-5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all shadow-sm hover:shadow-lg hover:bg-slate-50">
                       Student Capacity
                       <ChevronRight size={14} className="text-slate-300" />
                    </button>
                    <button className="w-full flex items-center justify-between px-6 py-5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all shadow-sm hover:shadow-lg hover:bg-slate-50">
                       Historical Revenue
                       <ChevronRight size={14} className="text-slate-300" />
                    </button>
                 </div>
              </div>
           </aside>
        </div>
      </div>
    </PageTransition>
  );
}
