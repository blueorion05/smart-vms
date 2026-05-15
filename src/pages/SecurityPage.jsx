import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Camera, CheckCircle2, CircleDot, Lock, MonitorDot, ShieldAlert } from 'lucide-react'

const trackedVisitors = [
  { name: 'James Thompson', floor: 'Floor 4', dept: 'Research and Development', time: 'In: 09:15 AM' },
  { name: 'Robert Chen', floor: 'Floor 3', dept: 'Legal', time: 'In: 11:30 AM' },
  { name: 'Lisa Garcia', floor: 'Floor 4', dept: 'Research and Development', time: 'In: 13:00 PM' },
  { name: 'Amanda Lee', floor: 'Floor 3', dept: 'Marketing', time: 'In: 14:00 PM' },
]

const cameras = [
  { id: 'CAM-01', zone: 'Main Entrance', status: 'ALERT', note: 'Tailgating', critical: true },
  { id: 'CAM-02', zone: 'Lobby Reception', status: 'ALERT', note: 'Facial Mismatch', critical: true },
  { id: 'CAM-03', zone: 'Elevator Bank A', status: 'ONLINE', note: 'online', critical: false },
  { id: 'CAM-04', zone: 'Floor 5 Corridor', status: 'ALERT', note: 'Unauthorized Access', critical: true },
  { id: 'CAM-05', zone: 'Floor 3 East Wing', status: 'ONLINE', note: 'online', critical: false },
  { id: 'CAM-06', zone: 'Parking Level B1', status: 'ONLINE', note: 'online', critical: false },
  { id: 'CAM-07', zone: 'Rooftop Access', status: 'OFFLINE', note: 'offline', critical: false },
  { id: 'CAM-08', zone: 'Server Room', status: 'ONLINE', note: 'online', critical: false },
]

const quickActions = [
  { label: 'Dispatch Personnel', tone: 'border-[#ff9f43]/40 bg-[#ff9f43]/10 text-[#ffb968]' },
  { label: 'Notify Admin', tone: 'border-[#4a7bff]/40 bg-[#1a2f66]/50 text-[#7ea7ff]' },
  { label: 'Flag Individual', tone: 'border-[#ff5276]/40 bg-[#3b1222]/50 text-[#ff7a95]' },
]

const floorLockControl = [
  'Floor 5 - Executive',
  'Floor 4 - R&D',
  'Floor 3 - Marketing',
  'Floor 6 - IT',
]

