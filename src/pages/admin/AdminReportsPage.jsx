import { useState } from 'react'
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Download,
  FileDown,
  Info,
  LineChart,
  PieChart,
} from 'lucide-react'

const reportStats = [
  { label: 'Total Visitors (Month)', value: '3,933', delta: '+18%', icon: BarChart3, tone: 'text-[#2563ff]' },
  { label: 'Authorization Rate', value: '94.8%', delta: '+2.1%', icon: LineChart, tone: 'text-[#16a34a]' },
  { label: 'Security Violations', value: '45', delta: '-12%', icon: PieChart, tone: 'text-[#ef4444]' },
  { label: 'Avg Daily Visitors', value: '127', delta: '+8%', icon: Calendar, tone: 'text-[#0ea5e9]' },
]

const purposeBreakdown = [
  { label: 'Business Meeting', value: 42, color: 'bg-[#1f4ed8]' },
  { label: 'Interview', value: 18, color: 'bg-[#0ea5e9]' },
  { label: 'Delivery', value: 12, color: 'bg-[#7c3aed]' },
  { label: 'Maintenance', value: 8, color: 'bg-[#f97316]' },
  { label: 'Audit', value: 11, color: 'bg-[#16a34a]' },
  { label: 'Other', value: 9, color: 'bg-[#64748b]' },
]

const heatmap = [
  { day: 'Mon', values: [2, 54, 112, 89, 63, 78, 67, 21] },
  { day: 'Tue', values: [3, 67, 134, 98, 72, 91, 75, 18] },
  { day: 'Wed', values: [5, 78, 156, 112, 88, 103, 89, 27] },
  { day: 'Thu', values: [1, 61, 118, 91, 69, 84, 71, 15] },
  { day: 'Fri', values: [7, 89, 178, 134, 96, 118, 97, 32] },
]

const timeLabels = ['6AM', '8AM', '9AM', '10AM', '12PM', '2PM', '4PM', '6PM']

const weeklyTraffic = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  authorized: [132, 148, 162, 150, 178, 98, 72],
  rejected: [20, 24, 30, 22, 34, 16, 10],
}

const violationTrends = {
  weeks: ['W1', 'W2', 'W3', 'W4'],
  series: [
    { label: 'Unauthorized Access', color: 'bg-red-500', values: [4, 1, 6, 3] },
    { label: 'Facial Mismatch', color: 'bg-orange-500', values: [2, 2, 3, 2] },
    { label: 'Tailgating', color: 'bg-amber-500', values: [3, 2, 4, 1] },
    { label: 'Expired QR', color: 'bg-blue-500', values: [5, 3, 2, 4] },
  ],
}

const floorTrafficVolume = [
  { label: 'Lobby', value: 260 },
  { label: 'Floor 1', value: 95 },
  { label: 'Floor 2', value: 120 },
  { label: 'Floor 3', value: 145 },
  { label: 'Floor 4', value: 110 },
  { label: 'Floor 5', value: 32 },
  { label: 'Floor 6', value: 72 },
]

const monthlyTrend = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  totals: [820, 910, 1050, 990],
  violations: [38, 44, 52, 46],
}

