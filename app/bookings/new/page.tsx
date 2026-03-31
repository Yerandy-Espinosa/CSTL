'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { SCHOOLS, PROGRAMS, CONTACTS } from '@/lib/data';
import { calculateLineItem, calculateBookingTotal, formatCurrencyFull } from '@/lib/pricing';
import { 
  ArrowLeft, ArrowRight, Check, Search, Calendar, 
  Users, School as SchoolIcon, DollarSign, Clock,
  ChevronRight, Info, AlertCircle, Sparkles,
  Zap, Building2, UserCircle2, ClipboardCheck, MapPin, LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PageTransition from '@/components/layout/PageTransition';

function getStepTitle(s: number) {
  const steps = [
    'Institution Selection',
    'Primary Logistics Contact',
    'Scheduling & Arrival',
    'Capacity Metrics',
    'Program Curation',
    'Ready for Finalization'
  ];
  return steps[s-1];
}

function getStepGuidance(s: number) {
  const guidance = [
    'Select a school from the CSTL registry. Recent partners appear at the top.',
    'Identify the coordinator responsible for this specific trip’s logistics.',
    'Select the target date. Check the calendar for resource availability alerts.',
    'Enter pupil and adult counts. Pricing rules adjust automatically based on these metrics.',
    'Choose the educational programs. Note that Exhibit is charged differently than Outdoor programs.',
    'Review the operational summary and financial exposure before locking the booking.'
  ];
  return guidance[s-1];
}

function NewBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    schoolId: searchParams.get('schoolId') || '',
    contactId: '',
    programDate: '',
    arrivalTime: '10:00 AM',
    studentCount: 0,
    adultCount: 0,
    selectedPrograms: [] as string[],
    notes: '',
  });

  useEffect(() => {
    const schoolId = searchParams.get('schoolId');
    if (schoolId && SCHOOLS.some(s => s.id === schoolId)) {
        setBooking(prev => ({ ...prev, schoolId }));
    }
  }, [searchParams]);

  // Derived state
  const selectedSchool = SCHOOLS.find(s => s.id === booking.schoolId);
  const schoolContacts = CONTACTS.filter(c => c.schoolId === booking.schoolId);
  const selectedProgramDetails = PROGRAMS.filter(p => booking.selectedPrograms.includes(p.id));

  // Pricing calculation
  const lineItems = selectedProgramDetails.map(p => 
    calculateLineItem(p, booking.studentCount, booking.adultCount, 'new')
  );
  const totals = calculateBookingTotal(lineItems);

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <PageTransition>
      <div className="flex flex-col gap-10 font-sans text-slate-900 pb-20">
        
        <header className="page-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="flex items-center gap-2">
               New Field Trip Booking
            </h1>
            <p className="italic">Step {step} of 6: {getStepTitle(step)}</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-1 px-4">
             {/* Stepper Dots */}
             {[1, 2, 3, 4, 5, 6].map(s => (
               <div key={s} className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${s === step ? 'bg-sky-600 w-8 shadow-md shadow-sky-600/20' : s < step ? 'bg-sky-400/60' : 'bg-slate-200'}`}></div>
             ))}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
             <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-100 shadow-premium">
                
                {step === 1 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none px-1">Select Registered School</label>
                      <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                        <select 
                          value={booking.schoolId}
                          onChange={(e) => setBooking({...booking, schoolId: e.target.value})}
                          className="w-full pl-14 pr-8 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none outline-none font-semibold text-slate-900 focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all text-lg shadow-sm"
                        >
                          <option value="">Choose institution from registry...</option>
                          {SCHOOLS.map(s => (
                            <option key={s.id} value={s.id}>{s.name} ({s.district})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {selectedSchool && (
                      <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col gap-6 animate-fade-in">
                        <div className="flex items-center gap-4">
                           <div className="w-11 h-11 rounded-lg bg-white border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm shrink-0">
                              <Building2 size={20} />
                           </div>
                           <div>
                              <p className="text-lg font-bold text-slate-900 leading-none uppercase">{selectedSchool.name}</p>
                              <p className="text-[9px] font-bold text-sky-600 uppercase tracking-widest mt-1.5">{selectedSchool.district}</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-white/50 rounded-xl border border-white/50">
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                              <p className="text-[9px] font-bold text-emerald-600 uppercase">Returning Partner</p>
                           </div>
                           <div className="p-4 bg-white/50 rounded-xl border border-white/50">
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Trip</p>
                              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Aug 14, 2025</p>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none px-1">Primary Contact for this Trip</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schoolContacts.map(contact => (
                          <div 
                            key={contact.id}
                            onClick={() => setBooking({...booking, contactId: contact.id})}
                            className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
                              ${booking.contactId === contact.id ? 'border-sky-500 bg-sky-50' : 'border-slate-100 hover:border-slate-200 bg-white shadow-sm'}`}
                          >
                            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                               <UserCircle2 size={18} className={booking.contactId === contact.id ? 'text-sky-500' : ''} />
                            </div>
                            <div>
                               <p className="font-bold text-slate-900 leading-none uppercase text-sm mb-1">{contact.name}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{contact.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                   <div className="space-y-8 animate-fade-in-up">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Visit Date</label>
                            <input 
                              type="date" 
                              value={booking.programDate}
                              onChange={(e) => setBooking({...booking, programDate: e.target.value})}
                              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all"
                            />
                         </div>
                         <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Arrival Window</label>
                            <select 
                              value={booking.arrivalTime}
                              onChange={(e) => setBooking({...booking, arrivalTime: e.target.value})}
                              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all uppercase"
                            >
                              <option>9:00 AM</option>
                              <option>9:30 AM</option>
                              <option>10:00 AM</option>
                              <option>10:30 AM</option>
                              <option>11:00 AM</option>
                            </select>
                         </div>
                      </div>
                   </div>
                )}

                {step === 4 && (
                   <div className="space-y-8 animate-fade-in-up">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Total Students</label>
                            <input 
                              type="number" 
                              value={booking.studentCount || ''}
                              onChange={(e) => setBooking({...booking, studentCount: parseInt(e.target.value) || 0})}
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-2xl text-slate-900 tabular-nums focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all"
                              placeholder="0"
                            />
                         </div>
                         <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Additional Adults</label>
                            <input 
                              type="number" 
                              value={booking.adultCount || ''}
                              onChange={(e) => setBooking({...booking, adultCount: parseInt(e.target.value) || 0})}
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-2xl text-slate-900 tabular-nums focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all"
                              placeholder="0"
                            />
                         </div>
                      </div>
                   </div>
                )}

                {step === 5 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Curated Programs (Select Multiple)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PROGRAMS.map(prog => (
                        <div 
                          key={prog.id}
                          onClick={() => {
                            const current = booking.selectedPrograms;
                            if (current.includes(prog.id)) {
                              setBooking({...booking, selectedPrograms: current.filter(id => id !== prog.id)});
                            } else {
                              setBooking({...booking, selectedPrograms: [...current, prog.id]});
                            }
                          }}
                          className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4
                            ${booking.selectedPrograms.includes(prog.id) ? 'border-sky-500 bg-sky-50' : 'border-slate-100 hover:border-slate-300 bg-white shadow-sm'}`}
                        >
                           <span className="text-2xl shrink-0">{prog.icon}</span>
                           <div className="min-w-0">
                              <p className="font-bold text-slate-900 uppercase tracking-tight leading-none mb-1.5 text-base">{prog.name}</p>
                              <p className="text-[9px] font-medium text-slate-400 leading-relaxed uppercase tracking-tighter truncate">{prog.description}</p>
                              <div className="flex items-center gap-2 mt-3">
                                 <span className="px-2 py-0.5 rounded-lg bg-sky-600 text-white text-[8px] font-bold uppercase tracking-widest shadow-sm">${prog.basePrice} / head</span>
                                 {prog.minStudents > 0 && <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest">Min {prog.minStudents}</span>}
                              </div>
                           </div>
                           {booking.selectedPrograms.includes(prog.id) && (
                              <div className="ml-auto w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-lg shrink-0 scale-90">
                                 <Check size={14} strokeWidth={4} />
                              </div>
                           )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 6 && (
                   <div className="space-y-10 animate-fade-in-up">
                      <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-8 leading-none flex items-center gap-2 relative z-10">
                           <ClipboardCheck size={14} className="text-sky-500" /> Operational Preview
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                           <div className="space-y-6">
                              <div>
                                 <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mb-1 shadow-sm">Institution</p>
                                 <p className="text-xl font-bold uppercase tracking-tight">{selectedSchool?.name || 'N/A'}</p>
                              </div>
                              <div>
                                 <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mb-1 shadow-sm">Schedule</p>
                                 <p className="text-xl font-bold uppercase tracking-tight">{booking.programDate || 'N/A'} @ {booking.arrivalTime}</p>
                              </div>
                              <div>
                                 <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mb-1 shadow-sm">Capacities</p>
                                 <p className="text-xl font-bold uppercase tracking-tight tabular-nums">{booking.studentCount} Students / {booking.adultCount} Adults</p>
                              </div>
                           </div>
                           
                           <div className="p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm self-center">
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Financial Exposure</p>
                              <div className="space-y-3">
                                 <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="tabular-nums">{formatCurrencyFull(totals.subtotal)}</span>
                                 </div>
                                 <div className="h-px bg-white/5"></div>
                                 <div className="flex justify-between items-end pt-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Grand Total</span>
                                    <span className="text-4xl font-bold text-sky-400 tabular-nums leading-none tracking-tight">{formatCurrencyFull(totals.totalDue)}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none px-1">Logistics Notes (Internal)</label>
                         <textarea 
                           className="w-full p-6 bg-slate-50 border border-slate-200 rounded-xl h-32 focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300"
                           placeholder="Special needs, bus parking, lunch seating requirements..."
                           value={booking.notes}
                           onChange={(e) => setBooking({...booking, notes: e.target.value})}
                         />
                      </div>
                   </div>
                )}

                <div className="mt-12 pt-10 border-t border-slate-50 flex justify-between items-center bg-white">
                   <button 
                     onClick={prevStep}
                     disabled={step === 1}
                     className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all
                       ${step === 1 ? 'opacity-30 cursor-not-allowed text-slate-300' : 'text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm'}`}
                   >
                     <ArrowLeft size={16} /> Previous Phase
                   </button>
                   
                   {step < 6 ? (
                     <button 
                       onClick={nextStep}
                       disabled={!booking.schoolId && step === 1}
                       className="flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-sky-600/20 active:scale-95 transition-all disabled:opacity-50"
                     >
                       Next Phase <ArrowRight size={16} />
                     </button>
                   ) : (
                     <button 
                       onClick={() => router.push('/bookings')}
                       className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                     >
                       Finalize & Book <Sparkles size={16} />
                     </button>
                   )}
                </div>
             </div>
          </div>

          <aside className="w-full lg:w-[320px] flex flex-col gap-8 shrink-0">
             <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-500 mb-8 leading-none flex items-center gap-2 relative z-10">
                   <Info size={14} className="text-sky-500" /> Guidance
                </h3>
                <div className="space-y-6 relative z-10">
                   <p className="text-sm font-medium text-slate-300 leading-relaxed transition-colors">
                      {getStepGuidance(step)}
                   </p>
                   <div className="p-4 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                      <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest mb-1.5 leading-none">Account Status</p>
                      <p className="text-lg font-bold text-white tabular-nums leading-none">$0.00 <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[8px] uppercase font-bold ml-1.5 border border-emerald-500/20 shadow-premium">Active</span></p>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-premium flex flex-col gap-3">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-2 px-2 leading-none">Trip Overview</h3>
                <div className="space-y-2.5">
                   <div className={`p-4 rounded-xl border text-[9px] font-bold uppercase tracking-widest transition-all ${booking.schoolId ? 'bg-sky-50 border-sky-100 text-sky-600 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      Institution {booking.schoolId ? 'Locked' : 'Pending'}
                   </div>
                   <div className={`p-4 rounded-xl border text-[9px] font-bold uppercase tracking-widest transition-all ${booking.selectedPrograms.length > 0 ? 'bg-sky-50 border-sky-100 text-sky-600 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      Programs {booking.selectedPrograms.length > 0 ? `${booking.selectedPrograms.length} added` : 'none'}
                   </div>
                   <div className={`p-4 rounded-xl border text-[9px] font-bold uppercase tracking-widest transition-all ${totals.totalDue > 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      Estimated {formatCurrencyFull(totals.totalDue)}
                   </div>
                </div>
             </div>
          </aside>

        </div>
      </div>
    </PageTransition>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense fallback={
       <div className="min-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initializing...</p>
          </div>
       </div>
    }>
      <NewBookingContent />
    </Suspense>
  );
}
