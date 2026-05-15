import { Calendar, Clock3, QrCode, Shield, UserRound } from 'lucide-react'

function VisitorPage() {
  return (
    <section className="grid min-h-screen place-items-center bg-[#f2f4f8] p-4">
      <div className="grid w-full max-w-[360px] gap-3 overflow-hidden rounded-[22px] border border-[#d6e2f8] bg-[#f8fbff] shadow-[0_30px_65px_rgba(21,42,86,0.2)]">
        <header className="flex items-start justify-between rounded-b-[16px] bg-[linear-gradient(160deg,#2c46a0,#2b4ab8)] p-3 text-white">
          <div>
            <strong className="block">SecureVMS</strong>
            <small className="mt-1 block text-[#bed0ff]">Welcome back,</small>
            <h3 className="m-0 mt-1">James</h3>
          </div>
          <button type="button" className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-white">Sign out</button>
        </header>

        <article className="mx-3 rounded-[14px] border border-[#bedec9] bg-[#edf9f1] p-3 text-[#13294c]">
          <small className="font-bold text-[#2d9956]">Active - Inside Building</small>
          <strong className="mt-1 block">Dr. Sarah Park</strong>
          <p className="m-0 text-[#5b7296]">R&amp;D</p>
          <div className="mt-2 flex justify-between text-[#385684]">
            <span>Floor 4</span>
            <span>In 9:15 AM</span>
          </div>
          <em className="not-italic text-[#617fa9]">Purpose: Business Meeting</em>
        </article>

        <div className="mx-3 grid grid-cols-2 gap-2.5">
          <button type="button" className="inline-flex items-center justify-center gap-1.5 rounded-[12px] border border-[#d8e2f8] bg-white px-3 py-3 font-bold text-[#2a4a79]"><QrCode size={16} /> My QR Pass</button>
          <button type="button" className="inline-flex items-center justify-center gap-1.5 rounded-[12px] border border-[#d8e2f8] bg-white px-3 py-3 font-bold text-[#2a4a79]"><Shield size={16} /> Visit Details</button>
        </div>

        <article className="mx-3 rounded-[14px] border border-[#d8e2f8] bg-white p-3 text-[#13294c]">
          <h4 className="m-0 mb-2">Current Visit Summary</h4>
          <p className="my-1 inline-flex items-center gap-1.5 text-[#5d7498]"><Calendar size={14} /> Mar 2, 2026</p>
          <p className="my-1 inline-flex items-center gap-1.5 text-[#5d7498]"><UserRound size={14} /> R&amp;D</p>
          <p className="my-1 inline-flex items-center gap-1.5 text-[#5d7498]"><Shield size={14} /> Floor 4</p>
          <p className="my-1 inline-flex items-center gap-1.5 text-[#5d7498]"><Clock3 size={14} /> 9:15 AM</p>
        </article>

        <article className="mx-3 rounded-[14px] border border-transparent bg-[linear-gradient(130deg,#2849ac,#2f57bf)] p-3 text-[#f1f6ff]">
          <header className="flex items-center justify-between">
            <small>Floor Access Granted</small>
            <small>Active</small>
          </header>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full border border-white/30 bg-white/20 px-2 py-1">Lobby</span>
            <span className="rounded-full border border-white/30 bg-white/20 px-2 py-1">Floor 4 - R&amp;D</span>
          </div>
          <small className="mt-2 block text-[#c8d8ff]">Valid for today&apos;s visit only</small>
        </article>

        <article className="mx-3 rounded-[14px] border border-[#d8e2f8] bg-white p-3 text-[#13294c]">
          <h4 className="m-0 mb-2">Visit History</h4>
          <ul className="grid list-none gap-2 p-0">
            <li className="grid gap-0.5 border-b border-[#ebf1fd] pb-2">
              <strong className="text-[#133160]">Business Meeting</strong>
              <small className="text-[#8499bb]">Mar 2, 2026 - Dr. Sarah Park</small>
              <span className="w-fit rounded-full bg-[#e9fdef] px-2 py-0.5 text-[0.75rem] font-bold text-[#16904b]">Active</span>
            </li>
            <li className="grid gap-0.5 border-b border-[#ebf1fd] pb-2">
              <strong className="text-[#133160]">Contract Review</strong>
              <small className="text-[#8499bb]">Feb 24, 2026 - Michael Torres</small>
              <span className="w-fit rounded-full bg-[#e9fdef] px-2 py-0.5 text-[0.75rem] font-bold text-[#16904b]">Done</span>
            </li>
            <li className="grid gap-0.5 border-b border-[#ebf1fd] pb-2">
              <strong className="text-[#133160]">System Audit</strong>
              <small className="text-[#8499bb]">Feb 18, 2026 - IT Team</small>
              <span className="w-fit rounded-full bg-[#e9fdef] px-2 py-0.5 text-[0.75rem] font-bold text-[#16904b]">Done</span>
            </li>
          </ul>
        </article>

        <nav className="grid grid-cols-3 border-t border-[#e3ebfb] bg-white">
          <button type="button" className="border-0 bg-transparent py-3 font-bold text-[#225ef7]">Home</button>
          <button type="button" className="border-0 bg-transparent py-3 font-bold text-[#7f92b4]">QR Pass</button>
          <button type="button" className="border-0 bg-transparent py-3 font-bold text-[#7f92b4]">Profile</button>
        </nav>
      </div>
    </section>
  )
}

export default VisitorPage
