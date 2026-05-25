import { useState } from 'react';
import Head from 'next/head';
import { Sidebar } from '@/components/admin/Sidebar';
import { Users, Cpu, ShieldCheck, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Placeholder Data Ringkas untuk Dashboard Admin
  const stats = [
    { name: 'Total Pengguna', value: '1,248', icon: Users, color: 'text-blue-400' },
    { name: 'AI Gen / Hari Ini', value: '3,412', icon: Cpu, color: 'text-purple-400' },
    { name: 'Uptime Serverless', value: '99.98%', icon: Activity, color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex">
      <Head>
        <title>Control Panel Admin - Live Swap Suite</title>
      </Head>

      {/* Sidebar Navigasi */}
      <Sidebar currentTab={activeTab} setCurrentTab={setActiveTab} />

      {/* Konten Utama Berdasarkan Tab yang Aktif */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 border-b border-slate-900 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white capitalize">{activeTab} Panel</h2>
            <p className="text-xs text-slate-500">Sistem monitoring gerbang API swap wajah & badan.</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Secure Edge Gateway
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-8">
            {/* Grid Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="glass-card border border-slate-900 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.name}</p>
                      <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                    </div>
                    <div className={`p-3 bg-slate-950 rounded-xl border border-slate-800/60 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Monitor Log Aktivitas Sistem */}
            <div className="glass-panel rounded-2xl border border-slate-900 p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live GPU Node Node Logs</h3>
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[11px] text-slate-400 h-48 overflow-y-auto flex flex-col gap-1.5">
                <p><span className="text-slate-600">[2026-05-25 14:02:11]</span> <span className="text-blue-400">INFO:</span> Database MongoDB Atlas terhubung sukses.</p>
                <p><span className="text-slate-600">[2026-05-25 14:03:05]</span> <span className="text-purple-400">AI_ENGINE:</span> Request face_swap selesai diproses via Replicate Serverless (0.84s).</p>
                <p><span className="text-slate-600">[2026-05-25 14:05:22]</span> <span className="text-emerald-400">SUCCESS:</span> Vercel edge function merespon pemrosesan muatan citra try-on baju baru.</p>
                <p className="animate-pulse text-slate-500"><span className="text-slate-600">[_]</span> Menunggu request transmisi frame berikutnya...</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="glass-panel rounded-2xl border border-slate-900 p-6 text-center text-slate-500 text-xs py-20">
            Tabel manajemen otentikasi User terikat dengan MongoDB. Anda dapat memetakan data `find()` skema user di sini.
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass-card border border-slate-900 p-6 rounded-2xl max-w-xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-300 mb-2">Konfigurasi Kunci API Cadangan</h3>
            <div>
              <label className="block text-[11px] text-slate-500 uppercase font-bold mb-1">Replicate Model Token Override</label>
              <input type="password" placeholder="r8_************************" disabled className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 cursor-not-allowed" />
            </div>
            <p className="text-[10px] text-slate-600 italic">Catatan: Untuk proteksi terbaik, ubah token langsung melalui dashboard pengaturan Environment Variables di Vercel.</p>
          </div>
        )}
      </main>
    </div>
  );
                         }
