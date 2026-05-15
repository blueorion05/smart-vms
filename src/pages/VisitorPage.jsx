import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, CheckCircle2, Clock3, Download, Info, LogOut, QrCode, RefreshCcw, Share2, Shield, ShieldCheck, UserRound } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'

const passValue = 'VMS-2026-VIS001'

function VisitorPage() {
  const [activeView, setActiveView] = useState('home')
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  const showToast = (message) => {
    setToast(message)
  }

  return (
    <section className="grid min-h-screen place-items-center bg-[#f2f4f8] px-4 py-6">
      <div className="relative grid h-[88vh] w-full max-w-[360px] grid-rows-[auto_1fr_auto] overflow-hidden rounded-[26px] border border-[#d6e2f8] bg-white shadow-[0_30px_65px_rgba(21,42,86,0.2)]">
        <header className="sticky top-0 z-10 rounded-b-[20px] bg-[linear-gradient(160deg,#1c3c93,#223f9f)] px-4 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                <ShieldCheck size={16} />
              </span>
              <strong className="text-[1.05rem]">SecureVMS</strong>
            </div>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10"
              onClick={() => navigate('/login')}
            >
              <LogOut size={16} />
            </button>
          </div>
          <div className="mt-4">
            <small className="text-[#bed0ff]">Welcome back,</small>
            <h3 className="m-0 mt-1 text-[1.55rem] font-semibold">James</h3>
          </div>
        </header>

        {toast && (
          <div className="pointer-events-none absolute left-1/2 top-[98px] z-20 w-[88%] -translate-x-1/2 rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-[0.9rem] font-semibold text-emerald-700 shadow-[0_12px_30px_rgba(12,20,40,0.2)]">
            {toast}
          </div>
        )}

        <div className="scrollbar-thin grid gap-3 overflow-y-auto px-4 py-4">

          {activeView === 'qr' ? (
            <>
              <article className="rounded-[20px] border border-transparent bg-[linear-gradient(160deg,#1c3c93,#2a55b8)] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="text-[0.7rem] uppercase tracking-[0.22em] text-[#a9c2ff]">Visitor Pass</div>
                  <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[0.7rem] font-semibold text-emerald-200">Authorized</span>
                </div>
                <div className="mt-4 grid place-items-center gap-2">
                  <div className="rounded-[14px] bg-white p-2.5">
                    <QRCodeCanvas value={passValue} size={140} bgColor="#ffffff" fgColor="#0f172a" includeMargin />
                  </div>
                  <small className="text-[#c7d8ff]">Pass ID</small>
                  <strong className="text-[0.95rem]">{passValue}</strong>
                </div>
                <div className="mt-4 rounded-[14px] bg-white/10 px-4 py-3 text-[0.88rem]">
                  <div className="flex items-center justify-between text-[#c7d8ff]">
                    <span>James Thompson</span>
                    <span>Verified Visitor</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[#e8f0ff]">
                    <div>
                      <small className="block text-[#a9c2ff]">Date</small>
                      Mar 2, 2026
                    </div>
                    <div>
                      <small className="block text-[#a9c2ff]">Check-in</small>
                      9:15 AM
                    </div>
                    <div>
                      <small className="block text-[#a9c2ff]">Floor Access</small>
                      Lobby - Floor 4
                    </div>
                    <div>
                      <small className="block text-[#a9c2ff]">Host</small>
                      Dr. Sarah Park
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-[0.8rem] text-[#b5c9ff]">
                  <CheckCircle2 size={14} /> Valid today until 6:00 PM
                </div>
              </article>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#dbe5f7] bg-[#0b1d42] py-3 text-[0.9rem] font-semibold text-white"
                  onClick={() => showToast('Pass downloaded')}
                >
                  <Download size={16} /> Download Pass
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#dbe5f7] bg-white py-3 text-[0.9rem] font-semibold text-[#2a4a79]"
                  onClick={() => showToast('Share link copied')}
                >
                  <Share2 size={16} /> Share Pass
                </button>
              </div>

              <article className="rounded-[16px] border border-[#dbe5f7] bg-white p-4 text-[#13294c]">
                <h4 className="m-0 mb-3 text-[0.98rem] font-semibold">Pass Details</h4>
                <div className="grid gap-3 text-[0.9rem] text-[#5d7498]">
                  <div className="flex items-center gap-3"><UserRound size={14} /> Visitor Name: James Thompson</div>
                  <div className="flex items-center gap-3"><ShieldCheck size={14} /> Identity: Biometric Verified</div>
                  <div className="flex items-center gap-3"><Info size={14} /> Security Level: Standard - Floor Restricted</div>
                  <div className="flex items-center gap-3"><Clock3 size={14} /> Valid until: 6:00 PM, Mar 2, 2026</div>
                </div>
              </article>

              <article className="rounded-[16px] border border-[#dbe5f7] bg-[#f5f9ff] p-4 text-[#2a4a79]">
                <h4 className="m-0 mb-3 text-[0.98rem] font-semibold">How to use your pass</h4>
                <ol className="grid list-decimal gap-2 pl-5 text-[0.9rem] text-[#5c78a6]">
                  <li>Present this QR code to the receptionist at the front desk.</li>
                  <li>Look into the facial verification camera when prompted.</li>
                  <li>Collect your floor access key from reception.</li>
                  <li>Use your QR pass at floor entry points to access authorized floors.</li>
                </ol>
              </article>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#dbe5f7] bg-white py-3 text-[0.9rem] font-semibold text-[#5c7197]"
                onClick={() => showToast('Pass refreshed')}
              >
                <RefreshCcw size={16} /> Refresh Pass
              </button>
            </>
          ) : (
            <>
              <article className="rounded-[16px] border border-[#b9e6c6] bg-[#ecfaf1] p-4 text-[#13294c]">
                <div className="flex items-center justify-between text-[0.9rem] font-semibold text-[#1a9a52]">
                  <span className="inline-flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-[#1a9a52]">
                      <CheckCircle2 size={12} />
                    </span>
                    Active - Inside Building
                  </span>
                  <small className="text-[#8aa0c6]">Today</small>
                </div>
                <div className="mt-3 grid gap-1">
                  <small className="text-[#7a8fb2]">Visiting</small>
                  <strong>Dr. Sarah Park</strong>
                  <small className="text-[#7a8fb2]">R&amp;D</small>
                </div>
                <div className="mt-3 flex items-center justify-between text-[#3a5a8c]">
                  <span className="inline-flex items-center gap-2"><Shield size={14} /> Floor 4</span>
                  <span className="inline-flex items-center gap-2"><Clock3 size={14} /> In: 9:15 AM</span>
                </div>
                <div className="mt-3 border-t border-[#c6ead2] pt-3 text-[0.9rem] text-[#5b7296]">
                  Purpose: Business Meeting
                </div>
              </article>

              <article className="rounded-[16px] border border-[#dbe5f7] bg-white p-4 text-[#13294c]">
                <h4 className="m-0 mb-3 text-[0.98rem] font-semibold">Current Visit Summary</h4>
                <div className="grid gap-2 text-[#5d7498]">
                  <div className="flex items-center gap-3"><Calendar size={14} /> Mar 2, 2026</div>
                  <div className="flex items-center gap-3"><UserRound size={14} /> R&amp;D</div>
                  <div className="flex items-center gap-3"><Shield size={14} /> Floor 4</div>
                  <div className="flex items-center gap-3"><Clock3 size={14} /> 9:15 AM</div>
                </div>
              </article>

              <article className="rounded-[16px] border border-transparent bg-[linear-gradient(130deg,#1f3e9a,#2a54b8)] p-4 text-[#f1f6ff]">
                <header className="flex items-center justify-between">
                  <small>Floor Access Granted</small>
                  <small className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Active</small>
                </header>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1">Lobby</span>
                  <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1">Floor 4 - R&amp;D</span>
                </div>
                <small className="mt-3 block text-[#c8d8ff]">Valid for today&apos;s visit only</small>
              </article>
            </>
          )}
        </div>

        <nav className="sticky bottom-0 z-10 grid grid-cols-2 border-t border-[#e3ebfb] bg-white px-4 py-2 text-[#7f92b4]">
          <button
            type="button"
            className={`grid place-items-center gap-1 rounded-[12px] py-2 ${activeView === 'home' ? 'text-[#225ef7]' : ''}`}
            onClick={() => setActiveView('home')}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-full ${activeView === 'home' ? 'bg-[#edf2ff] text-[#225ef7]' : 'bg-[#f1f5fb]'}`}>
              <Shield size={16} />
            </span>
            <span className="text-[0.8rem] font-semibold">Home</span>
          </button>
          <button
            type="button"
            className={`grid place-items-center gap-1 rounded-[12px] py-2 ${activeView === 'qr' ? 'text-[#225ef7]' : ''}`}
            onClick={() => setActiveView('qr')}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-full ${activeView === 'qr' ? 'bg-[#edf2ff] text-[#225ef7]' : 'bg-[#f1f5fb]'}`}>
              <QrCode size={16} />
            </span>
            <span className="text-[0.8rem] font-semibold">QR Pass</span>
          </button>
        </nav>
      </div>
    </section>
  )
}

export default VisitorPage
