import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Shield,
  Settings,
  UserRound,
  Users,
  Waypoints,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: Users, end: true },
  { label: 'User Management', to: '/admin/users', icon: UserRound },
  { label: 'Visitor Management', to: '/admin/visitors', icon: Users },
  { label: 'Floor Access Control', to: '/admin/access-control', icon: Shield },
  { label: 'Security Oversight', to: '/admin/security', icon: AlertTriangle },
  { label: 'Reports & Analytics', to: '/admin/reports', icon: Waypoints },
  { label: 'Audit Logs', to: '/admin/audit-logs', icon: Bell },
]

const notifications = [
  {
    id: 'NT-1',
    text: 'Unauthorized access attempt - Floor 5',
    time: '2 min ago',
    tone: 'bg-red-500',
  },
  {
    id: 'NT-2',
    text: 'Tailgating detected at Main Entrance',
    time: '5 min ago',
    tone: 'bg-red-500',
  },
  {
    id: 'NT-3',
    text: 'Visitor facial mismatch - checkpoint',
    time: '15 min ago',
    tone: 'bg-amber-500',
  },
]

function AdminPage() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev)
    setIsProfileOpen(false)
  }

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev)
    setIsNotificationsOpen(false)
  }

  return (
    <section className="grid h-screen overflow-hidden grid-cols-1 bg-[#eef2f8] text-[#10203f] lg:grid-cols-[244px_1fr]">
      <aside className="flex h-full flex-col overflow-hidden border-r border-white/10 bg-[#0b142d] text-[#a7b9d9]">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#2563ff] text-white shadow-[0_10px_20px_rgba(37,99,255,0.3)]">
              <Shield size={18} />
            </div>
            <div className="min-w-0">
              <strong className="block text-[1rem] leading-tight text-white">SecureVMS</strong>
              <small className="block text-[0.75rem] leading-tight text-[#54b4ff]">Admin Panel</small>
            </div>
          </div>
        </div>

        <nav className="grid gap-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[12px] px-4 py-3.5 text-left text-[0.98rem] font-semibold transition ${
                  isActive
                    ? 'bg-[#2563ff] text-white shadow-[0_12px_22px_rgba(37,99,255,0.3)]'
                    : 'text-[#8da4c7] hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="grid h-5 w-5 place-items-center">
                <item.icon size={18} />
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#2563ff] font-bold text-white">A</div>
            <div className="min-w-0 flex-1">
              <strong className="block text-[0.98rem] leading-tight text-white">Alexandra Chen</strong>
              <small className="block text-[0.78rem] leading-tight text-[#7ea4e1]">admin@securevms.com</small>
            </div>
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-md text-[#8da4c7] transition hover:bg-white/5 hover:text-white"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex h-full min-h-0 flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-6">
        <header className="flex flex-shrink-0 items-center justify-between gap-4">
          <div className="flex h-12 w-full max-w-[330px] items-center gap-2 rounded-full border border-transparent bg-[#eef2f8] px-4 text-[#8fa1bf] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <Search size={17} className="shrink-0" />
            <span className="text-[0.95rem]">Search visitors, logs...</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 items-center gap-2 rounded-full border border-[#b8e4c7] bg-[#ecfff2] px-4 text-[0.9rem] font-bold text-[#148044]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2bd56a]" />
              All Systems Operational
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={toggleNotifications}
                className="relative grid h-10 w-10 place-items-center rounded-full bg-[#f3f4f8] text-[#2a3550] shadow-sm"
                aria-haspopup="true"
                aria-expanded={isNotificationsOpen}
              >
                <Bell size={18} />
                <span className="sr-only">Notifications</span>
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 z-20 mt-3 w-[320px] rounded-[18px] border border-[#e1e8f3] bg-white p-4 shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                  <div className="flex items-center justify-between">
                    <strong className="text-[1rem] text-[#0b1937]">Notifications</strong>
                    <span className="rounded-full bg-red-50 px-2 py-1 text-[0.7rem] font-semibold text-red-600">{notifications.length} active</span>
                  </div>
                  <div className="mt-3 grid gap-3">
                    {notifications.map((item) => (
                      <div key={item.id} className="rounded-[14px] border border-[#eef2f8] px-3 py-2">
                        <div className="flex items-start gap-2">
                          <span className={`mt-1 h-2 w-2 rounded-full ${item.tone}`} />
                          <div>
                            <p className="m-0 text-[0.9rem] font-semibold text-[#e11d48]">{item.text}</p>
                            <span className="text-[0.78rem] text-[#94a3b8]">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 w-full rounded-[12px] border border-transparent py-2 text-[0.9rem] font-semibold text-[#2563ff]">
                    View all notifications
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={toggleProfile}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#eff3fa] px-3 pr-4 text-[#1f2a44] shadow-sm"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2563ff] font-bold text-white">A</span>
                <span className="text-[0.98rem] font-medium text-[#1f2a44]">Alexandra</span>
                <ChevronDown size={16} className="text-[#8ea1bf]" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 z-20 mt-3 w-[220px] rounded-[18px] border border-[#e1e8f3] bg-white p-3 shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                  <button className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-[0.95rem] text-[#1f2a44] hover:bg-[#f5f7fb]">
                    <UserRound size={16} /> Profile Settings
                  </button>
                  <button className="mt-1 flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-[0.95rem] text-[#1f2a44] hover:bg-[#f5f7fb]">
                    <Settings size={16} /> System Settings
                  </button>
                  <button className="mt-1 flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-[0.95rem] text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:#c8d5ea_transparent]">
          <Outlet />
        </div>
      </main>
    </section>
  )
}

export default AdminPage
