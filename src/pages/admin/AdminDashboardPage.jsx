import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Clock3,
  Shield,
  Sparkles,
  UserRound,
  Users,
  Waypoints,
} from 'lucide-react'

const metrics = [
  { label: 'Total Visitors Today', value: '247', delta: '+12% vs yesterday', icon: Users },
  { label: 'Active in Building', value: '34', delta: '+5 vs yesterday', icon: UserRound },
  { label: 'Flagged Incidents', value: '3', delta: '+1 vs yesterday', icon: AlertTriangle },
  { label: 'Unauthorized Attempts', value: '7', delta: '-3 vs yesterday', icon: Shield },
]

const activityFeed = [
  { text: 'Amanda Lee checked in - Floor 3', time: '2 min ago', color: 'bg-emerald-500' },
  { text: 'ALERT: Unauthorized access attempt - Floor 5', time: '5 min ago', color: 'bg-red-500' },
  { text: 'Lisa Garcia checked in - Floor 4', time: '12 min ago', color: 'bg-emerald-500' },
  { text: 'Kevin Patel checked out - Floor 2', time: '28 min ago', color: 'bg-blue-500' },
  { text: 'ALERT: Tailgating detected at Main Entrance', time: '34 min ago', color: 'bg-red-500' },
  { text: 'David Kim checked out - Floor 6', time: '39 min ago', color: 'bg-blue-500' },
]

const recentVisitors = [
  { name: 'James Thompson', subtitle: 'Business Meeting - Floor 4', status: 'active', avatar: 'JT' },
  { name: 'Maria Santos', subtitle: 'Contract Review - Floor 2', status: 'waiting', avatar: 'MS' },
  { name: 'David Kim', subtitle: 'System Audit - Floor 6', status: 'completed', avatar: 'DK' },
  { name: 'Sarah Johnson', subtitle: 'Interview - Floor 5', status: 'flagged', avatar: 'SJ' },
  { name: 'Robert Chen', subtitle: 'Legal Consultation - Floor 3', status: 'active', avatar: 'RC' },
]

const floorTraffic = [
  { floor: 'Lobby', value: 260 },
  { floor: 'Floor 2', value: 92 },
  { floor: 'Floor 4', value: 142 },
  { floor: 'Floor 5', value: 108 },
  { floor: 'Floor 6', value: 76 },
]

const healthItems = [
  { label: 'QR Scanners Online', value: '6/6', percent: 100, color: 'bg-emerald-500' },
  { label: 'CCTV Cameras Active', value: '7/8', percent: 88, color: 'bg-blue-500' },
  { label: 'Facial Verify. Units', value: '3/3', percent: 100, color: 'bg-emerald-500' },
  { label: 'Access Points Active', value: '14/16', percent: 88, color: 'bg-amber-500' },
]

const weeklyTraffic = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  authorized: [120, 148, 165, 152, 178, 96, 64],
  rejected: [18, 24, 28, 20, 32, 14, 9],
}

const buildLinePath = (values, width, height, padding) => {
  const max = Math.max(...values)
  const min = 0
  const range = Math.max(max - min, 1)
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2
  const points = values.map((value, index) => {
    const x = padding + (index / (values.length - 1)) * innerWidth
    const y = padding + innerHeight - ((value - min) / range) * innerHeight
    return { x, y }
  })

  return points.reduce((path, point, index, all) => {
    if (index === 0) {
      return `M ${point.x},${point.y}`
    }
    const prev = all[index - 1]
    const next = all[index + 1] || point
    const controlX1 = prev.x + (point.x - prev.x) * 0.45
    const controlY1 = prev.y + (point.y - prev.y) * 0.45
    const controlX2 = point.x - (next.x - prev.x) * 0.15
    const controlY2 = point.y - (next.y - prev.y) * 0.15
    return `${path} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${point.x},${point.y}`
  }, '')
}

const buildAreaPath = (values, width, height, padding) => {
  const linePath = buildLinePath(values, width, height, padding)
  const max = Math.max(...values)
  const min = 0
  const range = Math.max(max - min, 1)
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2
  const firstX = padding
  const lastX = padding + innerWidth
  const baselineY = padding + innerHeight - ((min - min) / range) * innerHeight
  return `${linePath} L ${lastX},${baselineY} L ${firstX},${baselineY} Z`
}

function AdminDashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="grid gap-4 pb-2">
      <div className="flex flex-shrink-0 items-center justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Dashboard Overview</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Monday, March 2, 2026</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0f1d3f] px-4 py-3 font-bold text-[#eef4ff] shadow-[0_10px_18px_rgba(15,29,63,0.18)]">
          <Sparkles size={15} className="text-cyan-400" />
          <Clock3 size={15} className="text-cyan-400" />
          10:33:56 PM
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center justify-between gap-4 rounded-[18px] border border-[#ffb9bd] bg-[#fff4f5] px-4 py-5 text-[#ca1f37] shadow-sm">
        <div>
          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#ffdfe1] text-red-500">
            <AlertTriangle size={24} />
          </div>
          <strong className="mb-1 block text-[1.1rem] font-bold">2 Active Security Alerts</strong>
          <p className="m-0 max-w-[860px] text-[1.02rem] leading-6">Visitor attempted access to restricted Executive Floor 5 without authorization. QR key rejected.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-[16px] border-0 bg-[#fa1234] px-5 py-3 text-[1rem] font-bold text-white shadow-[0_10px_18px_rgba(250,18,52,0.24)]"
          onClick={() => navigate('/admin/security')}
        >
          View Alerts
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <article key={item.label} className="grid gap-2 rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-2 text-[#65789c]">
              <small className="text-[0.9rem] leading-tight">{item.label}</small>
              <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#eef4ff] text-[#2f6df7]">
                <item.icon size={18} />
              </div>
            </div>
            <strong className="text-[2.1rem] font-bold leading-none tracking-[-0.03em] text-[#0b1937]">{item.value}</strong>
            <span className="inline-flex items-center gap-1 text-[0.88rem] font-medium text-[#7282a5]">
              <span className="text-[#1fbf59]">↗</span>
              <span className="font-bold text-[#1fbf59]">{item.delta.split(' ')[0]}</span>
              <span>vs yesterday</span>
            </span>
          </article>
        ))}
      </div>

      <div className="grid min-h-0 gap-4 xl:grid-cols-[1.8fr_0.9fr]">
        <article className="flex min-h-0 flex-col rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
          <header className="flex items-start justify-between gap-3">
            <div>
              <h3 className="m-0 text-[1.15rem] font-bold text-[#0b1937]">Weekly Visitor Traffic</h3>
              <small className="mt-1 block text-[#8392ac]">Authorized vs rejected entries</small>
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#eef2f8] px-4 py-2 text-[0.92rem] text-[#42557d] shadow-inner">
              This Week <ChevronDown size={16} />
            </button>
          </header>
          <div className="chart-entrance relative mt-6 h-[260px] overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,rgba(255,67,92,0.14),rgba(255,67,92,0.02)),repeating-linear-gradient(0deg,rgba(155,169,196,0.16),rgba(155,169,196,0.16)_1px,transparent_1px,transparent_44px)]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="authorizedFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2f6df7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2f6df7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                fill="url(#authorizedFill)"
                d={buildAreaPath(weeklyTraffic.authorized, 600, 220, 28)}
              />
              <path
                fill="none"
                stroke="#2f6df7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={buildLinePath(weeklyTraffic.authorized, 600, 220, 28)}
              />
              <path
                fill="none"
                stroke="#fa1234"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={buildLinePath(weeklyTraffic.rejected, 600, 220, 28)}
              />
              {[0, 55, 110, 165, 220].map((tick) => (
                <text
                  key={tick}
                  x="6"
                  y={28 + 164 - (tick / 220) * 164}
                  fontSize="10"
                  fill="#9aa8c2"
                >
                  {tick}
                </text>
              ))}
              {weeklyTraffic.labels.map((label, index) => (
                <text
                  key={label}
                  x={28 + (index / (weeklyTraffic.labels.length - 1)) * 544}
                  y="210"
                  fontSize="10"
                  fill="#9aa8c2"
                  textAnchor="middle"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>
          <div className="mt-4 flex justify-center gap-5 text-[#42557d]">
            <span className="inline-flex items-center gap-1.5"><Waypoints size={14} className="text-[#2f6df7]" /> Authorized</span>
            <span className="inline-flex items-center gap-1.5"><AlertTriangle size={14} className="text-[#fa1234]" /> Rejected</span>
          </div>
        </article>

        <article className="flex min-h-0 flex-col rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
          <h3 className="m-0 text-[1.15rem] font-bold text-[#0b1937]">Visit Purposes</h3>
          <small className="mt-1 block text-[#8392ac]">Today&apos;s distribution</small>
          <div className="chart-entrance mx-auto my-6 aspect-square w-[170px] rounded-full bg-[conic-gradient(#2d49bc_0_42%,#1797b9_42%_60%,#723ddb_60%_72%,#ef6a0b_72%_80%,#1ca556_80%_90%,#717d94_90%_100%)] [mask:radial-gradient(circle_at_center,transparent_41%,#000_42%)]" />
          <ul className="grid gap-3 pl-0 text-[#304a79]">
            <li className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#2d49bc]" />Business Meeting</span><strong>42%</strong></li>
            <li className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#1797b9]" />Interview</span><strong>18%</strong></li>
            <li className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#723ddb]" />Delivery</span><strong>12%</strong></li>
            <li className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#ef6a0b]" />Maintenance</span><strong>8%</strong></li>
          </ul>
        </article>
      </div>

      <div className="grid min-h-0 gap-4 xl:grid-cols-[1.8fr_0.9fr]">
        <article className="flex min-h-0 flex-col rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm xl:col-span-2">
          <header className="flex items-start justify-between gap-3">
            <div>
              <h3 className="m-0 text-[1.15rem] font-bold text-[#0b1937]">Peak Entry Hours</h3>
              <small className="mt-1 block text-[#8392ac]">Visitor volume by time of day</small>
            </div>
            <span className="inline-flex items-center gap-2 text-[#42557d]"><Clock3 size={16} /> Today</span>
          </header>
          <div className="chart-entrance mt-6 flex h-[260px] items-end gap-4 rounded-[16px] bg-[linear-gradient(180deg,rgba(23,57,153,0.04),rgba(23,57,153,0.01))] px-4 pb-5 pt-2">
            {[4, 12, 46, 90, 68, 58, 49, 43, 61, 55, 50, 38, 16, 5].map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-[4px] bg-[#2448b7]" style={{ height: `${value * 1.75}px` }} />
                <span className="text-[0.72rem] text-[#7f90aa]">{index + 6}AM</span>
              </div>
            ))}
          </div>
        </article>

        <article className="flex min-h-0 flex-col rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
          <header className="flex items-start justify-between gap-3">
            <div>
              <h3 className="m-0 text-[1.15rem] font-bold text-[#0b1937]">Live Activity</h3>
              <small className="mt-1 block text-[#8392ac]">Real-time event feed</small>
            </div>
            <span className="inline-flex items-center gap-2 text-[#12b76a]"><span className="h-2.5 w-2.5 rounded-full bg-[#2bd56a]" />Live</span>
          </header>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-2">
            <div className="grid gap-5">
              {activityFeed.map((item) => (
                <article key={item.text} className="flex items-start gap-3">
                  <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`} />
                  <div>
                    <p className="m-0 text-[0.95rem] text-[#0b1937]">{item.text}</p>
                    <small className="mt-1 block text-[#90a0be]">{item.time}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </article>
      </div>

      <div className="grid min-h-0 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="flex min-h-0 flex-col rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
          <header className="flex items-start justify-between gap-3">
            <div>
              <h3 className="m-0 text-[1.15rem] font-bold text-[#0b1937]">Recent Visitors</h3>
              <small className="mt-1 block text-[#8392ac]">Latest check-ins</small>
            </div>
            <button type="button" className="inline-flex items-center gap-1 text-[0.95rem] font-medium text-[#2457ff]">
              View all <ChevronRight size={18} />
            </button>
          </header>
          <div className="mt-4 grid gap-6">
            {recentVisitors.map((visitor) => (
              <div key={visitor.name} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#dbe9ff] text-[0.82rem] font-bold text-[#2457ff]">{visitor.avatar}</div>
                  <div>
                    <strong className="block text-[#0b1937]">{visitor.name}</strong>
                    <small className="block text-[#8fa1bf]">{visitor.subtitle}</small>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[0.82rem] capitalize ${
                    visitor.status === 'active'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                      : visitor.status === 'waiting'
                        ? 'border-amber-200 bg-amber-50 text-amber-600'
                        : visitor.status === 'completed'
                          ? 'border-slate-200 bg-slate-50 text-slate-500'
                          : 'border-red-200 bg-red-50 text-red-500'
                  }`}
                >
                  {visitor.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-4">
          <article className="rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
            <header className="flex items-start justify-between gap-3">
              <div>
                <h3 className="m-0 text-[1.15rem] font-bold text-[#0b1937]">Floor Traffic</h3>
                <small className="mt-1 block text-[#8392ac]">Today</small>
              </div>
            </header>
            <div className="mt-6 grid gap-3">
              {floorTraffic.map((item) => (
                <div key={item.floor} className="grid grid-cols-[70px_1fr_44px] items-center gap-3">
                  <span className="text-[0.9rem] text-[#7f90aa]">{item.floor}</span>
                  <div className="h-3 rounded-full bg-[#eaf1f9]">
                    <div className="h-3 rounded-full bg-[#1697b7]" style={{ width: `${(item.value / 260) * 100}%` }} />
                  </div>
                  <span className="text-right text-[0.85rem] text-[#7f90aa]">{item.value}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[18px] border border-[#d6e2fa] bg-white p-5 shadow-sm">
            <h3 className="m-0 text-[1.15rem] font-bold text-[#0b1937]">System Health</h3>
            <div className="mt-6 grid gap-4">
              {healthItems.map((item) => (
                <div key={item.label} className="grid gap-1">
                  <div className="flex items-center justify-between gap-3 text-[#42557d]">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#edf2f8]">
                    <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
