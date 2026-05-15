import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, CheckCircle2, LogOut, Plus, QrCode, Search, Shield, UserRound, X } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'

const rows = [
  { name: 'James Thompson', host: 'Dr. Sarah Park', floor: 'Floor 4', status: 'Active', time: '09:15 AM', action: 'Check-out', initials: 'JT' },
  { name: 'Maria Santos', host: 'Michael Torres', floor: 'Floor 2', status: 'Waiting', time: '--', action: '--', initials: 'MS' },
  { name: 'David Kim', host: 'Emily Chen', floor: 'Floor 6', status: 'Completed', time: '08:30 AM', action: '--', initials: 'DK' },
  { name: 'Sarah Johnson', host: 'Robert Lee', floor: 'Floor 5', status: 'Flagged', time: '10:00 AM', action: '--', initials: 'SJ' },
  { name: 'Robert Chen', host: 'Lisa Wang', floor: 'Floor 3', status: 'Active', time: '11:30 AM', action: 'Check-out', initials: 'RC' },
  { name: 'Emma Wilson', host: 'James Park', floor: 'Floor 1', status: 'Waiting', time: '--', action: '--', initials: 'EW' },
]

const approvedQrValue = 'VMS-2026-FLOOR5-EMMA-WILSON'

function ReceptionistPage() {
  const [isWalkInOpen, setIsWalkInOpen] = useState(false)
  const [isQrScanned, setIsQrScanned] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [faceStatus, setFaceStatus] = useState('idle')
  const [faceProgress, setFaceProgress] = useState(0)
  const [faceDecision, setFaceDecision] = useState(null)
  const navigate = useNavigate()

  const resetVisitorFlow = () => {
    setIsScanning(false)
    setIsQrScanned(false)
    setFaceStatus('idle')
    setFaceProgress(0)
    setFaceDecision(null)
  }

  useEffect(() => {
    if (faceStatus !== 'analyzing') {
      return undefined
    }

    const startedAt = Date.now()
    const durationMs = 1800
    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const nextProgress = Math.min(100, Math.round((elapsed / durationMs) * 100))
      setFaceProgress(nextProgress)

      if (nextProgress >= 100) {
        window.clearInterval(intervalId)
        setFaceStatus('verified')
      }
    }, 120)

    return () => window.clearInterval(intervalId)
  }, [faceStatus])

  useEffect(() => {
    if (!isScanning) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setIsScanning(false)
      setIsQrScanned(true)
    }, 1400)

    return () => window.clearTimeout(timeoutId)
  }, [isScanning])

  return (
    <section className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-[#f5f7fb] text-[#13294c]">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#dbe4f7] bg-white px-6 py-4">
        <div className="flex items-center gap-3 font-bold text-[#13294c]">
          <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#2563ff] text-white">
            <Shield size={18} />
          </span>
          <div>
            SecureVMS
            <small className="block font-medium text-[#5b7cc5]">Reception Desk</small>
          </div>
        </div>
        <div className="text-center font-bold">
          9:00:25 AM <small className="block font-medium text-[#8392ac]">Mon, March 2, 2026</small>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ffd199] bg-[#fff6e5] px-4 py-2 text-[0.9rem] font-semibold text-[#d97706]">
            <UserRound size={16} /> 2 waiting
          </span>
          <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[#dbe4f7] bg-[#f5f8ff] px-3 text-[0.9rem] font-semibold text-[#4b628c]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2563ff] text-white">S</span>
            Sofia
          </span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-[#dbe4f7] bg-white px-3 text-[0.9rem] font-semibold text-[#4b628c]"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-4 p-4 pb-28 xl:grid-cols-[1fr_1.4fr]">
        <div className="grid gap-4">
          <article className="rounded-[18px] border border-[#d7e2f8] bg-white p-4 shadow-sm">
            <h3 className="m-0 inline-flex items-center gap-2 text-lg font-bold"><QrCode size={18} /> QR Scanner</h3>
            <div className="relative mt-4 grid min-h-[320px] place-items-center overflow-hidden rounded-[16px] border border-[#e1e8f3] bg-[linear-gradient(160deg,#0a1739,#0e2453)] text-[#28ccff]">
              {isScanning && (
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-6 right-6 top-6 h-1 rounded-full bg-cyan-300/80 scan-line" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.2),transparent_55%)]" />
                </div>
              )}
              {faceDecision === 'approved' ? (
                <div className="grid w-full gap-4 px-6 py-4">
                  <div className="grid min-h-[170px] place-items-center rounded-[22px] border border-[#86efac] bg-[#ecfdf3] text-center text-[#15803d]">
                    <div className="grid gap-2">
                      <CheckCircle2 size={46} className="mx-auto" />
                      <strong className="text-[1.1rem]">APPROVED</strong>
                      <small>Emma Wilson - Entry Granted</small>
                    </div>
                  </div>
                </div>
              ) : faceDecision === 'rejected' ? (
                <div className="grid w-full gap-4 px-6 py-4">
                  <div className="grid min-h-[170px] place-items-center rounded-[22px] border border-[#fca5a5] bg-[#fef2f2] text-center text-[#b91c1c]">
                    <div className="grid gap-2">
                      <X size={46} className="mx-auto" />
                      <strong className="text-[1.1rem]">REJECTED</strong>
                      <small>Entry Denied</small>
                    </div>
                  </div>
                  <div className="grid gap-2 rounded-[22px] border border-[#fca5a5] bg-[#fef2f2] px-5 py-4 text-center text-[#b91c1c]">
                    <strong>Entry Denied</strong>
                    <small>Visitor has been flagged in the system</small>
                  </div>
                </div>
              ) : isScanning ? (
                <div className="grid place-items-center gap-3 text-center text-white">
                  <div className="grid h-16 w-16 place-items-center rounded-[14px] border border-cyan-400/40 bg-cyan-400/10">
                    <QrCode size={34} />
                  </div>
                  <div className="text-[1.05rem] font-semibold">Scanning...</div>
                  <small className="text-[#9fb7e2]">Align the QR code within the frame</small>
                </div>
              ) : isQrScanned ? (
                <div className="grid place-items-center gap-3 text-center text-white">
                  <div className="grid h-16 w-16 place-items-center rounded-[14px] border border-cyan-400/40 bg-cyan-400/10">
                    <QrCode size={34} />
                  </div>
                  <div className="text-[1.05rem] font-semibold">Maria Santos</div>
                  <small className="text-[#9fb7e2]">Globex Inc</small>
                  <span className="mt-1 inline-flex rounded-full bg-white/10 px-4 py-2 text-[0.78rem] font-semibold text-[#cfe4ff]">
                    VMS-2026-VIS002-PENDING
                  </span>
                </div>
              ) : (
                <div className="grid place-items-center gap-3 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-[14px] border border-cyan-400/40 bg-cyan-400/10">
                    <QrCode size={34} />
                  </div>
                  <small className="text-[#9fb7e2]">Ready to scan visitor QR code</small>
                </div>
              )}
            </div>
            {faceDecision === 'rejected' ? (
              <button
                type="button"
                className="mt-4 w-full rounded-[12px] border-0 bg-[#1d4ed8] py-3.5 text-[1rem] font-bold text-white"
                onClick={resetVisitorFlow}
              >
                Scan Next Visitor
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="mt-4 w-full rounded-[12px] border-0 bg-[linear-gradient(120deg,#1f5ef8,#2b84ff)] py-3.5 text-[1rem] font-bold text-white"
                  onClick={() => {
                    setFaceDecision(null)
                    setFaceStatus('idle')
                    setFaceProgress(0)
                    setIsQrScanned(false)
                    setIsScanning(true)
                  }}
                >
                  Scan Visitor QR Code
                </button>
                {isQrScanned && (
                  <button
                    type="button"
                    className="mt-2 w-full rounded-[12px] border border-[#d7e2f8] bg-white py-3 text-[0.95rem] font-semibold text-[#4b628c]"
                    onClick={resetVisitorFlow}
                  >
                    Reset Scanner
                  </button>
                )}
              </>
            )}
          </article>

          {isQrScanned && faceDecision !== 'rejected' && (
            <article className="rounded-[18px] border border-[#d7e2f8] bg-white p-4 shadow-sm">
              {faceDecision === 'approved' ? (
                <div className="mt-2 grid gap-4">
                  <div className="grid gap-4 rounded-[22px] border border-[#86efac] bg-[#ecfdf3] px-5 py-4 text-center text-[#15803d]">
                    <strong className="text-[0.95rem]">Floor QR Key Issued</strong>
                    <div className="mx-auto grid h-32 w-32 place-items-center rounded-[16px] border border-[#86efac] bg-white">
                      <QRCodeCanvas value={approvedQrValue} size={116} bgColor="#ffffff" fgColor="#0f172a" includeMargin />
                    </div>
                    <small>Floor 5 - Executive - Valid until end of visit</small>
                  </div>
                  <button
                    type="button"
                    className="h-11 rounded-[12px] border-0 bg-[#1d4ed8] text-[0.95rem] font-semibold text-white"
                    onClick={resetVisitorFlow}
                  >
                    Scan Next Visitor
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="m-0 inline-flex items-center gap-2 text-lg font-bold">
                    <Camera size={18} /> Facial Verification
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(140deg,#d7e3ff,#f1f5ff)] text-[0.9rem] font-bold text-[#1f5ef8]">
                      EW
                    </div>
                    <div>
                      <strong className="block text-[#13294c]">Emma Wilson</strong>
                      <small className="block text-[#6f86b3]">Driver License</small>
                      {faceStatus === 'verified' && (
                        <span className="mt-1 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[#16a34a]">
                          <CheckCircle2 size={16} /> Identity Verified (98.7%)
                        </span>
                      )}
                      {faceStatus === 'analyzing' && (
                        <small className="mt-1 block text-[#5b7cc5] animate-pulse">Analyzing...</small>
                      )}
                    </div>
                  </div>

                  {faceStatus === 'idle' && (
                    <button
                      type="button"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[12px] border-0 bg-[#0891b2] py-3.5 text-[1rem] font-bold text-white"
                      onClick={() => {
                        setFaceProgress(0)
                        setFaceStatus('analyzing')
                      }}
                    >
                      <Camera size={16} /> Run Facial Verification
                    </button>
                  )}

                  {faceStatus === 'analyzing' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[0.85rem] font-semibold text-[#5b7cc5]">
                        <span>Analyzing...</span>
                        <span>{faceProgress}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-[#e8eef8]">
                        <div
                          className="h-2 rounded-full bg-[#2563ff] transition-[width] duration-300"
                          style={{ width: `${faceProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {faceStatus === 'verified' && (
                    <div className="mt-4 grid gap-3">
                      <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Assign Floor Access *</label>
                      <select className="h-11 rounded-[12px] border border-[#d7e2f8] bg-[#f7f9fc] px-4 text-[0.95rem] text-[#1f2a44] outline-none">
                        <option>Select floor...</option>
                        <option>Floor 1 - HR</option>
                        <option>Floor 2 - Finance</option>
                        <option>Floor 3 - Marketing</option>
                        <option>Floor 4 - R&D</option>
                        <option>Floor 5 - Executive</option>
                      </select>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          className="h-11 rounded-[12px] bg-[#16a34a] text-[0.95rem] font-semibold text-white"
                          onClick={() => setFaceDecision('approved')}
                        >
                          Approve Entry
                        </button>
                        <button
                          type="button"
                          className="h-11 rounded-[12px] bg-[#ef4444] text-[0.95rem] font-semibold text-white"
                          onClick={() => setFaceDecision('rejected')}
                        >
                          Reject Entry
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </article>
          )}
        </div>

        <article className="rounded-[18px] border border-[#d7e2f8] bg-white p-4 shadow-sm">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="m-0 inline-flex items-center gap-2 text-lg font-bold">
              <UserRound size={18} /> Today&apos;s Visitors
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#dbe9ff] text-[0.82rem] text-[#1f5ef8]">9</span>
            </h3>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e2f7] bg-[#f3f7ff] px-4 py-2 text-[#8ea1bf]">
                <Search size={14} /> Search...
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border-0 bg-[#0b1d42] px-4 py-2 font-bold text-white"
                onClick={() => setIsWalkInOpen(true)}
              >
                <Plus size={16} /> Walk-in
              </button>
            </div>
          </header>

          <div className="mt-3 max-h-[420px] overflow-y-auto pr-2">
            {rows.map((row) => (
              <div key={row.name} className="grid grid-cols-1 items-center gap-3 border-b border-[#ebf1fd] py-3 md:grid-cols-[1.4fr_auto_auto]">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e5edff] text-[0.85rem] font-bold text-[#1f5ef8]">
                    {row.initials}
                  </div>
                  <div>
                    <strong className="block text-[#13294c]">{row.name}</strong>
                    <small className="block text-[#8899b5]">{row.host} - {row.floor}</small>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[0.78rem] font-bold ${
                      row.status === 'Active'
                        ? 'bg-[#eaffef] text-[#1b914a]'
                        : row.status === 'Waiting'
                          ? 'bg-[#fff7e4] text-[#bf7f03]'
                          : row.status === 'Completed'
                            ? 'bg-[#edf2f9] text-[#5f7396]'
                            : 'bg-[#ffeef1] text-[#d53551]'
                    }`}
                  >
                    {row.status}
                  </span>
                  <small className="text-[#8899b5]">{row.time}</small>
                </div>
                <div className="text-right">
                  {row.action === 'Check-out' ? (
                    <button className="rounded-full border border-[#dbe4f7] bg-[#f5f8ff] px-3 py-1 text-[0.78rem] font-semibold text-[#4b628c]">Check-out</button>
                  ) : (
                    <small className="text-[#8899b5]">{row.action}</small>
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>
      </main>

      <footer className="sticky bottom-0 z-10 grid grid-cols-1 gap-4 border-t border-[#e7eefc] bg-[#f5f7fb] px-4 py-4 md:grid-cols-4">
        <article className="rounded-[16px] border border-[#d7e2f7] bg-[#eef5ff] p-4 text-center"><strong className="block text-[1.8rem] text-[#1f62f9]">9</strong><small className="text-[#5f7395]">Total</small></article>
        <article className="rounded-[16px] border border-[#d7e2f7] bg-[#ecfff2] p-4 text-center"><strong className="block text-[1.8rem] text-[#159f4e]">4</strong><small className="text-[#5f7395]">Active</small></article>
        <article className="rounded-[16px] border border-[#d7e2f7] bg-[#fff7e4] p-4 text-center"><strong className="block text-[1.8rem] text-[#d97706]">2</strong><small className="text-[#5f7395]">Waiting</small></article>
        <article className="rounded-[16px] border border-[#d7e2f7] bg-[#f1f5f9] p-4 text-center"><strong className="block text-[1.8rem] text-[#64748b]">2</strong><small className="text-[#5f7395]">Completed</small></article>
      </footer>

      {isWalkInOpen && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 px-4">
          <div className="w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e5eef9] pb-4">
              <h3 className="m-0 text-[1.3rem] font-bold text-[#0b1937]">Walk-in Registration</h3>
              <button
                type="button"
                onClick={() => setIsWalkInOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#7f90aa] hover:bg-[#f3f5f9]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Full Name *</label>
                <input
                  className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                  placeholder="Visitor full name"
                  type="text"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Company</label>
                  <input
                    className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                    placeholder="Company name"
                    type="text"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Host *</label>
                  <input
                    className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                    placeholder="Host name"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Purpose</label>
                <input
                  className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                  placeholder="Purpose of visit"
                  type="text"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Floor Access</label>
                <select className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none">
                  <option>Floor 1 - HR</option>
                  <option>Floor 2 - Finance</option>
                  <option>Floor 3 - Marketing</option>
                  <option>Floor 4 - R&D</option>
                  <option>Floor 5 - Executive</option>
                </select>
              </div>

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setIsWalkInOpen(false)}
                  className="h-11 rounded-full bg-[#f2f5f9] text-[0.95rem] font-semibold text-[#1f2a44]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="h-11 rounded-full bg-[#2563ff] text-[0.95rem] font-semibold text-white"
                >
                  Register Visitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ReceptionistPage
