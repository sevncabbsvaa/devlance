import { createClient } from '../../lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-2">
        <h1 className="text-white font-bold text-xl mb-6">Devlance</h1>
        <a href="/dashboard" className="text-white bg-white/10 px-4 py-2 rounded-xl text-sm">Dashboard</a>
        <a href="/interview" className="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm transition">Yeni Müsahibə</a>
        <a href="/history" className="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm transition">Tarixçə</a>
        <div className="mt-auto">
          <p className="text-gray-500 text-xs truncate">{user.email}</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h2 className="text-white text-2xl font-bold mb-2">Xoş gəldin 👋</h2>
        <p className="text-gray-400 mb-8">AI ilə müsahibəyə hazırlaşmağa başla</p>

        {/* Start card */}
        <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl p-8 max-w-lg">
          <h3 className="text-white text-xl font-bold mb-2">Yeni Müsahibə Başlat</h3>
          <p className="text-gray-400 text-sm mb-6">AI sənə real müsahibə sualları verəcək, cavablarını analiz edəcək.</p>
          <a href="/interview" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition inline-block">
            Başla →
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Müsahibə</p>
            <p className="text-white text-2xl font-bold">0</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Orta xal</p>
            <p className="text-white text-2xl font-bold">—</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Bu həftə</p>
            <p className="text-white text-2xl font-bold">0</p>
          </div>
        </div>
      </main>
    </div>
  )
}