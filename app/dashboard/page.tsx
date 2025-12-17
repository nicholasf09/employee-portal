import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/actions/auth'

type Announcement = {
  id: number
  title: string
  content: string
  created_at: string
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data, error: annErr } = await supabase
    .from('announcements')
    .select('id,title,content,created_at')
    .order('created_at', { ascending: false })

  if (annErr) {
    // fail-safe render
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl rounded-2xl border border-blue-100 bg-white/95 p-8 shadow-lg shadow-blue-100/60">
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-3 text-sm text-red-500">
            Gagal load announcements: {annErr.message}
          </p>
        </div>
      </div>
    )
  }

  const announcements = (data ?? []) as Announcement[]

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="rounded-2xl border border-blue-100 bg-white/95 p-8 shadow-md shadow-blue-100/60">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                Employee Portal
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Login sebagai: {user.email}</p>
            </div>

            <form action={logout}>
              <button className="rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50">
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white/95 p-8 shadow-md shadow-blue-100/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">Announcements</h2>
            <span className="text-xs uppercase tracking-wide text-blue-500">
              Terbaru
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {announcements.length === 0 ? (
              <p className="text-sm text-slate-500">Belum ada pengumuman.</p>
            ) : (
              announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-blue-50 bg-white/80 p-4 shadow-sm shadow-blue-100/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{a.title}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(a.created_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {a.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
