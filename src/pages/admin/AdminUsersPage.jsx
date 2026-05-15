import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Pause,
  Plus,
  Search,
  Users,
} from 'lucide-react'

const userManagementData = {
  stats: [
    { label: 'Total Users', value: '7', icon: Users },
    { label: 'Active', value: '5', icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Suspended', value: '1', icon: Pause, color: 'text-red-500' },
    { label: 'Inactive', value: '1', icon: Clock, color: 'text-slate-500' },
  ],
  users: [
    { id: 1, name: 'Alexandra Chen', role: 'Admin', email: 'admin@securevms.com', phone: '+1 (555) 0001', status: 'Active', lastLogin: '2026-03-02 09:00:12', created: '2023-06-01', initials: 'A', color: 'bg-slate-700' },
    { id: 2, name: 'Marcus Williams', role: 'Security', email: 'marcus.w@securevms.com', phone: '+1 (555) 0002', status: 'Active', lastLogin: '2026-03-02 08:55:44', created: '2023-08-15', initials: 'M', color: 'bg-slate-700' },
    { id: 3, name: 'James Carter', role: 'Security', email: 'james.c@securevms.com', phone: '+1 (555) 0003', status: 'Active', lastLogin: '2026-03-02 07:30:22', created: '2023-09-01', initials: 'J', color: 'bg-slate-700' },
    { id: 4, name: 'Sofia Rodriguez', role: 'Receptionist', email: 'sofia.r@securevms.com', phone: '+1 (555) 0004', status: 'Active', lastLogin: '2026-03-02 08:00:05', created: '2023-07-20', initials: 'S', color: 'bg-slate-700' },
    { id: 5, name: 'Emily Watson', role: 'Admin', email: 'emily.w@securevms.com', phone: '+1 (555) 0005', status: 'Active', lastLogin: '2026-03-01 17:30:00', created: '2023-05-10', initials: 'E', color: 'bg-slate-700' },
    { id: 6, name: 'Michael Torres', role: 'Security', email: 'michael.t@securevms.com', phone: '+1 (555) 0006', status: 'Suspended', lastLogin: '2026-02-28 14:22:11', created: '2023-10-12', initials: 'M', color: 'bg-slate-700' },
    { id: 7, name: 'Jessica Lee', role: 'Receptionist', email: 'jessica.l@securevms.com', phone: '+1 (555) 0007', status: 'Inactive', lastLogin: '2025-12-15 11:45:30', created: '2023-11-03', initials: 'J', color: 'bg-slate-700' },
  ],
}

function AdminUsersPage() {
  return (
    <div className="grid gap-4 pb-2">
      <div className="flex flex-shrink-0 items-center justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">User & Role Management</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Create and manage system user accounts</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-[16px] bg-[#2563ff] px-5 py-3 text-[1rem] font-bold text-white shadow-[0_10px_18px_rgba(37,99,255,0.24)]">
          <Plus size={18} />
          Create User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {userManagementData.stats.map((stat) => (
          <article key={stat.label} className="grid gap-2 rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <small className="text-[0.9rem] leading-tight text-[#65789c]">{stat.label}</small>
              <div className={`grid h-11 w-11 place-items-center rounded-[14px] bg-[#eef4ff] ${stat.color || 'text-[#2f6df7]'}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <strong className="text-[2.1rem] font-bold leading-none tracking-[-0.03em] text-[#0b1937]">{stat.value}</strong>
          </article>
        ))}
      </div>

      <article className="flex flex-col rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
        <header className="flex items-start justify-between gap-4 border-b border-[#e5eef9] pb-5">
          <div className="flex flex-1 gap-4">
            <div className="flex h-12 w-full max-w-[330px] items-center gap-2 rounded-full border border-transparent bg-[#eef2f8] px-4 text-[#8fa1bf] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <Search size={17} className="shrink-0" />
              <input type="text" placeholder="Search users..." className="w-full bg-transparent text-[0.95rem] placeholder-[#8fa1bf] outline-none" />
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#eef2f8] px-4 py-2 text-[0.92rem] text-[#42557d] shadow-inner transition hover:bg-[#e5eef9]">
              All Roles <ChevronDown size={16} />
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#eef2f8] px-4 py-2 text-[0.92rem] text-[#42557d] shadow-inner transition hover:bg-[#e5eef9]">
              All Status <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-[0.95rem]">
            <thead>
              <tr className="border-b border-[#e5eef9] text-[#65789c]">
                <th className="px-2 py-3 text-left font-semibold">USER</th>
                <th className="px-2 py-3 text-left font-semibold">ROLE</th>
                <th className="px-2 py-3 text-left font-semibold">CONTACT</th>
                <th className="px-2 py-3 text-left font-semibold">STATUS</th>
                <th className="px-2 py-3 text-left font-semibold">LAST LOGIN</th>
                <th className="px-2 py-3 text-left font-semibold">CREATED</th>
                <th className="px-2 py-3 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {userManagementData.users.map((user) => (
                <tr key={user.id} className="border-b border-[#e5eef9] transition hover:bg-[#f8fafc]">
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-10 w-10 place-items-center rounded-full ${user.color} text-[0.9rem] font-semibold text-white`}>
                        {user.initials}
                      </div>
                      <div>
                        <strong className="block text-[#0b1937]">{user.name}</strong>
                        <small className="block text-[#8fa1bf]">{user.email.split('@')[0]}</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-medium ${
                        user.role === 'Admin'
                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                          : user.role === 'Security'
                            ? 'border-purple-200 bg-purple-50 text-purple-700'
                            : 'border-cyan-200 bg-cyan-50 text-cyan-700'
                      }`}
                    >
                      {user.role === 'Admin' && '🛡️'} {user.role === 'Security' && '👮'} {user.role === 'Receptionist' && '📞'} {user.role}
                    </span>
                  </td>
                  <td className="px-2 py-4">
                    <div className="text-[#0b1937]">
                      <div className="flex items-center gap-1 text-[0.88rem]">📧 {user.email}</div>
                      <div className="flex items-center gap-1 text-[0.88rem] text-[#8fa1bf]">📱 {user.phone}</div>
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-[0.82rem] font-medium ${
                        user.status === 'Active'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                          : user.status === 'Suspended'
                            ? 'border-red-200 bg-red-50 text-red-600'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-2 py-4 text-[#42557d]">{user.lastLogin}</td>
                  <td className="px-2 py-4 text-[#42557d]">{user.created}</td>
                  <td className="px-2 py-4">
                    <button className="text-[#8fa1bf] transition hover:text-[#42557d]">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

export default AdminUsersPage
