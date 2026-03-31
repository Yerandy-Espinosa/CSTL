// ============================================================
// CSTL Field Trip Booking — Mock Data Layer
// ============================================================
import { School, Contact, Program, FieldTripBooking, Invoice, CalendarEvent, ActivityLogEntry } from './types';
import { calculateLineItem, calculateBookingTotal } from './pricing';

// ============================================================
// PROGRAMS
// ============================================================
export const PROGRAMS: Program[] = [
  {
    id: 'prog-exhibit', name: 'Exhibit', icon: '🔬',
    description: 'Explore our interactive science exhibit hall with hands-on activities.',
    basePrice: 11, pricingModel: 'per-person', minStudents: 0, freeTeacherCount: 2,
  },
  {
    id: 'prog-pond', name: 'Life Around the Pond', icon: '🌿',
    description: 'Discover aquatic ecosystems in our outdoor nature study area.',
    basePrice: 9, pricingModel: 'per-student', minStudents: 20, freeTeacherCount: 0,
  },
  {
    id: 'prog-hike', name: 'Guided Hike', icon: '🥾',
    description: 'Led by our naturalists through our nature preserve trails.',
    basePrice: 9, pricingModel: 'per-student', minStudents: 20, freeTeacherCount: 0,
  },
  {
    id: 'prog-animal', name: 'Animal Show', icon: '🐾',
    description: 'Live animal presentation featuring reptiles, amphibians, and small mammals.',
    basePrice: 9, pricingModel: 'per-student', minStudents: 20, freeTeacherCount: 0,
  },
  {
    id: 'prog-bug', name: 'Bug World', icon: '🦋',
    description: 'Up-close encounters with arthropods from around the world.',
    basePrice: 9, pricingModel: 'per-student', minStudents: 20, freeTeacherCount: 0,
  },
  {
    id: 'prog-fossil', name: 'Fossil Discovery', icon: '🦕',
    description: 'Dig for fossils and learn about paleontology in our outdoor lab.',
    basePrice: 9, pricingModel: 'per-student', minStudents: 20, freeTeacherCount: 0,
  },
];

export function getProgramById(id: string): Program | undefined {
  return PROGRAMS.find(p => p.id === id);
}

// ============================================================
// SCHOOLS
// ============================================================
export const SCHOOLS: School[] = [
  {
    id: 'sch-bethsholom', name: 'Beth Sholom Day Camp', district: 'Herricks SD',
    address: '401 Roslyn Rd.', city: 'Roslyn Hts.', state: 'NY', zip: '11577',
    type: 'camp', isReturning: true, totalRevenue: 7842, notes: 'Prefers morning arrival when possible.',
  },
  {
    id: 'sch-ps142', name: 'PS 142 Brooklyn', district: 'Brooklyn CSD',
    address: '100 Attorney St.', city: 'Brooklyn', state: 'NY', zip: '11201',
    type: 'public', isReturning: false, totalRevenue: 540, notes: '',
  },
  {
    id: 'sch-sacredheart', name: 'Sacred Heart School', district: 'Diocese of Rockville Centre',
    address: '225 Merrick Ave.', city: 'Merrick', state: 'NY', zip: '11566',
    type: 'religious', isReturning: true, totalRevenue: 2430, notes: 'Always requests lunch option.',
  },
  {
    id: 'sch-herricks', name: 'Herricks Elementary', district: 'Herricks SD',
    address: '99 Shelter Rock Rd.', city: 'New Hyde Park', state: 'NY', zip: '11040',
    type: 'public', isReturning: true, totalRevenue: 4320, notes: '',
  },
  {
    id: 'sch-northshore', name: 'North Shore Hebrew Academy', district: 'Great Neck SD',
    address: '16 Old Mill Rd.', city: 'Great Neck', state: 'NY', zip: '11023',
    type: 'religious', isReturning: false, totalRevenue: 594, notes: '',
  },
  {
    id: 'sch-manhasset', name: 'Manhasset Middle School', district: 'Manhasset SD',
    address: '200 Memorial Pl.', city: 'Manhasset', state: 'NY', zip: '11030',
    type: 'public', isReturning: true, totalRevenue: 1890, notes: 'Prefers Wednesdays.',
  },
  {
    id: 'sch-gardencity', name: 'Garden City Elementary', district: 'Garden City SD',
    address: '56 Cathedral Ave.', city: 'Garden City', state: 'NY', zip: '11530',
    type: 'public', isReturning: true, totalRevenue: 2250, notes: '',
  },
  {
    id: 'sch-westbury', name: 'Westbury Friends School', district: 'Westbury SD',
    address: '550 Post Ave.', city: 'Westbury', state: 'NY', zip: '11590',
    type: 'private', isReturning: false, totalRevenue: 405, notes: '',
  },
];

