import {
  AlertTriangle,
  Camera,
  ChevronRight,
  Dot,
  Eye,
  Shield,
} from 'lucide-react'

const cameraFeeds = [
  { id: 'CAM-01', location: 'Main Entrance', status: 'Alert', note: 'Tailgating' },
  { id: 'CAM-02', location: 'Lobby Reception', status: 'Alert', note: 'Facial Mismatch' },
  { id: 'CAM-03', location: 'Elevator Bank A', status: 'Online', note: 'Online' },
  { id: 'CAM-04', location: 'Floor 5 Corridor', status: 'Alert', note: 'Unauthorized Access' },
  { id: 'CAM-05', location: 'Floor 3 East Wing', status: 'Online', note: 'Online' },
  { id: 'CAM-06', location: 'Parking Level B1', status: 'Online', note: 'Online' },
  { id: 'CAM-07', location: 'Rooftop Access', status: 'Offline', note: 'Offline' },
  { id: 'CAM-08', location: 'Server Room', status: 'Online', note: 'Online' },
]

const securityAlerts = [
  {
    id: 'AL-221',
    level: 'Critical',
    camera: 'CAM-04',
    title: 'Unauthorized Floor Access',
    detail: 'Floor 5 - Executive - Sarah Johnson',
    time: '14:32:15',
  },
  {
    id: 'AL-220',
    level: 'Critical',
    camera: 'CAM-01',
    title: 'Tailgating Detected',
    detail: 'Main Entrance - Dual entry',
    time: '14:28:41',
  },
  {
    id: 'AL-219',
    level: 'Warning',
    camera: 'CAM-02',
    title: 'Facial Mismatch',
    detail: 'Lobby Reception - Visitor mismatch',
    time: '14:15:08',
  },
]

const movementLog = [
  { name: 'James Thompson', action: 'Entered Floor 4', time: '09:15 AM', camera: 'CAM-03' },
  { name: 'Robert Chen', action: 'Entered Floor 3', time: '11:30 AM', camera: 'CAM-05' },
  { name: 'Sofia Rodriguez', action: 'Exited Lobby', time: '12:05 PM', camera: 'CAM-02' },
  { name: 'Marcus Williams', action: 'Entered Floor 5', time: '01:10 PM', camera: 'CAM-04' },
]

const statusTone = {
  Alert: 'border-red-200 bg-red-50 text-red-600',
  Online: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Offline: 'border-slate-200 bg-slate-100 text-slate-500',
}

function AdminSecurityPage() {
  return (
    <div className="grid gap-5 pb-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Security Oversight</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Monitor alerts, CCTV, and security activity</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[0.85rem] font-semibold text-red-600">
          <span className="h-2 w-2 rounded-full bg-red-500" /> 2 Active Alerts
        </span>
      </div>

      <section className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#1f2a44]">
            <Camera size={16} /> CCTV Camera Status
          </div>
          <button className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-[#2457ff]">
            Open Full View <ChevronRight size={16} />
          </button>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cameraFeeds.map((cam) => (
            <article
              key={cam.id}
              className={`relative flex h-[160px] flex-col justify-between overflow-hidden rounded-[16px] border border-[#eef2f8] bg-[#1f2a44] p-4 text-white ${
                cam.status === 'Alert' ? 'bg-[#520606]' : cam.status === 'Offline' ? 'bg-[#0b0f19]' : 'bg-[#1f2a44]'
              }`}
            >
              <div className="flex items-start justify-between text-[0.7rem] uppercase tracking-wide">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-1">{cam.id}</span>
                {cam.status === 'Alert' && (
                  <span className="rounded-full bg-red-600 px-2 py-1 text-[0.65rem] font-semibold">Alert</span>
                )}
              </div>
              <div className="grid place-items-center text-[#cbd5f5]">
                <Shield size={18} />
              </div>
              <div className="text-[0.82rem]">
                <strong className="block text-white">{cam.location}</strong>
                <span className={`mt-1 inline-flex items-center gap-1 text-[0.75rem] ${cam.status === 'Alert' ? 'text-red-200' : cam.status === 'Offline' ? 'text-slate-400' : 'text-emerald-200'}`}>
                  <Dot size={16} /> {cam.note}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#1f2a44]">
              <AlertTriangle size={16} /> Security Alerts
            </div>
            <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-[#7f90aa]">
              <span className="rounded-full bg-[#f2f5f9] px-2 py-1 text-[#1f2a44]">All</span>
              <span>Active</span>
              <span>Acknowledged</span>
              <span>Resolved</span>
            </div>
          </header>
          <div className="grid gap-3">
            {securityAlerts.map((alert) => (
              <article key={alert.id} className="rounded-[16px] border border-[#f3d6d8] bg-[#fff5f6] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[0.78rem] text-[#8fa1bf]">
                      <span className="rounded-full bg-red-100 px-2 py-1 text-[0.7rem] font-semibold text-red-600">{alert.level}</span>
                      <span className="rounded-full bg-[#f2f5f9] px-2 py-1 text-[0.7rem] font-semibold text-[#1f2a44]">{alert.camera}</span>
                    </div>
                    <strong className="mt-2 block text-[#1f2a44]">{alert.title}</strong>
                    <p className="m-0 mt-1 text-[0.85rem] text-[#8fa1bf]">{alert.detail}</p>
                    <span className="mt-2 block text-[0.75rem] text-[#8fa1bf]">{alert.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[0.75rem] font-semibold text-amber-700">Ack</button>
                    <button className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[0.75rem] font-semibold text-emerald-700">Resolve</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
          <header className="mb-4 flex items-center gap-2 text-[0.95rem] font-semibold text-[#1f2a44]">
            <Eye size={16} /> Movement Log
          </header>
          <div className="grid gap-4">
            {movementLog.map((entry) => (
              <div key={`${entry.name}-${entry.time}`} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <strong className="block text-[#1f2a44]">{entry.name}</strong>
                  <span className="block text-[0.85rem] text-[#6b7c97]">{entry.action}</span>
                  <span className="text-[0.78rem] text-[#9aa8c2]">{entry.time} - {entry.camera}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminSecurityPage
