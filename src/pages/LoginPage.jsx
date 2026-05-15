import { ChevronRight, Eye, Lock, Shield, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  return (
    <section className="grid min-h-screen grid-cols-1 bg-[#050818] text-white lg:grid-cols-[1.86fr_1fr]">
      <aside className="relative flex min-h-[620px] flex-col justify-start gap-5 overflow-hidden bg-[linear-gradient(rgba(16,18,34,0.46),rgba(16,18,34,0.46)),radial-gradient(circle_at_50%_10%,rgba(110,109,150,0.22),transparent_22%),linear-gradient(120deg,#1d2030_0%,#2c2f42_20%,#44404e_48%,#271f28_100%)] p-8 pb-5 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,14,30,0.32)_0_7%,transparent_7%_15%,rgba(11,14,30,0.22)_15%_20%,transparent_20%),linear-gradient(180deg,rgba(6,7,16,0.14),rgba(6,7,16,0.3))]" />
        <div className="pointer-events-none absolute inset-0 mix-blend-screen [background-image:radial-gradient(circle_at_24%_13%,rgba(24,27,37,0.95)_0_9%,transparent_10%),linear-gradient(rgba(173,188,223,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(173,188,223,0.03)_1px,transparent_1px)] [background-size:auto,78px_78px,78px_78px]" />

        <div className="relative z-10 inline-flex items-center gap-3 self-start text-white">
          <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-[linear-gradient(145deg,#2d71ff,#1648c9)] shadow-[0_10px_20px_rgba(24,88,255,0.35)]">
            <Shield size={17} />
          </div>
          <div>
            <strong className="block text-[1.45rem] leading-none">SecureVMS</strong>
            <small className="text-[0.7rem] tracking-[0.11em] text-[#8bbcff]">VISITOR MANAGEMENT SYSTEM</small>
          </div>
        </div>

        <div className="relative z-10 mt-auto max-w-[760px] pb-6">
          <h1 className="max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(2.8rem,6vw,4.7rem)] leading-[0.97] tracking-[-0.06em] text-white">
            Enterprise-Grade
            <span className="block text-[#35bcff]">Visitor Security</span>
          </h1>
          <p className="mt-4 max-w-[42ch] text-[1.04rem] leading-[1.45] text-[#d2def8]">
            Real-time monitoring, biometric verification, and intelligent access control for modern smart buildings.
          </p>

          <div className="mt-6 grid max-w-[760px] grid-cols-1 gap-3 md:grid-cols-3 md:gap-2.5">
            <article className="rounded-[14px] border border-white/20 bg-white/20 p-4 pb-3.5 backdrop-blur-xl">
              <strong className="block text-[1.9rem] leading-none text-white">247</strong>
              <small className="text-[#b6c8f0]">Visitors Today</small>
            </article>
            <article className="rounded-[14px] border border-white/20 bg-white/20 p-4 pb-3.5 backdrop-blur-xl">
              <strong className="block text-[1.9rem] leading-none text-white">3</strong>
              <small className="text-[#b6c8f0]">Active Alerts</small>
            </article>
            <article className="rounded-[14px] border border-white/20 bg-white/20 p-4 pb-3.5 backdrop-blur-xl">
              <strong className="block text-[1.9rem] leading-none text-white">99.9%</strong>
              <small className="text-[#b6c8f0]">Uptime</small>
            </article>
          </div>

          <div className="mt-6 flex w-full max-w-[760px] items-center gap-3 rounded-[11px] border border-emerald-400/30 bg-emerald-400/10 px-4 py-[0.95rem] text-[#8cf2b8] shadow-[inset_0_0_0_1px_rgba(72,223,159,0.04)]">
            <span className="h-2 w-2 rounded-full bg-[#2fe37e] shadow-[0_0_10px_rgba(47,227,126,0.75)]" />
            All systems operational - System health: 98.7%
          </div>
        </div>

        <footer className="relative z-10 mt-auto flex flex-wrap items-center gap-8 pl-1 text-[0.78rem] text-white/75">
          <span className="inline-flex items-center gap-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:border before:border-current before:opacity-70">256-bit AES Encryption</span>
          <span className="inline-flex items-center gap-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:border before:border-current before:opacity-70">SOC 2 Compliant</span>
          <span className="inline-flex items-center gap-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:border before:border-current before:opacity-70">ISO 27001 Certified</span>
        </footer>
      </aside>

      <div className="grid items-center bg-[#050718] px-5 py-8 sm:px-8 lg:px-9">
        <div className="mx-auto grid w-full max-w-[430px] gap-4 text-[#e6efff]">
          <h2 className="m-0 text-[clamp(2.2rem,3vw,3rem)] leading-none tracking-[-0.03em] text-white">Welcome back</h2>
          <p className="m-0 text-[0.98rem] text-[#8eb0e8]">Sign in to your secure dashboard</p>

          <label>
            <span className="mb-2 block text-[0.92rem] font-semibold text-[#d0def8]">Username</span>
            <div className="flex min-h-[49px] items-center gap-2.5 rounded-[14px] border border-[#425b97]/70 bg-[linear-gradient(180deg,rgba(12,24,51,0.9),rgba(15,28,57,0.96))] px-4 py-3">
              <User size={16} />
              <input className="w-full border-0 bg-transparent text-[#f2f7ff] outline-none placeholder:text-[#8fa3c6]" placeholder="Enter username" />
            </div>
          </label>

          <label>
            <span className="mb-2 block text-[0.92rem] font-semibold text-[#d0def8]">Password</span>
            <div className="flex min-h-[49px] items-center gap-2.5 rounded-[14px] border border-[#425b97]/70 bg-[linear-gradient(180deg,rgba(12,24,51,0.9),rgba(15,28,57,0.96))] px-4 py-3">
              <Lock size={16} />
              <input className="w-full border-0 bg-transparent text-[#f2f7ff] outline-none placeholder:text-[#8fa3c6]" type="password" placeholder="Enter password" />
              <Eye size={16} />
            </div>
          </label>

          <div className="mt-1 flex items-center justify-between gap-4">
            <label className="inline-flex items-center gap-2 text-[#a8c0ea]">
              <input type="checkbox" className="h-4 w-4 rounded border border-[#6477a8] bg-transparent accent-[#2b7dff]" />
              Remember me
            </label>
            <button className="border-0 bg-transparent font-semibold text-[#4ba5ff]" type="button">Forgot password?</button>
          </div>

          <button className="mt-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] border-0 bg-[linear-gradient(120deg,#1c5cf7,#267fff)] px-4 py-3 text-[1.02rem] font-bold text-white shadow-[0_10px_18px_rgba(20,96,255,0.28)] transition-transform hover:-translate-y-0.5" type="button" onClick={() => navigate('/admin')}>
            Sign In
            <ChevronRight size={16} />
          </button>

          <p className="mt-1 inline-flex items-center justify-center gap-2 text-center text-[0.84rem] text-[#5d79a8] before:inline-block before:h-[14px] before:w-[14px] before:rounded-full before:border before:border-[#4a668e] before:content-['']">
            Protected by enterprise-grade security
          </p>

          <p className="m-0 mt-1 text-center text-[#94afd9]">
            New visitor? <Link to="/visitor">Register here</Link>
          </p>

          <div className="mt-5 flex items-center gap-4 text-[0.85rem] uppercase tracking-[0.14em] text-[#6f89b9] before:h-px before:flex-1 before:bg-white/15 after:h-px after:flex-1 after:bg-white/15">
            Quick Demo Access
          </div>

          <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/admin"
              className="grid gap-1 rounded-[12px] border border-[#2f63c8]/60 bg-[#0c244c]/75 px-4 py-3 font-bold text-[#6eb2ff] transition hover:-translate-y-0.5 hover:bg-[#123163]"
            >
              <span className="flex items-center gap-2 text-[1rem]">
                <span className="text-[#6eb2ff]">◌</span>
                Admin
              </span>
              <small className="text-[0.82rem] font-medium text-[#91a8d4]">Full system control</small>
            </Link>

            <Link
              to="/security"
              className="grid gap-1 rounded-[12px] border border-[#8a1328]/50 bg-[#30111d]/75 px-4 py-3 font-bold text-[#ff6a7d] transition hover:-translate-y-0.5 hover:bg-[#43131f]"
            >
              <span className="flex items-center gap-2 text-[1rem]">
                <span className="text-[#ff6a7d]">◌</span>
                Security
              </span>
              <small className="text-[0.82rem] font-medium text-[#cf8d98]">Control center</small>
            </Link>

            <Link
              to="/receptionist"
              className="grid gap-1 rounded-[12px] border border-[#0e6e8f]/50 bg-[#0b2b3c]/75 px-4 py-3 font-bold text-[#15d3ff] transition hover:-translate-y-0.5 hover:bg-[#0e3549]"
            >
              <span className="flex items-center gap-2 text-[1rem]">
                <span className="text-[#15d3ff]">◌</span>
                Receptionist
              </span>
              <small className="text-[0.82rem] font-medium text-[#90b2c7]">Check-in workflow</small>
            </Link>

            <Link
              to="/visitor"
              className="grid gap-1 rounded-[12px] border border-[#0f7a49]/50 bg-[#08261d]/75 px-4 py-3 font-bold text-[#35eba9] transition hover:-translate-y-0.5 hover:bg-[#0d3628]"
            >
              <span className="flex items-center gap-2 text-[1rem]">
                <span className="text-[#35eba9]">◌</span>
                Visitor
              </span>
              <small className="text-[0.82rem] font-medium text-[#93c4ad]">Visitor portal</small>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
