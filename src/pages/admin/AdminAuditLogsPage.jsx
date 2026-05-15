import { useState } from 'react'
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  Filter,
  Globe,
  Info,
  Search,
  ShieldAlert,
  Target,
  TriangleAlert,
  UserRound,
  X,
} from 'lucide-react'

const auditStats = [
  { label: 'Info', value: 6, tone: 'border-blue-200 bg-blue-50 text-blue-600', icon: Info },
  { label: 'Warning', value: 4, tone: 'border-amber-200 bg-amber-50 text-amber-700', icon: TriangleAlert },
  { label: 'Critical', value: 2, tone: 'border-red-200 bg-red-50 text-red-600', icon: ShieldAlert },
]

const auditLogs = [
  {
    id: 'LG-100',
    severity: 'Info',
    user: 'Alexandra Chen',
    role: 'Admin',
    action: 'User Created',
    target: 'Daniel Park (Receptionist)',
    timestamp: '2026-03-02 08:45:22',
    ip: '192.168.1.100',
    details: 'New receptionist account created with full check-in permissions.',
  },
  {
    id: 'LG-101',
    severity: 'Info',
    user: 'Sofia Rodriguez',
    role: 'Receptionist',
    action: 'Visitor Approved',
    target: 'James Thompson (VIS-001)',
    timestamp: '2026-03-02 09:14:55',
    ip: '192.168.1.105',
    details: 'Visitor approval granted for scheduled business meeting.',
  },
  {
    id: 'LG-102',
    severity: 'Warning',
    user: 'Marcus Williams',
    role: 'Security',
    action: 'Floor Locked',
    target: 'Floor 5 - Executive',
    timestamp: '2026-03-02 14:33:00',
    ip: '192.168.1.110',
    details: 'Executive floor locked due to high-risk alert escalation.',
  },
  {
    id: 'LG-103',
    severity: 'Critical',
    user: 'System',
    role: 'Automation',
    action: 'Unauthorized Access',
    target: 'Executive Suite - Floor 5',
    timestamp: '2026-03-02 14:32:15',
    ip: '192.168.1.140',
    details: 'Access denied for unverified badge attempt at executive suite.',
  },
]

const severityStyles = {
  Info: 'border-blue-200 bg-blue-50 text-blue-600',
  Warning: 'border-amber-200 bg-amber-50 text-amber-700',
  Critical: 'border-red-200 bg-red-50 text-red-600',
}

function AdminAuditLogsPage() {
  const [toast, setToast] = useState(null)
  const [selectedLog, setSelectedLog] = useState(null)

  const handleExport = () => {
    setToast({
      title: 'Exporting audit logs...',
      message: 'Please wait while we prepare your file.',
      variant: 'info',
    })
    window.setTimeout(() => {
      setToast({
        title: 'Export complete',
        message: 'Audit logs are ready to download.',
        variant: 'success',
      })
    }, 1500)
    window.setTimeout(() => setToast(null), 3200)
  }

  return (
    <div className="grid gap-5 pb-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Audit Logs</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Comprehensive system activity trail</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-[#0b142d] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-sm"
          onClick={handleExport}
          type="button"
        >
          <Download size={18} />
          Export Logs
        </button>
      </div>

      {toast && (
        <div className="fixed right-6 top-6 z-[999] w-full max-w-[360px] px-4 sm:right-8">
          <div
            className={`flex items-center gap-3 rounded-[16px] border px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.12)] ${
              toast.variant === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-[#dbe7f5] bg-[#eff6ff] text-[#1d4ed8]'
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white">
              {toast.variant === 'success' ? <CheckCircle2 size={16} /> : <Info size={16} />}
            </span>
            <div>
              <strong className="block text-[0.95rem]">{toast.title}</strong>
              <span className="text-[0.82rem] text-[#5b7cc5]">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {auditStats.map((stat) => (
          <article key={stat.label} className="rounded-[18px] border border-[#e1e8f3] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-[1.35rem] text-[#0b1937]">{stat.value}</strong>
                <div className="mt-2">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-semibold ${stat.tone}`}>
                    {stat.label}
                  </span>
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f2f5f9] text-[#64748b]">
                <stat.icon size={16} />
              </div>
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
              placeholder="Search actions, users, targets..."
              type="text"
            />
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#f2f5f9] px-4 py-3 text-[0.92rem] text-[#1f2a44]">
            <Filter size={16} />
            All Severity <ChevronDown size={16} />
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#f2f5f9] px-4 py-3 text-[0.92rem] text-[#1f2a44]">
            All Roles <ChevronDown size={16} />
          </button>
        </div>
        <p className="m-0 mt-3 text-[0.88rem] text-[#7f90aa]">12 log entries found</p>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-[#e1e8f3] bg-white shadow-sm">
        <table className="w-full text-[0.95rem]">
          <thead>
            <tr className="border-b border-[#edf1f7] text-left text-[0.78rem] font-semibold uppercase tracking-wide text-[#6c7a95]">
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">User / Role</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Target</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} className="border-b border-[#f0f3f9]">
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-semibold ${severityStyles[log.severity]}`}>
                    {log.severity}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <strong className="block text-[#0b1937]">{log.user}</strong>
                  <span className="text-[0.82rem] text-[#8ea1bf]">{log.role}</span>
                </td>
                <td className="px-6 py-5 text-[#1f2a44]">{log.action}</td>
                <td className="px-6 py-5 text-[#1f2a44]">{log.target}</td>
                <td className="px-6 py-5 text-[#64748b]">{log.timestamp}</td>
                <td className="px-6 py-5 text-[#64748b]">{log.ip}</td>
                <td className="px-6 py-5">
                  <button
                    className="grid h-8 w-8 place-items-center rounded-full text-[#2457ff] hover:bg-[#edf3ff]"
                    type="button"
                    onClick={() => setSelectedLog(log)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 px-4">
          <div className="w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e5eef9] pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <Info size={18} />
                </span>
                <div>
                  <h3 className="m-0 text-[1.2rem] font-bold text-[#0b1937]">{selectedLog.action}</h3>
                  <span className="text-[0.85rem] text-[#8ea1bf]">{selectedLog.id}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#7f90aa] hover:bg-[#f3f5f9]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 text-[0.9rem] text-[#42557d] sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <UserRound size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">User</span>
                  <strong className="block text-[#1f2a44]">{selectedLog.user}</strong>
                  <span className="text-[0.8rem] text-[#8ea1bf]">{selectedLog.role}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">Timestamp</span>
                  <strong className="block text-[#1f2a44]">{selectedLog.timestamp}</strong>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">IP Address</span>
                  <strong className="block text-[#1f2a44]">{selectedLog.ip}</strong>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Target size={16} className="mt-1 text-[#8ea1bf]" />
                <div>
                  <span className="block text-[0.78rem] text-[#8ea1bf]">Target</span>
                  <strong className="block text-[#1f2a44]">{selectedLog.target}</strong>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[16px] border border-[#e1e8f3] bg-[#f8fafc] p-4 text-[0.9rem] text-[#42557d]">
              <span className="block text-[0.78rem] font-semibold uppercase tracking-wide text-[#8ea1bf]">Details</span>
              <p className="m-0 mt-2">{selectedLog.details}</p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-semibold ${severityStyles[selectedLog.severity]}`}>
                {selectedLog.severity} Severity
              </span>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="h-10 rounded-full bg-[#f2f5f9] px-6 text-[0.95rem] font-semibold text-[#1f2a44]"
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

export default AdminAuditLogsPage
