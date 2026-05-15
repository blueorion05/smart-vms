import {
  Calendar,
  ChevronDown,
  Download,
  Eye,
  MoreVertical,
  Search,
} from 'lucide-react'

const visitorStats = [
  { label: 'Active', value: 4, tone: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  { label: 'Waiting', value: 2, tone: 'border-amber-200 bg-amber-50 text-amber-700' },
  { label: 'Completed', value: 2, tone: 'border-slate-200 bg-slate-50 text-slate-600' },
  { label: 'Flagged', value: 1, tone: 'border-red-200 bg-red-50 text-red-600' },
  { label: 'Blacklisted', value: 1, tone: 'border-red-300 bg-red-900 text-white' },
  { label: 'Expired', value: 0, tone: 'border-slate-200 bg-slate-50 text-slate-500' },
]

const visitors = [
  {
    id: 'VIS-001',
    name: 'James Thompson',
    initials: 'JT',
    company: 'Acme Corporation',
    host: 'Dr. Sarah Park',
    floor: 'Floor 4',
    purpose: 'Business Meeting',
    checkIn: '09:15 AM',
    checkOut: 'Still inside',
    status: 'Active',
  },
  {
    id: 'VIS-002',
    name: 'Maria Santos',
    initials: 'MS',
    company: 'Globex Inc',
    host: 'Michael Torres',
    floor: 'Floor 2',
    purpose: 'Contract Review',
    checkIn: 'Not arrived',
    checkOut: '',
    status: 'Waiting',
  },
  {
    id: 'VIS-003',
    name: 'David Kim',
    initials: 'DK',
    company: 'TechWave Solutions',
    host: 'Emily Chen',
    floor: 'Floor 6',
    purpose: 'System Audit',
    checkIn: '08:30 AM',
    checkOut: '11:45 AM',
    status: 'Completed',
  },
  {
    id: 'VIS-004',
    name: 'Sarah Johnson',
    initials: 'SJ',
    company: 'Northbridge Partners',
    host: 'Marcus Williams',
    floor: 'Floor 5',
    purpose: 'Executive Visit',
    checkIn: '09:05 AM',
    checkOut: 'Still inside',
    status: 'Flagged',
  },
  {
    id: 'VIS-005',
    name: 'Robert Chen',
    initials: 'RC',
    company: 'LegalWorks',
    host: 'Alexandra Chen',
    floor: 'Floor 3',
    purpose: 'Legal Review',
    checkIn: '10:05 AM',
    checkOut: 'Still inside',
    status: 'Active',
  },
]

const statusStyles = {
  Active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Waiting: 'border-amber-200 bg-amber-50 text-amber-700',
  Completed: 'border-slate-200 bg-slate-50 text-slate-600',
  Flagged: 'border-red-200 bg-red-50 text-red-600',
  Blacklisted: 'border-red-300 bg-red-900 text-white',
  Expired: 'border-slate-200 bg-slate-50 text-slate-500',
}

function AdminVisitorPage() {
  return (
    <div className="grid gap-5 pb-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Visitor Management</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Full visitor database with access controls</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-[#0b142d] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-sm">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
        {visitorStats.map((stat) => (
          <article key={stat.label} className="rounded-[18px] border border-[#e1e8f3] bg-white p-4 shadow-sm">
            <strong className="text-[1.35rem] text-[#0b1937]">{stat.value}</strong>
            <div className="mt-2">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-semibold ${stat.tone}`}>
                {stat.label}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-[260px] flex-1 items-center gap-2 rounded-full bg-[#f2f5f9] px-4 py-3 text-[#7c8ca8]">
            <Search size={18} className="shrink-0" />
            <input
              className="w-full bg-transparent text-[0.95rem] text-[#1f2a44] placeholder-[#7c8ca8] outline-none"
              placeholder="Search by name, company, host, ID..."
              type="text"
            />
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#f2f5f9] px-4 py-3 text-[0.92rem] text-[#1f2a44]">
            All Status <ChevronDown size={16} />
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#f2f5f9] px-4 py-3 text-[0.92rem] text-[#1f2a44]">
            All Floors <ChevronDown size={16} />
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#f2f5f9] px-4 py-3 text-[0.92rem] text-[#1f2a44]">
            <Calendar size={16} /> mm/dd/yyyy
          </button>
        </div>
        <p className="m-0 mt-3 text-[0.88rem] text-[#7f90aa]">10 visitors found</p>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-[#e1e8f3] bg-white shadow-sm">
        <table className="w-full text-[0.95rem]">
          <thead>
            <tr className="border-b border-[#edf1f7] text-left text-[0.78rem] font-semibold uppercase tracking-wide text-[#6c7a95]">
              <th className="px-6 py-4">Visitor</th>
              <th className="px-6 py-4">Company / Host</th>
              <th className="px-6 py-4">Floor / Purpose</th>
              <th className="px-6 py-4">Check-in/out</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="border-b border-[#f0f3f9]">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#dfe7f4] text-[0.82rem] font-semibold text-[#1f2a44]">
                      {visitor.initials}
                    </div>
                    <div>
                      <strong className="block text-[#0b1937]">{visitor.name}</strong>
                      <span className="text-[0.82rem] text-[#8ea1bf]">{visitor.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[#1f2a44]">{visitor.company}</div>
                  <div className="text-[0.82rem] text-[#8ea1bf]">Host: {visitor.host}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[#1f2a44]">{visitor.floor}</div>
                  <div className="text-[0.82rem] text-[#8ea1bf]">{visitor.purpose}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[#1f2a44]">{visitor.checkIn ? `In: ${visitor.checkIn}` : '—'}</div>
                  <div className="text-[0.82rem] text-[#8ea1bf]">
                    {visitor.checkOut ? (visitor.checkOut === 'Still inside' ? visitor.checkOut : `Out: ${visitor.checkOut}`) : '—'}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-semibold ${statusStyles[visitor.status]}`}>
                    {visitor.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 text-[#6b7c97]">
                    <button className="grid h-8 w-8 place-items-center rounded-full text-[#2457ff] hover:bg-[#edf3ff]">
                      <Eye size={16} />
                    </button>
                    <button className="grid h-8 w-8 place-items-center rounded-full text-[#7f90aa] hover:bg-[#f3f5f9]">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminVisitorPage
