// ============================================================
// CSTL Field Trip Booking — Pricing Engine
// ============================================================
import { Program, BookingLineItem } from './types';

export function calculateLineItem(
  program: Program,
  studentCount: number,
  adultCount: number,
  bookingId: string = 'new'
): BookingLineItem {
  const ruleNotes: string[] = [];
  let lineTotal = 0;
  let chargedAdults = adultCount;
  let freeTeachers = 0;

  if (program.pricingModel === 'per-person') {
    // Exhibit-style: charge per person, with free teacher slots
    freeTeachers = Math.min(adultCount, program.freeTeacherCount);
    chargedAdults = Math.max(0, adultCount - freeTeachers);
    const totalCharged = studentCount + chargedAdults;
    lineTotal = totalCharged * program.basePrice;

    if (freeTeachers > 0) {
      ruleNotes.push(`${freeTeachers} teacher${freeTeachers > 1 ? 's' : ''} free`);
    }
    ruleNotes.push(`$${program.basePrice} flat rate per person`);
  } else {
    // Per-student: charge per student with minimum
    const effectiveStudents = Math.max(studentCount, program.minStudents);
    lineTotal = effectiveStudents * program.basePrice;
    chargedAdults = 0;
    freeTeachers = 0;

    if (studentCount < program.minStudents) {
      ruleNotes.push(`${program.minStudents}-student minimum applied (${studentCount} actual)`);
    } else {
      ruleNotes.push(`${program.minStudents} min. not triggered`);
    }
    ruleNotes.push(`$${program.basePrice} per student`);
  }

  return {
    id: `li-${program.id}-${Date.now()}`,
    bookingId,
    programId: program.id,
    program,
    studentCount,
    adultCount,
    chargedAdults,
    freeTeachers,
    unitPrice: program.basePrice,
    lineTotal,
    ruleNotes,
  };
}

export function calculateBookingTotal(lineItems: BookingLineItem[], discount: number = 0) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  return {
    subtotal,
    discount,
    totalDue: subtotal - discount,
  };
}

export function generateInvoiceNumber(year: number, sequence: number): string {
  return `CSTL-${year}-${String(sequence).padStart(4, '0')}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