// ============================================================
// CONTACTS
// ============================================================
export const CONTACTS: Contact[] = [
  { id: 'con-1', schoolId: 'sch-bethsholom', name: 'Alissa', email: 'Alissa@bethsholomdaycamp.com', phone: '(516) 620-2022', role: 'Camp Coordinator', isPrimary: true },
  { id: 'con-2', schoolId: 'sch-ps142', name: 'Maria Lopez', email: 'mlopez@ps142.edu', phone: '(718) 555-0142', role: 'Assistant Principal', isPrimary: true },
  { id: 'con-3', schoolId: 'sch-sacredheart', name: 'Sister Catherine', email: 'scatherine@sacredheartmerrick.org', phone: '(516) 555-0225', role: 'Principal', isPrimary: true },
  { id: 'con-4', schoolId: 'sch-herricks', name: 'David Kim', email: 'dkim@herricks.org', phone: '(516) 555-0099', role: 'Science Coordinator', isPrimary: true },
  { id: 'con-5', schoolId: 'sch-northshore', name: 'Rabbi Cohen', email: 'rcohen@nshebrewacademy.org', phone: '(516) 555-0016', role: 'Director', isPrimary: true },
  { id: 'con-6', schoolId: 'sch-manhasset', name: 'Jennifer Walsh', email: 'jwalsh@manhassetschools.org', phone: '(516) 555-0200', role: 'Grade 6 Teacher', isPrimary: true },
  { id: 'con-7', schoolId: 'sch-gardencity', name: 'Tom Henderson', email: 'thenderson@gardencityschools.com', phone: '(516) 555-0056', role: 'Science Teacher', isPrimary: true },
  { id: 'con-8', schoolId: 'sch-westbury', name: 'Patricia Owens', email: 'powens@westburyfriends.org', phone: '(516) 555-0550', role: 'Head of School', isPrimary: true },
];

// ============================================================
// BOOKINGS (pre-built with real line items)
// ============================================================
function buildBooking(
  id: string, schoolId: string, contactId: string,
  programDate: string, arrivalTime: string, duration: string,
  status: 'hold' | 'confirmed' | 'completed' | 'cancelled',
  programSelections: { programId: string; students: number; adults: number }[],
  createdAt: string, notes: string = '', internalNotes: string = '',
  lunchRequired: boolean = false, gradeLevel: string = 'Mixed', purchaseOrder: string = '', discount: number = 0
): FieldTripBooking {
  const school = SCHOOLS.find(s => s.id === schoolId);
  const contact = CONTACTS.find(c => c.id === contactId);
  const lineItems = programSelections.map(sel => {
    const program = PROGRAMS.find(p => p.id === sel.programId)!;
    return calculateLineItem(program, sel.students, sel.adults, id);
  });
  const totals = calculateBookingTotal(lineItems, discount);

  return {
    id, schoolId, school, contactId, contact,
    programDate, arrivalTime, duration, status,
    lineItems, ...totals,
    notes, internalNotes, createdAt, lunchRequired, gradeLevel, purchaseOrder,
  };
}