const getHeatColor = (value) => {
  if (value > 150) return 'bg-[#1e3a8a]'
  if (value > 120) return 'bg-[#1d4ed8]'
  if (value > 90) return 'bg-[#2563eb]'
  if (value > 60) return 'bg-[#60a5fa]'
  if (value > 30) return 'bg-[#bfdbfe]'
  return 'bg-[#eff6ff]'
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

function AdminReportsPage() {
  const [toast, setToast] = useState(null)
  const [tooltip, setTooltip] = useState(null)

  const handleExport = (type) => {
    setToast({
      title: `Exporting ${type} report...`,
      message: 'Please wait while we prepare your file.',
      variant: 'info',
    })
    window.setTimeout(() => {
      setToast({
        title: 'Export complete',
        message: `${type} report is ready to download.`,
        variant: 'success',
      })
    }, 1500)
    window.setTimeout(() => setToast(null), 3200)
  }

  const showTooltip = (event, content) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      content,
      x: rect.left + rect.width / 2,
      y: rect.top,
    })
  }

  const hideTooltip = () => {
    setTooltip(null)
  }

  return (
    <div className="grid gap-5 pb-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Reports & Analytics</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Comprehensive visitor traffic intelligence</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#e1e8f3] bg-white px-4 py-2 text-[0.85rem] text-[#1f2a44]">
            This Month <Download size={16} />
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full bg-[#0b142d] px-4 py-2 text-[0.85rem] font-semibold text-white"
            onClick={() => handleExport('PDF')}
            type="button"
          >
            <FileDown size={16} /> Export PDF
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-[#e1e8f3] bg-white px-4 py-2 text-[0.85rem] font-semibold text-[#1f2a44]"
            onClick={() => handleExport('CSV')}
            type="button"
          >
            <FileDown size={16} /> Export CSV
          </button>
        </div>
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

      {tooltip && (
        <div
          className="fixed z-[999] -translate-x-1/2 -translate-y-3 rounded-[10px] border border-[#e1e8f3] bg-white px-3 py-2 text-[0.78rem] text-[#1f2a44] shadow-[0_12px_25px_rgba(15,23,42,0.12)]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reportStats.map((stat) => (
          <article key={stat.label} className="rounded-[18px] border border-[#e1e8f3] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="m-0 text-[0.78rem] text-[#7f90aa]">{stat.label}</p>
                <strong className="mt-1 block text-[1.4rem] text-[#0b1937]">{stat.value}</strong>
                <span className="mt-1 block text-[0.78rem] text-emerald-600">{stat.delta} vs previous period</span>
              </div>
              <div className={`grid h-9 w-9 place-items-center rounded-full bg-[#f2f5f9] ${stat.tone}`}>
                <stat.icon size={16} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
          <header className="mb-4">
            <h3 className="m-0 text-[1.05rem] font-semibold text-[#0b1937]">Weekly Visitor Traffic</h3>
            <p className="m-0 text-[0.82rem] text-[#8ea1bf]">Authorized vs rejected entries</p>
          </header>
          <div className="chart-entrance relative h-[220px] overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,rgba(37,99,235,0.12),rgba(37,99,235,0.02)),repeating-linear-gradient(0deg,rgba(155,169,196,0.15),rgba(155,169,196,0.15)_1px,transparent_1px,transparent_36px)]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="authorizedFillReports" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1f4ed8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1f4ed8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                fill="url(#authorizedFillReports)"
                d={buildAreaPath(weeklyTraffic.authorized, 600, 220, 28)}
              />
              <path
                fill="none"
                stroke="#1f4ed8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={buildLinePath(weeklyTraffic.authorized, 600, 220, 28)}
              />
              <path
                fill="none"
                stroke="#ef4444"
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
          <div className="mt-4 flex items-center gap-4 text-[0.82rem] text-[#6b7c97]">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#1f4ed8]" /> Authorized</span>
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#ef4444]" /> Rejected</span>
          </div>
        </article>

        <article className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
          <header className="mb-4">
            <h3 className="m-0 text-[1.05rem] font-semibold text-[#0b1937]">Visit Purpose Distribution</h3>
          </header>
          <div className="chart-entrance mx-auto my-4 h-[140px] w-[140px] rounded-full bg-[conic-gradient(#1f4ed8_0_42%,#0ea5e9_42%_60%,#7c3aed_60%_72%,#f97316_72%_80%,#16a34a_80%_91%,#64748b_91%_100%)] [mask:radial-gradient(circle_at_center,transparent_44%,#000_45%)]" />
          <div className="grid gap-3 text-[0.82rem] text-[#6b7c97]">
            {purposeBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  {item.label}
                </span>
                <strong className="text-[#1f2a44]">{item.value}%</strong>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="chart-entrance rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="m-0 text-[1.05rem] font-semibold text-[#0b1937]">Visitor Traffic Heatmap</h3>
            <p className="m-0 text-[0.82rem] text-[#8ea1bf]">Busiest hours by day of week</p>
          </div>
          <div className="flex items-center gap-2 text-[0.78rem] text-[#8ea1bf]">
            <span className="flex gap-1">
              {['#eff6ff', '#bfdbfe', '#60a5fa', '#2563eb', '#1d4ed8', '#1e3a8a'].map((color) => (
                <span key={color} className="h-3 w-3 rounded" style={{ backgroundColor: color }} />
              ))}
            </span>
            Low - High
          </div>
        </header>
        <div className="grid gap-2">
          <div className="grid grid-cols-[60px_repeat(8,1fr)] gap-2 text-[0.7rem] text-[#8ea1bf]">
            <span />
            {timeLabels.map((label) => (
              <span key={label} className="text-center">{label}</span>
            ))}
          </div>
          {heatmap.map((row) => (
            <div key={row.day} className="grid grid-cols-[60px_repeat(8,1fr)] gap-2">
              <span className="text-[0.8rem] text-[#6b7c97]">{row.day}</span>
              {row.values.map((value, index) => (
                <div key={`${row.day}-${index}`} className={`rounded-md px-2 py-2 text-center text-[0.75rem] text-[#1f2a44] ${getHeatColor(value)}`}>
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </article>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
          <header className="mb-4">
            <h3 className="m-0 text-[1.05rem] font-semibold text-[#0b1937]">Security Violation Trends</h3>
            <p className="m-0 text-[0.82rem] text-[#8ea1bf]">Weekly breakdown by violation type</p>
          </header>
          <div className="chart-entrance relative h-[220px] rounded-[16px] bg-[repeating-linear-gradient(0deg,rgba(155,169,196,0.12),rgba(155,169,196,0.12)_1px,transparent_1px,transparent_36px)] px-4 py-3">
            <div className="flex h-full items-end gap-6">
              {violationTrends.weeks.map((week, weekIndex) => (
                <div key={week} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="flex items-end gap-1">
                    {violationTrends.series.map((series) => (
                      <div
                        key={series.label}
                        className={`w-3 rounded-[6px] ${series.color}`}
                        style={{ height: `${series.values[weekIndex] * 18}px` }}
                        onMouseEnter={(event) => showTooltip(event, `${week} - ${series.label}: ${series.values[weekIndex]}`)}
                        onMouseLeave={hideTooltip}
                      />
                    ))}
                  </div>
                  <span className="text-[0.75rem] text-[#8ea1bf]">{week}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[0.82rem] text-[#6b7c97]">
            {violationTrends.series.map((series) => (
              <span key={series.label} className="inline-flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-sm ${series.color}`} /> {series.label}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
          <header className="mb-4">
            <h3 className="m-0 text-[1.05rem] font-semibold text-[#0b1937]">Floor Traffic Volume</h3>
            <p className="m-0 text-[0.82rem] text-[#8ea1bf]">Visitors per floor today</p>
          </header>
          <div className="chart-entrance grid gap-3">
            {floorTrafficVolume.map((floor) => (
              <div key={floor.label} className="grid grid-cols-[80px_1fr] items-center gap-3 text-[0.82rem] text-[#6b7c97]">
                <span>{floor.label}</span>
                <div className="h-3 rounded-full bg-[#eaf1f9]">
                  <div
                    className="h-3 rounded-full bg-[#0891b2]"
                    style={{ width: `${(floor.value / 260) * 100}%` }}
                    onMouseEnter={(event) => showTooltip(event, `${floor.label}: ${floor.value}`)}
                    onMouseLeave={hideTooltip}
                  />
                </div>
              </div>
            ))}
            <div className="mt-2 flex justify-between text-[0.72rem] text-[#94a3b8]">
              <span>0</span>
              <span>65</span>
              <span>130</span>
              <span>195</span>
              <span>260</span>
            </div>
          </div>
        </article>
      </div>

      <article className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
        <header className="mb-4">
          <h3 className="m-0 text-[1.05rem] font-semibold text-[#0b1937]">Monthly Trend - Total vs Violations</h3>
          <p className="m-0 text-[0.82rem] text-[#8ea1bf]">4-week rolling view</p>
        </header>
        <div className="chart-entrance relative h-[220px] overflow-hidden rounded-[16px] bg-[repeating-linear-gradient(0deg,rgba(155,169,196,0.12),rgba(155,169,196,0.12)_1px,transparent_1px,transparent_36px)]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 220" preserveAspectRatio="none">
            <path
              fill="none"
              stroke="#1e40af"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d={buildLinePath(monthlyTrend.totals, 600, 220, 28)}
            />
            <path
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d={buildLinePath(monthlyTrend.violations, 600, 220, 28)}
            />
            {monthlyTrend.labels.map((label, index) => {
              const x = 28 + (index / (monthlyTrend.labels.length - 1)) * 544
              const total = monthlyTrend.totals[index]
              const violations = monthlyTrend.violations[index]
              const maxValue = Math.max(...monthlyTrend.totals)
              const totalY = 28 + 164 - (total / maxValue) * 164
              const violationY = 28 + 164 - (violations / maxValue) * 164
              return (
                <g key={`point-${label}`}>
                  <circle
                    cx={x}
                    cy={totalY}
                    r="4"
                    fill="#1e40af"
                    onMouseEnter={(event) => showTooltip(event, `${label} - Total Visitors: ${total}`)}
                    onMouseLeave={hideTooltip}
                  />
                  <circle
                    cx={x}
                    cy={violationY}
                    r="3"
                    fill="#dc2626"
                    onMouseEnter={(event) => showTooltip(event, `${label} - Violations: ${violations}`)}
                    onMouseLeave={hideTooltip}
                  />
                </g>
              )
            })}
            {monthlyTrend.labels.map((label, index) => (
              <text
                key={label}
                x={28 + (index / (monthlyTrend.labels.length - 1)) * 544}
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
        <div className="mt-4 flex items-center gap-5 text-[0.82rem] text-[#6b7c97]">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#1e40af]" /> Total Visitors</span>
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#dc2626]" /> Violations</span>
        </div>
      </article>
    </div>
  )
}

export default AdminReportsPage
