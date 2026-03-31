'use client';

import React, { useState } from 'react';
import { INVOICES, BOOKINGS } from '@/lib/data';
import { formatCurrencyFull } from '@/lib/pricing';
import { 
  BarChart3, PieChart, TrendingUp, AlertCircle, 
  Download, Filter, Search, Calendar, ChevronRight,
  ArrowUpRight, School, DollarSign, Clock,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import PageTransition from '@/components/layout/PageTransition';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('unpaid');
  const [searchTerm, setSearchTerm] = useState('');

  // Business Logic: Unpaid Balances
  const unpaidInvoices = INVOICES.filter(inv => inv.outstanding > 0)
    .map(inv => {
      const booking = BOOKINGS.find(b => b.id === inv.bookingId);
      return { ...inv, schoolName: booking?.school?.name || 'Various' };
    })
    .sort((a, b) => b.outstanding - a.outstanding);

  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900 pb-20">
        <header className="page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-1">
            <h1>Reports & Analytics</h1>
            <p>Financial transparency and operational insights.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all active:scale-95 mb-1">
            <Download size={18} /> Export Audit
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-premium">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'unpaid', label: 'Unpaid Balances', icon: <AlertCircle size={14} /> },
                    { id: 'accounts', label: 'School Accounts', icon: <School size={14} /> },
                    { id: 'history', label: 'Historical Lookup', icon: <Clock size={14} /> }
                  ].map(tab => (
                     <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all
                        ${activeTab === tab.id 
                          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                          : 'bg-white text-slate-400 hover:text-slate-800 border border-slate-200 shadow-sm'}`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus-within:ring-4 focus-within:ring-sky-500/5 focus-within:border-sky-300 transition-all">
                  <Search size={14} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Filter records..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent outline-none text-[11px] font-bold text-slate-600 w-full sm:w-32 placeholder:text-slate-300"
                  />
                </div>
              </div>

               {activeTab === 'unpaid' && (
                <div className="animate-fade-in-up">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-8 pt-4 text-[11px] font-bold text-slate-400 tracking-widest uppercase px-4">School / Institution</th>
                          <th className="pb-8 pt-4 text-[11px] font-bold text-slate-400 tracking-widest uppercase text-center">Invoice Ident</th>
                          <th className="pb-8 pt-4 text-[11px] font-bold text-slate-400 tracking-widest uppercase text-right px-4">Outstanding</th>
                          <th className="pb-8 pt-4 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {unpaidInvoices.map(inv => (
                          <tr key={inv.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                             <td className="py-8 px-4 min-w-[240px]">
                               <div className="font-bold text-slate-900 text-lg transition-colors group-hover:text-sky-600">{inv.schoolName}</div>
                               <div className="text-[10px] font-medium text-slate-400 mt-1">Issued on {new Date(inv.issuedDate).toLocaleDateString()}</div>
                             </td>
                            <td className="py-7 text-center">
                              <span className="px-3 py-1.5 bg-white rounded-xl text-[9px] font-bold uppercase text-slate-500 border border-slate-200 shadow-sm group-hover:border-sky-200 group-hover:text-sky-600 transition-all">
                                {inv.invoiceNumber}
                              </span>
                            </td>
                            <td className="py-7 text-right">
                              <div className="font-bold text-rose-600 text-xl tabular-nums tracking-tighter shadow-sm">{formatCurrencyFull(inv.outstanding)}</div>
                              <div className="text-[8px] font-bold text-rose-400 uppercase tracking-widest mt-1.5 leading-none opacity-80">Overdue Status</div>
                            </td>
                            <td className="py-7 text-right pr-2">
                               <Link href="/invoices" className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-sky-600 hover:border-sky-600 hover:shadow-xl transition-all shadow-sm">
                                  <ChevronRight size={18} />
                               </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab !== 'unpaid' && (
                <div className="py-20 text-center animate-fade-in-up">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                      <PieChart size={44} />
                   </div>
                   <p className="font-black text-slate-900 text-xl tracking-tight mb-2 uppercase leading-none">Modules in Alpha</p>
                   <p className="text-sm font-medium text-slate-400 tracking-widest uppercase">Integration with O365 expected Q2 2026.</p>
                </div>
              )}
            </div>
          </div>

          <aside className="w-full lg:w-[320px] flex flex-col gap-8 shrink-0">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-visible group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
                 <h3 className="font-bold text-[10px] uppercase tracking-widest text-sky-400 mb-10 leading-none flex items-center gap-2 relative z-10">
                    <TrendingUp size={14} className="text-sky-500" /> Revenue Snapshot
                 </h3>
                 <div className="space-y-12 relative z-10">
                    <div>
                       <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 leading-none opacity-100">Gross MTD</p>
                       <p className="text-3xl font-extrabold tracking-tight leading-none mb-3 tabular-nums text-white">$14,220</p>
                       <p className="text-[11px] font-medium text-slate-100 border-l-2 border-emerald-500/30 pl-4">Target: $18,000</p>
                    </div>
                    <div className="h-px bg-white/5 w-full"></div>
                    <div>
                       <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-3 leading-none opacity-100">Total Unpaid</p>
                       <p className="text-3xl font-extrabold tracking-tight leading-none mb-3 text-rose-500 tabular-nums">$8,422</p>
                       <p className="text-[11px] font-medium text-slate-100 border-l-2 border-rose-500/30 pl-4">Overdue by 30+ days.</p>
                    </div>
                 </div>
              </div>

             <div className="glass-card p-8 border border-slate-100 shadow-premium flex flex-col gap-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-4 px-2 leading-none">Data Controls</h3>
                <button className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-[9px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all group shadow-sm">
                   Adjust Date Range
                   <Calendar size={14} className="text-slate-400 group-hover:text-slate-900" />
                </button>
                <button className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-200 rounded-xl font-bold text-[9px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all group shadow-sm">
                   Filter by District
                   <Filter size={14} className="text-slate-400 group-hover:text-slate-900" />
                </button>
             </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
