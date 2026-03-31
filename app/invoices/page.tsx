'use client';

import React, { useState } from 'react';
import { INVOICES, BOOKINGS, SCHOOLS } from '@/lib/data';
import { formatCurrencyFull } from '@/lib/pricing';
import { 
  Building2, Search, Download, ExternalLink, Filter, 
  ArrowLeft, Edit2, Send, ChevronRight, Tag, AlertCircle, FileCheck,
  CalendarDays, FileText, DollarSign, Plus
} from 'lucide-react';
import Link from 'next/link';
import PageTransition from '@/components/layout/PageTransition';

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  // Enriched invoices with real school names for CSTL demo
  const enrichedInvoices = INVOICES.map(inv => {
    const booking = BOOKINGS.find(b => b.id === inv.bookingId);
    const schoolName = booking?.school?.name || 'Various Schools';
    return { ...inv, schoolName, booking };
  });

  const filteredInvoices = enrichedInvoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());

  const selectedInvoice = enrichedInvoices.find(inv => inv.id === selectedInvoiceId);

   // --- RENDERING HANDLER: DETAIL VIEW ---
  if (selectedInvoiceId && selectedInvoice) {
    return (
      <PageTransition>
        <div className="flex flex-col gap-8 font-sans text-slate-900 pb-20">
          
          <div className="bg-slate-900 p-10 md:p-14 rounded-3xl relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
             
             <div className="relative z-10">
                <button onClick={() => setSelectedInvoiceId(null)} className="inline-flex items-center gap-2 text-sky-400 font-bold text-[10px] uppercase tracking-widest mb-10 hover:text-sky-300 transition-colors group">
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                </button>
                
                <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                   <div className="max-w-2xl">
                     <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-6 uppercase">
                        Invoice <span className="text-sky-400">{selectedInvoice.invoiceNumber}</span>
                     </h1>
                     <p className="text-slate-400 text-lg font-medium leading-relaxed italic border-l-2 border-sky-500/30 pl-5">
                       Official record for <strong className="text-white">{selectedInvoice.schoolName}</strong>. Issued on {new Date(selectedInvoice.issuedDate).toLocaleDateString()}.
                     </p>
                   </div>
                   <div className={`px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-3
                     ${selectedInvoice.status === 'paid' ? 'text-emerald-400' : selectedInvoice.status === 'overdue' ? 'text-rose-400' : 'text-sky-400'}`}>
                     <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>
                     {selectedInvoice.status}
                   </div>
                </div>
             </div>
          </div>

          <div className="max-w-5xl mx-auto w-full">
             <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
                
                <div className="p-10 md:p-12 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 bg-slate-50/30">
                   <div>
                     <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3 mb-1 uppercase">
                       Operational Detail
                     </h2>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">Comprehensive breakdown of services rendered</p>
                   </div>
                   <div className="flex items-center gap-4 w-full md:w-auto">
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:shadow-lg transition-all shadow-sm">
                       <Download size={16} /> Export PDF
                     </button>
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-7 py-4 bg-sky-600 hover:bg-sky-700 rounded-2xl font-bold text-[10px] uppercase tracking-widest text-white shadow-xl shadow-sky-600/20 transition-all active:scale-95">
                       <Send size={16} /> Transmit
                     </button>
                   </div>
                </div>

                <div className="p-10 md:p-12">
                   <div className="mb-12 overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead>
                            <tr className="border-b border-slate-100">
                               <th className="pb-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase">Service Description</th>
                               <th className="pb-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase text-center">Qty</th>
                               <th className="pb-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase text-right">Unit Rate</th>
                               <th className="pb-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase text-right">Total</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50/50">
                            {selectedInvoice.booking?.lineItems.map(li => (
                              <tr key={li.id} className="group hover:bg-slate-50/50 transition-colors">
                                 <td className="py-8">
                                    <div className="flex items-center gap-4 mb-2">
                                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-inner border border-slate-100 group-hover:bg-white transition-colors">
                                          {li.program?.icon}
                                       </div>
                                       <span className="font-bold text-slate-900 text-base uppercase tracking-tight leading-none italic">{li.program?.name}</span>
                                    </div>
                                    <div className="pl-14 space-y-1.5">
                                       {li.ruleNotes.map((note, idx) => (
                                         <p key={idx} className="text-[9px] font-bold text-slate-400 tracking-widest uppercase italic leading-none opacity-60 flex items-center gap-2">
                                            <Tag size={10} className="text-sky-400" /> {note}
                                         </p>
                                       ))}
                                    </div>
                                 </td>
                                 <td className="py-8 text-center font-bold text-slate-900 text-sm tabular-nums">
                                   {li.program?.pricingModel === 'per-person' ? (li.studentCount + li.chargedAdults) : li.studentCount}
                                 </td>
                                 <td className="py-8 text-right font-bold text-slate-400 text-xs tabular-nums tracking-wide">{formatCurrencyFull(li.unitPrice)}</td>
                                 <td className="py-8 text-right font-bold text-slate-900 text-lg tabular-nums tracking-tighter">{formatCurrencyFull(li.lineTotal)}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>

                   <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pt-10 border-t border-slate-100">
                      <div className="w-full lg:w-3/5">
                         <div className="flex items-center gap-2 mb-4">
                            <Tag size={14} className="text-sky-500" />
                            <label className="text-[10px] font-bold text-sky-400 tracking-widest uppercase leading-none mt-0.5">Payment Terms & Official Notes</label>
                         </div>
                         <div className="w-full bg-slate-50/50 border border-slate-100 border-l-4 border-l-sky-500 rounded-r-2xl p-6 text-xs font-semibold text-slate-600 italic leading-relaxed shadow-sm">
                            {selectedInvoice.notes || "Standard Net 30 terms. Please include the invoice number in your remittance. Late fees may apply after 30 days of issuance."}
                         </div>
                      </div>

                      <div className="w-full lg:w-[320px] glass-card p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl"></div>
                         <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center px-2">
                               <span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Base Subtotal</span>
                               <span className="font-bold text-slate-700 text-base tabular-nums">{formatCurrencyFull(selectedInvoice.subtotal)}</span>
                            </div>
                            {selectedInvoice.discount > 0 && (
                              <div className="flex justify-between items-center bg-rose-50/50 p-3 rounded-xl border border-rose-100/50 px-4">
                                <span className="font-bold text-rose-500 text-[10px] uppercase tracking-widest">Applied Savings</span>
                                <span className="font-bold text-rose-500 text-base tabular-nums">-{formatCurrencyFull(selectedInvoice.discount)}</span>
                              </div>
                            )}
                            <div className="h-px bg-slate-100 mx-2 my-2"></div>
                            <div className="flex justify-between items-end px-2 pt-2">
                               <div className="flex flex-col">
                                  <span className="text-sky-500 text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-2">Grand Total</span>
                                  <span className="font-black text-slate-400 uppercase tracking-widest text-[8px] leading-none">Net Receivable</span>
                               </div>
                               <span className="font-black text-sky-600 text-4xl leading-none tabular-nums tracking-tighter drop-shadow-sm">{formatCurrencyFull(selectedInvoice.totalDue)}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // --- RENDERING HANDLER: LIST VIEW ---
  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900">
        <header className="page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-1">
            <h1>Invoice Center</h1>
            <p>Manage and track school operational receivables.</p>
          </div>
          <div className="flex gap-4 items-center mb-2">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all shadow-sm hover:shadow-lg hover:bg-slate-50 active:scale-95">
                <FileText size={13} className="text-sky-500" /> Export Portfolio
             </button>
             <Link href="/reports" className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl text-[9px] font-bold text-white uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                Reports
             </Link>
             <Link href="/bookings/new" className="nav-cta !py-2.5">
                <div className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full">
                  <Plus size={14} strokeWidth={3} />
                </div>
                New Booking
             </Link>
          </div>
        </header>

          <div className="flex flex-col xl:flex-row gap-8 items-start">
            <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
              
               <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-premium focus-within:ring-4 focus-within:ring-sky-500/5 focus-within:border-sky-500 transition-all">
                <Search size={20} className="text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search invoices..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none text-sm font-semibold bg-transparent"
                />
                <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-100">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Invoices</span>
                   <span className="px-2 py-1 rounded-lg bg-slate-900 text-white text-[9px] font-bold">{filteredInvoices.length}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['all', 'sent', 'overdue', 'paid', 'partial', 'draft'].map(status => (
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
                  {filteredInvoices.map(inv => (
                    <div 
                      key={inv.id} 
                      onClick={() => setSelectedInvoiceId(inv.id)}
                      className="p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between hover:bg-slate-50/80 transition-all cursor-pointer gap-6 group"
                    >
                      <div className="flex items-center gap-6 min-w-0 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 shadow-inner group-hover:bg-sky-600 group-hover:text-white transition-all transform group-hover:scale-105">
                          <Tag size={22} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-lg tracking-tight leading-none group-hover:text-sky-600 transition-colors uppercase tabular-nums">{inv.invoiceNumber}</span>
                            <span className={`badge badge-dot badge-${inv.status} text-[9px] font-bold border border-current/10 shadow-sm`}>{inv.status}</span>
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 tracking-widest mb-1 leading-none">{inv.schoolName}</div>
                          <div className="text-[8px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-tighter shadow-sm leading-none mt-2">
                            <CalendarDays size={12} className="text-sky-500" /> Issued {new Date(inv.issuedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 pr-2">
                        <div className="font-bold text-2xl text-slate-900 tracking-tight leading-none group-hover:text-sky-600 transition-colors tabular-nums">{formatCurrencyFull(inv.totalDue)}</div>
                        {inv.outstanding > 0 ? (
                          <div className="text-[9px] font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 uppercase tracking-widest shadow-sm">
                            Bal: {formatCurrencyFull(inv.outstanding)}
                          </div>
                        ) : (
                          <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 uppercase tracking-widest shadow-sm">
                             Paid Full
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

             <aside className="w-full xl:w-[320px] flex flex-col gap-10 shrink-0">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-visible group">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl"></div>
                 <h3 className="font-extrabold text-[10px] uppercase tracking-[0.2em] text-sky-400 mb-10 leading-none">Account Summary</h3>
                 <div className="flex flex-col gap-10 relative z-10">
                    <div>
                       <p className="text-[10px] font-bold text-sky-400/80 uppercase tracking-widest mb-3 leading-none">Total Receivables</p>
                       <p className="text-4xl font-black text-white tracking-tight leading-none mb-3 tabular-nums">$8,422.00</p>
                       <p className="text-[11px] font-semibold text-slate-100 border-l-2 border-sky-400 pl-4 tracking-tight leading-relaxed">Consolidated Live Balance</p>
                    </div>
                    <div className="h-px bg-white/5 w-full"></div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mb-2 leading-none opacity-100">Overdue</p>
                          <p className="text-xl font-bold text-white leading-none tabular-nums">$1,845</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-2 leading-none opacity-100">Paid MTD</p>
                          <p className="text-xl font-bold text-white leading-none tabular-nums">$3,088</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-premium flex flex-col gap-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-2 px-2 leading-none">Operational Controls</h3>
                <div className="space-y-4">
                   <button className="w-full flex items-center justify-between px-6 py-5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all shadow-sm hover:shadow-lg hover:bg-slate-50">
                      Sync Accountant
                      <ExternalLink size={14} className="text-slate-300" />
                   </button>
                   <button className="w-full flex items-center justify-between px-6 py-5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all shadow-sm hover:shadow-lg hover:bg-slate-50">
                      Bulk Emailing
                      <Send size={14} className="text-slate-300" />
                   </button>
                   <button className="nav-cta w-full !py-4 !mt-4">
                      Manual Adjustment
                   </button>
                </div>
              </div>
           </aside>
        </div>
      </div>
    </PageTransition>
  );
}