export const BOOKINGS: FieldTripBooking[] = [
  buildBooking('bk-001', 'sch-bethsholom', 'con-1', '2026-08-03', '12:30 PM', '~2 hours', 'confirmed',
    [{ programId: 'prog-exhibit', students: 100, adults: 10 }, { programId: 'prog-fossil', students: 100, adults: 10 }],
    '2026-03-31', 'Beth Sholom Day Camp — summer field trip.', 'Returning school, always reliable.'),
  buildBooking('bk-002', 'sch-ps142', 'con-2', '2026-08-07', '10:00 AM', '~2 hours', 'hold',
    [{ programId: 'prog-pond', students: 60, adults: 8 }],
    '2026-03-28', '', '', false, 'Grade 4'),
  buildBooking('bk-003', 'sch-sacredheart', 'con-3', '2026-08-12', '9:30 AM', '~3 hours', 'hold',
    [{ programId: 'prog-hike', students: 45, adults: 6 }, { programId: 'prog-animal', students: 45, adults: 6 }],
    '2026-03-25', 'Requires lunch arrangements.', '', true, 'Grade 5'),
  buildBooking('bk-004', 'sch-herricks', 'con-4', '2026-08-19', '10:00 AM', '~1.5 hours', 'confirmed',
    [{ programId: 'prog-bug', students: 80, adults: 8 }],
    '2026-03-20', '', '', false, 'Grade 3'),
  buildBooking('bk-005', 'sch-northshore', 'con-5', '2026-09-04', '11:00 AM', '~2 hours', 'hold',
    [{ programId: 'prog-exhibit', students: 55, adults: 6 }],
    '2026-03-15', '', '', false, 'Grade 6'),
  buildBooking('bk-006', 'sch-manhasset', 'con-6', '2026-07-18', '10:00 AM', '~2 hours', 'confirmed',
    [{ programId: 'prog-fossil', students: 70, adults: 7 }],
    '2026-02-10', '', '', false, 'Grade 6'),
  buildBooking('bk-007', 'sch-gardencity', 'con-7', '2026-06-10', '9:00 AM', '~2 hours', 'confirmed',
    [{ programId: 'prog-bug', students: 50, adults: 5 }],
    '2026-01-20', '', '', false, 'Grade 4'),
  buildBooking('bk-008', 'sch-westbury', 'con-8', '2026-05-22', '10:30 AM', '~2 hours', 'confirmed',
    [{ programId: 'prog-pond', students: 45, adults: 5 }],
    '2025-12-15', '', '', false, 'Grade 3-5'),
  // Historical bookings for Beth Sholom
  buildBooking('bk-009', 'sch-bethsholom', 'con-1', '2025-08-14', '10:00 AM', '~2 hours', 'completed',
    [{ programId: 'prog-pond', students: 65, adults: 8 }],
    '2025-06-01'),
  buildBooking('bk-010', 'sch-bethsholom', 'con-1', '2024-09-22', '10:00 AM', '~2 hours', 'completed',
    [{ programId: 'prog-exhibit', students: 80, adults: 8 }],
    '2024-07-10'),
  buildBooking('bk-011', 'sch-bethsholom', 'con-1', '2024-06-15', '9:30 AM', '~3 hours', 'completed',
    [{ programId: 'prog-fossil', students: 90, adults: 10 }, { programId: 'prog-bug', students: 90, adults: 10 }],
    '2024-04-20'),
];

// ============================================================
// INVOICES
// ============================================================
export const INVOICES: Invoice[] = [
  { id: 'inv-1', bookingId: 'bk-001', invoiceNumber: 'CSTL-2026-0031', issuedDate: '2026-03-31', status: 'sent', subtotal: 2088, discount: 0, totalDue: 2088, totalPaid: 0, outstanding: 2088, notes: '' },
  { id: 'inv-2', bookingId: 'bk-002', invoiceNumber: 'CSTL-2026-0028', issuedDate: '2026-03-28', status: 'draft', subtotal: 540, discount: 0, totalDue: 540, totalPaid: 0, outstanding: 540, notes: '' },
  { id: 'inv-3', bookingId: 'bk-003', invoiceNumber: 'CSTL-2026-0025', issuedDate: '2026-03-25', status: 'overdue', subtotal: 810, discount: 0, totalDue: 810, totalPaid: 0, outstanding: 810, notes: '' },
  { id: 'inv-4', bookingId: 'bk-004', invoiceNumber: 'CSTL-2026-0020', issuedDate: '2026-03-20', status: 'sent', subtotal: 720, discount: 0, totalDue: 720, totalPaid: 0, outstanding: 720, notes: '' },
  { id: 'inv-5', bookingId: 'bk-005', invoiceNumber: 'CSTL-2026-0015', issuedDate: '2026-03-15', status: 'draft', subtotal: 594, discount: 0, totalDue: 594, totalPaid: 0, outstanding: 594, notes: '' },
  { id: 'inv-6', bookingId: 'bk-006', invoiceNumber: 'CSTL-2026-0010', issuedDate: '2026-02-10', status: 'overdue', subtotal: 630, discount: 0, totalDue: 630, totalPaid: 0, outstanding: 630, notes: '' },
  { id: 'inv-7', bookingId: 'bk-007', invoiceNumber: 'CSTL-2026-0005', issuedDate: '2026-01-20', status: 'partial', subtotal: 450, discount: 0, totalDue: 450, totalPaid: 225, outstanding: 225, notes: '' },
  { id: 'inv-8', bookingId: 'bk-008', invoiceNumber: 'CSTL-2025-0042', issuedDate: '2025-12-15', status: 'overdue', subtotal: 405, discount: 0, totalDue: 405, totalPaid: 0, outstanding: 405, notes: '' },
  { id: 'inv-9', bookingId: 'bk-009', invoiceNumber: 'CSTL-2025-0018', issuedDate: '2025-06-01', status: 'paid', subtotal: 585, discount: 0, totalDue: 585, totalPaid: 585, outstanding: 0, notes: '' },
  { id: 'inv-10', bookingId: 'bk-010', invoiceNumber: 'CSTL-2024-0009', issuedDate: '2024-07-10', status: 'paid', subtotal: 880, discount: 0, totalDue: 880, totalPaid: 880, outstanding: 0, notes: '' },
  { id: 'inv-11', bookingId: 'bk-011', invoiceNumber: 'CSTL-2024-0006', issuedDate: '2024-04-20', status: 'paid', subtotal: 1620, discount: 0, totalDue: 1620, totalPaid: 1620, outstanding: 0, notes: '' },
];

