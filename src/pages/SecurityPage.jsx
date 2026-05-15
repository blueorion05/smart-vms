import { AlertTriangle, Camera, CircleDot, MonitorDot, ShieldAlert } from 'lucide-react'

const trackedVisitors = [
  { name: 'James Thompson', floor: 'Floor 4', dept: 'Research and Development', time: 'In: 09:15 AM' },
  { name: 'Robert Chen', floor: 'Floor 3', dept: 'Legal', time: 'In: 11:30 AM' },
  { name: 'Lisa Garcia', floor: 'Floor 4', dept: 'Research and Development', time: 'In: 13:00 PM' },
  { name: 'Amanda Lee', floor: 'Floor 3', dept: 'Marketing', time: 'In: 14:00 PM' },
]

const cameras = [
  { zone: 'Main Entrance', status: 'ALERT', note: 'Tailgating', critical: true },
  { zone: 'Lobby Reception', status: 'ALERT', note: 'Facial Mismatch', critical: true },
  { zone: 'Elevator Bank A', status: 'ONLINE', note: 'online', critical: false },
  { zone: 'Floor 5 Corridor', status: 'ALERT', note: 'Unauthorized Access', critical: true },
  { zone: 'Floor 3 East Wing', status: 'ONLINE', note: 'online', critical: false },
  { zone: 'Parking Level B1', status: 'ONLINE', note: 'online', critical: false },
  { zone: 'Rooftop Access', status: 'OFFLINE', note: 'offline', critical: false },
  { zone: 'Server Room', status: 'ONLINE', note: 'online', critical: false },
]

function SecurityPage() {
  return (
    <section className="min-h-screen bg-[#050f28] text-[#d9e9ff]">
      <header className="grid grid-cols-1 items-center gap-3 border-b border-white/10 px-4 py-3 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="font-bold text-white">
          SecureVMS <small className="ml-2 text-[#ff4e72] tracking-[0.08em]">SECURITY CONTROL CENTER</small>
        </div>
        <div className="inline-flex items-center rounded-[11px] border border-emerald-400/35 bg-emerald-500/15 px-3 py-2 font-bold text-[#2edf98]">
          LIVE MONITORING
        </div>
        <div className="text-left text-[1.35rem] font-bold leading-none md:text-center lg:text-[1.7rem]">
          10:34:15 PM
          <small className="block text-[0.78rem] font-normal text-[#8ea7d3]">Thu, May 14, 2026</small>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <span className="rounded-[10px] border border-white/15 bg-[#0e214d] px-3 py-2 font-bold text-[#edf4ff]">2 ACTIVE</span>
          <span className="rounded-[10px] border border-white/15 bg-[#0e214d] px-3 py-2 font-bold text-[#edf4ff]">4 INSIDE</span>
          <button type="button" className="rounded-[10px] border border-white/15 bg-[#0e214d] px-3 py-2 font-bold text-[#edf4ff]">Sign Out</button>
        </div>
      </header>

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
                  ? 'grid min-h-[125px] content-center justify-items-center gap-1 rounded-[12px] border border-[#ff5472]/50 bg-[linear-gradient(165deg,rgba(122,15,34,0.7),rgba(46,9,23,0.75))] p-3 text-center'
                  : 'grid min-h-[125px] content-center justify-items-center gap-1 rounded-[12px] border border-white/15 bg-[linear-gradient(165deg,rgba(28,52,105,0.7),rgba(10,23,54,0.75))] p-3 text-center'}
              >
                <Camera size={17} />
                <strong className="text-[0.95rem]">{cam.zone}</strong>
                <small className="text-[#9fb7e2]">{cam.note}</small>
                <span className="inline-flex rounded-full border border-white/15 bg-[#102a5a] px-2.5 py-1 text-[0.72rem] font-bold">{cam.status}</span>
              </article>
            ))}
          </div>

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
              <button type="button" className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]">Acknowledge</button>
              <button type="button" className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]">Lock Floor</button>
            </div>
          </article>
          <article className="mb-3 grid gap-2 rounded-[12px] border border-[#ff607e]/35 bg-[rgba(88,19,37,0.42)] p-3">
            <strong>Tailgating Detected</strong>
            <p className="m-0 text-[#9fb8e1]">Unknown individual tailgated through the main entrance behind an authorized visitor.</p>
            <div className="flex gap-2">
              <button type="button" className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]">Acknowledge</button>
              <button type="button" className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]">Lock Floor</button>
            </div>
          </article>
          <article className="mb-3 grid gap-2 rounded-[12px] border border-white/10 bg-[rgba(22,42,83,0.64)] p-3">
            <strong>Facial Mismatch</strong>
            <p className="m-0 text-[#9fb8e1]">Facial recognition mismatch detected at security checkpoint. ID verification required.</p>
            <div className="flex gap-2">
              <button type="button" className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]">Under Review</button>
            </div>
          </article>
          <article className="mb-3 grid gap-2 rounded-[12px] border border-white/10 bg-[rgba(22,42,83,0.64)] p-3">
            <strong>QR Pass Expired</strong>
            <p className="m-0 text-[#9fb8e1]">Visitor QR pass has expired. Access denied. Visitor needs re-verification.</p>
            <div className="flex gap-2">
              <button type="button" className="flex-1 rounded-[10px] border border-[#ffa836]/40 bg-[#ffa01f]/15 px-3 py-2 font-bold text-[#ffd06f]">Under Review</button>
            </div>
          </article>
          <footer className="inline-flex items-center gap-2 text-[#84a8de]"><MonitorDot size={14} /> Real-time feed active</footer>
        </aside>
      </div>
    </section>
  )
}

export default SecurityPage
