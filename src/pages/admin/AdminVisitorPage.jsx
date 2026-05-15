import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  Info,
  Mail,
  MoreVertical,
  Phone,
  ShieldAlert,
  Search,
  UserRound,
  X,
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
  const [toast, setToast] = useState(null)
  const [selectedVisitor, setSelectedVisitor] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)

  const handleExport = () => {
    setToast({
      title: 'Exporting visitor report...',
      message: 'Please wait while we prepare your file.',
      variant: 'info',
    })
    window.setTimeout(() => {
      setToast({
        title: 'Export complete',
        message: 'Visitor report is ready to download.',
        variant: 'success',
      })
    }, 1500)
    window.setTimeout(() => setToast(null), 3200)
  }

  const showSuccessToast = (title, message) => {
    setToast({ title, message, variant: 'success' })
    window.setTimeout(() => setToast(null), 2600)
  }

  const handleViewDetails = (visitor) => {
    setSelectedVisitor(visitor)
    setOpenMenuId(null)
  }

  const handleOverride = (visitor) => {
    setOpenMenuId(null)
    showSuccessToast('Manual access override applied.', 'Visitor access restored.')
  }

  const handleBlacklist = (visitor) => {
    setOpenMenuId(null)
    setToast({
      title: 'Visitor blacklisted.',
      message: 'They will be denied entry.',
      variant: 'warning',
    })
    window.setTimeout(() => setToast(null), 2600)
  }

  return (
    <div className="grid gap-5 pb-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Visitor Management</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Full visitor database with access controls</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-[#0b142d] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-sm"
          onClick={handleExport}
          type="button"
        >
          <Download size={18} />
          Export Report
        </button>
      </div>

      {toast && (
        <div className="fixed right-6 top-6 z-40 w-full max-w-[360px] px-4 sm:right-8">
          <div
            className={`flex items-center gap-3 rounded-[16px] border px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.12)] ${
              toast.variant === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : toast.variant === 'warning'
                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                  : 'border-[#dbe7f5] bg-[#eff6ff] text-[#1d4ed8]'
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white">
              {toast.variant === 'success' ? <CheckCircle2 size={16} /> : toast.variant === 'warning' ? <ShieldAlert size={16} /> : <Info size={16} />}
            </span>
            <div>
              <strong className="block text-[0.95rem]">{toast.title}</strong>
              <span className={`text-[0.82rem] ${toast.variant === 'warning' ? 'text-amber-700' : 'text-[#5b7cc5]'}`}>{toast.message}</span>
            </div>
          </div>
        </div>
      )}

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
                    <button
                      className="grid h-8 w-8 place-items-center rounded-full text-[#2457ff] hover:bg-[#edf3ff]"
                      type="button"
                      onClick={() => handleViewDetails(visitor)}
                    >
                      <Eye size={16} />
                    </button>
                    <div className="relative">
                      <button
                        className="grid h-8 w-8 place-items-center rounded-full text-[#7f90aa] hover:bg-[#f3f5f9]"
                        type="button"
                        onClick={() => setOpenMenuId((prev) => (prev === visitor.id ? null : visitor.id))}
                        aria-haspopup="true"
                        aria-expanded={openMenuId === visitor.id}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenuId === visitor.id && (
                        <div className="absolute right-0 top-10 z-20 w-[200px] rounded-[14px] border border-[#e1e8f3] bg-white p-2 shadow-[0_18px_35px_rgba(15,23,42,0.12)]">
                          <button
                            type="button"
                            onClick={() => handleViewDetails(visitor)}
                            className="flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-[0.9rem] text-[#1f2a44] hover:bg-[#f5f7fb]"
                          >
                            <Eye size={16} /> View Details
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOverride(visitor)}
                            className="mt-1 flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-[0.9rem] text-emerald-600 hover:bg-emerald-50"
                          >
                            <Check size={16} /> Override Access
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBlacklist(visitor)}
                            className="mt-1 flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-[0.9rem] text-red-600 hover:bg-red-50"
                          >
                            <ShieldAlert size={16} /> Blacklist Visitor
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVisitor && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 px-4">
          <div className="w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e5eef9] pb-4">
              <h3 className="m-0 text-[1.4rem] font-bold text-[#0b1937]">Visitor Details</h3>
              <button
                type="button"
                onClick={() => setSelectedVisitor(null)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#7f90aa] hover:bg-[#f3f5f9]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#dfe7f4] text-[1rem] font-semibold text-[#1f2a44]">
                {selectedVisitor.initials}
              </div>
              <div>
                <strong className="block text-[1.05rem] text-[#0b1937]">{selectedVisitor.name}</strong>
                <span className="block text-[0.9rem] text-[#8ea1bf]">{selectedVisitor.company}</span>
                <span className={`mt-2 inline-flex items-center rounded-full border px-3 py-1 text-[0.78rem] font-semibold ${statusStyles[selectedVisitor.status]}`}>
                  {selectedVisitor.status}
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-[0.9rem] text-[#42557d] sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">Email</span>
                  james.t@email.com
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">Phone</span>
                  +1 (555) 0101
                </div>
              </div>
              <div className="flex items-start gap-2">
                <UserRound size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">Host</span>
                  {selectedVisitor.host}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">Check-In</span>
                  {selectedVisitor.checkIn || '—'}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-[0.78rem] font-semibold uppercase tracking-wide text-[#8ea1bf]">Floor Access</span>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[0.78rem] text-blue-700">Lobby</span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[0.78rem] text-blue-700">{selectedVisitor.floor}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <div className="rounded-[14px] border border-[#e1e8f3] bg-white p-4 text-center">
                <div className="grid place-items-center rounded-[12px] border border-[#e1e8f3] bg-white p-3">
                  <QRCodeCanvas
                    value={`VMS-2026-${selectedVisitor.id}-AUTHORIZED`}
                    size={120}
                    bgColor="#ffffff"
                    fgColor="#0b1937"
                    level="M"
                  />
                </div>
                <span className="mt-2 block text-[0.75rem] text-[#8ea1bf]">VMS-2026-{selectedVisitor.id}-AUTHORIZED</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedVisitor(null)
                  handleBlacklist(selectedVisitor)
                }}
                className="h-11 rounded-full bg-red-50 text-[0.95rem] font-semibold text-red-600"
              >
                Blacklist
              </button>
              <button
                type="button"
                onClick={() => setSelectedVisitor(null)}
                className="h-11 rounded-full bg-[#f2f5f9] text-[0.95rem] font-semibold text-[#1f2a44]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminVisitorPage
