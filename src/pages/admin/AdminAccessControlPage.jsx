import { Layers, Lock, Plus, Settings } from 'lucide-react'

const accessStats = [
  { label: 'Total Floors', value: 7, tone: 'text-[#2563ff]' },
  { label: 'Public Access', value: 1, tone: 'text-[#16a34a]' },
  { label: 'Restricted', value: 5, tone: 'text-[#f97316]' },
  { label: 'Executive', value: 1, tone: 'text-[#7c3aed]' },
]

const floorCards = [
  {
    name: 'Ground Floor / Lobby',
    level: 'Level 0',
    status: 'Public',
    occupancy: 48,
    capacity: 200,
    time: 'No restriction',
    departments: 'All Departments',
  },
  {
    name: 'Floor 1 - Human Resources',
    level: 'Level 1',
    status: 'Restricted',
    occupancy: 22,
    capacity: 60,
    time: '08:00-18:00',
    departments: 'Human Resources',
  },
  {
    name: 'Floor 2 - Finance',
    level: 'Level 2',
    status: 'Restricted',
    occupancy: 35,
    capacity: 80,
    time: '08:00-18:00',
    departments: 'Finance',
  },
  {
    name: 'Floor 3 - Marketing',
    level: 'Level 3',
    status: 'Restricted',
    occupancy: 67,
    capacity: 100,
    time: '09:00-19:00',
    departments: 'Marketing',
  },
]

const statusPills = {
  Public: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Restricted: 'border-amber-200 bg-amber-50 text-amber-700',
  Executive: 'border-purple-200 bg-purple-50 text-purple-700',
}

function AdminAccessControlPage() {
  return (
    <div className="grid gap-5 pb-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Floor Access Control</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Define access rules, time restrictions, and floor keys</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-[#2563ff] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-sm">
          <Plus size={18} />
          Add Floor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {accessStats.map((stat) => (
          <article key={stat.label} className="rounded-[18px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
            <div className={`text-[1.6rem] font-semibold ${stat.tone}`}>{stat.value}</div>
            <div className="text-[0.9rem] text-[#6c7a95]">{stat.label}</div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {floorCards.map((floor) => {
          const percent = Math.round((floor.occupancy / floor.capacity) * 100)
          return (
            <article key={floor.name} className="rounded-[20px] border border-[#e1e8f3] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#f1f5f9] text-[#42557d]">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="m-0 text-[1.05rem] font-semibold text-[#0b1937]">{floor.name}</h3>
                    <p className="m-0 text-[0.85rem] text-[#8ea1bf]">{floor.level}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-semibold ${statusPills[floor.status] || statusPills.Restricted}`}>
                  {floor.status}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-[0.85rem] text-[#6b7c97]">
                  <span>Occupancy</span>
                  <span>
                    {floor.occupancy}/{floor.capacity} ({percent}%)
                  </span>
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-[#eef2f8]">
                  <div className="h-2.5 rounded-full bg-[#22c55e]" style={{ width: `${percent}%` }} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#eef2f8] pt-4 text-[0.88rem] text-[#6b7c97] sm:grid-cols-2">
                <div>
                  <span className="block text-[0.78rem] uppercase tracking-wide text-[#9aa8c2]">Time Restriction</span>
                  <strong className="text-[#1f2a44]">{floor.time}</strong>
                </div>
                <div>
                  <span className="block text-[0.78rem] uppercase tracking-wide text-[#9aa8c2]">Departments</span>
                  <strong className="text-[#1f2a44]">{floor.departments}</strong>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[0.9rem] font-semibold text-red-600">
                  <Lock size={16} />
                  Lock Floor
                </button>
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f1f5f9] px-4 py-2 text-[0.9rem] font-semibold text-[#1f2a44]">
                  <Settings size={16} />
                  Manage Rules
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default AdminAccessControlPage
