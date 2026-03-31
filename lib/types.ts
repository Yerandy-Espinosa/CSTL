// ============================================================
// CSTL Field Trip Booking — Core Entity Types
// ============================================================

export type BookingStatus = 'hold' | 'confirmed' | 'completed' | 'cancelled';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'partial';
export type PaymentMethod = 'check' | 'purchase-order' | 'credit' | 'cash';

export interface School {
  id: string;
  name: string;
  district: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: 'public' | 'private' | 'charter' | 'camp' | 'religious' | 'other';
  isReturning: boolean;
  totalRevenue: number;
  notes: string;
}

export interface Contact {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isPrimary: boolean;
}

export interface Program {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  pricingModel: 'per-person' | 'per-student';
  minStudents: number;
  freeTeacherCount: number;
}

export interface BookingLineItem {
  id: string;
  bookingId: string;
  programId: string;
  program?: Program;
  studentCount: number;
  adultCount: number;
  chargedAdults: number;
  freeTeachers: number;
  unitPrice: number;
  lineTotal: number;
  ruleNotes: string[];
}

export interface FieldTripBooking {
  id: string;
  schoolId: string;
  school?: School;
  contactId: string;
  contact?: Contact;
  programDate: string;
  arrivalTime: string;
  duration: string;
  status: BookingStatus;
  lineItems: BookingLineItem[];
  subtotal: number;
  discount: number;
  totalDue: number;
  notes: string;
  internalNotes: string;
  createdAt: string;
  lunchRequired: boolean;
  gradeLevel: string;
  purchaseOrder: string;
}

export interface Invoice {
  id: string;
  bookingId: string;
  booking?: FieldTripBooking;
  invoiceNumber: string;
  issuedDate: string;
  status: InvoiceStatus;
  subtotal: number;
  discount: number;
  totalDue: number;
  totalPaid: number;
  outstanding: number;
  notes: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  notes: string;
}

export interface CalendarEvent {
  id: string;
  bookingId: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  status: BookingStatus;
  schoolName: string;
  programs: string[];
  studentCount: number;
  color: string;
}

export interface ActivityLogEntry {
  id: string;
  bookingId?: string;
  schoolId?: string;
  timestamp: string;
  action: string;
  performedBy: string;
  notes: string;
}

// Wizard state for the booking flow
export interface BookingWizardState {
  currentStep: number;
  school: Partial<School> & { id?: string };
  contact: Partial<Contact>;
  schedule: {
    programDate: string;
    arrivalTime: string;
    duration: string;
  };
  selectedPrograms: string[];
  lineItems: BookingLineItem[];
  studentCount: number;
  adultCount: number;
  lunchRequired: boolean;
  gradeLevel: string;
  purchaseOrder: string;
  notes: string;
  internalNotes: string;
  subtotal: number;
  discount: number;
  totalDue: number;
  invoiceNumber: string;
}
