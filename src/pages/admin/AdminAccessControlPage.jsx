import { useState } from 'react'
import { CheckCircle2, Layers, Lock, Plus, Settings, ShieldAlert, X } from 'lucide-react'

const initialFloors = [
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
  const [toast, setToast] = useState(null)
  const [activeFloor, setActiveFloor] = useState(null)
  const [isAddFloorOpen, setIsAddFloorOpen] = useState(false)
  const [floors, setFloors] = useState(initialFloors)
  const [newFloor, setNewFloor] = useState({
    name: '',
    levelNumber: '',
    capacity: '',
    accessType: 'Restricted',
    time: '',
    departments: '',
  })

  const handleLockFloor = (floor) => {
    setToast({
      title: 'Floor locked.',
      message: `${floor.name} is now restricted to security access.`,
      variant: 'warning',
    })
    window.setTimeout(() => setToast(null), 2600)
  }

  const handleCreateFloor = () => {
    if (!newFloor.name.trim() || newFloor.levelNumber === '') {
      setToast({
        title: 'Missing required fields.',
        message: 'Please provide a floor name and level number.',
        variant: 'warning',
      })
      window.setTimeout(() => setToast(null), 2600)
      return
    }

    const capacityValue = Number.parseInt(newFloor.capacity, 10)
    const levelValue = Number.parseInt(newFloor.levelNumber, 10)

    const createdFloor = {
      name: newFloor.name.trim(),
      level: `Level ${Number.isNaN(levelValue) ? newFloor.levelNumber : levelValue}`,
      status: newFloor.accessType,
      occupancy: 0,
      capacity: Number.isNaN(capacityValue) ? 0 : capacityValue,
      time: newFloor.time.trim() || 'No restriction',
      departments: newFloor.departments.trim() || 'All Departments',
    }

    setFloors((prev) => [...prev, createdFloor])
    setIsAddFloorOpen(false)
    setNewFloor({
      name: '',
      levelNumber: '',
      capacity: '',
      accessType: 'Restricted',
      time: '',
      departments: '',
    })
    setToast({
      title: 'Floor created.',
      message: `${createdFloor.name} has been added.`,
      variant: 'success',
    })
    window.setTimeout(() => setToast(null), 2600)
  }

  const accessStats = [
    { label: 'Total Floors', value: floors.length, tone: 'text-[#2563ff]' },
    { label: 'Public Access', value: floors.filter((floor) => floor.status === 'Public').length, tone: 'text-[#16a34a]' },
    { label: 'Restricted', value: floors.filter((floor) => floor.status === 'Restricted').length, tone: 'text-[#f97316]' },
    { label: 'Executive', value: floors.filter((floor) => floor.status === 'Executive').length, tone: 'text-[#7c3aed]' },
  ]

  return (
    <div className="grid gap-5 pb-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[2rem] leading-none tracking-[-0.03em] text-[#0b1937]">Floor Access Control</h2>
          <p className="m-0 mt-2 text-[0.98rem] text-[#7f90aa]">Define access rules, time restrictions, and floor keys</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-[#2563ff] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-sm"
          type="button"
          onClick={() => setIsAddFloorOpen(true)}
        >
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
        {floors.map((floor) => {
          const percent = floor.capacity > 0 ? Math.round((floor.occupancy / floor.capacity) * 100) : 0
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
                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[0.9rem] font-semibold text-red-600"
                  type="button"
                  onClick={() => handleLockFloor(floor)}
                >
                  <Lock size={16} />
                  Lock Floor
                </button>
                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f1f5f9] px-4 py-2 text-[0.9rem] font-semibold text-[#1f2a44]"
                  type="button"
                  onClick={() => setActiveFloor(floor)}
                >
                  <Settings size={16} />
                  Manage Rules
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {toast && (
        <div className="fixed right-6 top-6 z-[999] w-full max-w-[360px] px-4 sm:right-8">
          <div
            className={`flex items-center gap-3 rounded-[16px] border px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.12)] ${
              toast.variant === 'warning'
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white">
              {toast.variant === 'warning' ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
            </span>
            <div>
              <strong className="block text-[0.95rem]">{toast.title}</strong>
              <span className={`text-[0.82rem] ${toast.variant === 'warning' ? 'text-amber-700' : 'text-emerald-700'}`}>{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      {activeFloor && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 px-4">
          <div className="w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e5eef9] pb-4">
              <div>
                <h3 className="m-0 text-[1.3rem] font-bold text-[#0b1937]">{activeFloor.name}</h3>
                <p className="m-0 mt-1 text-[0.9rem] text-[#8ea1bf]">Floor Configuration</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFloor(null)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#7f90aa] hover:bg-[#f3f5f9]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <span className="block text-[0.85rem] font-semibold text-[#1f2a44]">Access Type</span>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {['Public', 'Restricted', 'Executive'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`rounded-[14px] border px-3 py-3 text-[0.85rem] font-semibold ${
                      option === activeFloor.status
                        ? 'border-[#2563ff] bg-emerald-50 text-emerald-700'
                        : 'border-[#e1e8f3] bg-[#f8fafc] text-[#6b7c97]'
                    }`}
                  >
                    <Lock size={16} className="mx-auto mb-1" />
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <span className="block text-[0.85rem] font-semibold text-[#1f2a44]">Time Restriction</span>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {['07:00-22:00', '08:00-18:00', '09:00-17:00', '24/7'].map((slot) => (
                  <button key={slot} type="button" className="rounded-[14px] border border-[#e1e8f3] bg-[#f8fafc] py-2 text-[0.85rem] text-[#1f2a44]">
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <span className="block text-[0.85rem] font-semibold text-[#1f2a44]">Zones</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Main Reception', 'Waiting Area', 'Security Checkpoint', 'Restrooms'].map((zone) => (
                  <span key={zone} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[0.78rem] text-blue-700">
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <span className="block text-[0.85rem] font-semibold text-[#1f2a44]">Authorized Departments</span>
              <div className="mt-2">
                <span className="rounded-full border border-[#e1e8f3] bg-[#f8fafc] px-3 py-1 text-[0.78rem] text-[#6b7c97]">All Departments</span>
              </div>
            </div>

            <div className="mt-6 rounded-[16px] border border-[#dbe7f5] bg-[#eff6ff] p-4">
              <div className="flex items-center gap-2 text-[0.9rem] font-semibold text-[#1f2a44]">
                <Settings size={16} /> QR Floor Key Actions
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button type="button" className="h-10 rounded-full bg-[#2563ff] text-[0.9rem] font-semibold text-white">
                  Generate QR Key
                </button>
                <button type="button" className="h-10 rounded-full border border-red-200 bg-red-50 text-[0.9rem] font-semibold text-red-600">
                  Revoke All Keys
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveFloor(null)}
              className="mt-5 h-11 w-full rounded-full bg-[#f2f5f9] text-[0.95rem] font-semibold text-[#1f2a44]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isAddFloorOpen && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 px-4">
          <div className="w-full max-w-[460px] rounded-[24px] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e5eef9] pb-4">
              <h3 className="m-0 text-[1.3rem] font-bold text-[#0b1937]">Add New Floor</h3>
              <button
                type="button"
                onClick={() => setIsAddFloorOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#7f90aa] hover:bg-[#f3f5f9]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Floor Name *</label>
                <input
                  className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                  placeholder="Floor 7 - Operations"
                  type="text"
                  value={newFloor.name}
                  onChange={(event) => setNewFloor((prev) => ({ ...prev, name: event.target.value }))}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Level Number *</label>
                  <input
                    className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                    placeholder="0"
                    type="number"
                    value={newFloor.levelNumber}
                    onChange={(event) => setNewFloor((prev) => ({ ...prev, levelNumber: event.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Max Capacity</label>
                  <input
                    className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                    placeholder="50"
                    type="number"
                    value={newFloor.capacity}
                    onChange={(event) => setNewFloor((prev) => ({ ...prev, capacity: event.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Access Type</label>
                <select
                  className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                  value={newFloor.accessType}
                  onChange={(event) => setNewFloor((prev) => ({ ...prev, accessType: event.target.value }))}
                >
                  <option>Restricted</option>
                  <option>Public</option>
                  <option>Executive</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Time Restriction</label>
                <input
                  className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                  placeholder="e.g. 09:00-17:00 or 24/7"
                  type="text"
                  value={newFloor.time}
                  onChange={(event) => setNewFloor((prev) => ({ ...prev, time: event.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-[0.9rem] font-semibold text-[#1f2a44]">Departments (comma separated)</label>
                <input
                  className="h-11 rounded-full border border-transparent bg-[#f2f5f9] px-4 text-[0.95rem] text-[#1f2a44] outline-none"
                  placeholder="Finance, Accounting"
                  type="text"
                  value={newFloor.departments}
                  onChange={(event) => setNewFloor((prev) => ({ ...prev, departments: event.target.value }))}
                />
              </div>

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddFloorOpen(false)
                    setNewFloor({
                      name: '',
                      levelNumber: '',
                      capacity: '',
                      accessType: 'Restricted',
                      time: '',
                      departments: '',
                    })
                  }}
                  className="h-11 rounded-full bg-[#f2f5f9] text-[0.95rem] font-semibold text-[#1f2a44]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="h-11 rounded-full bg-[#2563ff] text-[0.95rem] font-semibold text-white"
                  onClick={handleCreateFloor}
                >
                  Create Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAccessControlPage
