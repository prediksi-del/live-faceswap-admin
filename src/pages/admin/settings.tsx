import { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('r8_xxxxxxxxxxxxxxxxxxxxxx');

  return (
    <div className="min-h-screen bg-[#020617] flex">
      <Sidebar currentTab="settings" setCurrentTab={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 max-w-2xl">
          <div className="glass-card border border-slate-900 p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Core API Configurations</h3>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Replicate AI Token</label>
              <input 
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-300 focus:border-blue-500 outline-none transition"
              />
            </div>
            <button className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Simpan Konfigurasi
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
