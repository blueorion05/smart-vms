import { QrCode, Search, UserRound } from 'lucide-react'

const rows = [
  { name: 'James Thompson', host: 'Dr. Sarah Park', floor: 'Floor 4', status: 'Active', time: '09:15 AM', action: 'Check-out' },
  { name: 'Maria Santos', host: 'Michael Torres', floor: 'Floor 2', status: 'Waiting', time: '--', action: '--' },
  { name: 'David Kim', host: 'Emily Chen', floor: 'Floor 6', status: 'Completed', time: '08:30 AM', action: '--' },
  { name: 'Sarah Johnson', host: 'Robert Lee', floor: 'Floor 5', status: 'Flagged', time: '10:00 AM', action: '--' },
  { name: 'Robert Chen', host: 'Lisa Wang', floor: 'Floor 3', status: 'Active', time: '11:30 AM', action: 'Check-out' },
  { name: 'Emma Wilson', host: 'James Park', floor: 'Floor 1', status: 'Waiting', time: '--', action: '--' },
]

function ReceptionistPage() {
  return (
    <section className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-[#f5f7fb] text-[#13294c]">
      <header className="flex items-center justify-between gap-3 border-b border-[#dbe4f7] bg-white px-4 py-4">
        <div className="font-bold">
          SecureVMS <small className="block font-medium text-[#8392ac]">Reception Desk</small>
        </div>
        <div className="text-center font-bold">
          10:34:36 PM <small className="block font-medium text-[#8392ac]">Mon, March 2, 2026</small>
        </div>
        <div className="font-bold text-[#e08207]">2 waiting | Sofia</div>
      </header>

      <main className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-[1fr_1.4fr]">
        <article className="rounded-[16px] border border-[#d7e2f8] bg-white p-4">
          <h3 className="m-0 text-lg font-bold">QR Scanner</h3>
          <div className="mt-3 grid min-h-[295px] place-items-center gap-1 rounded-[14px] bg-[linear-gradient(160deg,#0a1739,#0e2453)] text-[#28ccff]">
            <QrCode size={68} />
            <small>Ready to scan visitor QR code</small>
          </div>
          <button type="button" className="mt-3 w-full rounded-[12px] border-0 bg-[linear-gradient(120deg,#1f5ef8,#2b84ff)] py-3.5 text-[1.55rem] font-bold text-white">Scan Visitor QR Code</button>
        </article>

        <article className="rounded-[16px] border border-[#d7e2f8] bg-white p-4">
          <header className="flex items-center justify-between gap-3">
            <h3 className="m-0 inline-flex items-center gap-2 text-lg font-bold">Today&apos;s Visitors <span className="grid h-6 w-6 place-items-center rounded-full bg-[#dbe9ff] text-[0.82rem] text-[#1f5ef8]">9</span></h3>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 rounded-full border border-[#d8e2f7] bg-[#f3f7ff] px-3 py-2 text-[#8ea1bf]"><Search size={14} /> Search...</div>
              <button type="button" className="rounded-full border-0 bg-[#0b1d42] px-4 py-2 font-bold text-white">Walk-in</button>
            </div>
          </header>

          <div className="mt-3 grid">
            {rows.map((row) => (
              <div key={row.name} className="grid grid-cols-1 items-center gap-2 border-b border-[#ebf1fd] py-3 md:grid-cols-[1.3fr_auto_auto_auto]">
                <div className="inline-flex items-center gap-2">
                  <UserRound size={16} />
                  <div>
                    <strong className="block text-[#13294c]">{row.name}</strong>
                    <small className="block text-[#8899b5]">{row.host} - {row.floor}</small>
                  </div>
                </div>
                <div
                  className={`w-fit rounded-full px-2.5 py-1 text-[0.8rem] font-bold ${
                    row.status === 'Active'
                      ? 'bg-[#eaffef] text-[#1b914a]'
                      : row.status === 'Waiting'
                        ? 'bg-[#fff7e4] text-[#bf7f03]'
                        : row.status === 'Completed'
                          ? 'bg-[#edf2f9] text-[#5f7396]'
                          : 'bg-[#ffeef1] text-[#d53551]'
                  }`}
                >{row.status}</div>
                <small className="text-[#8899b5]">{row.time}</small>
                <small className="text-[#8899b5]">{row.action}</small>
              </div>
            ))}
          </div>
        </article>
      </main>

      <footer className="grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4">
        <article className="rounded-[14px] border border-[#d7e2f7] bg-[#edf3ff] p-4 text-center"><strong className="block text-[2rem] text-[#1f62f9]">9</strong><small className="text-[#5f7395]">Total</small></article>
        <article className="rounded-[14px] border border-[#d7e2f7] bg-[#edf3ff] p-4 text-center"><strong className="block text-[2rem] text-[#1f62f9]">4</strong><small className="text-[#5f7395]">Active</small></article>
        <article className="rounded-[14px] border border-[#d7e2f7] bg-[#edf3ff] p-4 text-center"><strong className="block text-[2rem] text-[#1f62f9]">2</strong><small className="text-[#5f7395]">Waiting</small></article>
        <article className="rounded-[14px] border border-[#d7e2f7] bg-[#edf3ff] p-4 text-center"><strong className="block text-[2rem] text-[#1f62f9]">2</strong><small className="text-[#5f7395]">Completed</small></article>
      </footer>
    </section>
  )
}

export default ReceptionistPage