// ============================================================
// ACTIVITY LOG
// ============================================================
export const ACTIVITY_LOG: ActivityLogEntry[] = [
  { id: 'log-1', bookingId: 'bk-001', schoolId: 'sch-bethsholom', timestamp: '2026-03-31T14:30:00', action: 'Booking created for Aug 3', performedBy: 'Sarah M.', notes: 'Exhibit + Fossil Discovery' },
  { id: 'log-2', bookingId: 'bk-001', schoolId: 'sch-bethsholom', timestamp: '2026-03-31T14:35:00', action: 'Invoice CSTL-2026-0031 generated', performedBy: 'Sarah M.', notes: '$2,088' },
  { id: 'log-3', bookingId: 'bk-001', schoolId: 'sch-bethsholom', timestamp: '2026-03-31T14:36:00', action: 'Confirmation email sent to Alissa', performedBy: 'Sarah M.', notes: '' },
  { id: 'log-4', bookingId: 'bk-002', timestamp: '2026-03-28T10:00:00', action: 'Booking created for Aug 7 (HOLD)', performedBy: 'Sarah M.', notes: 'PS 142 — Life Around the Pond' },
  { id: 'log-5', bookingId: 'bk-009', schoolId: 'sch-bethsholom', timestamp: '2025-08-14T16:00:00', action: 'Invoice CSTL-2025-0018 marked PAID', performedBy: 'System', notes: '' },
  { id: 'log-6', bookingId: 'bk-010', schoolId: 'sch-bethsholom', timestamp: '2024-09-22T15:00:00', action: 'Booking confirmed for Sep 22', performedBy: 'Mike T.', notes: '' },
  { id: 'log-7', bookingId: 'bk-003', timestamp: '2026-03-25T09:15:00', action: 'Booking created (HOLD) — Sacred Heart', performedBy: 'Sarah M.', notes: 'Guided Hike + Animal Show' },
];

// ============================================================
// CALENDAR EVENTS (derived from bookings)
// ============================================================
export const CALENDAR_EVENTS: CalendarEvent[] = BOOKINGS
  .filter(b => b.status !== 'completed' && b.status !== 'cancelled')
  .map(b => ({
    id: `ev-${b.id}`,
    bookingId: b.id,
    title: b.school?.name || 'Unknown School',
    startDateTime: `${b.programDate}T${convertTo24h(b.arrivalTime)}`,
    endDateTime: `${b.programDate}T${addHours(convertTo24h(b.arrivalTime), 2)}`,
    status: b.status,
    schoolName: b.school?.name || '',
    programs: b.lineItems.map(li => li.program?.name || ''),
    studentCount: b.lineItems[0]?.studentCount || 0,
    color: b.status === 'confirmed' ? '#0EA5E9' : b.status === 'hold' ? '#F59E0B' : '#F43F5E',
  }));

function convertTo24h(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return '10:00';
  let h = parseInt(match[1]);
  const m = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m}`;
}

function addHours(time: string, hours: number): string {
  const [h, m] = time.split(':').map(Number);
  return `${String(h + hours).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// ============================================================
// DASHBOARD CALCULATED DATA
// ============================================================
export function getDashboardStats() {
  const upcoming = BOOKINGS.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const pending = BOOKINGS.filter(b => b.status === 'hold');
  const totalOutstanding = INVOICES.reduce((sum, inv) => sum + inv.outstanding, 0);
  return {
    upcomingTrips: upcoming.length,
    pendingConfirmations: pending.length,
    outstandingBalance: totalOutstanding,
    schoolsOnRecord: SCHOOLS.length,
  };
}

export function getWeeklyBookingData() {
  return [
    { week: 'May 19', bookings: 2 },
    { week: 'May 26', bookings: 1 },
    { week: 'Jun 2', bookings: 3 },
    { week: 'Jun 9', bookings: 2 },
    { week: 'Jun 16', bookings: 1 },
    { week: 'Jul 14', bookings: 2 },
    { week: 'Aug 4', bookings: 3 },
    { week: 'Aug 11', bookings: 2 },
    { week: 'Aug 18', bookings: 1 },
    { week: 'Sep 1', bookings: 1 },
  ];
}

export function getTopPrograms() {
  const counts: Record<string, number> = {};
  BOOKINGS.forEach(b => b.lineItems.forEach(li => {
    const name = li.program?.name || 'Unknown';
    counts[name] = (counts[name] || 0) + 1;
  }));
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