function SecurityPage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const [selectedCamera, setSelectedCamera] = useState(cameras[3])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2500)
  }

  return (
    <section className="min-h-screen bg-[#050f28] text-[#d9e9ff]">
      <header className="grid grid-cols-1 items-center gap-3 border-b border-white/10 px-4 py-3 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="flex items-center gap-3 font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white">
            <ShieldAlert size={16} />
          </span>
          <div>
            SecureVMS
            <small className="ml-2 text-[#ff4e72] tracking-[0.08em]">SECURITY CONTROL CENTER</small>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-[12px] border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-[0.85rem] font-bold text-[#2edf98]">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" /> LIVE MONITORING
        </div>
        <div className="text-left text-[1.35rem] font-bold leading-none md:text-center lg:text-[1.7rem]">
          8:47:17 AM
          <small className="block text-[0.78rem] font-normal text-[#8ea7d3]">Fri, May 15, 2026</small>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <span className="inline-flex items-center gap-2 rounded-[12px] border border-red-400/30 bg-red-500/10 px-3 py-2 font-bold text-[#ff8fa4]">
            <AlertTriangle size={16} /> 2 ACTIVE
          </span>
          <span className="inline-flex items-center gap-2 rounded-[12px] border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 font-bold text-[#7ef0b3]">
            <CircleDot size={16} /> 4 INSIDE
          </span>
          <button
            type="button"
            className="rounded-[12px] border border-white/15 bg-[#0e214d] px-3 py-2 font-bold text-[#edf4ff]"
            onClick={() => navigate('/')}
          >
            Sign Out
          </button>
        </div>
      </header>

      {toast && (
        <div className="fixed right-6 top-6 z-[999] w-full max-w-[360px] px-4 sm:right-8">
          <div className="flex items-center gap-3 rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-emerald-600">
              <CheckCircle2 size={16} />
            </span>
            <strong className="text-[0.9rem]">{toast}</strong>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 p-3 xl:grid-cols-[340px_1fr_360px]">
        <aside className="rounded-[14px] border border-white/10 bg-[rgba(9,25,59,0.75)] p-3">
          <h3 className="mb-3 text-lg font-bold">Active Visitor Tracker</h3>
          {trackedVisitors.map((visitor) => (
            <article key={visitor.name} className="mb-2 grid gap-1 rounded-[12px] border border-white/10 bg-white/10 p-3">
              <div>
                <strong className="block text-[#eef5ff]">{visitor.name}</strong>
                <small className="block text-[#8da6d5]">{visitor.floor}</small>
                <small className="block text-[#8da6d5]">{visitor.time}</small>
              </div>
              <small className="text-[#8da6d5]">{visitor.dept}</small>
            </article>
          ))}
          <article className="grid gap-1 rounded-[12px] border border-[#ff5276]/30 bg-[rgba(143,20,45,0.25)] p-3">
            <div>
              <strong className="block text-[#eef5ff]">Sarah Johnson</strong>
              <small className="block text-[#ff90a8]">FLAGGED</small>
            </div>
            <small className="text-[#8da6d5]">Attempted unauthorized floor access - Floor 5 Executive Zone</small>
          </article>
        </aside>

        <main className="overflow-hidden rounded-[14px] border border-white/10 bg-[rgba(9,25,59,0.75)]">
          <header className="flex items-center justify-between border-b border-white/10 px-3 py-3">
            <h3 className="m-0 text-lg font-bold">CCTV Monitoring Grid</h3>
            <small className="text-[#7fa8e0]">7/8 Online</small>
          </header>
          <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 xl:grid-cols-4">
            {cameras.map((cam) => (
              <article
                key={cam.zone}
                className={cam.critical
                  ? `grid min-h-[125px] content-center justify-items-center gap-2 rounded-[12px] border border-[#ff5472]/50 bg-[linear-gradient(165deg,rgba(122,15,34,0.7),rgba(46,9,23,0.75))] p-3 text-center ${selectedCamera?.id === cam.id ? 'ring-2 ring-cyan-400/70' : ''}`
                  : `grid min-h-[125px] content-center justify-items-center gap-2 rounded-[12px] border border-white/15 bg-[linear-gradient(165deg,rgba(28,52,105,0.7),rgba(10,23,54,0.75))] p-3 text-center ${selectedCamera?.id === cam.id ? 'ring-2 ring-cyan-400/70' : ''}`}
                onClick={() => setSelectedCamera(cam)}
              >
                <Camera size={17} />
                <strong className="text-[0.95rem]">{cam.zone}</strong>
                <small className="text-[#9fb7e2]">{cam.note}</small>
                {cam.status === 'ALERT' ? (
                  <span className="inline-flex rounded-full border border-[#ff5472]/50 bg-[#ff3b5a]/20 px-2.5 py-1 text-[0.72rem] font-bold text-[#ff8fa4]">ALERT</span>
                ) : cam.status === 'OFFLINE' ? (
                  <span className="inline-flex rounded-full border border-white/15 bg-[#0b132b] px-2.5 py-1 text-[0.72rem] font-bold text-[#7483a9]">OFFLINE</span>
                ) : (
                  <span className="inline-flex rounded-full border border-white/15 bg-[#0b132b] px-2.5 py-1 text-[0.72rem] font-bold text-[#7ef0b3]">online</span>
                )}
              </article>
            ))}
          </div>

          {selectedCamera && (
            <div className="mx-3 mb-3 overflow-hidden rounded-[12px] border border-white/10 bg-[rgba(15,31,66,0.76)]">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[0.9rem] font-semibold">
                <span>{selectedCamera.zone} - {selectedCamera.id}</span>
                {selectedCamera.status === 'ALERT' && (
                  <span className="rounded-full border border-[#ff5472]/50 bg-[#ff3b5a]/20 px-2.5 py-0.5 text-[0.7rem] text-[#ff8fa4]">ALERT</span>
                )}
              </div>
              <div className="grid min-h-[180px] place-items-center bg-[linear-gradient(180deg,rgba(4,8,20,0.75),rgba(9,18,42,0.85))] text-[#7c90b5]">
                <Camera size={26} className="mb-2" />
                Basement - Live Feed
              </div>
            </div>
          )}

          <div className="mx-3 mb-3 rounded-[12px] border border-white/10 bg-[rgba(15,31,66,0.76)] p-3">
            <h3 className="mb-2 text-lg font-bold">Movement Log</h3>
            <ul className="grid gap-1.5 p-0 text-[#b8c9ea]">
              <li className="flex items-center gap-2"> <CircleDot size={12} /> James Thompson entered Floor 4 <small className="ml-auto">09:15 AM</small></li>
              <li className="flex items-center gap-2"> <CircleDot size={12} /> Robert Chen entered Floor 3 <small className="ml-auto">11:30 AM</small></li>
              <li className="flex items-center gap-2"> <CircleDot size={12} /> Lisa Garcia entered Floor 4 <small className="ml-auto">01:00 PM</small></li>
              <li className="flex items-center gap-2 text-[#ff90a8]"> <ShieldAlert size={12} /> Sarah Johnson blocked - Floor 5 attempt <small className="ml-auto">02:30 PM</small></li>
            </ul>
          </div>
        </main>

        <aside className="rounded-[14px] border border-white/10 bg-[rgba(9,25,59,0.75)] p-3">
          <header className="flex items-center justify-between gap-3">
            <h3 className="m-0 text-lg font-bold">Live Alerts</h3>
            <span className="font-bold text-[#ff637d]">2 ACTIVE</span>
          </header>
          <article className="mb-3 grid gap-2 rounded-[12px] border border-[#ff607e]/35 bg-[rgba(88,19,37,0.42)] p-3">
            <strong>Unauthorized Floor Access</strong>
            <p className="m-0 text-[#9fb8e1]">Visitor attempted access to restricted Executive Floor 5 without authorization. QR key rejected.</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]"
                onClick={() => showToast('Alert acknowledged')}
              >
                Acknowledge
              </button>
              <button
                type="button"
                className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]"
                onClick={() => showToast('Floor locked')}
              >
                Lock Floor
              </button>
            </div>
          </article>
          <article className="mb-3 grid gap-2 rounded-[12px] border border-[#ff607e]/35 bg-[rgba(88,19,37,0.42)] p-3">
            <strong>Tailgating Detected</strong>
            <p className="m-0 text-[#9fb8e1]">Unknown individual tailgated through the main entrance behind an authorized visitor.</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]"
                onClick={() => showToast('Alert acknowledged')}
              >
                Acknowledge
              </button>
              <button
                type="button"
                className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]"
                onClick={() => showToast('Floor locked')}
              >
                Lock Floor
              </button>
            </div>
          </article>
          <article className="mb-3 grid gap-2 rounded-[12px] border border-white/10 bg-[rgba(22,42,83,0.64)] p-3">
            <strong>Facial Mismatch</strong>
            <p className="m-0 text-[#9fb8e1]">Facial recognition mismatch detected at security checkpoint. ID verification required.</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]"
                onClick={() => showToast('Alert under review')}
              >
                Under Review
              </button>
            </div>
          </article>
          <article className="mb-3 grid gap-2 rounded-[12px] border border-white/10 bg-[rgba(22,42,83,0.64)] p-3">
            <strong>QR Pass Expired</strong>
            <p className="m-0 text-[#9fb8e1]">Visitor QR pass has expired. Access denied. Visitor needs re-verification.</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]"
                onClick={() => showToast('Alert under review')}
              >
                Under Review
              </button>
            </div>
          </article>
          <footer className="inline-flex items-center gap-2 text-[#84a8de]"><MonitorDot size={14} /> Real-time feed active</footer>
        </aside>
      </div>

      <div className="grid grid-cols-1 gap-3 px-3 pb-3 xl:grid-cols-[340px_1fr_360px]">
        <aside className="rounded-[14px] border border-white/10 bg-[rgba(9,25,59,0.75)] p-3">
          <h3 className="mb-3 text-[0.85rem] uppercase tracking-[0.2em] text-[#7f9bcc]">Quick Actions</h3>
          <div className="grid gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className={`flex items-center gap-2 rounded-[12px] border px-4 py-3 text-left font-semibold ${action.tone}`}
                onClick={() => showToast(`${action.label} triggered`)}
              >
                {action.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="hidden xl:block" />

        <aside className="rounded-[14px] border border-white/10 bg-[rgba(9,25,59,0.75)] p-3">
          <h3 className="mb-3 text-[0.85rem] uppercase tracking-[0.2em] text-[#7f9bcc]">Floor Lock Control</h3>
          <div className="grid gap-2">
            {floorLockControl.map((floor) => (
              <button
                key={floor}
                type="button"
                className="flex items-center justify-between rounded-[12px] border border-white/10 bg-white/10 px-4 py-2 text-left text-[0.9rem] text-[#dbe7ff]"
                onClick={() => showToast(`${floor} lock status updated`)}
              >
                <span>{floor}</span>
                <Lock size={16} className="text-[#8ea7d3]" />
              </button>
            ))}
          </div>
        </aside>
      </div>

      <footer className="border-t border-white/10 bg-[rgba(8,17,40,0.9)] px-4 py-3 text-[0.85rem] text-[#9ab2d8]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> System: OPERATIONAL</span>
          <span className="inline-flex items-center gap-2">Cameras: 7/8</span>
          <span className="inline-flex items-center gap-2">Active Visitors: 4</span>
          <span className="inline-flex items-center gap-2">Active Alerts: 1</span>
          <span className="inline-flex items-center gap-2">Locked Floors: 0</span>
          <span className="ml-auto inline-flex items-center gap-2">Officer: Marcus Williams</span>
          <span className="inline-flex items-center gap-2">Shift: Morning 06:00-14:00</span>
        </div>
      </footer>

    </section>
  )
}

export default SecurityPage
