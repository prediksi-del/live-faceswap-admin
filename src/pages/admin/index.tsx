import { useState } from 'react';
import Head from 'next/head';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { UserManagement } from '@/components/dashboard/UserManagement';
import { Users, Cpu, ShieldCheck, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const stats = [
    { name: 'Total Pengguna', value: '1,248', icon: Users, color: 'text-blue-400' },
    { name: 'AI Gen / Hari Ini', value: '3,412', icon: Cpu, color: 'text-purple-400' },
    { name: 'Uptime Serverless', value: '99.98%', icon: Activity, color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex">
      <Head>
        <title>Control Panel Admin - AJM Suite</title>
      </Head>

      <Sidebar currentTab={activeTab} setCurrentTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <header className="mb-8 border-b border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white capitalize">{activeTab} Management</h2>
              <p className="text-xs text-slate-500">Sistem monitoring gerbang API swap wajah & modifikasi pakaian.</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Edge Gateway
            </div>
          </header>

          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <AnalyticsChart />

              <div className="glass-panel rounded-2xl border border-slate-900 p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live Edge Node Logs</h3>
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[11px] text-slate-400 h-48 overflow-y-auto flex flex-col gap-1.5">
                  <p><span className="text-slate-600">[2026-05-25 14:02:11]</span> <span className="text-blue-400">INFO:</span> Database MongoDB Atlas terhubung sukses.</p>
                  <p><span className="text-slate-600">[2026-05-25 14:03:05]</span> <span className="text-purple-400">AI_ENGINE:</span> Request face_swap selesai diproses via Replicate Serverless (0.84s).</p>
                  <p><span className="text-slate-600">[2026-05-25 14:05:22]</span> <span className="text-emerald-400">SUCCESS:</span> Vercel edge function merespon pemrosesan muatan citra try-on baju baru.</p>
                  <p className="animate-pulse text-slate-500"><span className="text-slate-600">[_]</span> Menunggu transmisi frame kamera berikutnya...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database User Registry</h3>
              <UserManagement />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-card border border-slate-900 p-6 rounded-2xl max-w-xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-300 mb-2">Konfigurasi Kunci API Cadangan</h3>
              <div>
                <label className="block text-[11px] text-slate-500 uppercase font-bold mb-2">Replicate Model Token Override</label>
                <input 
                  type="password" 
                  placeholder="r8_************************" 
                  disabled 
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-500 cursor-not-allowed outline-none" 
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
                            }
